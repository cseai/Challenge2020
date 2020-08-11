import React, { Fragment } from 'react';
import Styles from './UserLibraryLeftSide.module.css';
import { SubBgAndColor } from './../UserLibraryContainer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faFileAlt, faFileArchive } from '@fortawesome/free-solid-svg-icons';

const UserLibraryLeftSide = ({
	library: {
		library: { id, name },
	},
}) => {
	return (
		<Fragment>
			<div className={Styles.left__part}>
				<SubBgAndColor className={Styles.left__part__data}>
					<div className={Styles.left__part__data_content}>
						<div className={Styles.left__part__data_content_profile}>
							<div className={Styles.left__part__data_content_profile_img_div}>
								<img
									className={Styles.left__part__data_content_profile_img}
									src={require('./../image/rain-bus-1.jpg')}
									alt='profile image'
								/>
							</div>
							<div className={Styles.left__part__data_content_profile_name}>{name}</div>
							<div className={Styles.left__part__data_content_profile_line}></div>
						</div>
						<div className={Styles.left__part__data_content_link}>
							<div className={Styles.left__part__data_content_link_content}>
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
							<div className={Styles.left__part__data_content_link_content}>
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
							<div className={Styles.left__part__data_content_link_content}>
								<div className={Styles.left__part__data_content_link_content_icon}>
									<div className={Styles.fasicon}>
										<FontAwesomeIcon
											icon={faFileAlt}
											style={{
												height: '32px',
												width: '32px',
												color: 'inherit',
												paddingTop: '5px',
											}}
										/>
									</div>
								</div>
								<div className={Styles.left__part__data_content_link_content_links}>Files</div>
							</div>
							<div className={Styles.left__part__data_content_link_content}>
								<div className={Styles.left__part__data_content_link_content_icon}>
									<div className={Styles.fasicon}>
										<FontAwesomeIcon
											icon={faFileArchive}
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

export default UserLibraryLeftSide;
