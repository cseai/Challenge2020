import React,{useState,Fragment} from 'react';


import Styles from '../../DeptProfile.module.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faLocationArrow,
	faCity,
} from '@fortawesome/free-solid-svg-icons';


import {
	DeptProfileInfoContentIcon,
	DeptProfileAbout
} from '../../DeptProfileContainer';


function LocationProfile(props){
    const dept = props.dept;
    const [location, setLocation] = useState(false);
    return(
        <DeptProfileAbout className={Styles.eduHub__profile__location}>
            <DeptProfileInfoContentIcon
                className={Styles.eduHub__profile__location_heading}
                onClick={() => setLocation(!location)}
            >
                <div className={Styles.eduHub__profile__info_content_side}></div>
                <p>Location</p>
            </DeptProfileInfoContentIcon>
            {location && (
                <Fragment>
                    <div className={Styles.eduHub__profile__contact_inner_heading}>
                        <p>
                            <i>
                                <FontAwesomeIcon icon={faLocationArrow} />
                            </i>
                            <span>Address</span>{' '}
                        </p>
                    </div>
                    <DeptProfileAbout
                        className={Styles.eduHub__profile__contact}
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
                    <DeptProfileInfoContentIcon className={Styles.eduHub__profile__location_map}>
                        <p>Use map</p>
                    </DeptProfileInfoContentIcon>
                </Fragment>
            )}
        </DeptProfileAbout>
    )
}
export default LocationProfile;