import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import {ReactComponent as SearchIcon} from '../images/search.svg';
import FormGroup from 'react-bootstrap/FormGroup';
import Container from 'react-bootstrap/Container';
import '../../css/hdruk.css';
import SVGIcon from "../../images/SVGIcon"

class SearchBar extends React.Component{
    render(){
        return(
                <Col sm={12}>
                <nav class="navbar navbar-expand-md bg-white justify-content-center">
                    <div>
                    <form class="form-inline" action="">
                        <div id="searchInputHolder" class="form-control mr-md-2"> 
                        <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/>
                        <input id="searchInput" type="text" placeholder=" Search" style={{border: 0, flex: 0.97}}> 
                        </ input>
                        </div>
                    </form>
                    </div>
                </nav>
                </Col> 
        );
    } 
}

export default SearchBar;