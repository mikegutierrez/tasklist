import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';
import classnames from 'classnames';

class CheckBox extends Component {
	static get propTypes() {
		return {
			checked: PropTypes.bool,
			onChange: PropTypes.func,
			label: PropTypes.string,
			width: PropTypes.string,
			height: PropTypes.string,
			classes: PropTypes.array
		};
	}

	static get defaultProps() {
		return {
			checked: false,
			onChange: () => {},
			label: '',
			width: '20px',
			height: '20px',
			classes: []
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked
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
		const iconClass = classnames('check-icon', 'align-vertical', {
			'active': this.state.checked
		});
		return (
			<div className={iconClass} style={iconStyle}></div>
		);
	}

	renderLabel() {
		const labelStyle = { lineHeight: this.props.height, fontSize: parseInt(this.props.height, 10) - 4 + 'px' };
		return (
			<label className="align-vertical" style={labelStyle}>
				{this.props.label}
			</label>
		);
	}

	render() {
		const classes = this.props.classes.join(' ');
		const componentClasses = classnames('check-box', {
			[classes]: classes
		});
		return (
			<div onClick={this.onChange} className={componentClasses}>
				{ this.renderIcon() }
				{ this.props.label && this.renderLabel() }
			</div>
		);
	}
}

export default CheckBox;
