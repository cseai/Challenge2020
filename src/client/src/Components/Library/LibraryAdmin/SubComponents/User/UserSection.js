import React, { Fragment, useEffect, useState } from 'react';
import Styles from './UserSection.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//css, spinner, container, icon
import Spinner from './../../../../theme/Spinner/Spin-0.8s-217px.svg';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserFriends, faUserCog, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { 
    SubBgAndColor, 
    InbgSelect, 
    InbgInput, 
    // User Part
    MemberTableMain, 
    MemberTableTitle,
    MemberTableRowHead, 
    MemberTableRow,
    MemberTableCell, 
    MemberTableSortSelect, 
    MemberTableTitleH2,
    // Book Part
    BookTableMain, 
    BookTableTitle,
    BookTableRowHead, 
    BookTableRow,
    BookTableCell, 
    BookTableSortSelect, 
    BookTableTitleH2,
} from './UserSectionContainer';
// redux
import { getAllBooks, getAllUsers } from './../../../../../actions/libraryAdminAction';
// components
const UserSection = ({ 
    getAllBooks,
    getAllUsers,
    library: {library},
    loading,
    libLoading,
    memberLoading,
    bookLoading,
    allMembers,
    allBooks
}) =>{
    useEffect(() => {
		console.log(typeof library.id);
		getAllUsers(library.id);
    }, [getAllUsers, library.id]);
    
    useEffect(() => {
		console.log(typeof library.id);
		getAllBooks(library.id);
    }, [getAllBooks, library.id]);

    return (
        <Fragment>
            <div className={Styles.right__part_main}>
                {/* Search Bar */}
                <div className={Styles.right__part__search}>
                    <SubBgAndColor className={Styles.right__part__search_main}>
                        <div className={Styles.right__part__search_in}>
                            <InbgSelect name='search' id='search'>
                                <option>Username</option>
                                <option>Email</option>
                                <option>Name</option>
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
                {/* Members Table */}
                <div className={Styles.right__part__user__members_table}>
                    <MemberTableMain>
                        <MemberTableTitle>
                            <div>
                                <MemberTableTitleH2>Members</MemberTableTitleH2>
                            </div>
                            <div>
                                <MemberTableSortSelect
                                    name='member_sort_by'
                                    id='member_sort_by'
                                >
                                    <option>Sort by</option>
                                    <option>Username</option>
                                    <option>Email</option>
                                    <option>Name</option>
                                </MemberTableSortSelect>
                            </div>
                        </MemberTableTitle>
                        {loading || memberLoading || allMembers === null || allMembers === 'undefined' ? (
                            <Fragment>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src={Spinner} alt='loading...' />
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <MemberTableRowHead>
                                    <MemberTableCell>SN</MemberTableCell>
                                    <MemberTableCell>Image</MemberTableCell>
                                    <MemberTableCell>User Info</MemberTableCell>
                                    <MemberTableCell>Actions</MemberTableCell>
                                </MemberTableRowHead>
                                {allMembers && allMembers.members.length > 0 && allMembers.members.map((member, index) => (
                                <MemberTableRow key={member._id}>
                                    <MemberTableCell>
                                        <div className={Styles.right__part__user__members_table_cell_sn}>
                                            <p>{index + 1}</p>
                                        </div>
                                    </MemberTableCell>
                                    <MemberTableCell>
                                        <div className={Styles.right__part__user__members_table_cell_member_img}>
                                            <img src={require('./../../images/default-user-image.jpg')} alt='profile image' />
                                        </div>
                                    </MemberTableCell>
                                    <MemberTableCell>
                                        <div className={Styles.right__part__user__members_table_cell_member_info}>
                                            <div className={Styles.right__part__user__members_table_cell_member_info_name}>
                                                <p><span>Md Edukos User</span> <span>[@{member.username}]</span></p>
                                            </div>
                                            <div className={Styles.right__part__user__members_table_cell_member_info_extra}>
                                                <p>Email: {member.email}</p>
                                            </div>
                                        </div>
                                    </MemberTableCell>
                                    <MemberTableCell>
                                        <div className={Styles.right__part__user__members_table_cell_member_actions}>
                                            <div className={Styles.right__part__user__members_table_cell_member_actions_connect}>
                                                <p><span>Connect</span></p>
                                            </div>
                                            <div className={Styles.right__part__user__members_table_cell_member_actions_view}>
                                                <p><span>View</span></p>
                                            </div>
                                        </div>
                                    </MemberTableCell>
                                </MemberTableRow>
                                ))}
                            </Fragment>
                        )}
                    </MemberTableMain>
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
                        {loading || bookLoading || allBooks === null || allBooks === 'undefined' ? (
                            <Fragment>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src={Spinner} alt='loading...' />
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
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
                            </Fragment>
                        )}
                    </BookTableMain>
                </div>
            </div>
        </Fragment>
    );
}

UserSection.propTypes = (state) => ({
    getAllBooks: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired
});

const mapStateToprops = (state) => ({
    library: state.libadmin.library,
    allMembers: state.libadmin.members,
    allBooks: state.libadmin.books,
    loading: state.libadmin.loading,
    libLoading: state.libadmin.libLoading,
    memberLoading: state.libadmin.memberLoading,
    bookLoading: state.libadmin.bookLoading,
});

export default connect(mapStateToprops, {getAllBooks, getAllUsers})(UserSection);