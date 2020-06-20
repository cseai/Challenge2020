import React, { Fragment } from 'react';
import Styles from './RightSideBar.module.css';
import { RightPartData, RightPartDataLink } from './RightSideBarContainer';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const RightSideBar = (props) => {
	return (
		<Fragment>
			<RightPartData>
				<div className={Styles.right__part__data__links}>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/work-24px.svg')}
							alt='for good'
						/>
						<Link className={Styles.right__part__data__link_a} to='/'>
							Suggest Job
						</Link>
					</RightPartDataLink>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/check.svg')}
							alt='for good'
						/>
						<Link to='/' className={Styles.right__part__data__link_a}>
							Suggest Job
						</Link>
					</RightPartDataLink>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/work-24px.svg')}
							alt='for good'
						/>
						<Link to='/' className={Styles.right__part__data__link_a}>
							Suggest Job
						</Link>
					</RightPartDataLink>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/check.svg')}
							alt='for good'
						/>
						<Link to='/' className={Styles.right__part__data__link_a}>
							Suggest Job
						</Link>
					</RightPartDataLink>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/work-24px.svg')}
							alt='for good'
						/>
						<Link to='/' className={Styles.right__part__data__link_a}>
							Suggest Job
						</Link>
					</RightPartDataLink>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/check.svg')}
							alt='for good'
						/>
						<Link to='/' className={Styles.right__part__data__link_a}>
							Suggest Job
						</Link>
					</RightPartDataLink>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/work-24px.svg')}
							alt='for good'
						/>
						<Link to='/' className={Styles.right__part__data__link_a}>
							Suggest Job
						</Link>
					</RightPartDataLink>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/check.svg')}
							alt='for good'
						/>
						<Link to='/' className={Styles.right__part__data__link_a}>
							Suggest Job
						</Link>
					</RightPartDataLink>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/work-24px.svg')}
							alt='for good'
						/>
						<Link to='/' className={Styles.right__part__data__link_a}>
							Suggest Job
						</Link>
					</RightPartDataLink>
					<RightPartDataLink className={Styles.right__part__data__link}>
						<img
							className={Styles.right__part__data__link_img}
							src={require('../icon/check.svg')}
							alt='for good'
						/>
						<Link to='/' className={Styles.right__part__data__link_a}>
							Suggest Job
						</Link>
					</RightPartDataLink>
				</div>
			</RightPartData>
		</Fragment>
	);
};

RightSideBar.propTypes = {};

export default RightSideBar;
