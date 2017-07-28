import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

// Task List components
import CheckBox from './checkBox';

class ListItem extends Component {
	static get propTypes() {
		return {
			inputIndex: PropTypes.string.isRequired,
			labelIndex: PropTypes.string.isRequired,
			task: PropTypes.string.isRequired,
			index: PropTypes.number.isRequired,
			onChange: PropTypes.string.isRequired,
			removeTask: PropTypes.func,
			completeTask: PropTypes.func,
			removeCompletedTask: PropTypes.func,
			deleteTask: PropTypes.bool

		};
	}

	static get defaultProps() {
		return {
			inputIndex: '',
			labelIndex: '',
			removeTask: () => {},
			completeTask: () => {},
			removeCompletedTask: () => {},
			task: '',
			index: 0,
			onChange: '',
			deleteTask: false
		};
	}

	constructor() {
		super();
		// this.state = {
		// 	checked: false
		// };
		autoBindMethods(this);
	}

	// componentDidMount() {
	// 	if (this.props.location === 'completedTasks') {
	// 		this.setState({ checked: true });
	// 	}
	// }

	handleTaskCheck(location, task, index) {
		console.log('handleTaskCheck');
		const input = this.refs[this.props.inputIndex];
		const label = this.refs[this.props.labelIndex];

		console.log('input:  ', input);
		console.log('label:  ', label);

		if (location === 'taskList' && input.checked) {
			console.log('taskList if block');
			this.props.removeTask(task, index);
			this.props.completeTask(label.innerHTML);
		} else if (location === 'completedTasks' && input.checked) {
			console.log('completedTasks if block');
			this.props.removeCompletedTask(label.innerHTML, index);
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
		console.log(' LI state:  ', this.state);
		return (
			<li
				className="margin-top margin-bottom task-list-item" key={this.props.index}>
				<CheckBox
					ref={this.props.inputIndex}
					label={this.props.task}
					onChange={() => this.handleTaskCheck(this.props.location, this.props.task, this.props.index)}
				/>
				{ this.props.deleteTask && this.renderCloseButton() }
			</li>
		);
	}
}

export default ListItem;
