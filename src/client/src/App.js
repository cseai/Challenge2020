import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
import './App.css';
import { GlobalConatiner } from './Components/theme/GlobalContainer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// theme
import { SignIn } from './Components/auth/LightContainer';

import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { themeMode } from './actions/configAction';
import lightTheme from './Components/theme/Light';
import darkTheme from './Components/theme/Dark';
import NewsBoard from './Components/NewsBoard/NewsBoard';
import EduhubProfile from './Components/EduhubProfile/EduhubProfile';
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
		console.log('theme colors ' + darkMode);
	}, [themeMode, darkMode]);

	return (
		<ThemeProvider theme={darkMode === 'light' ? lightTheme : darkTheme}>
			<GlobalStyle />
			<Router>
				<Fragment>
					<Route exact path='/' component={LandingPage} />
					<GlobalConatiner>
						<Switch>
							<Route exact path='/home' component={NewsBoard} />
							<Route exact path='/eduhub-profile' component={EduhubProfile} />
							{/* form */}
							<Route exact path='/dash' component={Dash} />
							{/* <SignIn> */}
							<Route exact path='/login' component={Login} />
							{/* </SignIn> */}
							<Route exact path='/register' component={Register} />
							<Route exact path='/create-user-profile' component={CreateUserProfile} />
						</Switch>
					</GlobalConatiner>
				</Fragment>
			</Router>
		</ThemeProvider>
	);
};

App.propTypes = {
	themeMode: PropTypes.func.isRequired,
	darkMode: PropTypes.string.isRequired,
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
