import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserFriends } from '@fortawesome/free-solid-svg-icons';

import { Table } from 'react-bootstrap'


const BookSection = () =>{

    return (
        <Fragment>
            <div className="main-content">
                <div className="content-header">
                    <div className="header-container">
                        <div className="search-bar-category">
                            <span>categories </span>
                        </div>
                        <div className="search-bar-input">
                            <input type="search" />
                        </div>
                        <div className="search-bar-icon">
                            <FontAwesomeIcon icon={ faSearch } />
                        </div>
                    </div>
                    <div className="header-image">
                        <FontAwesomeIcon icon={ faUserFriends } />
                    </div>
                </div>

                <div className="content-books"><h2>Book Section</h2></div>
                <div className="content-books">
                    <h1>All Books</h1>
                    <hr />
                </div>


                <div className="book-list">
                    <table>
                        <tr>
                            <th>Book</th>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Total Book</th>
                            <th>Borrow</th>
                            <th>left</th>
                        </tr>
                    </table>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>

                <Table responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <th key={index}>Table heading</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                        </tr>
                        <tr>
                        <td>2</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                        </tr>
                        <tr>
                        <td>3</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Fragment>
    );
}

export default BookSection;