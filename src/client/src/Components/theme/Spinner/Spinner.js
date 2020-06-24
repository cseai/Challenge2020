import React, { Fragment } from 'react';

const Spinner = () => {
	return (
		<Fragment>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignContent: 'center',
					background: 'transparent',
					height: '100vh',
					width: '100vw',
				}}
			>
				<img src={require('./../../theme/Spinner/Spin-0.8s-217px.svg')} alt='loading...' />
				{/* <ReactLoading type='spin' height={667} width={375} /> */}
			</div>
		</Fragment>
	);
};

export default Spinner;
