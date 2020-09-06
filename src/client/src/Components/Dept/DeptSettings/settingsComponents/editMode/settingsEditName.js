import React from 'react';
import Styles from '../../DeptSettings.module.css';
import {useSelector,useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUniversity} from '@fortawesome/free-solid-svg-icons';
import {setFormData} from '../../../../../actions/deptSettingsAction';

import {
	ProfileIcon,
	CreateProfileFormControlInField,
} from '../../DeptSettingsContainer';
function Name(){
    let name = useSelector(state=> state.deptSettings.FORM_DATA.name);
    const dispatch = useDispatch();

    console.log(name);

    return(
        <div className={Styles.update__hub__form_control}>
            <div className={Styles.update__hub__form_control_title}>
                <label>Name</label>
                <span className={Styles.required}> * </span>
            </div>
            <div className={Styles.update__hub__form_control_in}>
                <div className={Styles.update__hub__form_control_in_left}>
                    <ProfileIcon>
                        <FontAwesomeIcon icon={faUniversity} />
                    </ProfileIcon>
                </div>
                <CreateProfileFormControlInField
                    type='text'
                    className={Styles.update__hub__form_control_in_field}
                    name='name'
                    value={name}
                    onChange={(e) => dispatch(setFormData(e))}
                />
            </div>
        </div>
    )
}
export default Name;