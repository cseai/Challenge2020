import React, { Fragment, useState, useEffect } from 'react';
import './GetLoginlight.css';
import readingimage from './../img/undraw_book_lover_mkck.svg';
import { login } from '../../actions/authAction';
import { setAlert } from './../../actions/alertAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { SignIn, SigninCompany, SigninCompanyName } from './LightContainer.js';
import Alert from './../Layout/Alert';

const LoginLight = ({ login, isAuthenticated }) => {
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
		// console.log(email, password);
	};

	if (isAuthenticated) {
		return <Redirect to='/home' />;
	}

	return (
		<Fragment>
			<SignIn>
				<SigninCompany>
					<SigninCompanyName>Edukos</SigninCompanyName>
				</SigninCompany>
				<div className='signin__main'>
					<div class='signin__main___left'>
						<img className='signin__main___left-img-pos' src={readingimage} />
					</div>
					{/* <!-- 2nd part --> */}
					<div className='signin__main___right'>
						{/* <div class='signin__main__right-notification'>
							<span>find other user name and login agin please</span>
						</div> */}
						<Alert />
						<div className='signin__main___right-avater'>
							<img src={require('./../img/undraw_profile_pic_ic5t (1).svg')} />
						</div>
						<div className='signin__main___right-signin'>
							<h1>Sign in</h1>
						</div>
						<form className='signin__main___right-form' onSubmit={(e) => onSubmit(e)}>
							{/* <!-- <div className="form-main"> --> */}
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
									{/* <svg className='svg-img'>
										<use xlinkHref={require('./../img/icomoon/sprite.svg#icon-key-fill')}></use>
									</svg> */}
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
									{/* <svg className='svg-img'>
										<use xlinkHref='./../img/icomoon/sprite.svg#icon-key-fill'></use>
									</svg> */}
								</div>
							</div>
							{/* <!-- </div> --> */}
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
						{/* <button onClick={() => changeTheme()}>theme</button> */}
						<img className='mobile-image' src='./../img/undraw_book_lover_mkck.svg' />
					</div>
				</div>
			</SignIn>
			{/* </ThemeProvider> */}
		</Fragment>
	);
};

LoginLight.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginLight);
