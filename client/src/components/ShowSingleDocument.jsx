import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ShowSingleDocument = (props) => {
  console.log('singles ',props);
  return(
  <div className="col s3 m3">
    <h2>single show</h2>
    <h3>{props.document.title}</h3>
    <p>{props.document.content}</p>
  </div>)
};


export default ShowSingleDocument;
