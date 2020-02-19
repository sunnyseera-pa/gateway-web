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
                    <div> 
                        <ColourLogoSvg className="ml-4" />  
                    </div>
                    <div className="temp">
                        <Container> 
                            <Row>
                                <Col sm={1} />
                                <Col sm={10}>
                                    <span className="SearchBarInputGrey">
                                        <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" className="ml-2 mr-3 mt-3" />
                                        <span>
                                            <input type="text" placeholder="Search" className="" id="SearchInputSpanGrey" onChange={this.changeText} onKeyDown={this.props.doSearchMethod} value={this.props.searchString} />
                                        </span>
                                        <ClearButtonSvg />
                                    </span>
                                </Col>
                                <Col sm={1} />
                            </Row>
                        </Container>
                    </div>
                    <div>
                        <span className="Purple-14px mr-4">Sign in | Sign up</span>
                    </div>
                </Row>
                </div>
        );
    } 
}

export default SearchBar;