import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Styles from './EduhubProfile.module.css';
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
import './EduhubProfile.module.css';
import Main from './../Layout/MainSection/Main';
// action
import { geteduhub } from './../../actions/eduHubAction';

const EduhubProfile = ({ geteduhub, eduhub: { loading, eduhub } }) => {
	const [info, setInfo] = useState(false);
	const [contact, setContact] = useState(false);
	const [location, setLocation] = useState(false);
	//eduhub
	useEffect(() => {
		geteduhub();
		console.log('hello');
	}, []);

	return loading && eduhub === null ? (
		<Main eduhub={<Fragment>loading</Fragment>} />
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
											<FontAwesomeIcon icon={faCamera} size='1.5x' />
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
											<FontAwesomeIcon icon={faCamera} size='1.5x' />
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
										<FontAwesomeIcon icon={faUniversity} size='1.5x' />
									</i>
								</EduHubProfileInfoContentIcon>
								<div className={Styles.text}>
									<p>{eduhub.eduHub.category}</p>
								</div>
							</div>

							<div className={Styles.eduHub__profile__info_content}>
								<EduHubProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
									<EduHubProfileInfoContentSide
										className={Styles.eduHub__profile__info_content_side}
									></EduHubProfileInfoContentSide>
									<i>
										<FontAwesomeIcon icon={faCheck} size='1.5x' />
									</i>
								</EduHubProfileInfoContentIcon>
								<div className={Styles.text}>
									<p>{eduhub.eduHub.name}</p>
								</div>
							</div>

							<div className={Styles.eduHub__profile__info_content}>
								<EduHubProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<i>
										<FontAwesomeIcon icon={faCalendar} size='1.5x' />
									</i>
								</EduHubProfileInfoContentIcon>

								<div className={Styles.text}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<p>
										Established since {eduhub.eduHub.since}{' '}
										<span>
											<i>
												<FontAwesomeIcon icon={faStar} size='1.5x' />
											</i>{' '}
											<i>
												<FontAwesomeIcon icon={faStar} size='1.5x' />
											</i>{' '}
											<i>
												<FontAwesomeIcon icon={faStar} size='1.5x' />
											</i>{' '}
											<i>
												<FontAwesomeIcon icon={faStar} size='1.5x' />
											</i>{' '}
											<i>
												<FontAwesomeIcon icon={faStarHalfAlt} size='1.5x' />
											</i>{' '}
										</span>
									</p>
								</div>
							</div>

							<div className={Styles.eduHub__profile__info_content}>
								<EduHubProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<i>
										<FontAwesomeIcon icon={faUserFriends} size='1.5x' />
									</i>
								</EduHubProfileInfoContentIcon>
								<div className={Styles.text}>
									<p>25.2k Members</p>
								</div>
							</div>
						</EduHubProfileInfo>

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
													<FontAwesomeIcon icon={faPhoneAlt} size='1.5x' />
												</i>
											</span>{' '}
											{eduhub.eduHub.contacts[0].method}
										</p>
									</div>
									<div className={Styles.eduHub__profile__contact_list}>
										<ul>
											<li>
												<i>
													<FontAwesomeIcon icon={faKeyboard} size='1.5x' />
												</i>{' '}
												<span>{eduhub.eduHub.contacts[0].numbers[0].number}</span>{' '}
											</li>
											<li>
												<i>
													<FontAwesomeIcon icon={faAlignLeft} size='1.5x' />
												</i>
												<span> Register office</span>{' '}
											</li>
										</ul>
									</div>

									<div className={Styles.eduHub__profile__contact_inner_heading}>
										<p>
											<span>
												<i>
													<FontAwesomeIcon icon={faMobileAlt} size='1.5x' />
												</i>
											</span>
											{eduhub.eduHub.contacts[1].method}
										</p>
									</div>
									<div className={Styles.eduHub__profile__contact_list}>
										<ul>
											<li>
												<i>
													<FontAwesomeIcon icon={faKeyboard} size='1.5x' />
												</i>
												<span> {eduhub.eduHub.contacts[1].numbers[0].number}</span>
											</li>
											<li>
												<i>
													<FontAwesomeIcon icon={faMobileAlt} size='1.5x' />
												</i>
												<span>Register office</span>{' '}
											</li>
										</ul>
									</div>

									<div className={Styles.eduHub__profile__contact_inner_heading}>
										<p>
											<span>
												<i>
													<FontAwesomeIcon icon={faEnvelope} size='1.5x' />
												</i>
											</span>{' '}
											{eduhub.eduHub.contacts[2].method}
										</p>
									</div>
									<div className={Styles.eduHub__profile__contact_list}>
										<ul>
											<li>
												<i>
													<FontAwesomeIcon icon={faAt} size='1.5x' />
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
												<FontAwesomeIcon icon={faLocationArrow} size='1.5x' />
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
													<FontAwesomeIcon icon={faCity} size='1.5x' />
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
};

const mapStateToProps = (state) => ({
	eduhub: state.eduhub,
});

export default connect(mapStateToProps, { geteduhub })(EduhubProfile);
