import React, { Component } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

// Global components
import SectionTitle from '../global/sectionTitle';

class ResumeLayout extends Component {
	constructor() {
		super();
		this.state = {
			tasks: [],
			completed: []
		};
		autoBindMethods(this);
	}

	addTask() {
		const value = document.querySelector('#add-task').value;
		const list = this.state.tasks.concat(value);
		this.setState({ tasks: list });
	}

	removeTask(task, index) {
		const list = this.state.tasks;
		const item = list.indexOf(task);

		if (index >= 0) {
			list.splice(item, 1);
		}
		this.setState({ tasks: list });
	}

	checkTask(task, index) {
		const input = this.refs[`check-task-input-${index}`];
		const label = this.refs[`check-task-label-${index}`];
		if (input.checked) {
			this.removeTask(task, index);
			this.completeTask(label.innerHTML);
			this.renderCompletedList();
		}
	}

	completeTask(listItem) {
		const list = this.state.completed.concat(listItem);
		this.setState({ completed: list });
	}

	renderCompletedList() {  // create list item component
		return (
			this.state.completed.map((completedTask, index) => {
				return (
					<li className="margin-top margin-bottom" key={index} ref={`check-completed-${index}`}>
						<input
							type="checkbox"
							defaultChecked={true}
							id={`check-completed-input-${index}`}
							ref={`check-completed-input-${index}`}
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
					<li className="margin-top margin-bottom" key={index} ref={`check-task-${index}`}>
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
	// create taskList & completedList list components
	render() {
		return (
			<div id="resume">
				<div className="row">
					<div className="col-md-4 col-md-offset-2">
						<SectionTitle title="Tasks" />
						<div>
							<input type="text" id="add-task" placeholder="Add New Task"/>
							<button
								type="button"
								className="btn btn-primary margin-left"
								onClick={this.addTask}
							>
								+
							</button>
						</div>
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

export default ResumeLayout;
