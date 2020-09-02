import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Styles from './../DeptSettings.module.css';
import {setDetailSectionEditOption} from '../../../../actions/deptSettingsAction';

export default ()=>{
    const preasent = useSelector(state=>state.deptSettings.DETAIL_SECTION_EDIT_OPTION);
    const buttonValue = useSelector(state=>state.deptSettings.DETAIL_SECTION_BUTTON_VALUE);
    const dispatch = useDispatch();
    return(
        <div className={Styles.detail__option__button__section}>
            <button className='' onClick={() => dispatch(setDetailSectionEditOption(!preasent))}>{buttonValue}</button>
        </div>
    )
}