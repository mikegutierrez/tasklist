import React, { Component, PropTypes } from 'react';
import { autoBindMethods } from '../helpers/autoBindMethods';

// Global components
import Header from '../components/global/Header';
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
				<Header />
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
