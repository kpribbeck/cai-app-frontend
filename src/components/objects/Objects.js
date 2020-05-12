import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getObjects } from '../../requests/ObjectRequests';
import ObjectItem from './ObjectItem';

const Objects = () => {
  const testObjects = [
    {
      id: 0,
      name: 'First name',
      description: 'First object description',
      stock: 1,
      picture: 'First picture',
      price: 200,
    },
    {
      id: 1,
      name: 'Second name',
      description: 'Second object description',
      stock: 2,
      picture: 'Second picture',
      price: 100,
    },
  ];

  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getObjects();
      setLoading(false);
      setObjects(res.data);
    } catch (err) {
      setLoading(false);
      console.log('Error: ' + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayTestObjects = testObjects.map((object) => (
    <ObjectItem
      key={object.id}
      id={object.id}
      name={object.name}
      description={object.description}
      stock={object.stock}
      price={object.price}
    />
  ));

  const displayObjects = objects.map((object) => (
    <ObjectItem
      key={object.id}
      id={object.id}
      name={object.name}
      description={object.description}
      stock={object.stock}
      price={object.price}
    />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-dark text-center'>Objetos</h1>
      <br></br>
      <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Stock</th>
          <th>Price</th>
        </tr>
        {displayTestObjects}
      </table>
    </Fragment>
  );
};

export default Objects;
