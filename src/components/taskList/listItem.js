import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

class ListItem extends Component {
	static get propTypes() {
		return {
			inputIndex: PropTypes.string.isRequired,
			labelIndex: PropTypes.string.isRequired,
			task: PropTypes.string.isRequired,
			index: PropTypes.number.isRequired,
			onChange: PropTypes.string.isRequired,
			removeTask: PropTypes.func,
			completeTask: PropTypes.func,
			removeCompletedTask: PropTypes.func,
			deleteTask: PropTypes.bool

		};
	}

	static get defaultProps() {
		return {
			inputIndex: '',
			labelIndex: '',
			removeTask: () => {},
			completeTask: () => {},
			removeCompletedTask: () => {},
			task: '',
			index: 0,
			onChange: '',
			deleteTask: false
		};
	}

	constructor() {
		super();
		autoBindMethods(this);
	}

	checkTask(task, index) {
		const taskInput = this.refs[this.props.inputIndex];
		const taskLabel = this.refs[this.props.labelIndex];
		if (taskInput.checked) {
			this.props.removeTask(task, index);
			this.props.completeTask(taskLabel.innerHTML);
		}
	}

	uncheckTask(task, index) {
		const completedInput = this.refs[this.props.inputIndex];
		const completedLabel = this.refs[this.props.labelIndex];
		if (completedInput.checked) {
			this.props.removeCompletedTask(completedLabel.innerHTML, index);
		}
	}

	renderCloseButton() {
		return (
			<span>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => this.props.removeTask(this.props.task, this.props.index)}
				>
					x
				</button>
			</span>
		);
	}

	render() {
		return (
			<li
				className="margin-top-xl margin-bottom-xl task-list-item" key={this.props.index}>
				<input
					type="checkbox"
					id={this.props.inputIndex}
					ref={this.props.inputIndex}
					onChange={() => {
						if (this.props.onChange === 'taskList') {
							this.checkTask(this.props.task, this.props.index);
						} else {
							this.uncheckTask(this.props.task, this.props.index);
						}
					}}
				/>
				<label
					htmlFor={this.props.inputIndex}
					ref={this.props.labelIndex}
					className="margin-left margin-right"
				>
					{this.props.task}
				</label>
				{ this.props.deleteTask && this.renderCloseButton() }
			</li>
		);
	}
}

export default ListItem;
