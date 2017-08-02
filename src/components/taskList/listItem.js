import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';
import classnames from 'classnames';

// Task List components
import CheckBox from './checkBox';

class ListItem extends Component {
	static get propTypes() {
		return {
			task: PropTypes.string.isRequired,
			location: PropTypes.string.isRequired,
			index: PropTypes.number.isRequired,
			addTask: PropTypes.func,
			editTask: PropTypes.func,
			deleteTask: PropTypes.func,
			completeTask: PropTypes.func,
			deleteButton: PropTypes.bool,
			defaultChecked: PropTypes.bool

		};
	}

	static get defaultProps() {
		return {
			addTask: () => {},
			editTask: () => {},
			deleteTask: () => {},
			completeTask: () => {},
			task: '',
			location: '',
			index: 0,
			deleteButton: true,
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
			this.props.deleteTask(task, index, location);
			this.props.completeTask(label);
		} else if (location === 'completedTasks' && this.state.checked) {
			this.props.deleteTask(task, index, location);
			this.props.addTask(task);
		}
	}

	renderCloseButton() {
		const { location, deleteTask, task, index } = this.props;
		const buttonClasses = classnames('btn', 'btn-transparent', {
			[location]: location
		});
		return (
			<span>
				<button
					type="button"
					className={buttonClasses}
					onClick={() => deleteTask(task, index, location)}
				>
					<span className="glyphicon glyphicon glyphicon-remove"></span>
				</button>
			</span>
		);
	}

	render() {
		const { index, location, task, deleteButton, defaultChecked } = this.props;
		return (
			<li className="margin-top margin-bottom task-list-item" key={index}>
				<CheckBox
					checked={defaultChecked}
					label={task}
					editTask={this.props.editTask}
					index={this.props.index}
					onChange={() => this.setState({ checked: true }, () => this.handleTaskCheck(location, task, index))}
				/>
				{ deleteButton && this.renderCloseButton() }
			</li>
		);
	}
}

export default ListItem;
