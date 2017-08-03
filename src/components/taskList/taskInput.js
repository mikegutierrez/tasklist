import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';
import classnames from 'classnames';

class TaskInput extends Component {
	static get propTypes() {
		return {
			addTask: PropTypes.func.isRequired,
			large: PropTypes.bool,
			autofocus: PropTypes.bool,
			name: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			addTask: () => {},
			large: false,
			autofocus: false,
			name: ''
		};
	}

	constructor() {
		super();
		this.state = {
			inputValue: ''
		};
		autoBindMethods(this);
	}

	isDisabled() {
		return Boolean(!this.state.inputValue);
	}

	onKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (!this.isDisabled()) {
				this.handleClick();
			}
		}
	}

	handleChange(e) {
		return (
			this.setState({ inputValue: e.target.value })
		);
	}

	handleClick() {
		return (
			this.props.addTask(this.state.inputValue),
			this.setState({ inputValue: '' })
		);
	}

	render() {
		const formClasses = classnames('task-input-form', 'margin-top-s', {
			'large': this.props.large,
			'input-border': !this.props.large
		});
		const btnClasses = classnames('btn', 'btn-transparent', 'inline-block', {
			'margin-right': this.props.large
		});
		const placeholder = this.props.large ? 'Add New Task' : '';
		return (
			<form className={formClasses} onKeyPress={this.onKeyPress}>
				<button
					type="button"
					className={btnClasses}
					disabled={this.isDisabled()}
					onClick={() => this.handleClick()}
				>
					+
				</button>
				<input
					className="margin-bottom-s"
					autoFocus={this.props.autofocus}
					type="text"
					placeholder={placeholder}
					value={this.state.inputValue}
					name={this.props.name}
					onChange={this.handleChange}
				/>
			</form>
		);
	}
}

export default TaskInput;
