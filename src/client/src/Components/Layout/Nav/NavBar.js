import React, { Fragment } from 'react';
import Styles from './NavBar.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const NavBar = props => {
    const guestLink=(
        <ul className={Styles.nav__links}>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Dev</a></li>
            <li><a href="#">React</a></li>
        </ul>
    )
    const loginLink={

    }
    return (
        <Fragment>
            <header className="container-fluid">
                <div className={Styles.logo}>Edukos</div>
                <nav>
                    {guestLink}
                </nav>
            </header>
        </Fragment>
    )
}

// NavBar.propTypes = {

// }

// const mapStateToProps=({

// })

export default connect()(NavBar);
