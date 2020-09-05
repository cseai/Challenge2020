import React,{useState} from 'react'
import {useSelector} from 'react-redux';

import Styles from '../../DeptSettings.module.css';

import {
	DeptProfileInfoContentIcon,
	DeptProfileAbout,
} from '../../DeptSettingsContainer';


function AboutUsProfile(){
    const [info, setInfo] = useState(false);
    const dept = useSelector(state=>state.dept.dept);
    return(
        <DeptProfileAbout className={Styles.eduHub__profile__about}>
            <DeptProfileInfoContentIcon
                onClick={() => setInfo(!info)}
                className={Styles.eduHub__profile__about_heading}
            >
                <div className={Styles.eduHub__profile__info_content_side}></div>
                <p>About Us</p>
            </DeptProfileInfoContentIcon>
            {info && (
                <div className={Styles.eduHub__profile__about_about_details}>
                    <p>{dept.shortDescription ? dept.shortDescription : `Nothing to show!`}</p>
                </div>
            )}
        </DeptProfileAbout>
    )
}

export default AboutUsProfile;