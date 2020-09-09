import {
    SET_INFO,
    SET_CONTACT,
    SET_LOCATION,
    SET_DEPT_MAP,
    SET_DETAIL_SECTION,
    SET_MEMBER_SECTION,
    SET_CONTROLLER_SECTION,
    SET_CREATE_SECTION,
    SET_DETAIL_SECTION_EDIT_OPTION,
    SET_DETAIL_SECTION_BUTTON_VALUE,
    SET_CONTACTS_DATA,
    SET_NEW_CONTACT_EMAIL_DATA,
    SET_NEW_CONTACT_MOBILE_DATA,
    SET_NEW_CONTACT_PHONE_DATA,
    SET_FORM_DATA,
    SET_CONTACT_EMAIL_ADD,
    SET_CONTACT_MOBILE_ADD,
    SET_CONTACT_PHONE_ADD,
    CREATE_CONTACT_PHONE_FIELD_ADD,
    CREATE_CONTACT_PHONE_FIELD_CANCEL,
    CREATE_CONTACT_MOBILE_FIELD_ADD,
    CREATE_CONTACT_MOBILE_FIELD_CANCEL,
    CREATE_CONTACT_EMAIL_FIELD_ADD,
    CREATE_CONTACT_EMAIL_FIELD_CANCEL,
    ON_CHANGE_CONTACT_INPUT,
    ON_CLICK_CONTACT_DELETE
} from './types';


export const setInfo =(info)=>{
    return{
        type : SET_INFO,
        payload : info
    }
}
export const setContact =(contact)=>{
    return{
        type :SET_CONTACT,
        payload : contact

    }
}
export const setLocation =(location)=>{
    return{
        type : SET_LOCATION,
        payload : location
    }
}
export const setDeptMap =(deptMap)=>{
    return{
        type : SET_DEPT_MAP,
        payload : deptMap
    }
}
export const setDetailSection =(detailSection)=>{
    return{
        type : SET_DETAIL_SECTION,
        payload : detailSection
    }
}
export const setMemberSection =(memberSection)=>{
    return{
        type : SET_MEMBER_SECTION,
        payload : memberSection
    }
}
export const setControllerSection =(controllerSection)=>{
    return{
        type : SET_CONTROLLER_SECTION,
        payload : controllerSection
    }
}
export const setCreateSection =(createSection)=>{
    return{
        type : SET_CREATE_SECTION,
        payload : createSection
    }
}
export const setDetailSectionEditOption =(detailSectionEditOption,dept)=>{
    return{
        type : SET_DETAIL_SECTION_EDIT_OPTION,
        payload : detailSectionEditOption,
        dept:dept
    }
}
export const setDetailSectionButtonValue =(detailSectionButtonValue)=>{
    return{
        type : SET_DETAIL_SECTION_BUTTON_VALUE,
        payload : detailSectionButtonValue
    }
}
export const setContactPhoneAdd =(contactPhoneAdd)=>{
    return{
        type : SET_CONTACT_PHONE_ADD,
        payload : contactPhoneAdd
    }
}
export const setContactMobileAdd =(contactMobileAdd)=>{
    return{
        type : SET_CONTACT_MOBILE_ADD,
        payload : contactMobileAdd
    }
}
export const setContactEmailAdd =(contactEmailAdd )=>{
    return{
        type : SET_CONTACT_EMAIL_ADD,
        payload : contactEmailAdd
    }
}
export const setFormData =(formData)=>{
    return{
        type : SET_FORM_DATA,
        payload : formData
    }
}
export const setNewContactPhoneData =(newContactPhoneData)=>{
    return{
        type : SET_NEW_CONTACT_PHONE_DATA,
        payload : newContactPhoneData
    }
}
export const setNewContactMobileData =(newContactMobileData)=>{
    return{
        type : SET_NEW_CONTACT_MOBILE_DATA,
        payload : newContactMobileData
    }
}
export const setNewContactEmailData =(newContactEmailData)=>{
    return{
        type : SET_NEW_CONTACT_EMAIL_DATA,
        payload : newContactEmailData
    }
}
export const setContactsData =(contactsData)=>{
    return{
        type : SET_CONTACTS_DATA,
        payload : contactsData
    }
}


export const createContactPhoneFieldAdd = () =>{
    return{
        type : CREATE_CONTACT_PHONE_FIELD_ADD
    }
}
export const createContactPhoneFieldCancel=()=>{
    return{
        type: CREATE_CONTACT_PHONE_FIELD_CANCEL
    }
}

export const createContactMobileFieldAdd = () =>{
    return{
        type : CREATE_CONTACT_MOBILE_FIELD_ADD
    }
}
export const createContactMobileFieldCancel=()=>{
    return{
        type: CREATE_CONTACT_MOBILE_FIELD_CANCEL
    }
}


export const createContactEmailFieldAdd = () =>{
    return{
        type : CREATE_CONTACT_EMAIL_FIELD_ADD
    }
}
export const createContactEmailFieldCancel=()=>{
    return{
        type: CREATE_CONTACT_EMAIL_FIELD_CANCEL
    }
}





export const onChangeContactInput=(input,key)=>{
    return{
        type : ON_CHANGE_CONTACT_INPUT,
        payload : input,
        key : key
    }
}
export const onClickContactDelete=(input,key)=>{
    return{
        type : ON_CLICK_CONTACT_DELETE,
        payload: input,
        key : key
    }
}