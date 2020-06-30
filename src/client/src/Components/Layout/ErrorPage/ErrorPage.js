import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './ErrorPage.module.css';
import ReactLoading from 'react-loading';
import { MainStyle } from './ErrorPageContainer';
import Spinner from '../../theme/Spinner/Spinner';
// components
import ThemeChanger from '../../theme/ThemeChanger/ThemeChanger';
import Nav from '../Nav/NavBar';
import LeftSideBar from '../Leftbar/LeftSideBar';
import RightSideBar from '../Rightbar/RightSideBar';

const ErrorPage = ({ auth: { loading, isAuthenticated } }) => {
	// redirected if user not authenticated
	if (isAuthenticated === false) {
		return <Redirect path='/' />;
	}
	//
	return loading ? (
		<Fragment>
			<Spinner />
		</Fragment>
	) : (
		<Fragment>
			<Nav />
			<ThemeChanger />
			<div className={Styles.main_div}>
				<div className={Styles.main__section}>
					<div className='container'>
						<div className={Styles.main__section_data}>
							<div className='row'>
								<div className='col-lg-3 col-xl-3 col-mid-2'>
									{/* <LeftSideBar /> */}
								</div>
								{/* <!-- mid --> */}
								<div className='col-lg-6 col-xl-6 col-mid-7 '>
									<div className={Styles.mid__part__data}>
										{/* Show Error Here */}
										<h3>Opps! Nothing found 404!</h3>
									</div>
								</div>
								{/* <!-- right --> */}
								<div className='col-lg-3 col-xl-3 col-mid-3 '>
									{/* <RightSideBar /> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

ErrorPage.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(ErrorPage);
