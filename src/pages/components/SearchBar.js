import React from 'react';

import Col from 'react-bootstrap/Col';
import '../../css/hdruk.css';
import SVGIcon from "../../images/SVGIcon"

class SearchBar extends React.Component{
    
    state = {
        textValue : ''
    }

    changeText = (e) => {
        debugger
        this.setState({textValue : e.target.value});
        this.props.doUpdateSearchString(e.target.value);
    }

    render(){
        return(
            <Col sm={12}>
                <nav class="navbar navbar-expand-md bg-white justify-content-center">
                    <div>
                        
                        <div id="searchInputHolder" class="form-control mr-md-2"> 
                            <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/>
                            
                            <input id="searchInput" onChange={this.changeText} onKeyDown={this.props.doSearchMethod} type="text" placeholder=" Search" value={this.props.searchString} style={{border: 0, flex: 0.97}} />
                        </div>
                    
                    </div>
                </nav>
            </Col> 
        );
    } 
}

export default SearchBar;