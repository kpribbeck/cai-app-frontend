import React, { useState, useEffect, Fragment } from "react";
import { getObject } from "../../requests/ObjectRequests";
import { useParams } from "react-router-dom";
import ObjectItem from "./ObjectItem";
import Spinner from "../layout/Spinner";

const Object = () => {
  const urlParams = useParams();

  const [object, setObject] = useState(null);
  const [loading, setLoading] = useState(true);

  // makes async call to DB
  const getData = async (objectId) => {
    try {
      setLoading(true);
      const res = await getObject(objectId);
      setLoading(false);
      setObject(res.data);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  useEffect(() => {
    getData(urlParams.id);
  }, [urlParams]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="mt-3">
        <ObjectItem {...object} />
      </div>
    </Fragment>
  );
};

export default Object;
