import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

// Task List components
import CheckBox from './checkBox';

class ListItem extends Component {
	static get propTypes() {
		return {
			task: PropTypes.string.isRequired,
			location: PropTypes.string.isRequired,
			index: PropTypes.number.isRequired,
			removeTask: PropTypes.func,
			completeTask: PropTypes.func,
			removeCompletedTask: PropTypes.func,
			deleteTask: PropTypes.bool,
			defaultChecked: PropTypes.bool

		};
	}

	static get defaultProps() {
		return {
			removeTask: () => {},
			completeTask: () => {},
			removeCompletedTask: () => {},
			task: '',
			location: '',
			index: 0,
			deleteTask: false,
			defaultChecked: false
		};
	}

	constructor() {
		super();
		this.state = {
			checked: false
		};
		autoBindMethods(this);
	}

	handleTaskCheck(location, task, index) {
		const label = this.props.task;

		if (location === 'taskList' && this.state.checked) {
			this.props.removeTask(task, index);
			this.props.completeTask(label);
		} else if (location === 'completedTasks' && this.state.checked) {
			this.props.removeCompletedTask(label, index);
		}
	}

	renderCloseButton() {
		return (
			<span>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => this.props.removeTask(this.props.task, this.props.index)}
				>
					x
				</button>
			</span>
		);
	}

	render() {
		const { index, location, task, deleteTask, defaultChecked } = this.props;
		return (
			<li
				className="margin-top margin-bottom task-list-item" key={index}>
				<CheckBox
					checked={defaultChecked}
					label={task}
					onChange={() => this.setState({ checked: true }, () => this.handleTaskCheck(location, task, index))}
				/>
				{ deleteTask && this.renderCloseButton() }
			</li>
		);
	}
}

export default ListItem;
