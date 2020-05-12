import React, { useState, useEffect } from 'react';
import { useParams, useLocation, withRouter } from 'react-router-dom';
import {
  getProyect,
  postProyect,
  putProyect,
} from '../../requests/ProyectRequests';
import Spinner from '../layout/Spinner';

const ProyectEditor = ({ history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [proyectId, setProyectId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contact: '',
    picture: '',
  });

  const { name, description, contact, picture } = formData;

  // This executes when component is mounted
  // If we are not in /proyects/new is because we must be editing a specific proyect,
  // then we need to get the current data of that proyect
  useEffect(() => {
    if (currentUrl.pathname !== '/proyects/new') {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (proyectId) => {
    try {
      setLoading(true);
      const res = await getProyect(proyectId);
      setLoading(false);
      setProyectId(res.data.id);
      setFormData({
        name: res.data.name,
        description: res.data.description,
        contact: res.data.contact,
        picture: res.data.picture,
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
      if (currentUrl.pathname === '/proyects/new') {
        // POST
        setLoading(true);
        const res = await postProyect(formData);
        setLoading(false);
        console.log('RES: ' + res);
        history.push('/proyects');
      } else {
        // PUT
        setLoading(true);
        console.log(formData);
        await putProyect(proyectId, formData);
        setLoading(false);
        history.push('/proyects');
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
      <h1>Form para Proyectos</h1>
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
              <label htmlFor='contact'>Contact:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='contact'
                name='contact'
                value={contact}
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
            <input type='submit' value='Publicar' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(ProyectEditor);
