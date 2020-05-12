import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getLost_n_founds } from '../../requests/Lost_n_foundRequests';
import Lost_n_foundItem from './Lost_n_FoundItem';

const Lost_n_founds = () => {
  const testLost_n_founds = [
    {
      id: 0,
      name: 'First name',
      description: 'First lost_n_found description',
      picture: 'www.granimg.tv',
      pickedBy_name: 'First pickedBy_name',
      pickedBy_mail: 'uc@uc.cl',
      pickedBy_phone: +5698765432,
    },
    {
      id: 1,
      name: 'Second name',
      description: 'Second lost_n_found description',
      picture: 'www.img.com',
      pickedBy_name: 'Second pickedBy_name',
      pickedBy_mail: 'hola@chao.com',
      pickedBy_phone: +5612345678,
    },
  ];

  const [lost_n_founds, setLost_n_founds] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getLost_n_founds();
      setLoading(false);
      setLost_n_founds(res.data);
    } catch (err) {
      setLoading(false);
      console.log('Error: ' + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayTestLost_n_founds = testLost_n_founds.map((lost_n_found) => (
    <Lost_n_foundItem
      key={lost_n_found.id}
      id={lost_n_found.id}
      name={lost_n_found.name}
      description={lost_n_found.description}
      pickedBy_name={lost_n_found.pickedBy_name}
      pickedBy_mail={lost_n_found.pickedBy_mail}
      pickedBy_phone={lost_n_found.pickedBy_phone}
    />
  ));

  const displayLost_n_founds = lost_n_founds.map((lost_n_found) => (
    <Lost_n_foundItem
      key={lost_n_found.id}
      id={lost_n_found.id}
      name={lost_n_found.name}
      description={lost_n_found.description}
      pickedBy_name={lost_n_found.pickedBy_name}
      pickedBy_mail={lost_n_found.pickedBy_mail}
      pickedBy_phone={lost_n_found.pickedBy_phone}
    />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-dark text-center'>Objetos Perdidos</h1>
      <br></br>
      <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Owner Name</th>
          <th>Mail</th>
          <th>Phone</th>
        </tr>
        {displayTestLost_n_founds}
      </table>
    </Fragment>
  );
};

export default Lost_n_founds;
