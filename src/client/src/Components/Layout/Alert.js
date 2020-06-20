import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map((alert) => (
		<div key={alert.id}>
			{notify}
			{/* <div className='msg'>{alert.msg}</div> */}
		</div>
	));

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

const notify = () => {
	toast('Default!', { position: toast.POSITION.TOP_LEFT });
	toast.success('Success!', {
		position: toast.POSITION.TOP_CENTER,
		autoClose: 8000,
	});
	toast.info('Info!', {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: false,
	});
	toast.warn(<CustomToast />, {
		position: toast.POSITION.BOTTOM_LEFT,
	});
	toast.error('Error!', { position: toast.POSITION.BOTTOM_CENTER });
	toast('Wow so easy !', { position: toast.POSITION.BOTTOM_RIGHT });
};

const CustomToast = ({ closeToast }) => {
	return (
		<div>
			Something went wrong! <button onClick={closeToast}>Close</button>
		</div>
	);
};

export default connect(mapStateToProps)(Alert);
// className={`${alert.alertType}`}
