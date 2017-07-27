import './styles/app.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Main route depencies
import Main from './containers/Main';
import ResumeLayout from './components/resume/ResumeLayout';

class Handler extends React.Component {
	render() {
		return (
			<Router history={ browserHistory }>
				<Route path="/" component={ Main }>
					<IndexRoute component={ ResumeLayout }/>
				</Route>
				<Route path="*" onEnter={() => browserHistory.push('/')} />
			</Router>
		);
	}
};

ReactDOM.render(<Handler />, document.getElementById('app'));
