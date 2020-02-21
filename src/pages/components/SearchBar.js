import React from 'react';
import SVGIcon from "../../images/SVGIcon";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as ColourLogoSvg } from '../../images/colour.svg';
import {ReactComponent as ClearButtonSvg} from '../../images/clear.svg';

class SearchBar extends React.Component{

    state = {
        textValue : ''
    }

    changeText = (e) => {
        this.setState({textValue : e.target.value});
        this.props.doUpdateSearchString(e.target.value);
    }

    render(){
        return(
            <div className="searchBarBackground">
                <Row className="WhiteBackground">
                    <Col xs={{span:6,order:1}} lg={{span:2,order:1}}>
                        <div> 
                            <a style={{ cursor: 'pointer' }} href={'/'} >
                                <ColourLogoSvg className="ml-4 mt-3" />  
                            </a>
                        </div>
                    </Col>
                    <Col xs={{span:12,order:3}} lg={{span:8,order:2}}>
                        <div>
                            <Container> 
                                <Row>
                                    <Col>
                                        <span className="SearchBarInputGrey">
                                            <span className="SearchInputIconGrey">
                                                <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" />
                                            </span>
                                            <span>
                                                <input type="text" placeholder="Search" id="SearchInputSpanGrey" onChange={this.changeText} onKeyDown={this.props.doSearchMethod} value={this.props.searchString} />
                                            </span>
                                            <span className="SearchInputClearGrey">
                                                <ClearButtonSvg />
                                            </span>
                                        </span>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs={{span:6,order:2}} lg={{span:2,order:3}}>
                        <div className="signLink">
                            <span className="Purple-14px">Sign in</span>
                        </div>
                    </Col>
                </Row>
                </div>
        );
    } 
}

export default SearchBar;