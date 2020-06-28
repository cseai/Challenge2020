import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './EduhubProfile.module.css';
import './EduhubProfile.module.css';
import Spinner from './../theme/Spinner/Spinner';
import Main from './../Layout/MainSection/Main';
import Moment from 'react-moment';
import {
	EduHubProfile,
	EduHubProfileInfo,
	EduHubProfileInfoContentSide,
	EduHubProfileInfoContentIcon,
	EduHubProfileAbout,
} from './EduhubProfileContainer';
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
import { geteduhub } from './../../actions/eduHubAction';

const EduhubProfile = ({ geteduhub, isAuthenticated, eduhub: { loading, dept }, match: { params } }) => {
	const [info, setInfo] = useState(false);
	const [contact, setContact] = useState(false);
	const [location, setLocation] = useState(false);
	console.log(`eduhub=${eduhub} # dept= ${dept}`)
	//eduhub loading before page show
	useEffect(() => {
		const deptIdOrUsername = params.eduhubName;
		geteduhub(deptIdOrUsername);
		console.log(params);
	}, [geteduhub, params.eduhubName]);

	// redirected if not logged in
	if (isAuthenticated === false) {
		return <Redirect to='/' />;
	}
	return loading && eduhub === null ? (
		<Main
			eduhub={
				<Fragment>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img src={require('./../theme/Spinner/Spin-0.8s-217px.svg')} alt='loading...' />
					</div>
				</Fragment>
			}
		/>
	) : (
		<Main
			eduhub={
				<Fragment>
					{/* <!-- start code for here --> */}
					<EduHubProfile>
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
						<EduHubProfileInfo>
							<div className={Styles.eduHub__profile__info_content}>
								<EduHubProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
									<EduHubProfileInfoContentSide className={Styles.eduHub__profile__info_content_side}>
										{/* <div className={Styles.eduHub__profile__info_content_side}></div> */}
									</EduHubProfileInfoContentSide>
									<i>
										<FontAwesomeIcon icon={faUniversity} />
									</i>
								</EduHubProfileInfoContentIcon>
								<div className={Styles.text}>
									<p>{dept.category}</p>
								</div>
							</div>

							<div className={Styles.eduHub__profile__info_content}>
								<EduHubProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
									<EduHubProfileInfoContentSide
										className={Styles.eduHub__profile__info_content_side}
									></EduHubProfileInfoContentSide>
									<i>
										<FontAwesomeIcon icon={faCheck} />
									</i>
								</EduHubProfileInfoContentIcon>
								<div className={Styles.text}>
									<p>{dept.name}</p>
								</div>
							</div>

							<div className={Styles.eduHub__profile__info_content}>
								<EduHubProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<i>
										<FontAwesomeIcon icon={faCalendar} />
									</i>
								</EduHubProfileInfoContentIcon>

								<div className={Styles.text}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<p>
										Established since <Moment format='YYYY'>{eduhub.eduHub.since}</Moment>{' '}
										<span>
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
										</span>
									</p>
								</div>
							</div>

							<div className={Styles.eduHub__profile__info_content}>
								<EduHubProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<i>
										<FontAwesomeIcon icon={faUserFriends} />
									</i>
								</EduHubProfileInfoContentIcon>
								<div className={Styles.text}>
									<p>25.2k Members</p>
								</div>
							</div>
						</EduHubProfileInfo>
						{/* map */}
						<EduHubProfileAbout className={Styles.eduHub__profile__about}>
							<EduHubProfileInfoContentIcon
								className={Styles.eduHub__profile__about_heading}
								style={{ width: '155px' }}
							>
								<div className={Styles.eduHub__profile__info_content_side}></div>
								<p>EduHub Map</p>
							</EduHubProfileInfoContentIcon>

							<div className={Styles.eduHub__profile__about_about_details}>
								{eduhub.eduHub.children.map((dept, index) => (
									<Link to={`/eduhub/${dept.username}`}>
										<EduHubProfileInfoContentIcon
											key={index}
											className={Styles.eduHub__profile__eduhubmap}
										>
											<p className={Styles.eduHub__profile__eduhubmap_p}>{dept.name}</p>
										</EduHubProfileInfoContentIcon>
									</Link>
								))}
							</div>
						</EduHubProfileAbout>
						{/* <!-- About us section --> */}
						<EduHubProfileAbout className={Styles.eduHub__profile__about}>
							<EduHubProfileInfoContentIcon
								onClick={() => setInfo(!info)}
								className={Styles.eduHub__profile__about_heading}
							>
								<div className={Styles.eduHub__profile__info_content_side}></div>
								<p>About Us</p>
							</EduHubProfileInfoContentIcon>
							{info && (
								<div className={Styles.eduHub__profile__about_about_details}>
									<p>{eduhub.eduHub.shortDescription}</p>
								</div>
							)}
						</EduHubProfileAbout>

						{/* <!-- Contacts Section --> */}
						<EduHubProfileAbout className={Styles.eduHub__profile__contact}>
							<EduHubProfileInfoContentIcon
								className={Styles.eduHub__profile__contact_heading}
								onClick={() => setContact(!contact)}
							>
								<div className={Styles.eduHub__profile__info_content_side}></div>
								<p>Contacts</p>
							</EduHubProfileInfoContentIcon>
							{contact && (
								<Fragment>
									<div className={Styles.eduHub__profile__contact_inner_heading}>
										<p>
											<span>
												<i>
													<FontAwesomeIcon icon={faPhoneAlt} />
												</i>
											</span>{' '}
											{eduhub.eduHub.contacts[0].method}
										</p>
									</div>
									<div className={Styles.eduHub__profile__contact_list}>
										<ul>
											<li>
												<i>
													<FontAwesomeIcon icon={faKeyboard} />
												</i>{' '}
												<span>{eduhub.eduHub.contacts[0].numbers[0].number}</span>{' '}
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
											{eduhub.eduHub.contacts[1].method}
										</p>
									</div>
									<div className={Styles.eduHub__profile__contact_list}>
										<ul>
											<li>
												<i>
													<FontAwesomeIcon icon={faKeyboard} />
												</i>
												<span> {eduhub.eduHub.contacts[1].numbers[0].number}</span>
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
											{eduhub.eduHub.contacts[2].method}
										</p>
									</div>
									<div className={Styles.eduHub__profile__contact_list}>
										<ul>
											<li>
												<i>
													<FontAwesomeIcon icon={faAt} />
												</i>{' '}
												<span>{eduhub.eduHub.contacts[2].numbers[0].number}</span>{' '}
											</li>
										</ul>
									</div>
								</Fragment>
							)}
						</EduHubProfileAbout>
						<EduHubProfileAbout className={Styles.eduHub__profile__location}>
							<EduHubProfileInfoContentIcon
								className={Styles.eduHub__profile__location_heading}
								onClick={() => setLocation(!location)}
							>
								<div className={Styles.eduHub__profile__info_content_side}></div>
								<p>Location</p>
							</EduHubProfileInfoContentIcon>
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
									<EduHubProfileAbout
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
									</EduHubProfileAbout>
									<EduHubProfileInfoContentIcon className={Styles.eduHub__profile__location_map}>
										<p>use map</p>
									</EduHubProfileInfoContentIcon>
								</Fragment>
							)}
						</EduHubProfileAbout>
					</EduHubProfile>
				</Fragment>
			}
		/>
	);
};

EduhubProfile.propTypes = {
	geteduhub: PropTypes.func.isRequired,
	eduhub: PropTypes.array.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	eduhub: state.eduhub,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { geteduhub })(EduhubProfile);
