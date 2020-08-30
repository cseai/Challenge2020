import React, { Fragment } from 'react';
import Styles from './DashboardSection.module.css';

const DashboardSection = () =>{
    return (
        <Fragment>
            <div className={Styles.right__part_main}>
                <div>
                    <h2>Dashboard Section</h2>
                </div>
            </div>
        </Fragment>
    );
}

export default DashboardSection;