import React, { Fragment } from 'react';
import { Row, Col, Container} from 'react-bootstrap';
import DataUtilityModalInfo from './DataUtilityModalInfo';
import '../Dataset.scss';

class DataUtilityModal extends React.Component {

    state = {
        allOpen: false,
        key: "Tools"

    }
 
    constructor(props) {
        super(props);
    } 

    updateAllOpen = allOpen => {
        if (allOpen === false) {
          this.setState({ allOpen: true });
        } else if (allOpen === true) {
          this.setState({ allOpen: false });
        }
      };
 
    render() {
        const {allOpen, key} = this.state; 

        return (
          <Fragment>
            <Row className="expandAllBox">
              <span
                className="purple-14 pointer"
                id="expandAllModal"
                onClick={() => this.updateAllOpen(allOpen)}
              >
                {allOpen ? "Hide all" : "Expand all"}
              </span>
            </Row>
            <div className="dataUtilityModalBackground">
              <Container>
                {/* <Row>   
                        <span
                            className="purple-14 floatRight pointer"
                            onClick={() => this.updateAllOpen(allOpen)}
                        >
                            {allOpen ? "Hide all" : "Expand all"} 
                        </span>
                    </Row> */}
                <Row>
                  {/* <Col sm={1} lg={1} />   */}
                  <Col sm={12} lg={12} className="mt-2 mb-3">
                    <DataUtilityModalInfo
                      section={"Documentation"}
                      open={allOpen}
                    />

                    <DataUtilityModalInfo
                      section={"TechQuality"}
                      open={allOpen}
                    />

                    <DataUtilityModalInfo section={"Access"} open={allOpen} />

                    <DataUtilityModalInfo section={"Value"} open={allOpen} />

                    <DataUtilityModalInfo section={"Coverage"} open={allOpen} />
                  </Col>
                  {/* <Col sm={2} lg={2} /> */}
                </Row>
              </Container>
            </div>
          </Fragment>
        );
    } 
}

export default DataUtilityModal;