import React, { Fragment } from 'react';

const BooksDetailsModal = ({ closeButton }) => {
	return (
		<Fragment>
			<div
				style={{
					position: 'fixed',
					zIndex: '22',
					width: '100vw',
					height: '100vh',
					background: 'black',
					opacity: '0.5',
					paddingTop: '10px',
				}}
				onClick={() => closeButton()}
			></div>
			<div
				style={{
					position: 'fixed',
					zIndex: '100',
					background: 'white',
					width: '90vw !important',
					height: 'auto',
					margin: '0 auto',
					opacity: '1',
					transform: 'translate(-50%, 0)',
					left: '50%',
					width: '90%',
				}}
			>
				<div style={{ background: 'red' }} onClick={() => closeButton()}>
					header
				</div>
				<div style={{}}>body</div>
			</div>
		</Fragment>
	);
};

export default BooksDetailsModal;
