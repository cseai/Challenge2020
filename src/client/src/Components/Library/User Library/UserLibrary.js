import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// css and icon
import Styles from './UserLibrary.module.css';
import { UserLibraryMain, SubBgAndColor, InbgSelect, InbgInput } from './UserLibraryContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faBook,
	faFileAlt,
	faFileArchive,
	faSearch,
	faUserCog,
	faSlidersH,
} from '@fortawesome/free-solid-svg-icons';
// components
import Nav from './../../Layout/Nav/NavBar';
import ThemeChanger from './../../theme/ThemeChanger/ThemeChanger';

const UserLibrary = (props) => {
	return (
		<Fragment>
			<ThemeChanger />
			<Nav />
			<UserLibraryMain className={Styles.main__section}>
				<div className={Styles.container__fluid}>
					<div className={Styles.main__section_data}>
						{/* <!-- left bar --> */}
						<div className={Styles.left__part}>
							<SubBgAndColor className={Styles.left__part__data}>
								<div className={Styles.left__part__data_content}>
									<div className={Styles.left__part__data_content_profile}>
										<div className={Styles.left__part__data_content_profile_img_div}>
											<img
												className={Styles.left__part__data_content_profile_img}
												src={require('./image/rain-bus-1.jpg')}
												alt='profile image'
											/>
										</div>
										<div className={Styles.left__part__data_content_profile_name}>Hello World</div>
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
											<div className={Styles.left__part__data_content_link_content_links}>
												Home
											</div>
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
											<div className={Styles.left__part__data_content_link_content_links}>
												Books
											</div>
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
											<div className={Styles.left__part__data_content_link_content_links}>
												Files
											</div>
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
											<div className={Styles.left__part__data_content_link_content_links}>
												Settings
											</div>
										</div>
									</div>
								</div>
							</SubBgAndColor>
						</div>
						{/* <!-- right part --> */}
						<div className={Styles.right__part}>
							<div className={Styles.right__part_main}>
								<div className={Styles.right__part__cover}>
									<img
										className={Styles.right__part__cover_img}
										src={require('./image/unnamed.jpg')}
										alt='cover image'
									/>
								</div>
								<div className={Styles.right__part__search}>
									<SubBgAndColor className={Styles.right__part__search_main}>
										<div className={Styles.right__part__search_in}>
											<InbgSelect name='search' id='search'>
												<option>Author</option>
												<option>Book Name</option>
											</InbgSelect>
											<InbgInput />
											<button>
												<div className={Styles.fasicon}>
													<FontAwesomeIcon
														icon={faSearch}
														style={{
															height: '32px',
															width: '32px',
															color: 'inherit',
															paddingTop: '5px',
														}}
													/>
												</div>
											</button>
										</div>
										<button className={Styles.right__part__search_icon}>
											<div className={Styles.fasicon}>
												<FontAwesomeIcon
													icon={faUserCog}
													style={{
														height: '32px',
														width: '32px',
														color: 'inherit',
														paddingTop: '5px',
													}}
												/>
											</div>
										</button>
									</SubBgAndColor>
								</div>
								<div className={Styles.right__part__show}>
									<div className={Styles.right__part__show_left}>
										<div className={Styles.fasicon}>
											<FontAwesomeIcon
												icon={faSlidersH}
												style={{
													height: '32px',
													width: '32px',
													color: 'inherit',
													paddingTop: '5px',
												}}
											/>
										</div>
										<p>sort by</p>
									</div>
									<div className={Styles.right__part__show_right}>
										<InbgSelect
											name='sort_by'
											id='sort_by'
											className={Styles.right__part__show_right_select}
										>
											<option>Sort by</option>
											<option>All Books</option>
											<option>Date</option>
											<option>Name</option>
										</InbgSelect>
									</div>
								</div>
								<div className={Styles.right__part__books}>
									<div className='row'>
										{/* <!-- col start --> */}
										<div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
											<SubBgAndColor className={Styles.right__part__books_card}>
												<div className={Styles.right__part__books_card_inner}>
													<div className={Styles.right__part__books_card_img}>
														<img src={require('./image/al.jpg')} alt='book image' />
													</div>
													<div className={Styles.right__part__books_card_info}>
														<div className={Styles.right__part__books_card_info_name}>
															Algorithms Deisgn
														</div>
														<div className={Styles.right__part__books_card_info_auth}>
															Korman Lulu
														</div>
													</div>
													<div className={Styles.right__part__books_card_img_overlay}>
														<div
															className={
																Styles.right__part__books_card_img_overlay_action
															}
														>
															<div
																className={
																	Styles.right__part__books_card_img_overlay_action_btn
																}
															>
																<button>Add List</button>
																<button>Details View</button>
															</div>
														</div>
													</div>
												</div>
											</SubBgAndColor>
										</div>
										{/* <!-- col end  --> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</UserLibraryMain>
		</Fragment>
	);
};

UserLibrary.propTypes = {};

export default UserLibrary;
