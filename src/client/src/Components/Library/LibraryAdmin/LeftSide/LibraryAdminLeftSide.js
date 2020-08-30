import React, { Fragment } from 'react';
import Styles from './LibraryAdminLeftSide.module.css';
import PropTypes from 'prop-types';
//css, spinner, container, icon
import { SubBgAndColor } from './../LibraryAdminContainer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faBookReader, faBook, faSwatchbook, faCogs } from '@fortawesome/free-solid-svg-icons';

const LibraryAdminLeftSide = ({
	library: { id, name },
	sectionNames,
	activeSection, 
	updateActiveSection,
}) => {
	// Left Side Bar Click Event
	const onSection = (e, sectionName) => {
		console.log('Hi,',sectionName, 'was clicked');
		console.log(e.target);
        updateSection(sectionName);
	};
	
	// Update Active Section
    const updateSection = (sectionName) => {
		if(Object.values(sectionNames).includes(sectionName)){
			updateActiveSection(sectionName);
		}
    };

	return (
		<Fragment>
			<div className={Styles.left__part}>
				<SubBgAndColor className={Styles.left__part__data}>
					<div className={Styles.left__part__data_content}>
						<div className={Styles.left__part__data_content_profile}>
							<div className={Styles.left__part__data_content_profile_img_div}>
								<img
									className={Styles.left__part__data_content_profile_img}
									src={require('./../images/rain-bus-1.jpg')}
									alt='profile image'
								/>
							</div>
							<div className={Styles.left__part__data_content_profile_name}>{name}</div>
							<div className={Styles.left__part__data_content_profile_line}></div>
						</div>
						<div className={Styles.left__part__data_content_link}>
							<div className={Styles.left__part__data_content_link_content} onClick={(e) => onSection(e, 'library')}>
								<div className={Styles.left__part__data_content_link_content_icon}>
									<div className={Styles.fasicon}>
										<FontAwesomeIcon
											icon={faHome}
											style={{
												height: '32px',
												width: '32px',
												color: 'inherit',
												paddingTop: '5px',
											}}
										/>
									</div>
								</div>
								<div className={Styles.left__part__data_content_link_content_links}>Home</div>
							</div>
							<div className={Styles.left__part__data_content_link_content} onClick={(e) => onSection(e, 'dashboard')}>
								<div className={Styles.left__part__data_content_link_content_icon}>
									<div className={Styles.fasicon}>
										<FontAwesomeIcon
											icon={faChartLine}
											style={{
												height: '32px',
												width: '32px',
												color: 'inherit',
												paddingTop: '5px',
											}}
										/>
									</div>
								</div>
								<div className={Styles.left__part__data_content_link_content_links}>Dashboard</div>
							</div>
							<div className={Styles.left__part__data_content_link_content} onClick={(e) => onSection(e, 'user')}>
								<div className={Styles.left__part__data_content_link_content_icon}>
									<div className={Styles.fasicon}>
										<FontAwesomeIcon
											icon={faBookReader}
											style={{
												height: '32px',
												width: '32px',
												color: 'inherit',
												paddingTop: '5px',
											}}
										/>
									</div>
								</div>
								<div className={Styles.left__part__data_content_link_content_links}>User</div>
							</div>
							<div className={Styles.left__part__data_content_link_content} onClick={(e) => onSection(e, 'book')}>
								<div className={Styles.left__part__data_content_link_content_icon}>
									<div className={Styles.fasicon}>
										<FontAwesomeIcon
											icon={faBook}
											style={{
												height: '32px',
												width: '32px',
												color: 'inherit',
												paddingTop: '5px',
											}}
										/>
									</div>
								</div>
								<div className={Styles.left__part__data_content_link_content_links}>Books</div>
							</div>
							<div className={Styles.left__part__data_content_link_content} onClick={(e) => onSection(e, 'resource')}>
								<div className={Styles.left__part__data_content_link_content_icon}>
									<div className={Styles.fasicon}>
										<FontAwesomeIcon
											icon={faSwatchbook}
											style={{
												height: '32px',
												width: '32px',
												color: 'inherit',
												paddingTop: '5px',
											}}
										/>
									</div>
								</div>
								<div className={Styles.left__part__data_content_link_content_links}>Resources</div>
							</div>
							<div className={Styles.left__part__data_content_link_content} onClick={(e) => onSection(e, 'setting')}>
								<div className={Styles.left__part__data_content_link_content_icon}>
									<div className={Styles.fasicon}>
										<FontAwesomeIcon
											icon={faCogs}
											style={{
												height: '32px',
												width: '32px',
												color: 'inherit',
												paddingTop: '5px',
											}}
										/>
									</div>
								</div>
								<div className={Styles.left__part__data_content_link_content_links}>Settings</div>
							</div>
						</div>
					</div>
				</SubBgAndColor>
			</div>
		</Fragment>
	);
};

LibraryAdminLeftSide.propTypes = {
	library: PropTypes.object.isRequired,
	sectionNames: PropTypes.object.isRequired,
	activeSection: PropTypes.string.isRequired,
	updateActiveSection: PropTypes.func.isRequired,
};

export default LibraryAdminLeftSide;
