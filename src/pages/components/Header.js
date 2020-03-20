import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as ColourLogoSvg } from '../../images/colour.svg';
import { ReactComponent as ArrowDownSvg } from '../../images/stock.svg';

class Header extends React.Component {
    render() {
        return (
            <div className="searchBarBackground">
                <Row className="WhiteBackground">
                    <Col xs={10} lg={10}>
                        <div>
                            <a style={{ cursor: 'pointer' }} href={'/'} >
                                <ColourLogoSvg className="ml-4 mt-3" />
                            </a>
                        </div>
                    </Col>
                    <Col xs={2} lg={2} className="pl-5 pt-4">
                        <span className="Gray800-14px">User Name</span>
                        <span> <ArrowDownSvg /> </span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;

