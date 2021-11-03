import React from 'react';
import { Col, Row } from 'react-bootstrap';

const AccountContent = ({ children }) => (
	<Row>
		<Col xs={1}></Col>
		<Col xs={10}>{children}</Col>
		<Col xs={1}></Col>
	</Row>
);

export default AccountContent;
