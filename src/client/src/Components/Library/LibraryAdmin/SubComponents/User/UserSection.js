import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserFriends } from '@fortawesome/free-solid-svg-icons';


const UserSection = () =>{

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

                <div className="content-books"><h2>User Section</h2></div>
            </div>
        </Fragment>
    );
}

export default UserSection;