import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import './LibraryAdmin.css'

import Sidebar from './Sidebar'
import Content from './Content'

// Sub Components
import LibraryHome from './SubComponents/Home/LibraryHomeSection';
import DashboardSection from './SubComponents/Dashboard/DashboardSection';
import UserSection from './SubComponents/User/UserSection';
import BookSection from './SubComponents/Book/BookSection';
import ResourceSection from './SubComponents/Resource/ResourceSection';
import SettingSection from './SubComponents/Setting/SettingSection';


const LibraryAdmin = ({history}) =>{
    const [librarySection, setLibrarySection] = useState(true);
    const [dashboardSection, setDashboardSection] = useState(false);
    const [userSection, setUserSection] = useState(false);
    const [bookSection, setBookSection] = useState(false);
    const [resourceSection, setResourceSection] = useState(false);
    const [settingSection, setSettingSection] = useState(false);

    const [activeSection, setActiveSection] = useState('library');

    // Set all section state value false
    const setAllSectionValueFalse = () => {
        setLibrarySection(false);
        setDashboardSection(false);
        setUserSection(false);
        setBookSection(false);
        setResourceSection(false);
        setSettingSection(false);
    };


    const updateSection = (section) => {
        if(section === 'library'){
            setAllSectionValueFalse();
            setLibrarySection(true);
            setActiveSection(section);
        } else if(section === 'dashboard'){
            setAllSectionValueFalse();
            setDashboardSection(true);
            setActiveSection(section);
        } else if(section === 'user'){
            setAllSectionValueFalse();
            setUserSection(true);
            setActiveSection(section);
        } else if(section === 'book'){
            setAllSectionValueFalse();
            setBookSection(true);
            setActiveSection(section);
        } else if(section === 'resource'){
            setAllSectionValueFalse();
            setResourceSection(true);
            setActiveSection(section);
        } else if(section === 'setting'){
            setAllSectionValueFalse();
            setSettingSection(true);
            setActiveSection(section);
        }
    };

    return (
        <Fragment>
            <div className="body">
                <div className="header">
                    <h1>Edukos</h1>
                </div>
                <div className="grid-container">
                    {/* sidebar  */}
                    <Sidebar activeSection={activeSection} updateSection={updateSection} />
                    {/* content  */}
                    {
                        dashboardSection && (<DashboardSection />) ? (<DashboardSection />) :
                        userSection && (<UserSection />) ? (<UserSection />) :
                        bookSection && (<BookSection />) ? (<BookSection />) :
                        resourceSection && (<ResourceSection />) ? (<ResourceSection />) :
                        settingSection && (<SettingSection />) ? (<SettingSection />) :
                        (<LibraryHome />)
                    }
                </div>
            </div>
        </Fragment>
    );
};


export default connect()(LibraryAdmin);
