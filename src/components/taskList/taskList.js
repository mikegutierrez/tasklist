import React, { Component, PropTypes } from 'react';

// Task list components
import ListItem from './listItem';

class TaskList extends Component {
	static get propTypes() {
		return {
			tasks: PropTypes.array.isRequired,
			completeTask: PropTypes.func.isRequired,
			removeTask: PropTypes.func.isRequired
		};
	}

	static get defaultProps() {
		return {
			tasks: [],
			completeTask: () => {},
			removeTask: () => {}
		};
	}

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
						location="taskList"
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
