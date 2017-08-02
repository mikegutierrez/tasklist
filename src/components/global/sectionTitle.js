import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class SectionTitle extends Component {
	static get propTypes() {
		return {
			title: PropTypes.string.isRequired,
			classes: PropTypes.array,
			count: PropTypes.number
		};
	}

	static get defaultProps() {
		return {
			title: '',
			classes: [],
			count: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			classes: nextProps.classes || this.props.classes
		});
	}

	render() {
		const { title, classes } = this.props;
		const classList = classes.join(' ');
		return (
			<div className={classnames('margin-bottom', 'margin-top',
				{ [classes]: classList }
			)}>
				<div className="h4 fw-400 text-uppercase text-center padding-bottom-s margin-top-0 margin-bottom-0">
					{title}
					<span className="task-count">{this.props.count}</span>
				</div>
				<div className="underline-s"></div>
			</div>
		);
	}
}

export default SectionTitle;
