export const onClickContactDelete = (e, method, number_index,contactsData, setContactsData) => {
    if(method==='phone'){
        console.log(contactsData[0]);
        contactsData[0].numbers.splice(number_index, 1);
        setContactsData({...contactsData});
        console.log(contactsData[0]);
    }else if(method==='mobile'){
        console.log(contactsData[1]);
        contactsData[1].numbers.splice(number_index, 1);
        setContactsData({...contactsData});
        console.log(contactsData[1]);
    }else if(method==='email'){
        console.log(contactsData[2]);
        contactsData[2].numbers.splice(number_index, 1);
        setContactsData({...contactsData});
        console.log(contactsData[2]);
    }
}

export const createContactPhoneFieldCancel = (e,setContactPhoneAdd,setNewContactPhoneData) => {
    setContactPhoneAdd(false);
    setNewContactPhoneData({
        number: '',
        description: '',
        active: true
    });
}

export const createContactMobileFieldCancel = (e,setContactMobileAdd) => {
    setContactMobileAdd(false);
}
export const createContactEmailFieldCancel = (e,setContactEmailAdd) => {
    setContactEmailAdd(false);
}