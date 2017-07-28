import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

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
		this.state = {
			checked: false
		};
		autoBindMethods(this);
	}

	componentDidMount() {
		if (this.props.location === 'completedTasks') {
			this.setState({ checked: true });
		}
	}

	handleTaskCheck(location, task, index) {
		const input = this.refs[this.props.inputIndex];
		const label = this.refs[this.props.labelIndex];

		if (location === 'taskList' && input.checked) {
			this.props.removeTask(task, index);
			this.props.completeTask(label.innerHTML);
		} else if (location === 'completedTasks' && input.checked) {
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
				className="margin-top-xl margin-bottom-xl task-list-item" key={this.props.index}>
				<input
					type="checkbox"
					id={this.props.inputIndex}
					ref={this.props.inputIndex}
					defaultChecked={this.state.checked}
					onChange={() => this.handleTaskCheck(this.props.location, this.props.task, this.props.index)}
				/>
				<label
					htmlFor={this.props.inputIndex}
					ref={this.props.labelIndex}
					className="margin-left margin-right"
				>
					{this.props.task}
				</label>
				{ this.props.deleteTask && this.renderCloseButton() }
			</li>
		);
	}
}

export default ListItem;
