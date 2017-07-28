import React, { Component } from 'react';

// Task list components
import ListItem from './listItem';

class CompletedList extends Component {
	renderCompletedList() {
		return (
			this.props.completed.map((completedTask, index) => {
				return (
					<ListItem
						task={completedTask}
						index={index}
						inputIndex={`check-completed-input-${index}`}
						labelIndex={`check-completed-label-${index}`}
						removeCompletedTask={this.props.removeCompletedTask}
						onChange="completedTasks"
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
