import React, { Fragment, useState, useEffect } from "react";
import { useParams, useLocation, withRouter } from "react-router-dom";
import { getStory, postStory, putStory } from "../../requests/StoryRequests";
import Spinner from "../layout/Spinner";
import { 
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const StoryEditor = ({ history }) => 
{
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [storyId, setStoryId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    body: ""
  });

  const { title, body } = formData;

  // This executes when component is mounted
  // If we are not in /stories/new is because we must be editing a specific story,
  // then we need to get the current data of that story
  useEffect(() => {
    if (currentUrl.pathname != "/stories/new")
    {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (storyId) => 
  {
    try
    {
      setLoading(true);
      const res = await getStory(storyId);
      setLoading(false);
      setStoryId(res.data.id);
      setFormData(
        {
          title: res.data.title,
          body: res.data.body
        }
      )
    }
    catch(err)
    {
      setLoading(false);
      console.log("Error: " + err);
    }
  }

  const onChange = e => {
    const newState = {
      ...formData,
      [e.target.name]: e.target.value
    };

    setFormData(newState);
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);

    try
    {
      if (currentUrl.pathname == "/stories/new")
      {
        // POST
        setLoading(true);
        await postStory(formData);
        setLoading(false);
        history.push('/');

      }
      else
      {
        // PUT
        setLoading(true);
        console.log(formData);
        await putStory(storyId, formData);
        setLoading(false);
        history.push('/');

      }
    }
    catch(err)
    {
      setLoading(false);
      console.log("Error: " + err);
    }
  };


  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-dark text-center">Story form</h1>
      <Form onSubmit={e => onSubmit(e)}>
        <FormGroup>
          <Label for="exampleTitle">Title</Label>
          <Input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Body for your story</Label>
          <Input
            type="textarea"
            name="body"
            placeholder="Write body"
            value={body}
            onChange={e => onChange(e)}
            required
          />
        </FormGroup>
        <input type="submit" className="btn btn-primary my-1" value="Save" />
      </Form>
    </Fragment>
  )
}

export default withRouter(StoryEditor);