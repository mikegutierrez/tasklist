import React, { Component, PropTypes } from 'react';

// Task list components
import ListItem from './listItem';

class CompletedList extends Component {
	static get propTypes() {
		return {
			completed: PropTypes.array.isRequired,
			removeCompletedTask: PropTypes.func.isRequired
		};
	}

	static get defaultProps() {
		return {
			completed: [],
			removeCompletedTask: () => {}
		};
	}

	renderCompletedList() {
		return (
			this.props.completed.map((completedTask, index) => {
				return (
					<ListItem
						task={completedTask}
						index={index}
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
