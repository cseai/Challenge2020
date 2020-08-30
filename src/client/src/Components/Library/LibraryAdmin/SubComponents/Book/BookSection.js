import React, { Fragment, useEffect, useState } from 'react';
import Styles from './BookSection.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//css, spinner, container, icon
import Spinner from './../../../../theme/Spinner/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserFriends, faUserCog, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { 
    SubBgAndColor, 
    InbgSelect, 
    InbgInput, 
    BookTableMain, 
    BookTableTitle,
    BookTableRowHead, 
    BookTableRow,
    BookTableCell, 
    BookTableSortSelect, 
    BookTableTitleH2,
} from './BookSectionContainer';
// redux
import { getAllBooks } from './../../../../../actions/libraryAdminAction';
// components
import BooksDetailsModal from './BooksDetailsModal';
import Modal from './../../../../Layout/Modal/Modal';
import BookModal from './BookModal';

import { Table } from 'react-bootstrap'

const BookSection = ({ 
    getAllBooks,
    library: {library},
    loading,
    libLoading,
    bookLoading,
    allBooks
}) => {
    useEffect(() => {
		console.log(typeof library.id);
		getAllBooks(library.id);
	}, [getAllBooks, library.id]);
    console.log(bookLoading, library, library.id, allBooks)
    return (
        <Fragment>
            <div className={Styles.right__part_main}>
                {/* Search Bar */}
                <div className={Styles.right__part__search}>
                    <SubBgAndColor className={Styles.right__part__search_main}>
                        <div className={Styles.right__part__search_in}>
                            <InbgSelect name='search' id='search'>
                                <option>Title</option>
                                <option>Author</option>
                                <option>ISBN</option>
                                <option>Accession Number</option>
                                <option>Call Number</option>
                                <option>Tag</option>
                                <option>Dept</option>
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
                {/* Book Table */}
                <div className={Styles.right__part__books__books_table}>
                    <BookTableMain>
                        <BookTableTitle>
                            <div>
                                <BookTableTitleH2>Books</BookTableTitleH2>
                            </div>
                            <div>
                                <BookTableSortSelect
                                    name='group_by'
                                    id='group_by'
                                >
                                    <option>Group by</option>
                                    <option>None</option>
                                    <option>Title</option>
                                </BookTableSortSelect>
                                <BookTableSortSelect
                                    name='sort_by'
                                    id='sort_by'
                                >
                                    <option>Sort by</option>
                                    <option>All Books</option>
                                    <option>Title</option>
                                    <option>Date Asc</option>
                                    <option>Date Desc</option>
                                </BookTableSortSelect>
                            </div>
                        </BookTableTitle>
                        <BookTableRowHead>
                            <BookTableCell>SN</BookTableCell>
                            <BookTableCell>Image</BookTableCell>
                            <BookTableCell>Book Info</BookTableCell>
                            <BookTableCell>Book Status</BookTableCell>
                        </BookTableRowHead>
                        {allBooks && allBooks.books.length > 0 && allBooks.books.map((book, index) => (
                        <BookTableRow key={book.id}>
                            <BookTableCell>
                                <div className={Styles.right__part__books__books_table_cell_sn}>
                                    <p>{index + 1}</p>
                                </div>
                            </BookTableCell>
                            <BookTableCell>
                                <div className={Styles.right__part__books__books_table_cell_book_img}>
                                    <img src={require('./../../images/al.jpg')} alt='book image' />
                                </div>
                            </BookTableCell>
                            <BookTableCell>
                                <div className={Styles.right__part__books__books_table_cell_book_info}>
                                    <div className={Styles.right__part__books__books_table_cell_book_info_title}>
                                        <p>{book.title}</p>
                                    </div>
                                    <div className={Styles.right__part__books__books_table_cell_book_info_authors}>
                                        <p>Authors:  
                                            {Object.keys(book.authors).map((author, index) => (
                                                <span key={book.authors[author].authorId}> {book.authors[author].authorName} | </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            </BookTableCell>
                            <BookTableCell>
                                <div className={Styles.right__part__books__books_table_cell_book_status}>
                                    <div className={Styles.right__part__books__books_table_cell_book_status_total_count}>
                                        <p><span>Total</span></p>
                                        <p><span>20</span></p>
                                    </div>
                                    <div className={Styles.right__part__books__books_table_cell_book_status_total_available}>
                                        <p><span>Available</span></p>
                                        <p><span>12</span></p>
                                    </div>
                                    <div className={Styles.right__part__books__books_table_cell_book_status_total_unavailable}>
                                        <p><span>Unavailable</span></p>
                                        <p><span>8</span></p>
                                    </div>
                                </div>
                            </BookTableCell>
                        </BookTableRow>
                        ))}
                    </BookTableMain>
                </div>
            </div>
        </Fragment>
    );
}

BookSection.propTypes = {
    getAllBooks: PropTypes.func.isRequired,
};

const mapStateToprops = (state) => ({
    library: state.libadmin.library,
    allBooks: state.libadmin.books,
    loading: state.libadmin.loading,
    libLoading: state.libadmin.libLoading,
    bookLoading: state.libadmin.bookLoading,
});
export default connect(mapStateToprops, {getAllBooks})(BookSection);
