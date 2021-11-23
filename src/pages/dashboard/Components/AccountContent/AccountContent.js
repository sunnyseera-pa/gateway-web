import React from 'react';
import { Col, Row } from 'react-bootstrap';

const LayoutContent = ({ children, ...outerProps }) => (
	<Row {...outerProps}>
		<Col xs={1}></Col>
		<Col xs={10}>{children}</Col>
		<Col xs={1}></Col>
	</Row>
);

export default LayoutContent;
