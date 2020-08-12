import React, { Fragment, useEffect, useState } from 'react';
import Styles from './UserLibraryRightSide.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//css,spinner,container,icon
import Spinner from './../../../theme/Spinner/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCog, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { SubBgAndColor, InbgSelect, InbgInput } from './../UserLibraryContainer';
// redux
import { getAllBooks } from './../../../../actions/libraryAction';
// components
import BooksDetailsModal from './BooksDetailsModal';
import Modal from './../../../Layout/Modal/Modal';
import BookModal from './BookModal';

const UserLibraryRightSide = ({ id, getAllBooks, bookLoading, loading, allBooks }) => {
	useEffect(() => {
		console.log(typeof id);
		getAllBooks(id);
	}, [getAllBooks, id]);
	// modal selector
	const [open, setOpen] = useState(false);

	const display = () => {
		const t = allBooks.books[1].authors;
		return typeof t;
	};

	return (
		<>
			<Fragment>
				{/* {show && <BooksDetailsModal closeButton={() => setShow(false)} />} */}
				<div className={Styles.right__part}>
					<div className={Styles.right__part_main}>
						<div className={Styles.right__part__cover}>
							<img
								className={Styles.right__part__cover_img}
								src={require('./../image/unnamed.jpg')}
								alt='cover pic'
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
							<Row className={Styles.row}>
								{loading || bookLoading || allBooks === null || allBooks === 'undefined' ? (
									<Fragment>
										<Spinner />
										loading...
									</Fragment>
								) : (
									<Fragment>
										{Object.keys(allBooks.books).map((book, i) => (
											<div className='col-sm-12 col-md-6 col-lg-4 col-xl-3' key={i}>
												<SubBgAndColor className={Styles.right__part__books_card}>
													<div
														className={Styles.right__part__books_card_inner}
														onClick={() => setOpen(true)}
													>
														<div className={Styles.right__part__books_card_img}>
															<img src={require('./../image/al.jpg')} alt='book image' />
														</div>
														<div className={Styles.right__part__books_card_info}>
															<div
																className={Styles.right__part__books_card_info_name}
																style={{ textAlign: 'center' }}
															>
																{allBooks.books[book].title}
															</div>
															{Object.keys(allBooks.books[book].authors).map(
																(author, i) => (
																	<div
																		className={
																			Styles.right__part__books_card_info_auth
																		}
																		key={i}
																	>
																		{
																			allBooks.books[book].authors[author]
																				.authorName
																		}
																	</div>
																)
															)}
														</div>
													</div>
												</SubBgAndColor>
											</div>
										))}
									</Fragment>
								)}
							</Row>
						</div>
					</div>
				</div>
			</Fragment>
			<Modal open={open} modalClose={() => setOpen(false)}>
				<BookModal />
			</Modal>
		</>
	);
};

UserLibraryRightSide.propTypes = {
	getAllBooks: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	bookLoading: PropTypes.bool.isRequired,
	// AllBooks: PropTypes.object,
};

const mapStateToprops = (state) => ({
	loading: state.library.loading,
	bookLoading: state.library.bookLoading,
	allBooks: state.library.books,
});

export default connect(mapStateToprops, { getAllBooks })(UserLibraryRightSide);
