import React, { Component } from 'react';
import { autoBindMethods } from '../../helpers/autoBindMethods';

// Global components
import SectionTitle from '../global/sectionTitle';

class ResumeLayout extends Component {
	constructor() {
		super();
		this.state = {
			tasks: []
		};
		autoBindMethods(this);
	}

	addTask() {
		const value = document.querySelector('#add-task').value;
		const list = this.state.tasks.concat(value);
		this.setState({ tasks: list });
	}

	removeTask() {
		console.log('Task Removed!');
	}

	render() {
		return (
			<div id="resume">
				<div className="row">
					<div className="col-md-4 col-md-offset-2">
						<SectionTitle title="Tasks" />
						<div>
							<input type="text" id="add-task" placeholder="Add New Task"/>
							<button
								type="button"
								className="btn btn-primary margin-left"
								onClick={this.addTask}
							>
								+
							</button>
						</div>
						<ul className="list-unstyled">
							{
								this.state.tasks.map((task, index) => {
									return (
										<li className="margin-top margin-bottom" key={index}>
											<input type="checkbox" id="check-task1"/>
											<label
												htmlFor="check-task1"
												className="margin-left margin-right"
											>
												{task}
											</label>
											<span>
												<button
													type="button"
													className="btn btn-danger"
													onClick={this.removeTask}
												>
													x
												</button>
											</span>
										</li>
									);
								})
							}
						</ul>
					</div>
					<div className="col-md-4">
						<SectionTitle title="Completed" />
						<ul id="completed-tasks">

						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default ResumeLayout;
