import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import './DeptProfile.module.css';
import Main from '../../Layout/MainSection/Main';
import {DeptProfile} from './DeptProfileContainer';
import Spinner from './../../theme/Spinner/Spin-0.8s-217px.svg';

// action
import { getDept } from '../../../actions/deptAction';

//*****Sanzid Ipmort *****/

import CoverPhoto from './SubComponents/Layout/CoverPhoto';

import ProfileInfo from './SubComponents/Layout/ProfileInfo';

import DeptMapProfile from './SubComponents/Layout/DeptMap';

import AboutUsProfile from './SubComponents/Layout/AboutUs';

import ContactProfile from './SubComponents/Layout/Contact';

import LocationProfile from './SubComponents/Layout/Location'

//*****Sanzid Ipmort *****/

const Dept = ({ getDept, isAuthenticated, match: { params }, dept: { loading, dept } }) => {
	
	
	

	//eduhub loading before page show
	useEffect(() => {
		const deptUsername = params.deptUsername;
		getDept(deptUsername);
		console.log(params);
	}, [getDept, params.deptUsername]);

	return loading && dept === null ? (
		<Main
			eduhub={
				<Fragment>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img src={Spinner} alt='loading...' />
					</div>
				</Fragment>
			}
		/>
	) : dept === null && loading === false ? (
		<Redirect to='/error' />
	) : (
		<Main
			eduhub={
				<Fragment>
					{/* <!-- start code for here --> */}
					<DeptProfile>
						{/* <!-- Cover photo --> */}
						<CoverPhoto />
						{/* <!-- user info --> */}
						<ProfileInfo dept ={dept}/>
					
						{/* map */}

						<DeptMapProfile dept= {dept}/>


						{/* <!-- About us section --> */}
						<AboutUsProfile dept = {dept}/>

						{/* <!-- Contacts Section --> */}
						
						<ContactProfile dept = {dept}/>

						{/*Location section*/}

						<LocationProfile dept = {dept}/>

						
					</DeptProfile>
				</Fragment>
			}
		/>
	);
};

Dept.propTypes = {
	getDept: PropTypes.func.isRequired,
	// dept: PropTypes.array.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	dept: state.dept,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getDept })(Dept);
