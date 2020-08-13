
export const onChangeNewContactPhoneData = (e,newContactPhoneData,setNewContactPhoneData) => {
    if(e.target.name === 'number' || e.target.name === 'description'){
        setNewContactPhoneData({...newContactPhoneData, [e.target.name]: e.target.value});
        console.log(e.target.name, e.target.value, e.target);
    }
    else if(e.target.name === 'active'){
        setNewContactPhoneData({...newContactPhoneData, [e.target.name]: JSON.parse(e.target.value)});
        console.log(e.target.name, e.target.value, e.target);
    }
    console.log(newContactPhoneData);
    console.log(newContactPhoneData[e.target.name]);
}

export const onChangeNewContactMobileData = (e,newContactMobileData,setNewContactMobileData) => {
    if(e.target.name === 'number' || e.target.name === 'description'){
        setNewContactMobileData({...newContactMobileData, [e.target.name]: e.target.value});
        console.log(e.target.name, e.target.value, e.target);
    }
    else if(e.target.name === 'active'){
        setNewContactMobileData({...newContactMobileData, [e.target.name]: JSON.parse(e.target.value)});
        console.log(e.target.name, e.target.value, e.target);
    }
    console.log(newContactMobileData);
    console.log(newContactMobileData[e.target.name]);
}

export const onChangeNewContactEmailData = (e,newContactEmailData, setNewContactEmailData) => {
    if(e.target.name === 'number' || e.target.name === 'description'){
        setNewContactEmailData({...newContactEmailData, [e.target.name]: e.target.value});
        console.log(e.target.name, e.target.value, e.target);
    }
    else if(e.target.name === 'active'){
        setNewContactEmailData({...newContactEmailData, [e.target.name]: JSON.parse(e.target.value)});
        console.log(e.target.name, e.target.value, e.target);
    }
    console.log(newContactEmailData);
    console.log(newContactEmailData[e.target.name]);
}