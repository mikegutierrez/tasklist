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
		console.log('5. addTask:  ', task + '\n' + 'list:  ', list);
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
			console.log('!!! editTask updatedList:  ', updatedList);
			this.setState({ tasks: updatedList });
		}
	}

	deleteTask(task, index, location) {
		console.log('4. deleteTask' + '\n' + 'location:  ', location + '\n' + 'task:  ', task, '\n' + 'index:  ', index);
		const taskList = this.state.tasks;
		const taskIndex = taskList.indexOf(task);
		const completedList = this.state.completed;
		const completedIndex = completedList.indexOf(task);

		console.log('taskIndex:  ', taskIndex + '\n' + 'completedIndex:  ', completedIndex);

		if (location === 'taskList') {
			if (index !== -1) {
				const updatedList = [
					...taskList.slice(task, taskIndex),
					...taskList.slice(taskIndex + 1)
				];
				console.log('*** post deleteTask tasklist: ', updatedList);
				this.setState({ tasks: updatedList });
				console.log('deleteTask state.tasks:  ', this.state.tasks);
			}
		} else if (location === 'completedTasks') {
			if (index !== -1) {
				const updatedList = [
					...completedList.slice(task, completedIndex),
					...completedList.slice(completedIndex + 1)
				];
				console.log('*** post deleteTask completedList: ', updatedList);
				this.setState({ completed: updatedList });
				console.log('deleteTask state.completed:  ', this.state.completed);
			}
		}
	}

	completeTask(listItem) {
		const list = [...this.state.completed, listItem];
		console.log('5. completeTask:  ', listItem + '\n' + 'list:  ', list);

		this.setState({ completed: list });
	}

	render() {
		console.log('1. listLayout RENDER' + '\n' + 'state.tasks:  ', this.state.tasks + '\n' + 'state.completed:  ', this.state.completed);
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
