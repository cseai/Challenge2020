import React, { Fragment } from 'react';
import Styles from './RightSideBar.module.css';
import PropTypes from 'prop-types';

const RightSideBar = props => {
    return (
        <Fragment>
            <div className={Styles.right__part__data}>
                <div className={Styles.right__part__data__links}>
                    <div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/work-24px.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div>
                    <div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/check.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div>
                    <div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/work-24px.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div>
                    <div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/check.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div><div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/work-24px.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div>
                    <div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/check.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div><div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/work-24px.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div>
                    <div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/check.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div><div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/work-24px.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div>
                    <div className={Styles.right__part__data__link}>
                        <img className={Styles.right__part__data__link_img} src={require("../icon/check.svg")} />
                        <a href="#" className={Styles.right__part__data__link_a}>Suggest Job</a>
                    </div>
                </div>
			</div>
        </Fragment>
    )
}

RightSideBar.propTypes = {

}

export default RightSideBar
