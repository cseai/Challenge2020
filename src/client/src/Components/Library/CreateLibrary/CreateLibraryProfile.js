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
		<Redirect to={`/dept/${dept.username}/library`} />
	) : (
		<Main
			eduhub={
				<Fragment>
					{/* code start here */}
					<CreateProfileMain className={Styles.create__profile}>
						<h2 className={Styles.create__profile_title}>Create Library</h2>
						<form className={Styles.create__profile__form} onSubmit={(e) => onSubmit(e)}>
							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Hub Name</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faUniversity} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='text'
										className={Styles.create__profile__form_control_in_field}
										name='deptName'
										value={dept.name}
										// onChange={(e) => onChange(e)}
										required='required'
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Library Name</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faBookReader} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='text'
										className={Styles.create__profile__form_control_in_field}
										name='name'
										required='required'
										value={name}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Username</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faAt} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='text'
										className={Styles.create__profile__form_control_in_field}
										name='username'
										value={username}
										onChange={(e) => onChange(e)}
										required='required'
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Established at</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faCalendar} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='date'
										className={Styles.create__profile__form_control_in_field}
										name='since'
										value={since}
										onChange={(e) => onChange(e)}
										required='required'
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Address line 1</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faAddressCard} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='text'
										className={Styles.create__profile__form_control_in_field}
										name='addressOne'
										value={addressOne}
										onChange={(e) => onChange(e)}
										required='required'
									/>
								</div>
							</div>
							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Address line 2</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faAddressCard} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='text'
										className={Styles.create__profile__form_control_in_field}
										name='addressTwo'
										value={addressTwo}
										onChange={(e) => onChange(e)}
										required='required'
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control__two}>
								<div className={Styles.create__profile__form_control__two_country}>
									<label>Country</label>

									<CreateProfileSelect
										className={Styles.create__profile__form_control__two_country_bg_country}
										name='country'
										value={country}
										onChange={(e) => onChange(e)}
									>
										<option>Select</option>
										<option>Bangladesh</option>
										<option>India</option>
										<option>Srilanka</option>
										<option>Nepal</option>
									</CreateProfileSelect>
								</div>
								<div className={Styles.create__profile__form_control__two_zip_code}>
									<label>Zip Code</label>
									<CreateProfileFormControlInField
										type='number'
										name='zipCode'
										value={zipCode}
										onChange={(e) => onChange(e)}
										className={Styles.create__profile__form_control__two_zip_code_bg_zip_code}
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<label className={Styles.create__profile__form_control_title}>
									Tell Something About Library
								</label>
								<CreateProfileTextField
									name='messege'
									rows='7'
									name='shortDescription'
									value={shortDescription}
									onChange={(e) => onChange(e)}
								></CreateProfileTextField>
							</div>

							<div className={Styles.create__profile__form_btn}>
								<button type='submit' name='submit'>
									Submit
								</button>
							</div>
						</form>
					</CreateProfileMain>
					{/* code end here */}
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
