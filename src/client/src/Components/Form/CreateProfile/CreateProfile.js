import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Styles from './CreateProfile.module.css';
import {
	CreateProfileMain,
	ProfileIcon,
	CreateProfileFormControlInField,
	CreateProfileTextField,
	CreateProfileSelect,
} from './CreateProfileContainer';
import Main from './../../Layout/MainSection/Main';
//font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt, faPhoneAlt, faCalendar, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { createProfile } from './../../../actions/profileAction';

const CreateProfile = ({ createProfile, history }) => {
	// useEffect(()=>{

	// },[])

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		birthday: '',
		addressOne: '',
		addressTwo: '',
		country: '',
		zipCode: '',
		checkbox: 'checked',
		info: '',
	});

	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		birthday,
		country,
		addressOne,
		addressTwo,
		zipCode,
		checkbox,
		info,
	} = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData);
		// console.log(typeof formData);
	};

	return (
		<Main
			eduhub={
				<Fragment>
					{/* code start here */}
					<CreateProfileMain className={Styles.create__profile}>
						<h2 className={Styles.create__profile_title}>Profile informations</h2>
						<form className={Styles.create__profile__form} onSubmit={(e) => onSubmit(e)}>
							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>First Name</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faUser} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='text'
										className={Styles.create__profile__form_control_in_field}
										name='firstName'
										value={firstName}
										onChange={(e) => onChange(e)}
										required='required'
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Last Name</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faUser} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='text'
										className={Styles.create__profile__form_control_in_field}
										name='lastName'
										required='required'
										value={lastName}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Email Address</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faAt} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='email'
										className={Styles.create__profile__form_control_in_field}
										name='email'
										value={email}
										onChange={(e) => onChange(e)}
										required='required'
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Phone Number</label>
									<span className='required'> * </span>
								</div>
								<div className={Styles.create__profile__form_control_in}>
									<div className={Styles.create__profile__form_control_in_left}>
										<ProfileIcon>
											<FontAwesomeIcon icon={faPhoneAlt} />
										</ProfileIcon>
									</div>
									<CreateProfileFormControlInField
										type='number'
										className={Styles.create__profile__form_control_in_field}
										name='phoneNumber'
										value={phoneNumber}
										onChange={(e) => onChange(e)}
										required='required'
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Birthday</label>
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
										name='birthday'
										value={birthday}
										onChange={(e) => onChange(e)}
										required='required'
									/>
								</div>
							</div>

							<div className={Styles.create__profile__form_control}>
								<div className={Styles.create__profile__form_control_title}>
									<label>Present Address line 1</label>
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
									<label>Present Address line 2</label>
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
							<label className={Styles.create__profile__form_control_check_box}>
								uncheck this if your current and permanent city is not same
								<CreateProfileFormControlInField
									type='checkbox'
									name='checkbox'
									value={checkbox}
									checked={checkbox}
									onChange={(e) => onChange(e)}
								/>
								<span className={Styles.checkmark}></span>
							</label>

							<div className={Styles.create__profile__form_control}>
								<label className={Styles.create__profile__form_control_title}>
									Tell Something About you
								</label>
								<CreateProfileTextField
									name='messege'
									rows='7'
									name='info'
									value={info}
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

// CreateProfile.propTypes = {
// 	// createProfile: PropTypes.object.isRequired,
// };

export default connect(null, { createProfile })(withRouter(CreateProfile));
