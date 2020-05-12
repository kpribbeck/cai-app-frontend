import React, { useState, useEffect } from 'react';
import { useParams, useLocation, withRouter } from 'react-router-dom';
import {
  getLost_n_found,
  postLost_n_found,
  putLost_n_found,
} from '../../requests/Lost_n_foundRequests';
import Spinner from '../layout/Spinner';

const Lost_n_foundEditor = ({ history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [lost_n_foundId, setLost_n_foundId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    picture: '',
    pickedBy_name: '',
    pickedBy_mail: '',
    pickedBy_phone: '',
  });

  const { name, description, picture, pickedBy_name, pickedBy_mail } = formData;

  // This executes when component is mounted
  // If we are not in /lost_n_founds/new is because we must be editing a specific lost_n_found,
  // then we need to get the current data of that lost_n_found
  useEffect(() => {
    if (currentUrl.pathname !== '/lost_n_founds/new') {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (lost_n_foundId) => {
    try {
      setLoading(true);
      const res = await getLost_n_found(lost_n_foundId);
      setLoading(false);
      setLost_n_foundId(res.data.id);
      setFormData({
        name: res.data.name,
        description: res.data.description,
        picture: res.data.picture,
        pickedBy_name: res.data.pickedBy_name,
        pickedBy_mail: res.data.pickedBy_mail,
        pickedBy_phone: res.data.pickedBy_phone,
      });
    } catch (err) {
      setLoading(false);
      console.log('Error: ' + err);
    }
  };

  const onChange = (e) => {
    const newState = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(newState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      if (currentUrl.pathname === '/lost_n_founds/new') {
        // POST
        setLoading(true);
        const res = await postLost_n_found(formData);
        setLoading(false);
        console.log('RES: ' + res);
        history.push('/lost_n_founds');
      } else {
        // PUT
        setLoading(true);
        console.log(formData);
        await putLost_n_found(lost_n_foundId, formData);
        setLoading(false);
        history.push('/lost_n_founds');
      }
    } catch (err) {
      setLoading(false);
      console.log('Error: ' + err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1>Form para Cosas Perdidas</h1>
      <div className='form-container'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <div className='col-20'>
              <label htmlFor='name'>Name:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className='row'>
            <div className='col-20'>
              <label htmlFor='description'>Description:</label>
              <br />
            </div>
            <div className='col-80'>
              <textarea
                style={{ height: '200px' }}
                id='description'
                name='description'
                value={description}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className='row'>
            <div className='col-20'>
              <label htmlFor='picture'>Picture URL:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='number'
                id='picture'
                name='picture'
                value={picture}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className='row'>
            <div className='col-20'>
              <label htmlFor='pickedBy_name'>Nombre del dueño:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='pickedBy_name'
                name='pickedBy_name'
                value={pickedBy_name}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className='row'>
            <div className='col-20'>
              <label htmlFor='pickedBy_mail'>Mail del dueño:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='pickedBy_mail'
                name='pickedBy_mail'
                value={pickedBy_mail}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className='row'>
            <div className='col-20'>
              <label htmlFor='pickedBy_phone'>Telefono del dueño:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='pickedBy_phone'
                name='pickedBy_phone'
                value={pickedBy_phone}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className='row'>
            <input type='submit' value='Publicar' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Lost_n_foundEditor);
