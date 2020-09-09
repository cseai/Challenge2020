import React from 'react';
import Styles from '../../DeptSettings.module.css';
import {useSelector,useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {setFormData} from '../../../../../actions/deptSettingsAction';

import {
	ProfileIcon,
	CreateProfileFormControlInField,
} from '../../DeptSettingsContainer';
function Established(){
    let since = useSelector(state=> state.deptSettings.FORM_DATA.since);
    const dispatch = useDispatch();

    console.log(since);

    return(
        <div className={Styles.update__hub__form_control}>
            <div className={Styles.update__hub__form_control_title}>
                <label>Established</label>
                {/* <span className='required'> * </span> */}
            </div>
            <div className={Styles.update__hub__form_control_in}>
                <div className={Styles.update__hub__form_control_in_left}>
                    <ProfileIcon>
                        <FontAwesomeIcon icon={faCalendar} />
                    </ProfileIcon>
                </div>
                <CreateProfileFormControlInField
                    type='date'
                    className={Styles.update__hub__form_control_in_field}
                    name='since'
                    value={since}
                    onChange={(e) => dispatch(setFormData(e))}
                />
            </div>
        </div>
    )
}
export default Established;