import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect,useSelector } from 'react-redux';
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





//Sanzid Importing
import SettingsCoverPhoto from './settingsComponents/SettingsCovrPhoto';
import DeptSettingsBar from './settingsComponents/DeptSettingsBar';
import DeptSettingsDetailSectionButton from './settingsComponents/DeptSettingsDetailSectionButton'
import ViewDetails from './settingsComponents/viewMode/index';
import Name from './settingsComponents/editMode/settingsEditName';

//Sanzid Importing

const DeptSettings = ({ getDept, isAuthenticated, match: { params }, dept: { loading, dept } }) => {
	//Sanzid Editing....

	const detailSection = useSelector(state=> state.deptSettings.DETAIL_SECTION);
	const memberSection = useSelector(state=> state.deptSettings.MEMBER_SECTION);
	const controllerSection = useSelector(state=> state.deptSettings.CONTROLLER_SECTION);
	const createSection = useSelector(state=> state.deptSettings.CREATE_SECTION);
	const detailSectionEditOption = useSelector(state=> state.deptSettings.DETAIL_SECTION_EDIT_OPTION);
	console.log(detailSection,"Is details");



	//Sanzid Editing...





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


	const onChangeNewContactPhoneData = (e) => {
		if(e.target.name === 'number' || e.target.name === 'description'){
			setNewContactPhoneData({...newContactPhoneData, [e.target.name]: e.target.value});
			console.log(e.target.name, e.target.value, e.target);
		}
		else if(e.target.name === 'active'){
			setNewContactPhoneData({...newContactPhoneData, [e.target.name]: JSON.parse(e.target.value)});
			console.log(e.target.name, e.target.value, e.target);
		}
		console.log(newContactPhoneData);
		console.log(newContactPhoneData[e.target.name]);
	}

	const onChangeNewContactMobileData = (e) => {
		if(e.target.name === 'number' || e.target.name === 'description'){
			setNewContactMobileData({...newContactMobileData, [e.target.name]: e.target.value});
			console.log(e.target.name, e.target.value, e.target);
		}
		else if(e.target.name === 'active'){
			setNewContactMobileData({...newContactMobileData, [e.target.name]: JSON.parse(e.target.value)});
			console.log(e.target.name, e.target.value, e.target);
		}
		console.log(newContactMobileData);
		console.log(newContactMobileData[e.target.name]);
	}

	const onChangeNewContactEmailData = (e) => {
		if(e.target.name === 'number' || e.target.name === 'description'){
			setNewContactEmailData({...newContactEmailData, [e.target.name]: e.target.value});
			console.log(e.target.name, e.target.value, e.target);
		}
		else if(e.target.name === 'active'){
			setNewContactEmailData({...newContactEmailData, [e.target.name]: JSON.parse(e.target.value)});
			console.log(e.target.name, e.target.value, e.target);
		}
		console.log(newContactEmailData);
		console.log(newContactEmailData[e.target.name]);
	}

	const createContactPhoneFieldAdd = (e) => {
		console.log(newContactPhoneData);
		// Check Data Validity
		if(newContactPhoneData.number !== ''){
			// Do Somthing Here
			console.log('Data is OK');
			contactsData[0].numbers.push({...newContactPhoneData});
			setContactsData(contactsData);
			console.log(contactsData[0].numbers);
			setNewContactPhoneData({
				number: '',
				description: '',
				active: true
			});
			setContactPhoneAdd(false);
		}
	}

	const createContactMobileFieldAdd = (e) => {
		console.log(newContactMobileData);
		// Check Data Validity
		if(newContactMobileData.number !== ''){
			// Do Somthing Here
			console.log('Data is OK');
			contactsData[1].numbers.push({...newContactMobileData});
			setContactsData(contactsData);
			console.log(contactsData[2].numbers);
			setNewContactMobileData({
				number: '',
				description: '',
				active: true
			});
			setContactMobileAdd(false);
		}
	}

	const createContactEmailFieldAdd = (e) => {
		console.log(newContactEmailData);
		// Check Data Validity
		if(newContactEmailData.number !== ''){
			// Do Somthing Here
			console.log('Data is OK');
			contactsData[2].numbers.push({...newContactEmailData});
			setContactsData(contactsData);
			console.log(contactsData[2].numbers);
			setNewContactEmailData({
				number: '',
				description: '',
				active: true
			});
			setContactEmailAdd(false);
		}
	}

	

	const {
		name,
		username,
		since,
		shortDescription,
		contacts,
	} = formData;

	// dummy contacts data
	const [contactsData, setContactsData] = useState([
		{
			method: 'phone',
			numbers: [
				{
					number: '01234567898',
					description: 'Register ofice, Pabna University of Science and Technology',
					active: true
				},
				{
					number: '23234567898',
					description: 'Controller ofice, Pabna University of Science and Technology',
					active: true
				}
			]
		},
		{
			method: 'mobile',
			numbers: [
				{
					number: '01745678913',
					description: 'Register ofice, Pabna University of Science and Technology',
					active: true
				},
				{
					number: '01945678913',
					description: 'Controller ofice, Pabna University of Science and Technology',
					active: false
				}
			]
		},
		{
			method: 'email',
			numbers: [
				{
					number: 'register@pust.ac.bd',
					description: 'Register ofice, Pabna University of Science and Technology',
					active: true
				},
				{
					number: 'controller@pust.ac.bd',
					description: 'Controller ofice, Pabna University of Science and Technology',
					active: true
				}
			]
		}
	]);

	const onChangeDetailInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onChangeContactInput = (e, method, number_index) => {
		console.log(e.target.name,e.target.value, method, number_index);
		if(method==='phone'){
			if(e.target.name === 'number'){
				contactsData[0].numbers[number_index].number = e.target.value
			}else if(e.target.name === 'description'){
				contactsData[0].numbers[number_index].description = e.target.value
			}else if(e.target.name === 'active'){
				contactsData[0].numbers[number_index].active = e.target.value
			}
			setContactsData({...contactsData});
			// console.log(contactsData[0])
		}else if(method==='mobile'){
			if(e.target.name === 'number'){
				contactsData[1].numbers[number_index].number = e.target.value
			}else if(e.target.name === 'description'){
				contactsData[1].numbers[number_index].description = e.target.value
			}else if(e.target.name === 'active'){
				contactsData[1].numbers[number_index].active = e.target.value
			}
			setContactsData({...contactsData});
			// console.log(contactsData[1]);
		}else if(method==='email'){
			if(e.target.name === 'number'){
				contactsData[2].numbers[number_index].number = e.target.value
			}else if(e.target.name === 'description'){
				contactsData[2].numbers[number_index].description = e.target.value
			}else if(e.target.name === 'active'){
				contactsData[2].numbers[number_index].active = e.target.value
			}
			setContactsData({...contactsData});
			// console.log(contactsData[2])
		}
	}

	const onClickContactDelete = (e, method, number_index) => {
		if(method==='phone'){
			console.log(contactsData[0]);
			contactsData[0].numbers.splice(number_index, 1);
			setContactsData({...contactsData});
			console.log(contactsData[0]);
		}else if(method==='mobile'){
			console.log(contactsData[1]);
			contactsData[1].numbers.splice(number_index, 1);
			setContactsData({...contactsData});
			console.log(contactsData[1]);
		}else if(method==='email'){
			console.log(contactsData[2]);
			contactsData[2].numbers.splice(number_index, 1);
			setContactsData({...contactsData});
			console.log(contactsData[2]);
		}
	}

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
	
 
	

	const createContactPhoneField = (e) => {
		setContactPhoneAdd(true);
	}
	const createContactPhoneFieldCancel = (e) => {
		setContactPhoneAdd(false);
		setNewContactPhoneData({
			number: '',
			description: '',
			active: true
		});
	}
	const createContactMobileField = (e) => {
		setContactMobileAdd(true);
	}
	const createContactMobileFieldCancel = (e) => {
		setContactMobileAdd(false);
	}
	const createContactEmailField = (e) => {
		setContactEmailAdd(true);
	}
	const createContactEmailFieldCancel = (e) => {
		setContactEmailAdd(false);
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
						<SettingsCoverPhoto/>  
					</DeptProfile>
                    <DeptProfile>
                        <div className={Styles.settings__container}>
							{/** Dept settings bar components */}
							<DeptSettingsBar/>
							{/* Detail Section */}
                            {detailSection && (
								<Fragment>
									{/** Dept Settings Detail Section Button  Added...*/}
									< DeptSettingsDetailSectionButton />
									
									{detailSectionEditOption ? (
										// Edit Mode 
										// {/* code start here */}
										<div className={Styles.update__hub__container}>
											<form className={Styles.update__hub__form} onSubmit={(e) => onSubmitDetailSection(e)}>
												{/* Name  */}
												<Name />
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
															onChange={(e) => onChangeDetailInput(e)}
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
															onChange={(e) => onChangeDetailInput(e)}
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
															onChange={(e) => onChangeDetailInput(e)}
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
																		<FontAwesomeIcon onClick={e => createContactPhoneField(e)} icon={faPlus} />
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
																					onChange={(e) => onChangeNewContactPhoneData(e)}
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
																					onChange={(e) => onChangeNewContactPhoneData(e)}
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
																					onChange={(e) => onChangeNewContactPhoneData(e)}
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
																				<button className='btn-success' onClick={e => createContactPhoneFieldAdd(e)}>Add</button>
																				<button className='btn-warning' onClick={e => createContactPhoneFieldCancel(e)}>Cancel</button>
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
																					onChange={(e, method='phone', number_index=key) => onChangeContactInput(e, method, number_index)}
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
																					onChange={(e, method='phone', number_index=key) => onChangeContactInput(e, method, number_index)}
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
																					onChange={(e, method='phone', number_index=key) => onChangeContactInput(e, method, number_index)}
																				>
																					<option value={true}>Active</option>
																					<option value={false}>Deactive</option>
																				</select>
																				<i>
																					<FontAwesomeIcon icon={faTrash} onClick={(e, method='phone', number_index=key) => onClickContactDelete(e, method, number_index)} />
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
																		<FontAwesomeIcon onClick={e => createContactMobileField(e)} icon={faPlus} />
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
																					onChange={(e) => onChangeNewContactMobileData(e)}
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
																					onChange={(e) => onChangeNewContactMobileData(e)}
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
																					onChange={(e) => onChangeNewContactMobileData(e)}
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
																				<button className='btn-success' onClick={e => createContactMobileFieldAdd(e)}>Add</button>
																				<button className='btn-warning' onClick={e => createContactMobileFieldCancel(e)}>Cancel</button>
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
																					onChange={(e, method='mobile', number_index=key) => onChangeContactInput(e, method, number_index)}
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
																					onChange={(e, method='mobile', number_index=key) => onChangeContactInput(e, method, number_index)}
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
																					onChange={(e, method='mobile', number_index=key) => onChangeContactInput(e, method, number_index)}
																				>
																					<option value={true}>Active</option>
																					<option value={false}>Deactive</option>
																				</select>
																				<i>
																					<FontAwesomeIcon icon={faTrash} onClick={(e, method='mobile', number_index=key) => onClickContactDelete(e, method, number_index)} />
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
																		<FontAwesomeIcon onClick={e => createContactEmailField(e)} icon={faPlus} />
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
																					onChange={(e) => onChangeNewContactEmailData(e)}
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
																					onChange={(e) => onChangeNewContactEmailData(e)}
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
																					onChange={(e) => onChangeNewContactEmailData(e)}
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
																				<button className='btn-success' onClick={e => createContactEmailFieldAdd(e)}>Add</button>
																				<button className='btn-warning' onClick={e => createContactEmailFieldCancel(e)}>Cancel</button>
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
																					onChange={(e, method='email', number_index=key) => onChangeContactInput(e, method, number_index)}
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
																					onChange={(e, method='email', number_index=key) => onChangeContactInput(e, method, number_index)}
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
																					onChange={(e, method='email', number_index=key) => onChangeContactInput(e, method, number_index)}
																				>
																					<option value={true}>Active</option>
																					<option value={false}>Deactive</option>
																				</select>
																				<i>
																					<FontAwesomeIcon icon={faTrash} onClick={(e, method='email', number_index=key) => onClickContactDelete(e, method, number_index)} />
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
											<ViewDetails />
											{ /* user info */}
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