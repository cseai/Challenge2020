import React, { Fragment, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './GetLoginlight.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../Layout/Alert';
import { SignIn, SigninCompany, SigninCompanyName } from './LightContainer.js';
// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import readingimage from './../img/undraw_book_lover_mkck.svg';
import ThemeChanger from './../theme/ThemeChanger/ThemeChanger';

// redux
import { login } from '../../actions/authAction';
import { setAlert } from '../../actions/alertAction';
import PropTypes from 'prop-types';
// import Alert from '../Layout/Alert';

const LoginLight = ({ login, isAuthenticated, alerts }) => {
	// from
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const onchange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!password || !email) {
			setAlert(`email and password cant empty`, 'danger');
		}
		login(email, password);
	};
	// react toastify

	if (alerts !== null && alerts.length > 0) {
		alerts.map((alert) => {
			if (alert.alertType === 'danger' && alerts.length < 2) {
				toast.error(alert.msg, {
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		});
	}
	//redirected if user authenticated
	if (isAuthenticated === true) {
		return <Redirect to='/home' />;
	}
	// theme provider

	return (
		<Fragment>
			<SignIn>
				<SigninCompany>
					<SigninCompanyName>Edukos</SigninCompanyName>
				</SigninCompany>
				<ThemeChanger />

				<div className='signin__main'>
					<div class='signin__main___left'>
						<img className='signin__main___left-img-pos' src={readingimage} alt='for good' />
					</div>
					{/* <!-- 2nd part --> */}
					<div className='signin__main___right'>
						{/* <Alert /> */}
						<ToastContainer
							position='top-right'
							autoClose={2500}
							hideProgressBar={false}
							newestOnTop
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							style={{
								fontSize: '16px',
								color: '#35393b',
							}}
						/>
						<div className='signin__main___right-avater'>
							<img src={require('./../img/undraw_profile_pic_ic5t (1).svg')} alt='for good' />
						</div>
						<div className='signin__main___right-signin'>
							<h1>Sign in</h1>
						</div>
						<form className='signin__main___right-form' onSubmit={(e) => onSubmit(e)}>
							<div className='form'>
								<input
									type='text'
									name='email'
									autocomplete='off'
									required
									value={email}
									onChange={(e) => onchange(e)}
								/>
								<label for='email' className='label-name'>
									<span className='content-name'>email</span>
								</label>
								<div className='label-img'>
									<FontAwesomeIcon icon={faEnvelope} color='#4cbea6' size='2x' />
								</div>
							</div>
							<div className='form'>
								<input
									type='password'
									name='password'
									required
									value={password}
									onChange={(e) => onchange(e)}
								/>
								<label for='password' className='label-name'>
									<span className='content-name'>password</span>
								</label>
								<div className='label-img'>
									<FontAwesomeIcon icon={faKey} size='2x' color='#4cbea6' />
								</div>
							</div>
							<input type='submit' className='signin-btn' value='Sign in' />
							<div className='height:20%'></div>
							<div className='create-link'>
								<Link to='/register'>create an account</Link>
							</div>
						</form>
						<div className='poweredby'>
							<span>Powered By</span>
							<h5>Pizzu</h5>
						</div>
						<img
							className='mobile-image'
							src={require('./../img/undraw_book_lover_mkck.svg')}
							alt='for good'
						/>
					</div>
				</div>
			</SignIn>
		</Fragment>
	);
};

LoginLight.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	alerts: state.alert,
});

export default connect(mapStateToProps, { login })(LoginLight);
