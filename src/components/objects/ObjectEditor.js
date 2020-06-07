import React, { useState, useEffect } from "react";
import { useParams, useLocation, withRouter } from "react-router-dom";
import {
  getObject,
  postObject,
  putObject,
} from "../../requests/ObjectRequests";
import Spinner from "../layout/Spinner";

const ObjectEditor = ({ createNotification, history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [sell, setSell] = useState(true);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [objectId, setObjectId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: "",
    picture: "",
    price: "",
  });

  const { name, description, stock, picture, price } = formData;

  // This executes when component is mounted
  // If we are not in /objects/new is because we must be editing a specific object,
  // then we need to get the current data of that object
  useEffect(() => {
    if (currentUrl.pathname !== "/objects/new") {
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
      if (price <= 0) {
        setSell(false);
      } else {
        setSell(true);
      }
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
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
      if (currentUrl.pathname === "/objects/new") {
        // POST
        setLoading(true);
        const res = await postObject(formData);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has creado un nuevo objeto correctamente."
        );
        if (formData.price > 0) {
          history.push("/objects");
        } else {
          history.push("/loans");
        }
      } else {
        // PUT
        setLoading(true);
        await putObject(objectId, formData);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has modificado un objeto correctamente."
        );
        if (formData.price > 0) {
          history.push("/objects");
        } else {
          history.push("/loans");
        }
      }
    } catch (err) {
      setLoading(false);
      setErrors({
        request: {
          message: "Error de servidor. Intente más tarde.",
        },
      });
      console.error(err);
    }
  };

  const displayErrors = Object.keys(errors).map((error) => (
    <p className="error-message" key={error}>
      {errors[error].message}
    </p>
  ));

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1>Form para Objetos</h1>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            {Object.keys(errors).length > 0 && displayErrors}
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="name">Nombre:</label>
              <br />
            </div>
            <div className="col-80">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="description">Descripción:</label>
              <br />
            </div>
            <div className="col-80">
              <textarea
                style={{ height: "200px" }}
                id="description"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="stock">Stock:</label>
              <br />
            </div>
            <div className="col-80">
              <input
                type="number"
                id="stock"
                name="stock"
                value={stock}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="picture">URL imagen:</label>
              <br />
            </div>
            <div className="col-80">
              <input
                type="text"
                id="picture"
                name="picture"
                value={picture}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          {sell ? (
            <div className="row">
              <div className="col-20">
                <label htmlFor="price">Precio:</label>
                <br />
              </div>
              <div className="col-80">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => onChange(e)}
                  required
                />
                <br />
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-20">
                <label htmlFor="price">Disponibilidad:</label>
                <br />
              </div>
              <div className="col-80">
                <select
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option value="0">Disponible</option>
                  <option value="-1">Prestado</option>
                </select>
                <br />
              </div>
            </div>
          )}
          <div className="row">
            <input type="submit" value="Publicar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(ObjectEditor);
