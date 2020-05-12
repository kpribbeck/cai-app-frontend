import React, { useState, useEffect } from 'react';
import { useParams, useLocation, withRouter } from 'react-router-dom';
import { getEvent, postEvent, putEvent } from '../../requests/EventRequests';
import Spinner from '../layout/Spinner';

const EventEditor = ({ history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [eventId, setEventId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organizer: '',
    place: '',
    category: '',
  });

  const { title, description, organizer, place, category } = formData;

  // This executes when component is mounted
  // If we are not in /events/new is because we must be editing a specific event,
  // then we need to get the current data of that event
  useEffect(() => {
    if (currentUrl.pathname !== '/events/new') {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (eventId) => {
    try {
      setLoading(true);
      const res = await getEvent(eventId);
      setLoading(false);
      setEventId(res.data.id);
      setFormData({
        title: res.data.title,
        description: res.data.description,
        organizer: res.data.organizer,
        place: res.data.place,
        category: res.data.category,
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
      if (currentUrl.pathname === '/events/new') {
        // POST
        setLoading(true);
        const res = await postEvent(formData);
        setLoading(false);
        console.log('RES: ' + res);
        history.push('/events');
      } else {
        // PUT
        setLoading(true);
        console.log(formData);
        await putEvent(eventId, formData);
        setLoading(false);
        history.push('/events');
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
      <h1>Form para Eventos</h1>
      <div className='form-container'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <div className='col-20'>
              <label htmlFor='title'>Title:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='title'
                name='title'
                value={title}
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
              <label htmlFor='organizer'>Organizer:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='organizer'
                name='organizer'
                value={organizer}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className='row'>
            <div className='col-20'>
              <label htmlFor='place'>Place:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='place'
                name='place'
                value={place}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className='row'>
            <div className='col-20'>
              <label htmlFor='category'>Category:</label>
              <br />
            </div>
            <div className='col-80'>
              <input
                type='text'
                id='category'
                name='category'
                value={category}
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

export default withRouter(EventEditor);
