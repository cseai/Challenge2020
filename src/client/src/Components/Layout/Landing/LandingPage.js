import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Style from './LandingPage.module.css';
import {connect } from 'react-redux';
import { Link } from 'react-router-dom';


const LandingPage = () => {
    return (
        <Fragment>
            <div className={Style.landing__page}> </div>
            <div className={Style.landing__page_box}>
            <Link to='/login'><div  className={Style.landing__page_box_signin}>Login </div></Link>
            <Link to='/register'><div  className={Style.landing__page_box_signup}>Register</div></Link>
            </div>
            <div className={Style.brandname}>
                    <span>Powered By</span>
                    <h1>Pizzu</h1>
                </div>
        </Fragment>
    )
}

// LandingPage.propTypes = {

// }

export default connect()(LandingPage);
