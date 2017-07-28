import React, { Component } from 'react';

// Task list components
import ListItem from './listItem';

class TaskList extends Component {
	renderTaskList() {
		return (
			this.props.tasks.map((task, index) => {
				return (
					<ListItem
						task={task}
						index={index}
						inputIndex={`check-task-input-${index}`}
						labelIndex={`check-task-label-${index}`}
						completeTask={this.props.completeTask}
						removeTask={this.props.removeTask}
						onChange="taskList"
						deleteTask={true}
						key={index}
					/>
				);
			})
		);
	}

	render() {
		return (
			<ul className="list-unstyled">
				{ this.renderTaskList() }
			</ul>
		);
	}
}

export default TaskList;
