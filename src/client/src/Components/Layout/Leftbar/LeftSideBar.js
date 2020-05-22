import React, { Fragment } from 'react';
import Styles from './LeftSideBar.module.css';
import PropTypes from 'prop-types';

const LeftSideBar = props => {
    return (
        <Fragment>
            <div className={Styles.left__part__data}>
                <div className={Styles.left__part__data__links}>
                    <div className={Styles.left__part__data__links__link}>
                        <img
                            className={Styles.left__part__data__link_img}
                            src={require("./../icon/account_balance-24px.svg")}
                        />
                        <a className={Styles.left__part__data__link_a} >Home</a>
                    </div>
                    <div className={Styles.left__part__data__links__link}>
                        <img className={Styles.left__part__data__link_img} src={require("./../icon/clipboard-list.svg")} />
                        <a className={Styles.left__part__data__link_a}>Dept of CSE</a>
                    </div>
                    <div className={Styles.left__part__data__links__link}>
                        <img className={Styles.left__part__data__link_img} src={require("./../icon/clipboard-list.svg")} />
                        <a className={Styles.left__part__data__link_a}>Dept</a>
                    </div>
                    <div className={Styles.left__part__data__links__link}>
                        <img className={Styles.left__part__data__link_img} src={require("./../icon/clipboard-list.svg")} />
                        <a className={Styles.left__part__data__link_a}>Dept</a>
                    </div>
                    <div className={Styles.left__part__data__links__link}>
                        <img className={Styles.left__part__data__link_img} src={require("./../icon/clipboard-list.svg")} />
                        <a className={Styles.left__part__data__link_a}>Dept</a>
                    </div>
                    <div className={Styles.left__part__data__links__link}>
                        <img className={Styles.left__part__data__link_img} src={require("./../icon/clipboard-list.svg")}/>
                        <a className={Styles.left__part__data__link_a}>Dept</a>
                    </div>
                    <div className={Styles.left__part__data__links__link}>
                        <img className={Styles.left__part__data__link_img}  src={require("./../icon/clipboard-list.svg")} />
                        <a className={Styles.left__part__data__link_a}>Dept</a>
                    </div>
                    <div className={Styles.left__part__data__links__link}>
                        <img className={Styles.left__part__data__link_img} src={require("./../icon/clipboard-list.svg")}/>
                        <a className={Styles.left__part__data__link_a}>Dept</a>
                    </div>
                </div>
			</div>
        </Fragment>
    )
}

LeftSideBar.propTypes = {

}

export default LeftSideBar
