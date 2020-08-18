import React, { Fragment } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserFriends } from '@fortawesome/free-solid-svg-icons'



const Content = () =>{

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
            </div>
        </Fragment>
    );
}

export default Content 