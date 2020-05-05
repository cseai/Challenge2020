import React, { Fragment, useState } from 'react';
import './Register.css';
import PropTypes from 'prop-types';
import LeftImage from './../img/undraw_true_friends_c94g.svg';
import AvaterImg from './../img/undraw_profile_pic_ic5t (1).svg';
import { register } from '../../actions/authAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Register = ({ register, auth: { isAuthenticated, loading, msg } }) => {
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
	if (isAuthenticated && !loading) {
		return <Redirect to='/home' />;
	}
	return (
		<Fragment>
			<div class='signin'>
				<div class='signin__company'>
					<div class='signin__company__name'>Edukos</div>
				</div>
				<div class='signin__main'>
					<div class='signin__main___left'>
						<img class='signin__main___left-img-pos' src={LeftImage} />
					</div>
					{/* <!-- 2nd part --> */}
					<div class='signin__main___right'>
						<div class='signin__main__right-notification'>
							<span>{msg} </span>
						</div>
						<div class='signin__main___right-avater'>
							<img src={AvaterImg} />
						</div>
						<div class='signin__main___right-signin'>
							<h1>Sign Up</h1>
						</div>
						<form class='signin__main___right-form' onSubmit={(e) => onsubmit(e)}>
							<div class='form'>
								<input
									type='text'
									name='username'
									autocomplete='off'
									required
									value={username}
									onChange={(e) => onchange(e)}
								/>
								<label for='username' class='label-name'>
									<span class='content-name'>user name</span>
								</label>
								{/*<div class='label-img'>
									{/* <img src={require('./../img/icomoon/SVG/mail-add.svg')} /> 
								</div>{' '}
								*/}
							</div>
							<div class='form'>
								<input
									type='text'
									name='email'
									autocomplete='off'
									required
									value={email}
									onChange={(e) => onchange(e)}
								/>
								<label for='email' class='label-name'>
									<span class='content-name'>email</span>
								</label>
								{/* <div class='label-img'>
									<svg class='svg-img'>
										<use xlink:href='./../img/icomoon/sprite.svg#icon-envelope'></use>
									</svg>
								</div> */}
							</div>
							<div class='form'>
								<input
									type='password'
									name='password'
									autocomplete='off'
									required
									value={password}
									onChange={(e) => onchange(e)}
								/>
								<label for='password' class='label-name'>
									<span class='content-name'>password</span>
								</label>
								{/* <div class='label-img'>
									<svg class='svg-img'>
										<use xlink:href='./../img/icomoon/sprite.svg#icon-key-fill'></use>
									</svg>
								</div> */}
							</div>
							<input type='submit' class='signin-btn' value='Sign Up' />
							<div class='height:20%'></div>
							<div class='create-link'>
								<a href='signup.html'>sign in</a>
							</div>
						</form>
						<div class='poweredby'>
							<span>Powered By</span>
							<h5>Pizzu</h5>
						</div>
						<img class='mobile-image' src='./../img/undraw_true_friends_c94g.svg' />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
