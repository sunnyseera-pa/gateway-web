import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class ProgrammingLanguageFilter extends Component {
    state = {
        languageSelected: [],
        languagesData: []
    };

    constructor(props) {
        super(props);
        this.state.languagesData = props.languagesData;
        this.state.languageSelected = props.languageSelected;
    }

    changeFilter = (e) => {
        const languageSelected = this.state.languageSelected
        let index

        if (e.target.checked) {
            languageSelected.push(e.target.value)
        } else {
            index = languageSelected.indexOf(e.target.value)
            languageSelected.splice(index, 1)
        }

        this.setState({ languageSelected: languageSelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const languageSelected = this.state.languageSelected;
        while (languageSelected.length) { languageSelected.pop(); }
        this.props.updateOnFilter();
    }

    render() {

        const { languagesData, languageSelected } = this.state;

        if (!languagesData || languagesData.length === 0) {
            return (<></>);
        }

        return (
            <div>
                <div className="FilterCard mt-2">
                    <Row className="mt-2"  >

                        <Col xs={7} className="ml-3">
                            <span className="Gray800-14px-bold">Programming</span>
                            {languageSelected.length === 0 ? <span /> :
                                <span> <div className="White-12px BubbleCounts"> {languageSelected.length} </div> </span>
                            }
                            <br />
                            <span>Language</span>
                        </Col>
                        <Col xs={3}>
                            <span>
                                <button className="ClearButtons Purple-14px" onClick={() => this.clearFilter()}>
                                    Clear
                  </button>
                            </span>
                        </Col>
                    </Row>
                </div>
                <div className="AdFilters Gray800-14px">
                    <Row className="mb-3">
                        <Col xs={1}></Col>
                        <Col xs={11} className="ml-4">
                            {!languagesData ? '' : languagesData.map((language) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="programmingLanguage" checked={languageSelected.indexOf(language) !== -1 ? "true" : ""} value={language} onChange={this.changeFilter} />
                                    </InputGroup.Prepend>
                                    <FormText className="Gray800-14px ml-4 mt-2 mb-2 pb-1">{language}</FormText>
                                </InputGroup>
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default ProgrammingLanguageFilter;