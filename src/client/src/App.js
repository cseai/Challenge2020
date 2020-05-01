import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import LoginLight from './Components/Layout/LoginLight';
import NewsBoard from './Components/NewsBoard/NewsBoard';
import Dash from './Components/NewsBoard/Dash';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Route exact path='/' component={Dash} />
					<section className=''>
						<Switch>
							<Route exact path='/login' component={LoginLight} />
							<Route exact path='/home' component={NewsBoard} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
