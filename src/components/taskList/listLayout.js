import React, { Component } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

// Global components
import SectionTitle from '../global/sectionTitle';

// Task list components
import List from './list';
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
		const list = [...this.state.tasks, task];
		this.setState({ tasks: list });
	}

	editTask(task, index) {
		const taskList = this.state.tasks;
		if (index !== -1) {
			const updatedList = [
				...taskList.slice(task, index),
				task,
				...taskList.slice(index + 1)
			];
			this.setState({ tasks: updatedList });
		}
	}

	deleteTask(task, index, location) {
		const taskList = this.state.tasks;
		const completedTasks = this.state.completed;

		if (location === 'taskList') {
			if (index !== -1) {
				const updatedList = [
					...taskList.slice(JSON.stringify(task), index),
					...taskList.slice(index + 1)
				];
				this.setState({ tasks: updatedList });
			}
		} else if (location === 'completedTasks') {
			if (index !== -1) {
				const updatedList = [
					...completedTasks.slice(JSON.stringify(task), index),
					...completedTasks.slice(index + 1)
				];
				this.setState({ completed: updatedList });
			}
		}
	}

	completeTask(listItem) {
		const list = [...this.state.completed, listItem];
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
								<List
									location="taskList"
									tasks={this.state.tasks}
									deleteTask={this.deleteTask}
									completeTask={this.completeTask}
									addTask={this.addTask}
									editTask={this.editTask}
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
								<List
									location="completedTasks"
									tasks={this.state.completed}
									deleteTask={this.deleteTask}
									addTask={this.addTask}
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
