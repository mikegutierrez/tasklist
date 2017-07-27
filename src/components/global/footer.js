import React, { Component } from 'react';
import moment from 'moment';

class Footer extends Component {
	render() {
		const currentYear = moment().format('YYYY');
		return (
			<footer id="footer" className="bg-white box-shadow-light">
				<div className="small text-center vertically-center">
					&copy; Copyright { currentYear } Mike Gutierrez. <span className="mobile-break">All rights reserved.</span>
				<br className="hidden-xs-mobile"/>
					View the code for this website on <a href="https://github.com/mikegutierrez/tasklist" target="_blank">Github</a>.
				</div>
			</footer>
		);
	}
}

export default Footer;
