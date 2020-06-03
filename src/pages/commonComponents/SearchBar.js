import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import { ReactComponent as ColourLogoSvg } from '../../images/colour.svg';
import { ReactComponent as ClearButtonSvg } from '../../images/clear.svg';

import UserMenu from './UserMenu';
import { cmsURL } from '../../configs/url.config';

class SearchBar extends React.Component {

    state = {
        textValue: '',
        userState: [{
            loggedIn: false,
            role: "Reader",
            id: null,
            name: null
        }]
    }

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
    }

    onSearch = (e) => {
        this.setState({ textValue: e.target.value});
        this.props.doUpdateSearchString(e.target.value);
    }

    render() {
        const { userState } = this.state;
        
        return (
                <div className="searchBarBackground">
                    <Row className="WhiteBackground">
                        <Col xs={{ span: 6, order: 1 }} lg={{ span: 2, order: 1 }}>
                            <div>
                                <a style={{ cursor: 'pointer' }} href={cmsURL} >
                                    <ColourLogoSvg className="ml-4 mt-3" />
                                </a>
                            </div>
                        </Col>
                        <Col xs={{ span: 12, order: 3 }} lg={{ span: 8, order: 2 }}>
                            <div>
                                <Container>
                                    <Row>
                                        <Col>
                                            <span className="searchBarInputGrey">
                                                <span className="searchInputIconGrey">
                                                    <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" />
                                                </span>
                                                <span>
                                                    <input type="text" placeholder="Search" id="searchInputSpanGrey" data-testid="searchbar" onChange={this.onSearch} onKeyDown={this.props.doSearchMethod} value={this.props.searchString} />
                                                </span>
                                                {(this.props.searchString != '' && this.props.searchString != undefined) ?
                                                    <span className="searchInputClearGrey" data-testid="searchbar-clear-btn">
                                                        <a style={{ cursor: 'pointer' }} href={'/search?search='} >
                                                            <ClearButtonSvg />
                                                        </a>
                                                    </span> : null}
                                            </span>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={{ span: 6, order: 2 }} lg={{ span: 2, order: 3 }}>
                            <div className="signLink">
                                <UserMenu userState={userState} />
                            </div>
                        </Col>
                    </Row>
                </div>
        );
    }
}

export default SearchBar;