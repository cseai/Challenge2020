import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import './LibraryAdmin.css'

import Sidebar from './Sidebar'
import Content from './Content'


const LibraryAdmin = ({history}) =>{


    return (
        <Fragment>
            <div>
                <div className="header">
                    <h1>Edukos</h1>
                </div>
                <div className="grid-container">
                    {/* sidebar  */}
                    <Sidebar />
                    {/* content  */}
                    <Content />
                </div>
            </div>
        </Fragment>
    );
};


export default connect()(LibraryAdmin);
