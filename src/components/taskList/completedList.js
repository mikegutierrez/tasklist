import React, { Component, PropTypes } from 'react';

// Task list components
import ListItem from './listItem';

class CompletedList extends Component {
	static get propTypes() {
		return {
			completed: PropTypes.array.isRequired,
			deleteTask: PropTypes.func.isRequired,
			removeCompletedTask: PropTypes.func.isRequired
		};
	}

	static get defaultProps() {
		return {
			completed: [],
			deleteTask: () => {},
			removeCompletedTask: () => {}
		};
	}

	renderCompletedList() {
		return (
			this.props.completed.map((completedTask, index) => {
				return (
					<ListItem
						defaultChecked={true}
						task={completedTask}
						index={index}
						deleteTask={this.props.deleteTask}
						removeCompletedTask={this.props.removeCompletedTask}
						location="completedTasks"
						key={index}
					/>
				);
			})
		);
	}

	render() {
		return (
			<ul className="list-unstyled">
				{ this.renderCompletedList() }
			</ul>
		);
	}
}

export default CompletedList;
