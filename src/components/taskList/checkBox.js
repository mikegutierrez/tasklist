import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';
import classnames from 'classnames';

class CheckBox extends Component {
	static get propTypes() {
		return {
			checked: PropTypes.bool,
			onChange: PropTypes.func,
			editTask: PropTypes.func,
			label: PropTypes.string,
			width: PropTypes.string,
			height: PropTypes.string,
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
			width: '20px',
			height: '20px',
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
		const iconStyle = { width: this.props.height, height: this.props.height };
		const iconClass = classnames('check-icon', 'inline-block', {
			'active': this.state.checked
		});
		return (
			<div onClick={this.onChange} className={iconClass} style={iconStyle}></div>
		);
	}

	renderLabel() {
		const labelStyle = { lineHeight: this.props.height, fontSize: parseInt(this.props.height, 10) - 4 + 'px' };
		return (
			<input
				className="input-label inline-block"
				style={labelStyle}
				defaultValue={this.props.label}
				onChange={this.handleChange}
				onKeyPress={(e) => this.onKeyPress(e, this.props.index)}
				onBlur={() => this.updateLabel(this.props.index)}
				ref={this.props.index}
			></input>
		);
	}

	updateLabel(index) {
		this.refs[index].blur();
		this.props.editTask(this.state.inputValue, index);
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
