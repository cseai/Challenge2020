import React, { Fragment } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import AllLinks from './AllLinks';
import Links from './Links';

const linkStyle = {
	backgroundColor: 'white',
	height: '100vh',
	width: '100vw',
	color: 'blue !important',
	all: 'unset',
	fontSize: '20px',
};

const LinksPage = () => {
	return (
		<Fragment>
			<div style={linkStyle}>
				<Container style={{ paddinTop: '50px' }}>
					<Row>
						<Col>
							<Tab.Container id='left-tabs-example' defaultActiveKey='first'>
								<Row>
									<Col sm={3}>
										<Nav variant='pills' className='flex-column'>
											<Nav.Item>
												<Nav.Link eventKey='first' variant='success' style={{ color: 'black' }}>
													Home
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link
													eventKey='second'
													variant='success'
													style={{ color: 'black' }}
												>
													Dept
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey='third' variant='success' style={{ color: 'black' }}>
													Library
												</Nav.Link>
											</Nav.Item>
										</Nav>
									</Col>
									<Col sm={9}>
										<Tab.Content>
											<Tab.Pane eventKey='first'>
												<Links depts={AllLinks.home} />
											</Tab.Pane>
											<Tab.Pane eventKey='second'>
												<Links depts={AllLinks.depts} />
											</Tab.Pane>
											<Tab.Pane eventKey='third'>
												<Links depts={AllLinks.librarys} />
											</Tab.Pane>
										</Tab.Content>
									</Col>
								</Row>
							</Tab.Container>
						</Col>
					</Row>
				</Container>
			</div>
		</Fragment>
	);
};

export default LinksPage;
