import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';
import classnames from 'classnames';
import autosize from 'autosize';

class CheckBox extends Component {
	static get propTypes() {
		return {
			checked: PropTypes.bool,
			onChange: PropTypes.func,
			editTask: PropTypes.func,
			label: PropTypes.string,
			classes: PropTypes.array,
			index: PropTypes.number
		};
	}

	static get defaultProps() {
		return {
			checked: false,
			editTask: () => {},
			onChange: () => {},
			label: '',
			classes: [],
			index: 0
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked,
			inputValue: ''
		};
		autoBindMethods(this);
	}

	componentDidMount() {
		autosize(this.refs[this.props.index]);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			classes: nextProps.classes || this.props.classes
		});
	}

	onChange(e) {
		e.preventDefault();
		const checked = !this.state.checked;
		this.setState({ checked }, () => this.props.onChange(checked));
	}

	renderIcon() {
		const iconClass = classnames('check-icon', 'inline-block', {
			'active': this.state.checked
		});
		return (
			<div onClick={this.onChange} className={iconClass}></div>
		);
	}

	renderLabel() {
		return (
			<textarea
				className="inline-block margin-bottom-s"
				defaultValue={this.props.label}
				onChange={this.handleChange}
				onKeyPress={(e) => this.onKeyPress(e, this.props.index)}
				onBlur={() => this.updateLabel(this.props.index)}
				ref={this.props.index}
			></textarea>
		);
	}

	updateLabel(index) {
		this.refs[index].blur();
		if (this.state.inputValue !== '') {
			this.props.editTask(this.state.inputValue, index);
		}
		return;
	}

	onKeyPress(e, index) {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.updateLabel(index);
		}
	}

	handleChange(e) {
		return (
			this.setState({ inputValue: e.target.value })
		);
	}

	render() {
		const classes = this.props.classes.join(' ');
		const componentClasses = classnames('check-box', {
			[classes]: classes
		});
		return (
			<div className={componentClasses}>
				{ this.renderIcon() }
				{ this.props.label && this.renderLabel() }
			</div>
		);
	}
}

export default CheckBox;
