import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class Filters extends Component {
    state = {
        selected: [],
        data: [],
        title:''
    }

    constructor(props) {
        super(props);
        this.state.data = props.data;
        this.state.selected = props.selected;
        this.state.title = props.title;
    }

    changeFilter = (e) => {
        const selected = this.state.selected;
        let index

        if (e.target.checked) {
            selected.push(e.target.value)
        } else {
            index = selected.indexOf(e.target.value)
            selected.splice(index, 1)
        }

        this.setState({ selected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const selected = this.state.selected;
        while (selected.length) { selected.pop(); }
        this.props.updateOnFilter();
    }
    
    render() {
        const { data, selected, title } = this.state;

        if (!data || data.length === 0) {
            return (<></>);
        }
        
        return (
            <div>
                <div className="filterCard mt-2">
                    <Row className="mt-2"  >
                        <Col xs={7} className="ml-3">
                            <span className="gray800-14-bold">{title}</span>
                            {selected.length === 0 ? <span /> :
                                <span> <div className="white-12-bold bubbleCount"> {selected.length} </div> </span>
                            }
                            <span className="mr-4 ml-1" />
                        </Col>
                        <Col xs={3}>
                            {this.state.selected.length > 0 ?
                                <span>
                                    <button className="clearButtons purple-14" onClick={() => this.clearFilter()}>
                                        Clear
                                    </button>
                                </span> : null}
                        </Col>
                    </Row>
                </div>
                <div className="adFilters gray800-14">
                    <Row className="mb-3">
                        <Col xs={1}></Col>
                        <Col xs={11} className="ml-4">

                            {!data ? '' : data.map((dat) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="publisher" checked={selected.indexOf(dat) !== -1 ? "true" : ""} value={dat} onChange={this.changeFilter} />
                                    </InputGroup.Prepend>
                                    <FormText className="gray800-14 ml-4 mt-2 mb-2 pb-1" >{dat}</FormText>
                                </InputGroup>
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Filters;