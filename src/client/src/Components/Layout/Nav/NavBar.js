import React, { Fragment } from 'react';
import Styles from './NavBar.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './../../../actions/authAction';

const NavBar = ({ logout, auth: { isAuthenticated, loading } }) => {
	const loginLink = (
		<ul className={Styles.nav__links}>
			<li>
				<Link to='/home'>Home</Link>
			</li>
			<li>
				<Link to='/eduhub/pust'>eduhub profile</Link>
			</li>
			<li>
				<Link to='/'>Dev</Link>
			</li>
			<li>
				<Link to='/'>follow</Link>
			</li>
			<li onClick={() => logout()}>
				<Link to='/'>logout</Link>
			</li>
		</ul>
	);
	const guestLink = (
		<ul className={Styles.nav__links}>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/login'>login</Link>
			</li>
		</ul>
	);
	return (
		<Fragment>
			<header className='container-fluid'>
				<div className={Styles.logo}>Edukos</div>
				<nav>{!loading && <Fragment>{isAuthenticated ? loginLink : guestLink} </Fragment>}</nav>
			</header>
		</Fragment>
	);
};

NavBar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
