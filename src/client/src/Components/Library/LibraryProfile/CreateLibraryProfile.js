import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Styles from './CreateLibraryProfile.module.css';
import {
	CreateProfileMain,
	ProfileIcon,
	CreateProfileFormControlInField,
	CreateProfileTextField,
	CreateProfileSelect,
} from './CreateLibraryProfileContainer';
import Spinner from './../../theme/Spinner/Spin-0.8s-217px.svg';
import Main from '../../Layout/MainSection/Main';
//font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faBookReader, faCalendar, faAt, faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { getDept } from '../../../actions/deptAction';
import { createLibraryProfile } from '../../../actions/libraryAction';

const CreateLibraryProfile = ({
	getDept,
	createLibraryProfile,
	isAuthenticated,
	match: { params },
	dept: { loading, dept },
	history,
}) => {
	// Form Data
	const [formData, setFormData] = useState({
		name: '',
		username: '',
		since: '',
		addressOne: '',
		addressTwo: '',
		country: '',
		zipCode: '',
		shortDescription: '',
	});

	//eduhub loading before page show
	useEffect(() => {
		const deptUsername = params.deptUsername;
		getDept(deptUsername);
		console.log(params);
	}, [getDept, params.deptUsername]);


	const { name, username, since, country, addressOne, addressTwo, zipCode, shortDescription } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		const address = {
			country: formData.country,
			line1: formData.addressOne,
			line2: formData.addressTwo,
			zip: formData.zipCode,
		};

		const clearedFormData = {
			name: formData.name,
			username: formData.username,
			since: formData.since,
			shortDescription: formData.shortDescription,
			address,
		};

		createLibraryProfile(clearedFormData, dept.id);
		console.log(dept.id);
	};

	// If requested dept does not exist (dept===null) then redirect to 404 page
	// Now just redirect to home page
	if (dept === null && loading === false) {
		return <Redirect to='/error' />;
	}

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
	) : loading === false && dept !== null && dept.library ? (
		<Main
			eduhub={
				<Fragment>
					<div>
						<h1>{dept.name}</h1>
						<h2>Library Id: {dept.library}</h2>
					</div>
				</Fragment>
			}
		/>
	) : (
		<Main
			eduhub={
				<Fragment>
					<div>
						<h2>This Hub's has no library</h2>
						<p>If you want to create a library of this Hub, go to the following link</p>
						<Link to={`/dept/${dept.username}/create-library`}>link: CreateLibrary</Link>
					</div>
				</Fragment>
			}
		/>
	);
};

CreateLibraryProfile.propTypes = {
	createLibraryProfile: PropTypes.object.isRequired,
	getDept: PropTypes.func.isRequired,
	dept: PropTypes.array.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	dept: state.dept,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getDept, createLibraryProfile })(withRouter(CreateLibraryProfile));
