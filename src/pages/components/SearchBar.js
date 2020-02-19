import React from 'react';
import SVGIcon from "../../images/SVGIcon";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as ColourLogoSvg } from '../../images/colour.svg';
import {ReactComponent as ClearButtonSvg} from '../../images/clear.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Tool from '../components/Tool';

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
                <Row className="WhiteBackground">
                    <Col sm={4} className="mt-2 ml-4"> <ColourLogoSvg /> </Col>
                    <Col sm={7} >
                        <div>
                            <div id="searchInputHolder" className="form-control"> 
                                <Row>
                                    <Col sm={1}> 
                                        <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit" className="ml-1 mr-1 mt-2" /> 
                                    </Col>
                        
                                    <Col sm={10}>
                                        <span>
                                            <input type="text" placeholder=" Search" className="SearchBarInput" id="NavSearchInputSpan" onChange={this.changeText} onKeyDown={this.props.doSearchMethod} value={this.props.searchString}> 
                                            </ input>
                                        </span>
                                    </Col>

                                    <Col sm={1} className="mt-2"> 
                                        <ClearButtonSvg />
                                    </Col>

                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
        );
    } 
}

export default SearchBar;