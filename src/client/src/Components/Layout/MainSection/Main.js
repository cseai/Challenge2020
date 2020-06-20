import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Styles from './Main.module.css';
import { MainStyle } from './MainContainer';
import ThemeChanger from './../../theme/ThemeChanger/ThemeChanger';
import Nav from './../Nav/NavBar';
import LeftSideBar from './../Leftbar/LeftSideBar';
import RightSideBar from './../Rightbar/RightSideBar';

const Main = ({ eduhub }) => {
	return (
		<Fragment>
			<Nav />
			<ThemeChanger />
			<div className={Styles.main_div}>
				<div className={Styles.main__section}>
					<div className='container'>
						<div className={Styles.main__section_data}>
							<div className='row'>
								<div className='col-lg-3 col-xl-3 col-mid-2'>
									<LeftSideBar />
								</div>
								{/* <!-- mid --> */}
								<div className='col-lg-6 col-xl-6 col-mid-7 '>
									<div className={Styles.mid__part__data}>{eduhub}</div>
								</div>
								{/* <!-- right --> */}
								<div className='col-lg-3 col-xl-3 col-mid-3 '>
									<RightSideBar />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Main.propTypes = {};

export default Main;
