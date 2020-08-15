import React, { Fragment, useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './DeptSettings.module.css';
import './DeptSettings.module.css';
import Main from '../../Layout/MainSection/Main';
import Moment from 'react-moment';
import {
	DeptProfile,
	DeptProfileInfo,
	DeptProfileInfoContentSide,
	DeptProfileInfoContentIcon,
	DeptProfileAbout,
	DeptMap,

	CreateProfileMain,
	ProfileIcon,
	CreateProfileFormControlInField,
	CreateProfileTextField,
	CreateProfileSelect,
} from './DeptSettingsContainer';
import Spinner from './../../theme/Spinner/Spin-0.8s-217px.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUniversity,
	faCheck,
	faCamera,
	faCalendar,
	faStar,
	faStarHalfAlt,
	faUserFriends,
	faPhoneAlt,
	faKeyboard,
	faAlignLeft,
	faMobileAlt,
	faEnvelope,
	faAt,
	faLocationArrow,
	faCity,

	faPlus,
	faCheckCircle,
	faTimesCircle,
	faTrash,
	


	faUser,

} from '@fortawesome/free-solid-svg-icons';

// action
import { getDept } from '../../../actions/deptAction';



//Sanzid Editing start...


//Importing Dummy Data
import DummyContactsData from'./SubComponents/DummyData/DummyContactsData';
//Importing Cover Photo
import CoverPhoto from './SubComponents/Layout/CoverPhoto';
//Importing Onchange Handelers.
import {onChangeNewContactPhoneData,onChangeNewContactMobileData,onChangeNewContactEmailData} from './SubComponents/Settings/OnChange/onchangeHandeler';
//Importing Create Contact
import {createContactPhoneField,createContactPhoneFieldAdd,createContactMobileField,createContactMobileFieldAdd,createContactEmailField,createContactEmailFieldAdd} from './SubComponents/Settings/CreateContact/createContactAdd';
//Importing Onchange Input
import {onChangeDetailInput,onChangeContactInput} from './SubComponents/Settings/OnChange/onChangeInput'
//Importing Contact cancel or delet contact
import {onClickContactDelete,createContactPhoneFieldCancel,createContactMobileFieldCancel,createContactEmailFieldCancel} from './SubComponents/Settings/CreateContact/createContactCancel'

//Importing onSectionChange
import {onSectionChange} from './SubComponents/Settings/OnChange/onSectionChange'
/*
import {

	info,
	setInfo,
	contact, 
	setContact,
	location, 
	setLocation,
	deptMap, 
	setDeptMap,
	detailSection, 
	setDetailSection,
	memberSection, 
	setMemberSection,
	controllerSection, 
	setControllerSection,
	createSection, 
	setCreateSection,
	detailSectionEditOption, 
	setDetailSectionEditOption,
	detailSectionButtonValue, 
	setDetailSectionButtonValue,
	contactPhoneAdd, 
	setContactPhoneAdd,
	contactMobileAdd, 
	setContactMobileAdd,
	contactEmailAdd, 
	setContactEmailAdd,
	formData,
	setFormData ,
	newContactPhoneData, 
	setNewContactPhoneData,
	newContactMobileData, 
	setNewContactMobileData,
	newContactEmailData, 
	setNewContactEmailData
} from './Components/InitialData'
*/




//Sanzid Editing End...

const DeptSettings = ({ getDept, isAuthenticated, match: { params }, dept: { loading, dept } }) => {
	
	const [info, setInfo] = useState(false);
	const [contact, setContact] = useState(false);
	const [location, setLocation] = useState(false);
    const [deptMap, setDeptMap] = useState(false);
    const [detailSection, setDetailSection] = useState(true);
    const [memberSection, setMemberSection] = useState(false);
    const [controllerSection, setControllerSection] = useState(false);
	const [createSection, setCreateSection] = useState(false);
	
	const [detailSectionEditOption, setDetailSectionEditOption] = useState(false);
	const [detailSectionButtonValue, setDetailSectionButtonValue] = useState('Edit');

	const [contactPhoneAdd, setContactPhoneAdd] = useState(false);
	const [contactMobileAdd, setContactMobileAdd] = useState(false);
	const [contactEmailAdd, setContactEmailAdd] = useState(false);

	
	const [formData, setFormData] = useState({
		name: '',
		username: '',
		since: '',
		shortDescription: '',
		contacts: []
	});

	const [newContactPhoneData, setNewContactPhoneData] = useState({
		number: '',
		description: '',
		active: true
	});
	const [newContactMobileData, setNewContactMobileData] = useState({
		number: '',
		description: '',
		active: true
	});
	const [newContactEmailData, setNewContactEmailData] = useState({
		number: '',
		description: '',
		active: true
	});

	const {
		name,
		username,
		since,
		shortDescription,
		contacts,
	} = formData;

	// dummy contacts data
	const [contactsData, setContactsData] = useState(DummyContactsData);

	const onSubmitDetailSection = (e) => {
		e.preventDefault();
		// updateDept(formData);
		// console.log(typeof formData);
	};


	//eduhub loading before page show
	useEffect(() => {
		const deptUsername = params.deptUsername;
		getDept(deptUsername);
		console.log(params);
	}, [getDept, params.deptUsername]);
	
	// Handle Detail Section Mode [View or Edit]
	const detailSectionButtonClick = (e) => {
		if(detailSectionEditOption){
			// Change to View Mode
			setDetailSectionEditOption(false)
			setDetailSectionButtonValue('Edit');
		}else{
			// Change to Edit Mode
			setDetailSectionEditOption(true)
			setDetailSectionButtonValue('View');
			setFormData({...formData, name: dept.name, username: dept.username, since: dept.since, shortDescription: dept.shortDescription})
		}
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
	) : (dept === null && loading === false) ? (<Redirect to='/error' />) : 
	(<Main
			eduhub={
				<Fragment>
					{/* <!-- start code for here --> */}
					<DeptProfile>
						{/* <!-- Cover photo --> */}
						<CoverPhoto />
					</DeptProfile>
                    <DeptProfile>
                        <div className={Styles.settings__container}>
							<div className={Styles.hub__name__section}>
								<h2>{dept.name}</h2>
							</div>
                            <div className={Styles.tab__section}>
                                <div className={Styles.tab_section_inner_div}>
									<button className={Styles.tab__section__button} value='detail' onClick={ (e) => onSectionChange(e,setDetailSection,setMemberSection,setControllerSection,setCreateSection) }>Details</button>
                                </div>
                                <div className={Styles.tab_section_inner_div}>
                                    <button className={Styles.tab__section__button} value='member' onClick={ (e) => onSectionChange(e,setDetailSection,setMemberSection,setControllerSection,setCreateSection) }>Members</button>
                                </div>
                                <div className={Styles.tab_section_inner_div}>
                                    <button className={Styles.tab__section__button} value='controller' onClick={ (e) => onSectionChange(e,setDetailSection,setMemberSection,setControllerSection,setCreateSection) }>Controllers</button>
                                </div>
                                <div className={Styles.tab_section_inner_div}>
                                    <button className={Styles.tab__section__button} value='create' onClick={ (e) => onSectionChange(e,setDetailSection,setMemberSection,setControllerSection,setCreateSection) }>Create</button>
                                </div>
                            </div>
							{/* Detail Section */}
                            {detailSection && (
								<Fragment>
									<div className={Styles.detail__option__button__section}>
										<button className='' onClick={(e) => detailSectionButtonClick(e)}>{detailSectionButtonValue}</button>
									</div>
									{detailSectionEditOption ? (
										// Edit Mode 
										// {/* code start here */}
										<div className={Styles.update__hub__container}>
											<form className={Styles.update__hub__form} onSubmit={(e) => onSubmitDetailSection(e)}>
												{/* Name  */}
												<div className={Styles.update__hub__form_control}>
													<div className={Styles.update__hub__form_control_title}>
														<label>Name</label>
														<span className={Styles.required}> * </span>
													</div>
													<div className={Styles.update__hub__form_control_in}>
														<div className={Styles.update__hub__form_control_in_left}>
															<ProfileIcon>
																<FontAwesomeIcon icon={faUniversity} />
															</ProfileIcon>
														</div>
														<CreateProfileFormControlInField
															type='text'
															className={Styles.update__hub__form_control_in_field}
															name='name'
															value={name}
															onChange={(e) => onChangeDetailInput(e,formData,setFormData)}
														/>
													</div>
												</div>
												{/* Username  */}
												<div className={Styles.update__hub__form_control}>
													<div className={Styles.update__hub__form_control_title}>
														<label>Username</label>
														<span className={Styles.required}> * </span>
													</div>
													<div className={Styles.update__hub__form_control_in}>
														<div className={Styles.update__hub__form_control_in_left}>
															<ProfileIcon>
																<FontAwesomeIcon icon={faAt} />
															</ProfileIcon>
														</div>
														<CreateProfileFormControlInField
															type='text'
															className={Styles.update__hub__form_control_in_field}
															name='username'
															value={username}
															onChange={(e) => onChangeDetailInput(e,formData,setFormData)}
														/>
													</div>
												</div>
												{/* Established Date  */}
												<div className={Styles.update__hub__form_control}>
													<div className={Styles.update__hub__form_control_title}>
														<label>Established</label>
														{/* <span className='required'> * </span> */}
													</div>
													<div className={Styles.update__hub__form_control_in}>
														<div className={Styles.update__hub__form_control_in_left}>
															<ProfileIcon>
																<FontAwesomeIcon icon={faCalendar} />
															</ProfileIcon>
														</div>
														<CreateProfileFormControlInField
															type='date'
															className={Styles.update__hub__form_control_in_field}
															name='since'
															value={since}
															onChange={(e) => onChangeDetailInput(e,formData,setFormData)}
														/>
													</div>
												</div>
												{/* About  */}
												<div className={Styles.update__hub__form_control}>
													<div className={Styles.update__hub__form_control_title}>
														<label>Tell Something About This Hub</label>
													</div>
													<div>
														<CreateProfileTextField
															rows='7'
															name='shortDescription'
															value={shortDescription}
															onChange={(e) => onChangeDetailInput(e,formData,setFormData)}
														></CreateProfileTextField>
													</div>
												</div>
												{/* Contact */}
												<div className={Styles.update__hub__form_control}>
													<div className={Styles.update__hub__form_control_title}>
														<label>Contacts</label>
														{/* <span className='required'> * </span> */}
													</div>
													<div className={Styles.update__hub__contact}>
														<div id="contactPhoneDiv" className={Styles.update__hub__contact__method__div}>
															<div className={Styles.update__hub__contact_inner_heading}>
																<p>
																	<span>
																		<i>
																			<FontAwesomeIcon icon={faPhoneAlt} />
																		</i>
																	</span>{' '}
																	Phone
																	{/* {dept.contacts[0].method} */}
																</p>
																<span>
																	<i>
																		<FontAwesomeIcon onClick={e => createContactPhoneField(e,setContactPhoneAdd)} icon={faPlus} />
																	</i>
																</span>
															</div>
															{contactPhoneAdd && (
																<div className={Styles.update__hub__contact_list}>
																	<ul>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faKeyboard} />
																			</i>
																			<span>
																				<input
																					type='text'
																					name="number"
																					required
																					value={newContactPhoneData.number}
																					onChange={(e) => onChangeNewContactPhoneData(e,newContactPhoneData,setNewContactPhoneData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faAlignLeft} />
																			</i>
																			<span>
																				<textarea 
																					type='text'
																					name="description"
																					value={newContactPhoneData.description}
																					onChange={(e) => onChangeNewContactPhoneData(e,newContactPhoneData,setNewContactPhoneData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faCheckCircle} />
																			</i>
																			<span>
																				<select
																					name="active"
																					onChange={(e) => onChangeNewContactPhoneData(e,newContactPhoneData,setNewContactPhoneData)}
																				>
																					{newContactPhoneData.active ? (
																						<Fragment>
																							<option value={true} selected >Active</option>
																							<option value={false}>Deactive</option>
																						</Fragment>
																					):(
																						<Fragment>
																							<option value={true}>Active</option>
																							<option value={false} selected >Deactive</option>
																						</Fragment>
																					)}
																				</select>
																				<button className='btn-success' onClick={e => createContactPhoneFieldAdd(e,newContactPhoneData,setNewContactPhoneData,contactsData, setContactsData,setContactPhoneAdd)}>Add</button>
																				<button className='btn-warning' onClick={e => createContactPhoneFieldCancel(e,setContactPhoneAdd,setNewContactPhoneData)}>Cancel</button>
																			</span>
																		</li>
																	</ul>
																</div>
															)}
															{Object.entries(contactsData[0].numbers).map(([key,number]) => (
																<div className={Styles.update__hub__contact_list}>
																	<ul>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faKeyboard} />
																			</i>
																			<span>
																				<input
																					type='text'
																					name="number"
																					value={number.number}
																					// value="1784394509"
																					onChange={(e, method='phone', number_index=key) => onChangeContactInput(e, method, number_index,contactsData, setContactsData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faAlignLeft} />
																			</i>
																			<span>
																				<textarea 
																					type='text'
																					name="description"
																					value={number.description}
																					// value="Register ofice, Pabna University of Science and Technology"
																					onChange={(e, method='phone', number_index=key) => onChangeContactInput(e, method, number_index,contactsData, setContactsData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				{number.active ? (
																				<FontAwesomeIcon icon={faCheckCircle} />
																				):(
																					<FontAwesomeIcon icon={faTimesCircle} />
																				)}
																			</i>
																			<span>
																				<select
																					name="active"
																					value={number.active}
																					onChange={(e, method='phone', number_index=key) => onChangeContactInput(e, method, number_index,contactsData, setContactsData)}
																				>
																					<option value={true}>Active</option>
																					<option value={false}>Deactive</option>
																				</select>
																				<i>
																					<FontAwesomeIcon icon={faTrash} onClick={(e, method='phone', number_index=key) => onClickContactDelete(e, method, number_index,contactsData, setContactsData)} />
																				</i>
																			</span>
																		</li>
																	</ul>
																</div>)
															)}
														</div>
														<div className={Styles.update__hub__contact__method__div}>
															<div className={Styles.update__hub__contact_inner_heading}>
																<p>
																	<span>
																		<i>
																			<FontAwesomeIcon icon={faMobileAlt} />
																		</i>
																	</span>
																	Mobile
																	{/* {dept.contacts[1].method} */}
																</p>
																<span>
																	<i>
																		<FontAwesomeIcon onClick={e => createContactMobileField(e,setContactMobileAdd)} icon={faPlus} />
																	</i>
																</span>
															</div>
															{contactMobileAdd && (
																<div className={Styles.update__hub__contact_list}>
																	<ul>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faKeyboard} />
																			</i>
																			<span>
																				<input
																					type='text'
																					name="number"
																					required
																					value={newContactMobileData.number}
																					onChange={(e) => onChangeNewContactMobileData(e,newContactMobileData,setNewContactMobileData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faAlignLeft} />
																			</i>
																			<span>
																				<textarea 
																					type='text'
																					name="description"
																					value={newContactMobileData.description}
																					onChange={(e) => onChangeNewContactMobileData(e,newContactMobileData,setNewContactMobileData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faCheckCircle} />
																			</i>
																			<span>
																			<select
																					name="active"
																					onChange={(e) => onChangeNewContactMobileData(e,newContactMobileData,setNewContactMobileData)}
																				>
																					{newContactMobileData.active ? (
																						<Fragment>
																							<option value={true} selected >Active</option>
																							<option value={false}>Deactive</option>
																						</Fragment>
																					):(
																						<Fragment>
																							<option value={true}>Active</option>
																							<option value={false} selected >Deactive</option>
																						</Fragment>
																					)}
																				</select>
																				<button className='btn-success' onClick={e => createContactMobileFieldAdd(e,newContactMobileData,setNewContactMobileData,contactsData, setContactsData,setContactMobileAdd)}>Add</button>
																				<button className='btn-warning' onClick={e => createContactMobileFieldCancel(e,setContactMobileAdd)}>Cancel</button>
																			</span>
																		</li>
																	</ul>
																</div>
															)}
															{Object.entries(contactsData[1].numbers).map(([key,number]) => (
																<div className={Styles.update__hub__contact_list}>
																	<ul>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faKeyboard} />
																			</i>
																			<span>
																				<input
																					type='text'
																					name="number"
																					value={number.number}
																					// value="01745678913"
																					onChange={(e, method='mobile', number_index=key) => onChangeContactInput(e, method, number_index,contactsData, setContactsData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faAlignLeft} />
																			</i>
																			<span>
																				<textarea 
																					type='text'
																					name="description"
																					value={number.description}
																					// value="Register ofice, Pabna University of Science and Technology"
																					onChange={(e, method='mobile', number_index=key) => onChangeContactInput(e, method, number_index,contactsData, setContactsData)}
																				/>
																			</span>{' '}
																		</li>
																		<li>
																			<i>
																				{number.active ? (
																				<FontAwesomeIcon icon={faCheckCircle} />
																				):(
																					<FontAwesomeIcon icon={faTimesCircle} />
																				)}
																			</i>
																			<span>
																				<select
																					name='active'
																					value={number.active}
																					onChange={(e, method='mobile', number_index=key) => onChangeContactInput(e, method, number_index,contactsData, setContactsData)}
																				>
																					<option value={true}>Active</option>
																					<option value={false}>Deactive</option>
																				</select>
																				<i>
																					<FontAwesomeIcon icon={faTrash} onClick={(e, method='mobile', number_index=key) => onClickContactDelete(e, method, number_index,contactsData, setContactsData)} />
																				</i>
																			</span>
																		</li>
																	</ul>
																</div>)
															)}
														</div>
														<div className={Styles.update__hub__contact__method__div}>
															<div className={Styles.update__hub__contact_inner_heading}>
																<p>
																	<span>
																		<i>
																			<FontAwesomeIcon icon={faEnvelope} />
																		</i>
																	</span>{' '}
																	Email
																	{/* {dept.contacts[2].method} */}
																</p>
																<span>
																	<i>
																		<FontAwesomeIcon onClick={e => createContactEmailField(e,setContactEmailAdd)} icon={faPlus} />
																	</i>
																</span>
															</div>
															{contactEmailAdd && (
																<div className={Styles.update__hub__contact_list}>
																	<ul>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faAt} />
																			</i>{' '}
																			<span>
																				<input
																					type='text'
																					name="number"
																					required
																					value={newContactEmailData.number}
																					onChange={(e) => onChangeNewContactEmailData(e,newContactEmailData, setNewContactEmailData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faAlignLeft} />
																			</i>
																			<span>
																				<textarea 
																					type='text'
																					name="description"
																					value={newContactEmailData.description}
																					onChange={(e) => onChangeNewContactEmailData(e,newContactEmailData, setNewContactEmailData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faCheckCircle} />
																			</i>
																			<span>
																				<select
																					name="active"
																					onChange={(e) => onChangeNewContactEmailData(e,newContactEmailData, setNewContactEmailData)}
																				>
																					{newContactEmailData.active ? (
																						<Fragment>
																							<option value={true} selected >Active</option>
																							<option value={false}>Deactive</option>
																						</Fragment>
																					):(
																						<Fragment>
																							<option value={true}>Active</option>
																							<option value={false} selected >Deactive</option>
																						</Fragment>
																					)}
																				</select>
																				<button className='btn-success' onClick={e => createContactEmailFieldAdd(e,newContactEmailData, setNewContactEmailData,contactsData, setContactsData,setContactEmailAdd)}>Add</button>
																				<button className='btn-warning' onClick={e => createContactEmailFieldCancel(e,setContactEmailAdd)}>Cancel</button>
																			</span>
																		</li>
																	</ul>
																</div>
															)}
															{Object.entries(contactsData[2].numbers).map(([key,number]) => (
																<div className={Styles.update__hub__contact_list}>
																	<ul>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faAt} />
																			</i>{' '}
																			<span>
																				<input
																					type='text'
																					name="number"
																					value={number.number}
																					// value="register@pust.ac.bd"
																					onChange={(e, method='email', number_index=key) => onChangeContactInput(e, method, number_index,contactsData, setContactsData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				<FontAwesomeIcon icon={faAlignLeft} />
																			</i>
																			<span>
																				<textarea 
																					type='text'
																					name="description"
																					value={number.description}
																					// value="Register ofice, Pabna University of Science and Technology"
																					onChange={(e, method='email', number_index=key) => onChangeContactInput(e, method, number_index,contactsData, setContactsData)}
																				/>
																			</span>
																		</li>
																		<li>
																			<i>
																				{number.active ? (
																				<FontAwesomeIcon icon={faCheckCircle} />
																				):(
																					<FontAwesomeIcon icon={faTimesCircle} />
																				)}
																			</i>
																			<span>
																				<select
																					name='active'
																					value={number.active}
																					onChange={(e, method='email', number_index=key) => onChangeContactInput(e, method, number_index,contactsData, setContactsData)}
																				>
																					<option value={true}>Active</option>
																					<option value={false}>Deactive</option>
																				</select>
																				<i>
																					<FontAwesomeIcon icon={faTrash} onClick={(e, method='email', number_index=key) => onClickContactDelete(e, method, number_index,contactsData, setContactsData)} />
																				</i>
																			</span>
																		</li>
																	</ul>
																</div>)
															)}
														</div>
													</div>
												</div>
												{/* Address */}
												<div className={Styles.update__hub__form_control}>
													<div className={Styles.update__hub__form_control_title}>
														<i><FontAwesomeIcon icon={faLocationArrow} /></i>
														<label>Address</label>
														{/* <span className={Styles.required}> * </span> */}
													</div>
													<div>
														<DeptProfileAbout
															className={Styles.update__hub__contact}
															style={{ border: 'none' }}
														>
															<ul>
																<li>
																	<i>
																		<FontAwesomeIcon icon={faCity} />
																	</i>{' '}
																	<span> Rajapur ,6600, Pabna</span>
																</li>
															</ul>
														</DeptProfileAbout>
														<DeptProfileInfoContentIcon className={Styles.update__hub__location_map}>
															<p>Use map</p>
														</DeptProfileInfoContentIcon>
													</div>
												</div>
												<div className={Styles.update__hub__form_btn}>
													<button type='submit' name='submit'>
														Save
													</button>
												</div>
											</form>
										</div>
										// {/* code end here */}

									) : (
										// View Mode 
										<Fragment>
											{ /* user info */}
											<DeptProfileInfo>
											<div className={Styles.eduHub__profile__info_content}>
												<DeptProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
													<DeptProfileInfoContentSide className={Styles.eduHub__profile__info_content_side}>
														{/* <div className={Styles.eduHub__profile__info_content_side}></div> */}
													</DeptProfileInfoContentSide>
													<i>
														<FontAwesomeIcon icon={faUniversity} />
													</i>
												</DeptProfileInfoContentIcon>
												<div className={Styles.text}>
													<p>{dept.category ? dept.category.charAt(0).toUpperCase() + dept.category.slice(1) : `Undefined`}</p>
												</div>
											</div>

											<div className={Styles.eduHub__profile__info_content}>
												<DeptProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
													<DeptProfileInfoContentSide
														className={Styles.eduHub__profile__info_content_side}
													></DeptProfileInfoContentSide>
													<i>
														<FontAwesomeIcon icon={faCheck} />
													</i>
												</DeptProfileInfoContentIcon>
												<div className={Styles.text}>
													<p>{dept.name ? dept.name.charAt(0).toUpperCase() + dept.name.slice(1) : `Unknown!`}</p>
												</div>
											</div>

											<div className={Styles.eduHub__profile__info_content}>
												<DeptProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
													<div className={Styles.eduHub__profile__info_content_side}></div>
													<i>
														<FontAwesomeIcon icon={faCalendar} />
													</i>
												</DeptProfileInfoContentIcon>

												<div className={Styles.text}>
													<div className={Styles.eduHub__profile__info_content_side}></div>
													<p>
														Established at {dept.since ? (<Moment format='YYYY'> {dept.since} </Moment>) : `Unknown!`}{' '}
														{/* <span>
															<i>
																<FontAwesomeIcon icon={faStar} />
															</i>{' '}
															<i>
																<FontAwesomeIcon icon={faStar} />
															</i>{' '}
															<i>
																<FontAwesomeIcon icon={faStar} />
															</i>{' '}
															<i>
																<FontAwesomeIcon icon={faStar} />
															</i>{' '}
															<i>
																<FontAwesomeIcon icon={faStarHalfAlt} />
															</i>{' '}
														</span> */}
													</p>
												</div>
											</div>

											<div className={Styles.eduHub__profile__info_content}>
												<DeptProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
													<div className={Styles.eduHub__profile__info_content_side}></div>
													<i>
														<FontAwesomeIcon icon={faUserFriends} />
													</i>
												</DeptProfileInfoContentIcon>
												<div className={Styles.text}>
													<p>25.2k Members</p>
												</div>
											</div>
										</DeptProfileInfo>
										{/* map */}
										<DeptProfileAbout className={Styles.eduHub__profile__about}>
											<DeptProfileInfoContentIcon
												className={Styles.eduHub__profile__about_heading}
												style={{ width: '155px' }}
												onClick={() => setDeptMap(!deptMap)}
											>
												<div className={Styles.eduHub__profile__info_content_side}></div>
												<p>Dept Map</p>
											</DeptProfileInfoContentIcon>
											{deptMap && (
												<Fragment>
													{/* EduHub and Parent*/}
													{(dept.eduHub === null && dept.parent === null) ? (
														// This is EduHub
														<Fragment>
															<div className={Styles.eduHub__profile__about_about_details}>
															<div><p>Showing map from EduHub</p></div>
															</div>
														</Fragment>
													):(
														<Fragment>
															{/* <div className={Styles.eduHub__profile__about_about_details}><h3>Super Departments:</h3></div> */}
															<div className={Styles.eduHub__profile__about_about_details}>
															<div><p>EduHub:</p></div>
															<Link to={`/dept/${dept.eduHub.username}`}>
																<DeptProfileInfoContentIcon
																	key={dept.eduHub.username}
																	className={Styles.eduHub__profile__eduhubmap}
																>
																	<DeptMap className={Styles.eduHub__profile__eduhubmap_p}>
																		{dept.eduHub.name}
																	</DeptMap>
																</DeptProfileInfoContentIcon>
															</Link>
															<div><p>Parent Department:</p></div>
															<Link to={`/dept/${dept.parent.username}`}>
																<DeptProfileInfoContentIcon
																	key={dept.parent.username}
																	className={Styles.eduHub__profile__eduhubmap}
																>
																	<DeptMap className={Styles.eduHub__profile__eduhubmap_p}>
																		{dept.parent.name}
																	</DeptMap>
																</DeptProfileInfoContentIcon>
															</Link>
															</div>
														</Fragment>
													)}
						
													{/* Children */}
													{dept.children.length < 1 ? (
														<Fragment>
															<div
																style={{
																	display: 'flex',
																	justifyContent: 'center',
																}}
															>
																<img
																	src={Spinner}
																	alt='sub dept loading'
																	style={{ height: '40px', width: '40px' }}
																/>
															</div>
														</Fragment>
													) : (
														<Fragment>
															{/* <div className={Styles.eduHub__profile__about_about_details}><h3>Child Departments:</h3></div> */}
															<div className={Styles.eduHub__profile__about_about_details}>
															<div><p>Child Departments:</p></div>
																{dept.children.map((dept, index) => (
																	<Link to={`/dept/${dept.username}`}>
																		<DeptProfileInfoContentIcon
																			key={index}
																			className={Styles.eduHub__profile__eduhubmap}
																		>
																			<DeptMap className={Styles.eduHub__profile__eduhubmap_p}>
																				{dept.name}
																			</DeptMap>
																		</DeptProfileInfoContentIcon>
																	</Link>
																))}
															</div>
														</Fragment>
													)}
												</Fragment>
											)}
										</DeptProfileAbout>
										{/* <!-- About us section --> */}
										<DeptProfileAbout className={Styles.eduHub__profile__about}>
											<DeptProfileInfoContentIcon
												onClick={() => setInfo(!info)}
												className={Styles.eduHub__profile__about_heading}
											>
												<div className={Styles.eduHub__profile__info_content_side}></div>
												<p>About Us</p>
											</DeptProfileInfoContentIcon>
											{info && (
												<div className={Styles.eduHub__profile__about_about_details}>
													<p>{dept.shortDescription ? dept.shortDescription : `Nothing to show!`}</p>
												</div>
											)}
										</DeptProfileAbout>

										{/* <!-- Contacts Section --> */}
										<DeptProfileAbout className={Styles.eduHub__profile__contact}>
											<DeptProfileInfoContentIcon
												className={Styles.eduHub__profile__contact_heading}
												onClick={() => setContact(!contact)}
											>
												<div className={Styles.eduHub__profile__info_content_side}></div>
												<p>Contacts</p>
											</DeptProfileInfoContentIcon>
											{contact && ( dept.contacts.length > 2 ? (
												<Fragment>
													<div className={Styles.eduHub__profile__contact_inner_heading}>
														<p>
															<span>
																<i>
																	<FontAwesomeIcon icon={faPhoneAlt} />
																</i>
															</span>{' '}
															{dept.contacts[0].method}
														</p>
													</div>
													<div className={Styles.eduHub__profile__contact_list}>
														<ul>
															<li>
																<i>
																	<FontAwesomeIcon icon={faKeyboard} />
																</i>{' '}
																<span>{dept.contacts[0].numbers[0].number}</span>{' '}
															</li>
															<li>
																<i>
																	<FontAwesomeIcon icon={faAlignLeft} />
																</i>
																<span> Register office</span>{' '}
															</li>
														</ul>
													</div>

													<div className={Styles.eduHub__profile__contact_inner_heading}>
														<p>
															<span>
																<i>
																	<FontAwesomeIcon icon={faMobileAlt} />
																</i>
															</span>
															{dept.contacts[1].method}
														</p>
													</div>
													<div className={Styles.eduHub__profile__contact_list}>
														<ul>
															<li>
																<i>
																	<FontAwesomeIcon icon={faKeyboard} />
																</i>
																<span> {dept.contacts[1].numbers[0].number}</span>
															</li>
															<li>
																<i>
																	<FontAwesomeIcon icon={faMobileAlt} />
																</i>
																<span>Register office</span>{' '}
															</li>
														</ul>
													</div>

													<div className={Styles.eduHub__profile__contact_inner_heading}>
														<p>
															<span>
																<i>
																	<FontAwesomeIcon icon={faEnvelope} />
																</i>
															</span>{' '}
															{dept.contacts[2].method}
														</p>
													</div>
													<div className={Styles.eduHub__profile__contact_list}>
														<ul>
															<li>
																<i>
																	<FontAwesomeIcon icon={faAt} />
																</i>{' '}
																<span>{dept.contacts[2].numbers[0].number}</span>{' '}
															</li>
														</ul>
													</div>
												</Fragment>
											) : (<div className={Styles.eduHub__profile__about_about_details}><p>Nothing to show!</p></div>))}
										</DeptProfileAbout>
										<DeptProfileAbout className={Styles.eduHub__profile__location}>
											<DeptProfileInfoContentIcon
												className={Styles.eduHub__profile__location_heading}
												onClick={() => setLocation(!location)}
											>
												<div className={Styles.eduHub__profile__info_content_side}></div>
												<p>Location</p>
											</DeptProfileInfoContentIcon>
											{location && (
												<Fragment>
													<div className={Styles.eduHub__profile__contact_inner_heading}>
														<p>
															<i>
																<FontAwesomeIcon icon={faLocationArrow} />
															</i>
															<span>Address</span>{' '}
														</p>
													</div>
													<DeptProfileAbout
														className={Styles.eduHub__profile__contact}
														style={{ border: 'none' }}
													>
														<ul>
															<li>
																<i>
																	<FontAwesomeIcon icon={faCity} />
																</i>{' '}
																<span> Rajapur ,6600, Pabna</span>
															</li>
														</ul>
													</DeptProfileAbout>
													<DeptProfileInfoContentIcon className={Styles.eduHub__profile__location_map}>
														<p>Use map</p>
													</DeptProfileInfoContentIcon>
												</Fragment>
											)}
										</DeptProfileAbout>
									</Fragment>
									)}
								</Fragment>
                            )}

							{/* Members Section */}
                            {memberSection && (
                                <div>Members</div>
                            )}

							{/* Controllers Section */}
                            {controllerSection && (
                                <div>Controller</div>
                            )}

							{/* Create Section  */}
                            {createSection && (
                                <div>Create</div>
                            )}
                        </div>
                    </DeptProfile>
                </Fragment>
			}
		/>
	);
};

DeptSettings.propTypes = {
	getDept: PropTypes.func.isRequired,
	dept: PropTypes.array.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	dept: state.dept,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getDept })(DeptSettings);
