import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from './ThemeChanger.module.css';
import { ThemeModeDark,ThemeModeLight } from './ThemeChangerContainer';
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
					<ThemeModeLight onClick={() => themeChange('light')}>
						<FontAwesomeIcon icon={faSun} size='3x' type='button' />
					</ThemeModeLight>
					<ThemeModeDark onClick={() => themeChange('dark')}>
						<FontAwesomeIcon icon={faMoon} size='3x' type='button' />
					</ThemeModeDark>
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
