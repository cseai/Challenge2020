import React,{Fragment} from 'react';

import ProfileInfo from './ProfileInfo';

import DeptMapProfile from './DeptMap';

import AboutUsProfile from './AboutUs';

import ContactProfile from './Contact';

import LocationProfile from './Location'

export default () => {
	return (
        <Fragment>
            {/* <!-- start code for here --> */}
                {/* <!-- user info --> */}
                <ProfileInfo />
            
                {/* map */}

                <DeptMapProfile />


                {/* <!-- About us section --> */}
                <AboutUsProfile />

                {/* <!-- Contacts Section --> */}
                
                <ContactProfile />

                {/*Location section*/}

                <LocationProfile />
        </Fragment>
	);
};


