import React, { Fragment } from 'react';
import Styles from './EduhubProfile.module.css';
import { EduHubProfile, EduHubProfileInfo } from './EduhubProfileContainer';
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
// import PropTypes from 'prop-types';
import './EduhubProfile.module.css';
import Main from './../Layout/MainSection/Main';

const EduhubProfile = () => {
	return (
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
								<img src={require('./images/rain-bus-1.jpg')} alt='profile picture' />
								<div className={Styles.eduHub__profile__image_profile_image_overlay}>
									<div className={Styles.eduHub__profile__image_cover_image_overlay_upload}>
										<i>
											<FontAwesomeIcon icon={faCamera} size='1.5x' />
										</i>
										<span>Upload</span>
									</div>
								</div>
							</div>
						</div>

						{/* <!-- user info --> */}
						<EduHubProfileInfo>
							<div className={Styles.eduHub__profile__info_content}>
								<div className={Styles.eduHub__profile__info_content_icon}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<i>
										<FontAwesomeIcon icon={faUniversity} size='1.5x' />
									</i>
								</div>
								<div className={Styles.text}>
									<p>University</p>
								</div>
							</div>

							<div className={Styles.eduHub__profile__info_content}>
								<div className={Styles.eduHub__profile__info_content_icon}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<i>
										<FontAwesomeIcon icon={faCheck} size='1.5x' />
									</i>
								</div>
								<div className={Styles.text}>
									<p>Pabna University of Science And Technology</p>
								</div>
							</div>

							<div className={Styles.eduHub__profile__info_content}>
								<div className={Styles.eduHub__profile__info_content_icon}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<i>
										<FontAwesomeIcon icon={faCalendar} size='1.5x' />
									</i>
								</div>

								<div className={Styles.text}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<p>
										Established since 2008{' '}
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
								<div className={Styles.eduHub__profile__info_content_icon}>
									<div className={Styles.eduHub__profile__info_content_side}></div>
									<i>
										<FontAwesomeIcon icon={faUserFriends} size='1.5x' />
									</i>
								</div>
								<div className={Styles.text}>
									<p>25.2k Members</p>
								</div>
							</div>
						</EduHubProfileInfo>

						{/* <!-- About us section --> */}
						<div className={Styles.eduHub__profile__about}>
							<div className={Styles.eduHub__profile__about_heading}>
								<div className={Styles.eduHub__profile__info_content_side}></div>
								<p>About Us</p>
							</div>
							<div className={Styles.eduHub__profile__about_about_details}>
								<p>
									The government passed an act on 15 July 2001 to establish a science and technology
									university in Pabna. Pabna is a central district town in northern Bangladesh, having
									a long historical and cultural heritage. The academic curriculum of Pabna University
									of Science and Technology was started on 15 July 2008. This university plays an
									innovative role in providing need-based higher education, training, and research.
									The university is committed to maintaining and raising the quality and standard of
									higher education for the students as in international standards. This practical and
									need-based curricula will produce highly qualified trained scientists and
									technologists for the needs of Bangladesh as well as the world employment market.
								</p>
							</div>
						</div>

						{/* <!-- Contacts Section --> */}
						<div className={Styles.eduHub__profile__contact}>
							<div className={Styles.eduHub__profile__contact_heading}>
								<div className={Styles.eduHub__profile__info_content_side}></div>
								<p>Contacts</p>
							</div>
							<div className={Styles.eduHub__profile__contact_inner_heading}>
								<p>
									<span>
										<i>
											<FontAwesomeIcon icon={faPhoneAlt} size='1.5x' />
										</i>
									</span>{' '}
									Phone
								</p>
							</div>
							<div className={Styles.eduHub__profile__contact_list}>
								<ul>
									<li>
										<i>
											<FontAwesomeIcon icon={faKeyboard} size='1.5x' />
										</i>{' '}
										<span>01988906494</span>{' '}
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
									Mobile
								</p>
							</div>
							<div className={Styles.eduHub__profile__contact_list}>
								<ul>
									<li>
										<i>
											<FontAwesomeIcon icon={faKeyboard} size='1.5x' />
										</i>
										<span> 01988906494</span>
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
									Email
								</p>
							</div>
							<div className={Styles.eduHub__profile__contact_list}>
								<ul>
									<li>
										<i>
											<FontAwesomeIcon icon={faAt} size='1.5x' />
										</i>{' '}
										<span>eduHub@gmail.com</span>{' '}
									</li>
								</ul>
							</div>
						</div>
						<div className={Styles.eduHub__profile__location}>
							<div className={Styles.eduHub__profile__location_heading}>
								<div className={Styles.eduHub__profile__info_content_side}></div>
								<p>Location</p>
							</div>
							<div className={Styles.eduHub__profile__contact_inner_heading}>
								<p>
									<i>
										<FontAwesomeIcon icon={faLocationArrow} size='1.5x' />
									</i>
									<span>Address</span>{' '}
								</p>
							</div>
							<div className={Styles.eduHub__profile__contact}>
								<ul>
									<li>
										<i>
											<FontAwesomeIcon icon={faCity} size='1.5x' />
										</i>{' '}
										<span> Rajapur ,6600, Pabna</span>
									</li>
								</ul>
							</div>
							<div className={Styles.eduHub__profile__location_map}>
								<p>use map</p>
							</div>
						</div>
					</EduHubProfile>
				</Fragment>
			}
		/>
	);
};

// EduhubProfile.propTypes = {

// }

export default EduhubProfile;
