import './styles/app.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Main route depencies
import Main from './containers/main';
import TaskListLayout from './components/taskList/taskListLayout';

class Handler extends React.Component {
	render() {
		return (
			<Router history={ browserHistory }>
				<Route path="/" component={ Main }>
					<IndexRoute component={ TaskListLayout }/>
				</Route>
				<Route path="*" onEnter={() => browserHistory.push('/')} />
			</Router>
		);
	}
};

ReactDOM.render(<Handler />, document.getElementById('app'));
