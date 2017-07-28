import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';
import classnames from 'classnames';

class CheckBox extends Component {
	static get propTypes() {
		return {
			checked: PropTypes.bool,
			onChange: PropTypes.func,
			classes: PropTypes.array
		};
	}

	static get defaultProps() {
		return {
			checked: false,
			onChange: () => {},
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
		console.log('onChange');
		e.preventDefault();
		const checked = !this.state.checked;
		this.setState({ checked }, () => this.props.onChange(checked));
	}

	render() {
		const classes = this.props.classes.join(' ');
		return (
			<div
				onClick={this.onChange}
				className={classnames('check-box', { 'active': this.state.checked, [classes]: classes })}
			></div>
		);
	}
}

export default CheckBox;
