import React from 'react'
// import Styles from '../../DeptSettings/DeptSettings.module.css';
// import '../../DeptSettings/DeptSettings.module.css';
import Styles from '../../DeptProfile.module.css';
import '../../DeptProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';

const CoverPhoto = ()=>{
    return(
        <div className={Styles.eduHub__profile__image}>
            <div className={Styles.eduHub__profile__image_cover_image}>
                <img src={require('../../images/p.jpg')} alt='for good' />
                <div className={Styles.eduHub__profile__image_cover_image_overlay}>
                    <div className={Styles.eduHub__profile__image_cover_image_overlay_upload}>
                        <i>
                            <FontAwesomeIcon icon={faCamera} />
                            Upload
                        </i>
                    </div>
                </div>
            </div>
            <div className={Styles.eduHub__profile__image_profile_image}>
                <img src={require('../../images/rain-bus-1.jpg')} alt='profile picture good' />
                <div className={Styles.eduHub__profile__image_profile_image_overlay}>
                    <div className={Styles.eduHub__profile__image_cover_image_overlay_upload}>
                        <i>
                            <FontAwesomeIcon icon={faCamera} />
                        </i>
                        <span>Upload </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CoverPhoto;