import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

class TaskInput extends Component {
	static get propTypes() {
		return {
			inputValue: PropTypes.string.isRequired,
			handleClick: PropTypes.func.isRequired,
			handleChange: PropTypes.func.isRequired
		};
	}

	static get defaultProps() {
		return {
			inputValue: '',
			handleClick: () => {},
			handleChange: () => {}
		};
	}

	constructor() {
		super();
		autoBindMethods(this);
	}

	isDisabled() {
		return Boolean(!this.props.inputValue);
	}

	onKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (!this.isDisabled()) {
				this.props.handleClick();
			}
		}
	}

	render() {
		return (
			<form className="task-input-form" onKeyPress={this.onKeyPress}>
				<button
					type="button"
					className="btn btn-transparent margin-right inline-block"
					disabled={this.isDisabled()}
					onClick={this.props.handleClick}
					>
					+
				</button>
				<input
					type="text"
					ref="addTask"
					placeholder="Add New Task"
					value={this.props.inputValue}
					onChange={this.props.handleChange}
				/>
			</form>
		);
	}
}

export default TaskInput;
