import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalConatiner } from './Components/theme/GlobalContainer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from './store';
import { loadUser } from './actions/authAction';
// theme
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { themeMode } from './actions/configAction';
import lightTheme from './Components/theme/Light';
import darkTheme from './Components/theme/Dark';
// components
import NewsBoard from './Components/NewsBoard/NewsBoard';
import Test from './Components/test/Test';
// import EduhubProfile from './Components/EduhubProfile/EduhubProfile';
import Dept from './Components/Dept/DeptProfile';
import Dash from './Components/NewsBoard/Dash';
import LandingPage from './Components/Layout/Landing/LandingPage.js';
// form
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import CreateUserProfile from './Components/Form/CreateProfile/CreateProfile';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = ({ themeMode, darkMode }) => {
	useEffect(() => {
		themeMode(window.localStorage.getItem('theme'));
		// console.log('theme colors ' + darkMode);
	}, [themeMode, darkMode]);
	// load user
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<ThemeProvider theme={darkMode === 'light' ? lightTheme : darkTheme}>
			<GlobalStyle />
			<GlobalConatiner>
				<Router>
					<Fragment>
						<Route exact path='/' component={LandingPage} />
						<Switch>
							<Route exact path='/home' component={NewsBoard} />
							{/* <Route exact path='/eduhub/:eduhubName' component={EduhubProfile} /> */}
							{/* dept */}
							<Route exact path='/dept/:deptUsername' component={Dept} />
							{/* form */}
							<Route exact path='/dash' component={Dash} />
							{/* <SignIn> */}
							<Route exact path='/login' component={Login} />
							{/* </SignIn> */}
							<Route exact path='/register' component={Register} />
							<Route exact path='/create-user-profile' component={CreateUserProfile} />
							<Route exact path='/test/:deptId/:libId' component={Test} />
						</Switch>
					</Fragment>
				</Router>
			</GlobalConatiner>
		</ThemeProvider>
	);
};

App.propTypes = {
	themeMode: PropTypes.func.isRequired,
	// darkMode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	darkMode: state.config.darkMode,
});

const GlobalStyle = createGlobalStyle`
	body {
		background: ${(props) => props.theme.colors.background};
		color: ${({ theme }) => theme.colors.color};
		transition: all 0.25s linear;
}
`;

export default connect(mapStateToProps, { themeMode })(App);
