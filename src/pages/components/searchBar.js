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
import '../../css/searchBar.css';
import SVGIcon from "../../images/SVGIcon"

class SearchBar extends React.Component{
    render(){
        return(
                //     <div style={{ padding: '10px' }}>
                //         <input
                //     type="text"
                //     onChange={(e) => this.setState({ search: e.target.value })}
                //     placeholder="search"
                //     style={{ width: '200px' }}
                //   />
                //   <br />
                //   <button onClick={() => this.getDataSearchFromDb(this.state.search)}>
                //     SEARCH
                //   </button>
                //     </div>

                // <Navbar className="bg-white">
                // <Form inline>
                //     {/* <Form.Row> */}
                //     {/* <InputGroup.SearchIcon></InputGroup.SearchIcon> */}
                //     {/* <FormGroup> */}
                //     <InputGroup>
                //         {/* <InputGroup.Prepend>
                //             <SearchIcon width="40" height="40" type="submit"> Submit </SearchIcon>
                //         </InputGroup.Prepend> */}
                //         {/* <img src= './images/search.svg' /> */}
                //         <SearchIcon type="submit"> Submit </SearchIcon>
                //         <FormControl type="text" placeholder="Search" className="bg-light mr-sm-2">
                //             {/* <SearchIcon type="submit"> Submit </SearchIcon> */}
                //         </FormControl>
                //         {/* <FormControl type="text" placeholder="Search" className="bg-light mr-sm-2"> */}
                //             {/* <option> <SearchIcon type="submit"> Submit </SearchIcon> </option>  */}
                //         {/* </FormControl> */}
                //     </InputGroup>
                // </Form>
                // </Navbar>

                <Col sm={12}>
                <nav class="navbar navbar-expand-md bg-white justify-content-center">
                    <div>
                    {/* <SearchIcon type="submit"> Submit </SearchIcon> */}
                    <form class="form-inline" action="">
                        <div id="searchInputHolder" class="form-control mr-md-2"> 
                        <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/>
                         {/* <SearchIcon id="searchIcon" type="submit"> Submit </SearchIcon> */}
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