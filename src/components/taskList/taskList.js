import React, { Component, PropTypes } from 'react';

// Task list components
import ListItem from './listItem';

class TaskList extends Component {
	static get propTypes() {
		return {
			tasks: PropTypes.array.isRequired,
			deleteTask: PropTypes.func.isRequired,
			completeTask: PropTypes.func.isRequired
		};
	}

	static get defaultProps() {
		return {
			tasks: [],
			deleteTask: () => {},
			completeTask: () => {}
		};
	}

	renderTaskList() {
		return (
			this.props.tasks.map((task, index) => {
				return (
					<ListItem
						defaultChecked={false}
						task={task}
						index={index}
						deleteTask={this.props.deleteTask}
						completeTask={this.props.completeTask}
						location="taskList"
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
