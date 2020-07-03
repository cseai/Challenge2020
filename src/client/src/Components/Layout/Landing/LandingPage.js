import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Style from './LandingPage.module.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from './../../theme/Spinner/Spinner';

const LandingPage = ({ auth: { isAuthenticated, loading } }) => {
	useEffect(() => {
		console.log('isAuthenticated and loading  ', isAuthenticated, loading);
	}, [isAuthenticated, loading]);
	if (loading === false && isAuthenticated === true) {
		return <Redirect to='/home' />;
	}

	return !isAuthenticated && loading ? (
		<Fragment>
			<div>
				<Spinner />
			</div>
		</Fragment>
	) : (
		<Fragment>
			<div className={Style.landing__page}> </div>
			<div className={Style.landing__page_box}>
				<Link to='/login'>
					<div className={Style.landing__page_box_signin}>Login </div>
				</Link>
				<Link to='/register'>
					<div className={Style.landing__page_box_signup}>Register</div>
				</Link>
			</div>
			<div className={Style.brandname}>
				<span>Powered By</span>
				<h1>Pizzu</h1>
			</div>
		</Fragment>
	);
};

LandingPage.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(LandingPage);
