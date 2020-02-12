import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { ToolIcon } from './images/toolIcon';

class Example extends React.Component{
  render(){
      return(
        <div>
    <ButtonToolbar>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="success">Success</Button>
    <Button variant="warning">Warning</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="info">Info</Button>
    <Button variant="light">Light</Button>
    <Button variant="dark">Dark</Button>
  </ButtonToolbar>
  <ToolIcon></ToolIcon>
  </div>
      );
  }
}


export {Example};

