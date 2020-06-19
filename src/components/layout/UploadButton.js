import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export default props => 
  <div>
      <label htmlFor='single'>
        <FontAwesomeIcon icon={faUpload} />
      </label>
      <input type='file' id='image-input' name='file' onChange={props.onChange} />   
  </div>