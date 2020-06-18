import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from './ThemeChanger.module.css';
import { ThemeMode } from './ThemeChangerContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faAdjust } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { themeMode } from './../../../actions/configAction';

const ThemeChanger = ({ themeMode }) => {
	const [toggle, setToggle] = useState(false);
	const themeChange = (value) => {
		window.localStorage.setItem('theme', value);
		if (window.localStorage.getItem('theme') === 'dark') {
			setToggle(true);
			console.log(toggle);
		}
		themeMode(value);
	};

	return (
		<Fragment>
			<div className={styled.theme__changer}>
				<div className={styled.toggle}>
					<div className={styled.theme__changer_light} onClick={() => themeChange('light')}>
						<FontAwesomeIcon icon={faSun} color='#ccc' size='3x' type='button' />
					</div>
					<div className={styled.theme__changer_dark} onClick={() => themeChange('dark')}>
						<FontAwesomeIcon icon={faMoon} color='black' size='3x' type='button' />
					</div>
				</div>
			</div>
			{/* <div className={styled.toggleChange}>
				<ThemeMode>
					<FontAwesomeIcon icon={faAdjust} size='3x' type='button' onClick={() => setToggle(!toggle)} />
				</ThemeMode>
			</div> */}
		</Fragment>
	);
};

ThemeChanger.propTypes = {
	themeMode: PropTypes.func.isRequired,
};

export default connect(null, { themeMode })(ThemeChanger);
