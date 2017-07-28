import './styles/app.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Main route depencies
import Main from './containers/main';
import ListLayout from './components/taskList/listLayout';

class Handler extends React.Component {
	render() {
		return (
			<Router history={ browserHistory }>
				<Route path="/" component={ Main }>
					<IndexRoute component={ ListLayout }/>
				</Route>
				<Route path="*" onEnter={() => browserHistory.push('/')} />
			</Router>
		);
	}
};

ReactDOM.render(<Handler />, document.getElementById('app'));
