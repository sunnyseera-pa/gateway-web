import React from 'react';
import SVGIcon from "../../images/SVGIcon";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as ColourLogoSvg } from '../../images/colour.svg';

class SearchBar extends React.Component{
    
    state = {
        textValue : ''
    }

    changeText = (e) => {
        this.setState({textValue : e.target.value});
        this.props.doUpdateSearchString(e.target.value);
    }

    /*
    <nav class="navbar navbar-expand-md bg-white justify-content-center"><div><div id="searchInputHolder" class="" style="">
        <div style="float: left;padding: 12px;">
            <svg width="17" height="17" class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#2c8267" d="M12.5,11 L11.71,11 L11.43,10.73 C12.41,9.59 13,8.11 13,6.5 C13,2.91 10.09,0 6.5,0 C2.91,0 0,2.91 0,6.5 C0,10.09 2.91,13 6.5,13 C8.11,13 9.59,12.41 10.73,11.43 L11,11.71 L11,12.5 L16,17.49 L17.49,16 L12.5,11 Z M6.5,11 C4.01,11 2,8.99 2,6.5 C2,4.01 4.01,2 6.5,2 C8.99,2 11,4.01 11,6.5 C11,8.99 8.99,11 6.5,11 Z"></path></svg>
        </div>
        <div style="float: left;">
            <input id="searchInput" type="text" placeholder=" Search" value="home" style="border: 0px;flex: 0.97 1 0%;background-color: aliceblue;width: auto;">
        </div>
        <div style="float: right;">Everything</div>
        <div style="float: right;">X</div>
    </nav>
    */

    render(){
        return(
            <Row>
            <Col sm={4} className="mt-2 ml-2"> <ColourLogoSvg /> </Col>
            <Col sm={5}>
            <nav class="navbar navbar-expand-md bg-white justify-content-center">
                <div>
                    <div id="searchInputHolder" class="form-control"> 
                        
                        <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/>
                        <input className="SearchBarInput" onChange={this.changeText} onKeyDown={this.props.doSearchMethod} type="text" placeholder=" Search" value={this.props.searchString} style={{border: 0, flex: 0.97}} />
                
                    </div>
                </div>
            </nav>
            </Col>
            <Col sm={3}></Col>
            </Row>
        );
    } 
}

export default SearchBar;