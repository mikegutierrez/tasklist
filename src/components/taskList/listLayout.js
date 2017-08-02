import React, { Component } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

// Global components
import SectionTitle from '../global/sectionTitle';

// Task list components
import TaskList from './taskList';
import CompletedList from './completedList';
import TaskInput from './taskInput';

class ListLayout extends Component {
	constructor() {
		super();
		this.state = {
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

	removeCompletedTask(task, index) {
		const completedList = this.state.completed;
		const completedItem = completedList.indexOf(task);
		if (index != -1) {
			completedList.splice(completedItem, 1);
		}
		this.addTask(task);
		this.setState({ completed: completedList });
	}

	completeTask(listItem) {
		const list = this.state.completed.concat(listItem);
		this.setState({ completed: list });
	}

	render() {
		return (
			<div id="layout">
				<div className="row center-content">
					<div className="col-md-6 list-container">
						<div className="col-md-6 margin-bottom-xl">
							<SectionTitle title="Tasks" />
							{
								this.state.tasks &&
								<TaskList
									tasks={this.state.tasks}
									completeTask={this.completeTask}
									removeTask={this.removeTask}
								/>
							}
							<TaskInput
								addTask={this.addTask}
								autofocus={true}
								name="list"
							/>
						</div>
						<div className="col-md-6 margin-bottom-xl">
							<SectionTitle title="Completed" />
							{
								this.state.completed &&
								<CompletedList
									completed={this.state.completed}
									removeCompletedTask={this.removeCompletedTask}
								/>
							}
						</div>
						<div className="row input-container">
							<div className="col-md-12">
								<TaskInput
									addTask={this.addTask}
									large={true}
									name="bottom"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ListLayout;
