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

const Dept = ({ getDept, isAuthenticated, match: { params }, dept: { loading, dept } }) => {
	const [info, setInfo] = useState(false);
	const [contact, setContact] = useState(false);
	const [location, setLocation] = useState(false);
    const [deptMap, setDeptMap] = useState(false);
    const [detailSection, setDetailSection] = useState(true);
    const [memberSection, setMemberSection] = useState(false);
    const [controllerSection, setControllerSection] = useState(false);
    const [createSection, setCreateSection] = useState(false);

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
    
    const onSectionChange = (e) => {
        if( e.target.value === 'detail'){
            setDetailSection(true);
            setMemberSection(false);
            setControllerSection(false);
			setCreateSection(false);
			
			setFormData({...formData, name: dept.name, username: dept.username, since: dept.since, shortDescription: dept.shortDescription})
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
                            <div className='row'>
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
									
									{/* code start here */}
									<CreateProfileMain className={Styles.create__profile}>
										{/* <h2 className={Styles.create__profile_title}>Profile informations</h2> */}
										<form className={Styles.create__profile__form} onSubmit={(e) => onSubmitDetailSection(e)}>
											<div className={Styles.create__profile__form_control}>
												<div className={Styles.create__profile__form_control_title}>
													<label>Name</label>
													{/* <span className='required'> * </span> */}
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
													{/* <span className='required'> * </span> */}
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

											<div className={Styles.create__profile__form_btn}>
												<button type='submit' name='submit'>
													Save
												</button>
											</div>
										</form>
									</CreateProfileMain>
									{/* code end here */}
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

Dept.propTypes = {
	getDept: PropTypes.func.isRequired,
	dept: PropTypes.array.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	dept: state.dept,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getDept })(Dept);
