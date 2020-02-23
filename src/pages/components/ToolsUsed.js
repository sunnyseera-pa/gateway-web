
// /ShowObjects/ToolsUsed.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon"
import Rating from 'react-rating';
import { ReactComponent as EmptyStarIconSvg} from '../../images/starempty.svg';
import { ReactComponent as FullStarIconSvg} from '../../images/star.svg';

class ToolsUsed extends Component {

  constructor(props) {
    super(props)
    this.state.data = props.data;
  }

  // initialize our state
  state = {
    data: []
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;

    var shortName = "";
    if (data.name){     
      shortName = data.name.replace(/(.{50})..+/, "$1…");
    }

    return (
      <Row className="mt-2">
        <Col sm={1} lg={1} />
        <Col sm={10} lg={10}>
            <a className="searchHolder" href={'/tool/' + data.id} >
                <div className="Rectangle">
                    <Row>
                        <Col xs={2} md={1} className="iconHolder">
                            <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} />
                        </Col>
                        <Col xs={10} md={11}>
                            <p>
                                <span className="Black-16px">{shortName}</span>
                                <span className="Gray500-13px">
                                  <span className="reviewTitleGap">·</span>
                                  150 reviews
                                  <span className="reviewTitleGap">·</span>
                                  4.2 average
                                </span>
                            </p>
                            
                        </Col>
                        <Col xs={12} md={12}>
                          <p className="Gray800-14px">
                              "We used this for a lot of the initial cleansing but eventually had to add our own scripts to make it work with our version of Python. We created our own tool based on the functionality and added some extras like sorting by date"
                            </p>
                        </Col>
                        <Col xs={12} md={8}>
                          <span className="text-left Purple-13px">Danny Dust</span>
                          <span className="text-left Gray500-13px"> on 12 Jun 2018</span>
                          <span className="reviewTitleGap">·</span>
                          <span className="text-left Gray500-13px">in relation to project </span>
                          <span className="text-left Purple-13px">Effects of a ketogenic diet for epilept...</span>
                        </Col>
                        <Col xs={12} md={4} className="mb-1 text-right">
                          <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />} placeholderSymbol={<FullStarIconSvg />} placeholderRating={4.3} readonly={true} />
                        </Col>
                    </Row>
                </div>
            </a>
        </Col>
        <Col sm={1} lg={10}/>
    </Row>






    );
  }
}

export default ToolsUsed;