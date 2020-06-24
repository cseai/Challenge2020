import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Style from './Register.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeChanger from './../theme/ThemeChanger/ThemeChanger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { SignIn } from './LightContainer.js';
import LeftImage from './../img/undraw_true_friends_c94g.svg';
import AvaterImg from './../img/undraw_profile_pic_ic5t (1).svg';
import { register } from '../../actions/authAction';

const Register = ({ register, auth: { isAuthenticated, loading, msg }, alerts }) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});
	const { username, email, password } = formData;
	const onchange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onsubmit = async (e) => {
		e.preventDefault();
		register({ username, email, password });
		console.log(username, password, email);
	};
	// tostify alert for error or success
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
	if (isAuthenticated && !loading) {
		return <Redirect to='/home' />;
	}
	return (
		<Fragment>
			<SignIn>
				<div className={Style.signin__company}>
					<div className={Style.signin__company__name}>Edukos</div>
				</div>
				<ThemeChanger />
				<div className={Style.signin__main}>
					<div className={Style.signin__main___left}>
						<img className={Style.signin__main___left_img_pos} src={LeftImage} alt='for good' />
					</div>
					{/* <!-- 2nd part --> */}
					<div className={Style.signin__main___right}>
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
						<div className={Style.signin__main___right_avater}>
							<img src={AvaterImg} alt='for good' />
						</div>
						<div className={Style.signin__main___right_signin}>
							<h1>Sign Up</h1>
						</div>
						<form className={Style.signin__main___right_form} onSubmit={(e) => onsubmit(e)}>
							<div className={Style.form}>
								<input
									type='text'
									name='username'
									value={username}
									onChange={(e) => onchange(e)}
									id='username'
									required
									autoComplete='off'
								/>
								<label for='username' className={Style.label_name}>
									<span className={Style.content_name}>user name</span>
								</label>
								<div className='label-img'>
									<FontAwesomeIcon icon={faUser} color='#4cbea6' size='2x' />
								</div>
							</div>
							<div className={Style.form}>
								<input
									type='text'
									name='email'
									autoComplete='off'
									required
									value={email}
									onChange={(e) => onchange(e)}
								/>
								<label for='email' className={Style.label_name}>
									<span className={Style.content_name}>email</span>
								</label>
								<div className='label-img'>
									<FontAwesomeIcon icon={faEnvelope} color='#4cbea6' size='2x' />
								</div>
							</div>
							<div className={Style.form}>
								<input
									type='password'
									name='password'
									autoComplete='new-password'
									required
									value={password}
									onChange={(e) => onchange(e)}
								/>
								<label for='password' className={Style.label_name}>
									<span className={Style.content_name}>password</span>
								</label>
								<div className='label-img'>
									<FontAwesomeIcon icon={faKey} color='#4cbea6' size='2x' />
								</div>
							</div>
							<input type='submit' className={Style.signin_btn} value='Sign Up' />
							<div className='height:20%'></div>
							<div className={Style.create_link}>
								<Link to='/login'>sign in</Link>
							</div>
						</form>
						<div className={Style.poweredby}>
							<span>Powered By</span>
							<h5>Pizzu</h5>
						</div>
						<img
							className={Style.mobile_image}
							src={require('./../img/undraw_true_friends_c94g.svg')}
							alt='for good'
						/>
					</div>
				</div>
			</SignIn>
		</Fragment>
	);
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	alerts: state.alert,
});

export default connect(mapStateToProps, { register })(Register);
