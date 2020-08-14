export const createContactPhoneField = (e,setContactPhoneAdd) => {
    setContactPhoneAdd(true);
}


export const createContactPhoneFieldAdd = (e,newContactPhoneData,setNewContactPhoneData,contactsData, setContactsData,setContactPhoneAdd) => {
    console.log(newContactPhoneData);
    // Check Data Validity
    if(newContactPhoneData.number !== ''){
        // Do Somthing Here
        console.log('Data is OK');
        contactsData[0].numbers.push({...newContactPhoneData});
        setContactsData(contactsData);
        console.log(contactsData[0].numbers);
        setNewContactPhoneData({
            number: '',
            description: '',
            active: true
        });
        setContactPhoneAdd(false);
    }
}

export const createContactMobileField = (e,setContactMobileAdd) => {
    setContactMobileAdd(true);
}

export const createContactMobileFieldAdd = (e,newContactMobileData,setNewContactMobileData,contactsData, setContactsData,setContactMobileAdd) => {
    console.log(newContactMobileData);
    // Check Data Validity
    if(newContactMobileData.number !== ''){
        // Do Somthing Here
        console.log('Data is OK');
        contactsData[1].numbers.push({...newContactMobileData});
        setContactsData(contactsData);
        console.log(contactsData[2].numbers);
        setNewContactMobileData({
            number: '',
            description: '',
            active: true
        });
        setContactMobileAdd(false);
    }
}

export const createContactEmailField = (e,setContactEmailAdd) => {
    setContactEmailAdd(true);
}

export const createContactEmailFieldAdd = (e,newContactEmailData, setNewContactEmailData,contactsData, setContactsData,setContactEmailAdd) => {
    console.log(newContactEmailData);
    // Check Data Validity
    if(newContactEmailData.number !== ''){
        // Do Somthing Here
        console.log('Data is OK');
        contactsData[2].numbers.push({...newContactEmailData});
        setContactsData(contactsData);
        console.log(contactsData[2].numbers);
        setNewContactEmailData({
            number: '',
            description: '',
            active: true
        });
        setContactEmailAdd(false);
    }
}