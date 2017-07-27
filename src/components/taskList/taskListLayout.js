import React, { Component } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

// Global components
import SectionTitle from '../global/sectionTitle';

class TaskListLayout extends Component {
	constructor() {
		super();
		this.state = {
			inputValue: '',
			tasks: [],
			completed: []
		};
		autoBindMethods(this);
	}

	addTask(task) {
		const list = this.state.tasks.concat(task);
		this.setState({ tasks: list });
	}

	removeTask(task, index) {
		const taskList = this.state.tasks;
		const taskItem = taskList.indexOf(task);

		if (index != -1) {
			taskList.splice(taskItem, 1);
		}
		this.setState({ tasks: taskList });
	}

	checkTask(task, index) {
		const taskInput = this.refs[`check-task-input-${index}`];
		const taskLabel = this.refs[`check-task-label-${index}`];

		if (taskInput.checked) {
			this.removeTask(task, index);
			this.completeTask(taskLabel.innerHTML);
		}
	}

	uncheckTask(task, index) {
		const completedInput = this.refs[`check-completed-input-${index}`];
		const completedLabel = this.refs[`check-completed-label-${index}`];

		if (!completedInput.checked) {
			this.addTask(task);
			this.removeCompletedTask(completedLabel.innerHTML, index);
		}
	}

	removeCompletedTask(task, index) {
		const completedList = this.state.completed;
		const completedItem = completedList.indexOf(task);

		if (index != -1) {
			completedList.splice(completedItem, 1);
		}
		this.setState({ completed: completedList });
	}

	completeTask(listItem) {
		const list = this.state.completed.concat(listItem);
		this.setState({ completed: list });
	}

	renderCompletedList() {  // create list item component
		return (
			this.state.completed.map((completedTask, index) => {
				return (
					<li className="margin-top-xl margin-bottom-xl" key={index} ref={`check-completed-${index}`}>
						<input
							type="checkbox"
							defaultChecked={true}
							id={`check-completed-input-${index}`}
							ref={`check-completed-input-${index}`}
							onChange={() => this.uncheckTask(completedTask, index)}
						/>
						<label
							htmlFor={`check-completed-input-${index}`}
							ref={`check-completed-label-${index}`}
							className="margin-left margin-right"
						>
							{completedTask}
						</label>
					</li>
				);
			})
		);
	}

	renderTaskList() { // create list item component
		return (
			this.state.tasks.map((task, index) => {
				return (
					<li className="margin-top-xl margin-bottom-xl" key={index} ref={`check-task-${index}`}>
						<input
							type="checkbox"
							id={`check-task-input-${index}`}
							ref={`check-task-input-${index}`}
							onChange={() => this.checkTask(task, index)}
						/>
						<label
							htmlFor={`check-task-input-${index}`}
							ref={`check-task-label-${index}`}
							className="margin-left margin-right"
						>
							{task}
						</label>
						<span>
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => this.removeTask(task, index)}
							>
								x
							</button>
						</span>
					</li>
				);
			})
		);
	}

	isDisabled() {
		return Boolean(!this.state.inputValue);
	}

	handleChange(e) {
		return (
			this.setState({ inputValue: e.target.value })
		);
	}

	handleClick() {
		return (
			this.addTask(this.state.inputValue),
			this.setState({ inputValue: '' })
		);
	}


	onKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (!this.isDisabled()) {
				this.handleClick();
			}
		}
	}

	// create taskList & completedList list components
	render() {
		return (
			<div id="resume">
				<div className="row">
					<div className="col-md-4 col-md-offset-2">
						<SectionTitle title="Tasks" />
						<form onKeyPress={this.onKeyPress}>
							<input
								type="text"
								ref="addTask"
								placeholder="Add New Task"
								value={this.state.inputValue}
								onChange={this.handleChange}
							/>
							<button
								type="button"
								className="btn btn-primary margin-left"
								disabled={this.isDisabled()}
								onClick={this.handleClick}
							>
								+
							</button>
						</form>
						<ul className="list-unstyled">
							{ this.state.tasks.length ? this.renderTaskList() : '' }
						</ul>
					</div>
					<div className="col-md-4">
						<SectionTitle title="Completed" />
						<ul className="list-unstyled">
							{ this.state.completed.length ? this.renderCompletedList() : '' }
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default TaskListLayout;
