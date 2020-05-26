import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import NewsBoard from './Components/NewsBoard/NewsBoard';
import EduhubProfile from './Components/EduhubProfile/EduhubProfile'
import Dash from './Components/NewsBoard/Dash';
import LandingPage from './Components/Layout/Landing/LandingPage.js';
// form
import LoginLight from './Components/auth/LoginLight';
import Register from './Components/auth/Register';
import CreateUserProfile from './Components/Form/CreateProfile/CreateProfile';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Route exact path='/' component={LandingPage} />
					<section className=''>
						<Switch>
							<Route exact path='/home' component={NewsBoard} />
							<Route exact path='/eduhub-profile' component={EduhubProfile} />
							{/* form */}
							<Route exact path='/dash' component={Dash} />
							<Route exact path='/login' component={LoginLight} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/create-user-profile' component={CreateUserProfile} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
