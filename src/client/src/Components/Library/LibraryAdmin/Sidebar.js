import React, { Fragment } from 'react'



const Sidebar = () => {

    return (
        <Fragment>
            <nav className="sidebar">
                <div className="profile">
                    <div className="profile-img">
                        {/* <img src="" alt="profile">  */}
                    </div>
                    <h3>Pust Library</h3>
                </div>

                <ul className="list-unstyled">
                    <li>
                        <a href="#listone" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle main-list">Dashboard</a>
                        <ul className="collapse list-unstyled sub-list" id="listone">
                            <li>
                                <a href="#">Items</a>
                            </li>
                            <li>
                                <a href="#">Items</a>
                            </li>
                            <li>
                                <a href="#">Items</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="main-list">All Books</a>
                    </li>
                    <li>
                        <a href="#users" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle main-list">Users</a>
                        <ul className="collapse list-unstyled sub-list" id="users">
                            <li>
                                <a href="#">Items</a>
                            </li>
                            <li>
                                <a href="#">Items</a>
                            </li>
                            <li>
                                <a href="#">Items</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#settings" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle main-list">Settings</a>
                        <ul className="collapse list-unstyled sub-list" id="settings">
                            <li>
                                <a href="#">Items</a>
                            </li>
                            <li>
                                <a href="#">Items</a>
                            </li>
                            <li>
                                <a href="#">Items</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
};

export default Sidebar;