import React,{Fragment} from 'react';
import {useSelector ,useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPhoneAlt,
	faKeyboard,
	faAlignLeft,
	faMobileAlt,
	faEnvelope,
	faAt,
	faPlus,
	faCheckCircle,
	faTimesCircle,
	faTrash,
    } from '@fortawesome/free-solid-svg-icons';
    import Styles from '../../../DeptSettings.module.css';
import {setContactPhoneAdd,
    setNewContactPhoneData,
    createContactPhoneFieldAdd,
    createContactPhoneFieldCancel,
    onChangeContactInput,
    onClickContactDelete
} from '../../../../../../actions/deptSettingsAction';
import ContactProfile from '../../viewMode/Contact';



export default function(){
    
    const contactPhoneAdd = useSelector(state=>state.deptSettings.CONTACT_PHONE_ADD);
    console.log(contactPhoneAdd);
    const contactsData = useSelector(state=>state.deptSettings.CONTACTS_DATA);
    console.log(contactsData);
    const newContactPhoneData = useSelector(state=>state.deptSettings.NEW_CONTACT_PHONE_DATA);
    console.log(newContactPhoneData);
    const dispatch = useDispatch();



    return(
        <div id="contactPhoneDiv" className={Styles.update__hub__contact__method__div}>
            <div className={Styles.update__hub__contact_inner_heading}>
                <p>
                    <span>
                        <i>
                            <FontAwesomeIcon icon={faPhoneAlt} />
                        </i>
                    </span>{' '}
                    Phone
                    {/* {dept.contacts[0].method} */}
                </p>
                <span>
                    <i>
                        <FontAwesomeIcon onClick={ ()=> dispatch(setContactPhoneAdd(true))} icon={faPlus} />
                    </i>
                </span>
            </div>
            {contactPhoneAdd && (
                <div className={Styles.update__hub__contact_list}>
                    <ul>
                        <li>
                            <i>
                                <FontAwesomeIcon icon={faKeyboard} />
                            </i>
                            <span>
                                <input
                                    type='text'
                                    name="number"
                                    required
                                    value={newContactPhoneData.number}
                                    onChange={(e) => dispatch(setNewContactPhoneData(e))}
                                />
                            </span>
                        </li>
                        <li>
                            <i>
                                <FontAwesomeIcon icon={faAlignLeft} />
                            </i>
                            <span>
                                <textarea 
                                    type='text'
                                    name="description"
                                    value={newContactPhoneData.description}
                                    onChange={(e) => dispatch(setNewContactPhoneData(e))}
                                />
                            </span>
                        </li>
                        <li>
                            <i>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </i>
                            <span>
                                <select
                                    name="active"
                                    onChange={(e) => dispatch(setNewContactPhoneData(e))}
                                >
                                    {newContactPhoneData.active ? (
                                        <Fragment>
                                            <option value={true} selected >Active</option>
                                            <option value={false}>Deactive</option>
                                        </Fragment>
                                    ):(
                                        <Fragment>
                                            <option value={true}>Active</option>
                                            <option value={false} selected >Deactive</option>
                                        </Fragment>
                                    )}
                                </select>
                                <button className='btn-success' onClick={() => dispatch(createContactPhoneFieldAdd())}>Add</button>
                                <button className='btn-warning' onClick={() => dispatch(createContactPhoneFieldCancel())}>Cancel</button>
                            </span>
                        </li>
                    </ul>
                </div>
            )}
            {Object.entries(contactsData[0].numbers).map(([key,number]) => (
                <div className={Styles.update__hub__contact_list}>
                    <ul>
                        <li>
                            <i>
                                <FontAwesomeIcon icon={faKeyboard} />
                            </i>
                            <span>
                                <input
                                    type='text'
                                    name="number"
                                    value={number.number}
                                    // value="1784394509"
                                    onChange={(e) => dispatch(onChangeContactInput(e,key))}
                                />
                            </span>
                        </li>
                        <li>
                            <i>
                                <FontAwesomeIcon icon={faAlignLeft} />
                            </i>
                            <span>
                                <textarea 
                                    type='text'
                                    name="description"
                                    key = {key}
                                    value={number.description}
                                    // value="Register ofice, Pabna University of Science and Technology"
                                    onChange={(e) => dispatch(onChangeContactInput(e,key))}
                                />
                            </span>
                        </li>
                        <li>
                            <i>
                                {number.active ? (
                                <FontAwesomeIcon icon={faCheckCircle} />
                                ):(
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                )}
                            </i>
                            <span>
                                <select
                                    name="active"
                                    key = {key}
                                    value={number.active}
                                    onChange={(e) => dispatch(onChangeContactInput(e,key))}
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Deactive</option>
                                </select>
                                <i>
                                    <FontAwesomeIcon icon={faTrash} key = {key} onClick={(e) => dispatch(onClickContactDelete(e,key))} />
                                </i>
                            </span>
                        </li>
                    </ul>
                </div>)
            )}
        </div>
    )
}