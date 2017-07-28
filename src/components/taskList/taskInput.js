import React, { Component } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

class TaskInput extends Component {
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
			<form onKeyPress={this.onKeyPress}>
				<input
					type="text"
					ref="addTask"
					placeholder="Add New Task"
					value={this.props.inputValue}
					onChange={this.props.handleChange}
				/>
				<button
					type="button"
					className="btn btn-primary margin-left"
					disabled={this.isDisabled()}
					onClick={this.props.handleClick}
				>
					+
				</button>
			</form>
		);
	}
}

export default TaskInput;
