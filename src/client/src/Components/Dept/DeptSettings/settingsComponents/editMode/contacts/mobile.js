import React,{Fragment,useState,useEffect} from 'react';
import {useSelector ,useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMobileAlt,
	faKeyboard,
	faAlignLeft,
	faPlus,
	faCheckCircle,
	faTimesCircle,
	faTrash,
    } from '@fortawesome/free-solid-svg-icons';
    import Styles from '../../../DeptSettings.module.css';
import {setContactMobileAdd,
    setNewContactMobileData,
    createContactMobileFieldAdd,
    createContactMobileFieldCancel,
    onChangeContactInput,
    onClickContactDelete
} from '../../../../../../actions/deptSettingsAction';
import ContactProfile from '../../viewMode/Contact';


export default function(){
    const contactMobileAdd = useSelector(state=>state.deptSettings.CONTACT_MOBILE_ADD);
    console.log(contactMobileAdd);
    //const contactsData = useSelector(state=>state.deptSettings.CONTACTS_DATA);
    const [contactsData, setContactsData] = useState(useSelector(state=>state.deptSettings.CONTACTS_DATA));
    console.log(contactsData);
    const newContactMobileData = useSelector(state=>state.deptSettings.NEW_CONTACT_MOBILE_DATA);
    console.log(newContactMobileData);
    const dispatch = useDispatch();
    return(
        <div className={Styles.update__hub__contact__method__div}>
            <div className={Styles.update__hub__contact_inner_heading}>
                <p>
                    <span>
                        <i>
                            <FontAwesomeIcon icon={faMobileAlt} />
                        </i>
                    </span>
                    Mobile
                    {/* {dept.contacts[1].method} */}
                </p>
                <span>
                    <i>
                        <FontAwesomeIcon onClick={e => dispatch(setContactMobileAdd(true))} icon={faPlus} />
                    </i>
                </span>
            </div>
            {contactMobileAdd && (
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
                                    value={newContactMobileData.number}
                                    onChange={(e) => dispatch(setNewContactMobileData(e))}
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
                                    value={newContactMobileData.description}
                                    onChange={(e) => dispatch(setNewContactMobileData(e))}
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
                                    onChange={(e) => dispatch(setNewContactMobileData(e))}
                                >
                                    {newContactMobileData.active ? (
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
                                <button className='btn-success' onClick={e => dispatch(createContactMobileFieldAdd(e))}>Add</button>
                                <button className='btn-warning' onClick={e => dispatch(createContactMobileFieldCancel(e))}>Cancel</button>
                            </span>
                        </li>
                    </ul>
                </div>
            )}
            {Object.entries(contactsData[1].numbers).map(([key,number]) => (
                <div className={Styles.update__hub__contact_list}>
                    <ul>
                        <li>
                            <i>
                                <FontAwesomeIcon icon={faKeyboard} />
                            </i>
                            <span>
                                <input
                                    type='text'
                                    name="mobile-number"
                                    value={number.number}
                                    // value="01745678913"
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
                                    name="mobile-description"
                                    value={number.description}
                                    // value="Register ofice, Pabna University of Science and Technology"
                                    onChange={(e) => dispatch(onChangeContactInput(e,key))}
                                />
                            </span>{' '}
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
                                    name='mobile-active'
                                    value={number.active}
                                    onChange={(e) => dispatch(onChangeContactInput(e,key))}
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Deactive</option>
                                </select>
                                <i>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(onClickContactDelete("mobile",key))} />
                                </i>
                            </span>
                        </li>
                    </ul>
                </div>)
            )}
        </div>
    )
}