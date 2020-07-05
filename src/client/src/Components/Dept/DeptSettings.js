import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './DeptSettings.module.css';
import './DeptSettings.module.css';
import Main from '../Layout/MainSection/Main';
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
import Spinner from './../theme/Spinner/Spin-0.8s-217px.svg';
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


	faUser,

} from '@fortawesome/free-solid-svg-icons';

// action
import { getDept } from '../../actions/deptAction';

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

	const [formData, setFormData] = useState({
		name: '',
		username: '',
		since: '',
		shortDescription: ''
	});

	const {
		name,
		username,
		since,
		shortDescription
	} = formData;

	const onChangeDetailInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
    
    const onSectionChange = (e) => {
        if( e.target.value === 'detail'){
            setDetailSection(true);
            setMemberSection(false);
            setControllerSection(false);
			setCreateSection(false);
        }else if( e.target.value === 'member'){
            setDetailSection(false);
            setMemberSection(true);
            setControllerSection(false);
            setCreateSection(false);
        }else if( e.target.value === 'controller'){
            setDetailSection(false);
            setMemberSection(false);
            setControllerSection(true);
            setCreateSection(false);
        }else if( e.target.value === 'create'){
            setDetailSection(false);
            setMemberSection(false);
            setControllerSection(false);
            setCreateSection(true);
        }
	}
	



	// redirected if not logged in
	if (isAuthenticated === false) {
		return <Redirect to='/' />;
	}

	// If requested dept does not exist (dept===null) then redirect to 404 page
	// Now just redirect to home page
	// if (dept === null && loading === false){
	// 	return <Redirect to='/error' />;
	// }

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
						<div className={Styles.eduHub__profile__image}>
							<div className={Styles.eduHub__profile__image_cover_image}>
								<img src={require('./images/p.jpg')} alt='for good' />
								<div className={Styles.eduHub__profile__image_cover_image_overlay}>
									<div className={Styles.eduHub__profile__image_cover_image_overlay_upload}>
										<i>
											<FontAwesomeIcon icon={faCamera} />
											Upload
										</i>
									</div>
								</div>
							</div>
							<div className={Styles.eduHub__profile__image_profile_image}>
								<img src={require('./images/rain-bus-1.jpg')} alt='profile picture good' />
								<div className={Styles.eduHub__profile__image_profile_image_overlay}>
									<div className={Styles.eduHub__profile__image_cover_image_overlay_upload}>
										<i>
											<FontAwesomeIcon icon={faCamera} />
										</i>
										<span>Upload </span>
									</div>
								</div>
							</div>
						</div>
                        <div className='m-3'>
                            <h2>{dept.name}</h2>
                        </div>
					</DeptProfile>
                    <DeptProfile>
                        <div className='mt-3'>
                            <div className='row mx-2 px-2'>
                                <div className='col'>
                                    <button className='btn bg-white' value='detail' onClick={ (e) => onSectionChange(e) }>Details</button>
                                </div>
                                <div className='col'>
                                    <button className='btn bg-white' value='member' onClick={ (e) => onSectionChange(e) }>Members</button>
                                </div>
                                <div className='col'>
                                    <button className='btn bg-white' value='controller' onClick={ (e) => onSectionChange(e) }>Controllers</button>
                                </div>
                                <div className='col'>
                                    <button className='btn bg-white' value='create' onClick={ (e) => onSectionChange(e) }>Create</button>
                                </div>
                            </div>
                        </div>
                    </DeptProfile>
                    <DeptProfile>
                        <div className='m-3 p-1'>
							{/* Detail Section */}
                            {detailSection && (
								<Fragment>
									<div className='ml-3 pl-3'>
										<button className='btn btn-primary btn-lg' onClick={(e) => detailSectionButtonClick(e)}>{detailSectionButtonValue}</button>
									</div>
									{detailSectionEditOption ? (
										// Edit Mode 
										// {/* code start here */}
										<CreateProfileMain className={Styles.create__profile}>
											{/* <h2 className={Styles.create__profile_title}>Update Hub</h2> */}
											<form className={Styles.create__profile__form} onSubmit={(e) => onSubmitDetailSection(e)}>
												<div className={Styles.create__profile__form_control}>
													<div className={Styles.create__profile__form_control_title}>
														<label>Name</label>
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
															name='name'
															value={name}
															onChange={(e) => onChangeDetailInput(e)}
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
															onChange={(e) => onChangeDetailInput(e)}
														/>
													</div>
												</div>
	
												<div className={Styles.create__profile__form_control}>
													<div className={Styles.create__profile__form_control_title}>
														<label>Established</label>
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
															onChange={(e) => onChangeDetailInput(e)}
														/>
													</div>
												</div>
	
												<div className={Styles.create__profile__form_control}>
													<label className={Styles.create__profile__form_control_title}>
														Tell Something About This Hub
													</label>
													<CreateProfileTextField
														rows='7'
														name='shortDescription'
														value={shortDescription}
														onChange={(e) => onChangeDetailInput(e)}
													></CreateProfileTextField>
												</div>

												{/* <!-- Contacts Section --> */}
												<div className={Styles.create__profile__form_control}>
													<div className={Styles.create__profile__form_control_title}>
														<label>Contacts</label>
														<span className='required'> * </span>
													</div>
													<div className={Styles.eduHub__profile__contact}>
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
													</div>
												</div>
												
												{/* <!-- Address Section --> */}
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
	
												<div className={Styles.create__profile__form_btn}>
													<button type='submit' name='submit'>
														Save
													</button>
												</div>
											</form>
										</CreateProfileMain>
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
