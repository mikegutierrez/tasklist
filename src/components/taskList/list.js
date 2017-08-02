import React, { Component, PropTypes } from 'react';

// Task list components
import ListItem from './listItem';

class List extends Component {
	static get propTypes() {
		return {
			location: PropTypes.string.isRequired,
			tasks: PropTypes.array.isRequired,
			addTask: PropTypes.func.isRequired,
			completeTask: PropTypes.func.isRequired,
			deleteTask: PropTypes.func.isRequired
		};
	}

	static get defaultProps() {
		return {
			location: '',
			tasks: [],
			addTask: () => {},
			completeTask: () => {},
			deleteTask: () => {}
		};
	}

	renderList() {
		return (
			this.props.tasks.map((task, index) => {
				return (
					<ListItem
						defaultChecked={this.props.location === 'completedTasks'}
						task={task}
						index={index}
						addTask={this.props.addTask}
						deleteTask={this.props.deleteTask}
						completeTask={this.props.completeTask}
						location={this.props.location}
						key={index}
					/>
				);
			})
		);
	}

	render() {
		return (
			<ul className="list-unstyled">
				{ this.renderList() }
			</ul>
		);
	}
}

export default List;
