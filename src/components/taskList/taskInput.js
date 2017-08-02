import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';
import classnames from 'classnames';

class TaskInput extends Component {
	static get propTypes() {
		return {
			inputValue: PropTypes.string.isRequired,
			handleClick: PropTypes.func.isRequired,
			handleChange: PropTypes.func.isRequired,
			large: PropTypes.bool,
			autofocus: PropTypes.bool,
			name: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			inputValue: '',
			handleClick: () => {},
			handleChange: () => {},
			large: false,
			autofocus: false,
			name: ''
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
		const formClasses = classnames('task-input-form', {
			'large': this.props.large
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
					onClick={this.props.handleClick}
				>
					+
				</button>
				<input
					autoFocus={this.props.autofocus}
					type="text"
					placeholder={placeholder}
					value={this.props.inputValue}
					name={this.props.name}
					onChange={this.props.handleChange}
				/>
			</form>
		);
	}
}

export default TaskInput;
