import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../helpers/autoBindMethods';

// Global components
import Footer from '../components/global/Footer';

class Main extends Component {
	static get propTypes() {
		return {
			children: PropTypes.object
		};
	}

	static get defaultProps() {
		return {
			children: {}
		};
	}

	constructor(props) {
		super(props);
		autoBindMethods(this);
	}

	render() {
		return (
			<div>
				<div className="container wrapper">
					{
						React.cloneElement(
							this.props.children,
							{ ...this.props }
						)
					}
				</div>
				<Footer />
			</div>
		);
	}
}

export default Main;
