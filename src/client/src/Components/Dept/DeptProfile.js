import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './DeptProfile.module.css';
import './DeptProfile.module.css';
import Main from '../Layout/MainSection/Main';
import Moment from 'react-moment';
import {
	DeptProfile,
	DeptProfileInfo,
	DeptProfileInfoContentSide,
	DeptProfileInfoContentIcon,
	DeptProfileAbout,
	DeptMap,
} from './DeptProfileContainer';
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
} from '@fortawesome/free-solid-svg-icons';

// action
import { getDept } from '../../actions/deptAction';

const Dept = ({ getDept, isAuthenticated, match: { params }, dept: { loading, dept } }) => {
	const [info, setInfo] = useState(false);
	const [contact, setContact] = useState(false);
	const [location, setLocation] = useState(false);

	//eduhub loading before page show
	useEffect(() => {
		const deptUsername = params.deptUsername;
		getDept(deptUsername);
		console.log(params);
	}, [getDept, params.deptUsername]);

	// redirected if not logged in
	if (isAuthenticated === false) {
		return <Redirect to='/' />;
	}

	// If requested dept does not exist (dept===null) then redirect to 404 page
	// Now just redirect to home page
	if (dept === null && loading === false){
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
	) : (
		<Main
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
						{/* <!-- user info --> */}
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
							>
								<div className={Styles.eduHub__profile__info_content_side}></div>
								<p>Dept Map</p>
							</DeptProfileInfoContentIcon>
							{/* EduHub */}
							{(dept.eduHub === null && dept.parent === null) ? (
								// This is EduHub
								<Fragment>
									<div className={Styles.eduHub__profile__about_about_details}>This is a EduHub</div>
								</Fragment>
							):(
								<Fragment>
									<div className={Styles.eduHub__profile__about_about_details}><h3>Child Departments:</h3></div>
									<div className={Styles.eduHub__profile__about_about_details}>
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
							{/* Parent */}


							{/* Children */}
							{dept.children.length === null ? (
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
									<div className={Styles.eduHub__profile__about_about_details}><h3>Child Departments:</h3></div>
									<div className={Styles.eduHub__profile__about_about_details}>
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
