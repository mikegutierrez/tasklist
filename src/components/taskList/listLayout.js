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

	deleteTask(task, index, location) {
		const taskList = this.state.tasks;
		const taskItem = taskList.indexOf(task);
		const completedList = this.state.completed;
		const completedItem = completedList.indexOf(task);

		if (location === 'taskList') {
			if (index != -1) {
				taskList.splice(taskItem, 1);
			}
			this.setState({ tasks: taskList });
		} else if (location === 'completedTasks') {
			if (index != -1) {
				completedList.splice(completedItem, 1);
			}
			this.setState({ completed: completedList });
		}
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
					<div className="col-xs-12 col-sm-8 col-md-6 list-container">
						<div className="col-xs-12 col-sm-12 col-md-6 margin-bottom-xl">
							<SectionTitle title="Tasks" count={this.state.tasks.length}/>
							{
								this.state.tasks &&
								<TaskList
									tasks={this.state.tasks}
									deleteTask={this.deleteTask}
									completeTask={this.completeTask}
								/>
							}
							<TaskInput
								addTask={this.addTask}
								autofocus={true}
								name="list"
							/>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 margin-bottom-xl">
							<SectionTitle title="Completed" count={this.state.completed.length}/>
							{
								this.state.completed &&
								<CompletedList
									completed={this.state.completed}
									deleteTask={this.deleteTask}
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
