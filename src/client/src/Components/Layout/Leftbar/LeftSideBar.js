import React, { Fragment } from 'react';
import Styles from './LeftSideBar.module.css';
import { Link } from 'react-router-dom';
import { LeftPartData } from './LeftSideBarContainer';

// import PropTypes from 'prop-types';

const LeftSideBar = (props) => {
	return (
		<Fragment>
			<LeftPartData>
				<div className={Styles.left__part__data__links}>
					<div className={Styles.left__part__data__links__link}>
						<img
							className={Styles.left__part__data__link_img}
							src={require('./../icon/account_balance-24px.svg')}
							alt='for good  '
						/>
						<Link to='/' className={Styles.left__part__data__link_a}>
							Home
						</Link>
					</div>
					<div className={Styles.left__part__data__links__link}>
						<img
							className={Styles.left__part__data__link_img}
							src={require('./../icon/clipboard-list.svg')}
							alt='  for good'
						/>
						<Link to='/' className={Styles.left__part__data__link_a}>
							Dept of CSE
						</Link>
					</div>
					<div className={Styles.left__part__data__links__link}>
						<img
							className={Styles.left__part__data__link_img}
							src={require('./../icon/clipboard-list.svg')}
							alt=' for good'
						/>
						<Link to='/' className={Styles.left__part__data__link_a}>
							Dept
						</Link>
					</div>
					<div className={Styles.left__part__data__links__link}>
						<img
							className={Styles.left__part__data__link_img}
							src={require('./../icon/clipboard-list.svg')}
							alt=' for good'
						/>
						<Link to='/' className={Styles.left__part__data__link_a}>
							Dept
						</Link>
					</div>
					<div className={Styles.left__part__data__links__link}>
						<img
							className={Styles.left__part__data__link_img}
							src={require('./../icon/clipboard-list.svg')}
							alt=' for good'
						/>
						<Link to='/' className={Styles.left__part__data__link_a}>
							Dept
						</Link>
					</div>
					<div className={Styles.left__part__data__links__link}>
						<img
							className={Styles.left__part__data__link_img}
							src={require('./../icon/clipboard-list.svg')}
							alt=' for good'
						/>
						<Link to='/' className={Styles.left__part__data__link_a}>
							Dept
						</Link>
					</div>
					<div className={Styles.left__part__data__links__link}>
						<img
							className={Styles.left__part__data__link_img}
							src={require('./../icon/clipboard-list.svg')}
							alt=' for good'
						/>
						<Link to='/' className={Styles.left__part__data__link_a}>
							Dept
						</Link>
					</div>
					<div className={Styles.left__part__data__links__link}>
						<img
							className={Styles.left__part__data__link_img}
							src={require('./../icon/clipboard-list.svg')}
							alt=' for good'
						/>
						<Link to='/' className={Styles.left__part__data__link_a}>
							Dept
						</Link>
					</div>
				</div>
			</LeftPartData>
		</Fragment>
	);
};

LeftSideBar.propTypes = {};

export default LeftSideBar;
