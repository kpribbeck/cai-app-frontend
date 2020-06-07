import React, { useState, useEffect } from "react";
import { useParams, useLocation, withRouter } from "react-router-dom";
import { getStory, postStory, putStory } from "../../requests/StoryRequests";
import Spinner from "../layout/Spinner";

const StoryEditor = ({ createNotification, history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [storyId, setStoryId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const { title, body } = formData;

  // This executes when component is mounted
  // If we are not in /stories/new is because we must be editing a specific story,
  // then we need to get the current data of that story
  useEffect(() => {
    if (currentUrl.pathname !== "/stories/new") {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (storyId) => {
    try {
      setLoading(true);
      const res = await getStory(storyId);
      setLoading(false);
      setStoryId(res.data.id);
      setFormData({
        title: res.data.title,
        body: res.data.body,
      });
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
      if (currentUrl.pathname === "/stories/new") {
        // POST
        setLoading(true);
        await postStory(formData);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has creado una nueva noticia correctamente."
        );
        history.push("/");
      } else {
        // PUT
        setLoading(true);
        console.log(formData);
        await putStory(storyId, formData);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has modificado una noticia correctamente."
        );
        history.push("/");
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
      <h1>Form para Noticias</h1>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            {Object.keys(errors).length > 0 && displayErrors}
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="title">Título:</label>
              <br />
            </div>
            <div className="col-80">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="body">Cuerpo:</label>
              <br />
            </div>
            <div className="col-80">
              <textarea
                style={{ height: "200px" }}
                id="body"
                name="body"
                value={body}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Publicar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(StoryEditor);
