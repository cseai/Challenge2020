import React, { Fragment } from 'react';
import Styles from './NavBar.module.css';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
	const guestLink = (
		<ul className={Styles.nav__links}>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/'>Services</Link>
			</li>
			<li>
				<Link to='/'>Dev</Link>
			</li>
			<li>
				<Link to='/'>follow</Link>
			</li>
		</ul>
	);
	// const loginLink={

	// }
	return (
		<Fragment>
			<header className='container-fluid'>
				<div className={Styles.logo}>Edukos</div>
				<nav>{guestLink}</nav>
			</header>
		</Fragment>
	);
};

// NavBar.propTypes = {

// }

// const mapStateToProps=({

// })

export default connect()(NavBar);
