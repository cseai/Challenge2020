import React,{Fragment} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Styles from './../DeptSettings.module.css';
import {
	setDetailSection,
	setMemberSection,
	setControllerSection,
	setCreateSection
} from '../../../../actions/deptSettingsAction'

export default ()=>{
    const dept = useSelector(state=>state.dept);
    const dispatch = useDispatch();
    return(
        <Fragment>
            <div className={Styles.hub__name__section}>
                <h2>{dept.name}</h2>
            </div>
            <div className={Styles.tab__section}>
                <div className={Styles.tab_section_inner_div}>
                    <button className={Styles.tab__section__button} value='detail' onClick={ () => dispatch(setDetailSection(true)) }>Details</button>
                </div>
                <div className={Styles.tab_section_inner_div}>
                    <button className={Styles.tab__section__button} value='member' onClick={ () => dispatch(setMemberSection(true)) }>Members</button>
                </div>
                <div className={Styles.tab_section_inner_div}>
                    <button className={Styles.tab__section__button} value='controller' onClick={ () => dispatch(setControllerSection(true)) }>Controllers</button>
                </div>
                <div className={Styles.tab_section_inner_div}>
                    <button className={Styles.tab__section__button} value='create' onClick={ () => dispatch(setCreateSection(true)) }>Create</button>
                </div>
            </div>
        </Fragment>
    )
}