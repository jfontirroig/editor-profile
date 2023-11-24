import React from 'react';
import './_loader.css';

const loader = (props) => (
  <div className="spinner">
    <div className="bounce1" style={props.colorDark ? {backgroundColor: 'white'} : {}}></div>
    <div className="bounce2" style={props.colorDark ? {backgroundColor: 'white'} : {}}></div>
    <div className="bounce3" style={props.colorDark ? {backgroundColor: 'white'} : {}}></div>
  </div>
)

export default loader
