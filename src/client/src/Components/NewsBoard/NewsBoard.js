import React, { Fragment } from 'react';
import Styles from './NewsBoard.module.css';
import Nav from './../Layout/Nav/NavBar';
import LeftSideBar from './../Layout/Leftbar/LeftSideBar';
import RightSideBar from './../Layout/Rightbar/RightSideBar';
const NewsBoard = () => {
	return (
		<Fragment>
			<Nav/>
			<main>
			<div className={Styles.main__section}>
				<div className="container">
					<div className={Styles.main__section_data}>
						<div className="row">
							<div className= "col-lg-3 col-xl-3 col-mid-2">
								<LeftSideBar/>
							</div>
							{/* <!-- mid --> */}
							<div className="col-lg-6 col-xl-6 col-mid-7 ">
								<div className={Styles.mid__part__data}>
									this is good part of the mid
								</div>
							</div>
							{/* <!-- right --> */}
							<div className="col-lg-3 col-xl-3 col-mid-3 ">
								<RightSideBar/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
		</Fragment>
	);
};

export default NewsBoard;
