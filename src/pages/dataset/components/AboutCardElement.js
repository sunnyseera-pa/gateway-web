import React from "react";
import { Col, Row } from "react-bootstrap";
import '../Dataset.scss'; 
import _ from 'lodash';
import { ReactComponent as InfoSVG } from "../../../images/info.svg"; 



class AboutCardElement extends React.Component {
  state = {
    label: '',
    description: '',
    tooltip: '',
    isHovering: false
  }; 

  constructor(props) {
    console.log(`props - ${JSON.stringify(props, null, 2)}`)
    super(props); 
    this.state.label = props.label;
    this.state.description = props.description;
    this.state.tooltip = props.tooltip;
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
      console.log(`handleMouseEnter`)
      this.setState({ isHovering: true });
  }

  handleMouseLeave() {
    console.log(`handleMouseLeave`)
    this.setState({ isHovering: false });

}

  handleMouseHover() {
      console.log(`in handleMouseHover`)
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    console.log(`in toggleHoverState - ${state.isHovering}`) 

    return {
      isHovering: !state.isHovering
    };
  }

  render() {
    const {label, description, tooltip, isHovering } = this.state;
    console.log(`isHovering - ${JSON.stringify(isHovering, null, 2)}`)
    console.log(`this.state.isHovering - ${JSON.stringify(this.state.isHovering, null, 2)}`)
    return (

    <div>
        <Row className="mt-2">
            <Col sm={2} className="gray800-14">
            {label}
            </Col>

            <Col sm={1}> 
                <span
                    onMouseEnter={this.handleMouseHover}
                    onMouseLeave={this.handleMouseHover}
                    // onMouseEnter={this.handleMouseEnter}
                    // onMouseLeave={this.handleMouseLeave}
                >
                    {/* <InfoSVG onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} />  */}
                    <InfoSVG /> 
                </span>
            </Col>



            {/* {this.state.isHovering && ( */}
            {isHovering && (
                <div className="datasetToolTip">
                    <span className="white-13-semibold">
                        {tooltip} 
                    </span>
                </div>
            )}   

            {!description || typeof description === 'object' && _.isEmpty(description) ? 
            ( 
                <Col sm={9} >
                    <span className="gray800-14-opacity"> Not specified </span>
                </Col>
            )        
            :
            (
                <Col sm={9} className="gray800-14">

                    {typeof description === 'object' ?  
                    description.map((item, index) => (
                        <span> {index !== 0 ? ', ' : ''} {item}</span>                
                    ))
                    : 
                    <span> {description} </span> 
                    }
                </Col>
            ) 
            }
      </Row>
    </div>
 
    )

    }
  }


export default AboutCardElement;