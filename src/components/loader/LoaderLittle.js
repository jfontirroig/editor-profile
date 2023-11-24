import React from 'react';
import './_loaderlittle.css';

const LoaderLittle = (props) => (
  <div className="spinner">
    <div className="bounce1" style={props.colorDark ? {backgroundColor: 'white'} : {}}></div>
    <div className="bounce2" style={props.colorDark ? {backgroundColor: 'white'} : {}}></div>
    <div className="bounce3" style={props.colorDark ? {backgroundColor: 'white'} : {}}></div>
  </div>
)

export default LoaderLittle;
