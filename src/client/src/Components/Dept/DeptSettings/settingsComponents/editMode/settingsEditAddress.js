import React from 'react';
import Styles from '../../DeptSettings.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCity,faLocationArrow} from '@fortawesome/free-solid-svg-icons';

import {
    DeptProfileAbout,
    DeptProfileInfoContentIcon
} from '../../DeptSettingsContainer';
function Address(){

    return(
        <div className={Styles.update__hub__form_control}>
        <div className={Styles.update__hub__form_control_title}>
            <i><FontAwesomeIcon icon={faLocationArrow} /></i>
            <label>Address</label>
            {/* <span className={Styles.required}> * </span> */}
        </div>
        <div>
            <DeptProfileAbout
                className={Styles.update__hub__contact}
                style={{ border: 'none' }}
            >
                <ul>
                    <li>
                        <i>
                            <FontAwesomeIcon icon={faCity} />
                        </i>{' '}
                        <span> Rajapur ,6600, Pabna</span>
                    </li>
                </ul>
            </DeptProfileAbout>
            <DeptProfileInfoContentIcon className={Styles.update__hub__location_map}>
                <p>Use map</p>
            </DeptProfileInfoContentIcon>
        </div>
    </div>
    )
}
export default Address;