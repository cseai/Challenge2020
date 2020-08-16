import React, { Fragment } from 'react'

import profileImages from './images/pust2.JPG'

import { Dropdown } from 'react-bootstrap'

const Sidebar = () => {

    return (
        <Fragment>
            <nav className="sidebar">
                <div className="profile">
                    <div className="profile-img">
                        <img src={profileImages} alt="profile"/>
                    </div>
                    <h3>Pust Library</h3>
                </div>
                <div>
                    <ul>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="main-list">
                                    Dashboard
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li>
                        <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="main-list">
                                    All Books
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>
                                   
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                </Dropdown.Menu>
                            
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="main-list">
                                    Users
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>
                                   
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                </Dropdown.Menu>
                            
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="main-list">
                                    Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                    
                                    <Dropdown.Item href="#/action-1" className="sub-list">Action</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default Sidebar;