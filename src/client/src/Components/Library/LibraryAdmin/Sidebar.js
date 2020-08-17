import React, { Fragment } from 'react'

import profileImages from './images/pust2.JPG'

import { Dropdown } from 'react-bootstrap'

const Sidebar = ({activeSection, updateSection}) => {

    const onSection = (e, sectionName) => {
        // console.log('Hi',sectionName);
        updateSection(sectionName);
    };

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
                        <Dropdown onClick={(e) => onSection(e, 'library')}>
                            <div className="main-list pl-2">Library</div>
                        </Dropdown>
                        </li>
                        <li>
                            <Dropdown onClick={(e) => onSection(e, 'dashboard')}>
                                <div className="main-list pl-2">Dashboard</div>
                                {activeSection === 'dashboard' && (
                                    <div className="pl-5">
                                        <ul className="pl-5">
                                            <li className="sub-list">Item- 1</li>
                                            <li className="sub-list">Item- 2</li>
                                            <li className="sub-list">Item- 3</li>
                                        </ul>
                                    </div>
                                )}
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown onClick={(e) => onSection(e, 'user')}>
                                <div className="main-list pl-2">User</div>
                                {activeSection === 'user' && (
                                    <div className="pl-5">
                                        <ul className="pl-5">
                                            <li className="sub-list">Item- 1</li>
                                            <li className="sub-list">Item- 2</li>
                                            <li className="sub-list">Item- 3</li>
                                        </ul>
                                    </div>
                                )}
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown onClick={(e) => onSection(e, 'book')}>
                                <div className="main-list pl-2">Books</div>
                                {activeSection === 'book' && (
                                    <div className="pl-5">
                                        <ul className="pl-5">
                                            <li className="sub-list">Item- 1</li>
                                            <li className="sub-list">Item- 2</li>
                                            <li className="sub-list">Item- 3</li>
                                        </ul>
                                    </div>
                                )}
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown onClick={(e) => onSection(e, 'resource')}>
                                <div className="main-list pl-2">Resources</div>
                                {activeSection === 'resource' && (
                                    <div className="pl-5">
                                        <ul className="pl-5">
                                            <li className="sub-list">Item- 1</li>
                                            <li className="sub-list">Item- 2</li>
                                            <li className="sub-list">Item- 3</li>
                                        </ul>
                                    </div>
                                )}
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown onClick={(e) => onSection(e, 'setting')}>
                                <div className="main-list pl-2">Settings</div>
                                {activeSection === 'setting' && (
                                    <div className="pl-5">
                                        <ul className="pl-5">
                                            <li className="sub-list">Item- 1</li>
                                            <li className="sub-list">Item- 2</li>
                                            <li className="sub-list">Item- 3</li>
                                        </ul>
                                    </div>
                                )}
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default Sidebar;