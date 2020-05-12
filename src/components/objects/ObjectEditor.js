import React, { useState, useEffect } from 'react';
import { useParams, useLocation, withRouter } from 'react-router-dom';
import {
  getObject,
  postObject,
  putObject,
} from '../../requests/ObjectRequests';
import Spinner from '../layout/Spinner';

const ObjectEditor = ({ history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [objectId, setObjectId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stock: '',
    picture: '',
    price: '',
  });

  const { name, description, stock, picture, price } = formData;

  // This executes when component is mounted
  // If we are not in /objects/new is because we must be editing a specific object,
  // then we need to get the current data of that object
  useEffect(() => {
    if (currentUrl.pathname !== '/objects/new') {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (objectId) => {
    try {
      setLoading(true);
      const res = await getObject(objectId);
      setLoading(false);
      setObjectId(res.data.id);
      setFormData({
        name: res.data.name,
        description: res.data.description,
        stock: res.data.stock,
        picture: res.data.picture,
        price: res.data.price,
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
      if (currentUrl.pathname === '/objects/new') {
        // POST
        setLoading(true);
        const res = await postObject(formData);
        setLoading(false);
        console.log('RES: ' + res);
        history.push('/objects');
      } else {
        // PUT
        setLoading(true);
        console.log(formData);
        await putObject(objectId, formData);
        setLoading(false);
        history.push('/objects');
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
      <h1>Form para Objetos</h1>
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
              <label htmlFor='stock'>Stock:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='number'
                id='stock'
                name='stock'
                value={stock}
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
                type='text'
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
              <label htmlFor='price'>Price:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='price'
                name='price'
                value={price}
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

export default withRouter(ObjectEditor);
