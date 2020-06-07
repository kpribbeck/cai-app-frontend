import React, { Fragment, useState, useEffect } from "react";
import { getUsersByState } from "../../requests/UserRequests";
import { getMessages } from "../../requests/MessageRequest";
import Spinner from "../layout/Spinner";
import { postMessage } from "../../requests/MessageRequest";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otherUser, setOtheruser] = useState();
  const [newMessage, setNewmessage] = useState("");
  const [show, setShow] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getUsersByState("1");
      const msgs = await getMessages();
      setOtheruser(res.data.filter((user) => user.id === props.id)[0]);
      setMessages(
        msgs.data.filter(
          (message) =>
            (message.user1 === props.id && message.user2 === props.user.id) ||
            (message.user1 === props.user.id && message.user2 === props.id)
        )
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = {
      content: newMessage,
      user1: props.user.id,
      user2: props.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setMessages([...messages, dataForm]);
    const res = await postMessage(dataForm);
    setNewmessage("");
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="dropup">
        <button
          className="upbtn"
          onClick={() => (show ? setShow(false) : setShow(true))}
        >
          {otherUser.name}
        </button>
        <div id={show ? "" : "hide"} className="dropup-content">
          <div className="messages">
            <ul>
              {messages.map((message) => (
                <li
                  key={message.id}
                  id={message.user1 === props.user.id ? "mine" : "other"}
                >
                  {message.content}
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              value={newMessage}
              onChange={(e) => setNewmessage(e.target.value)}
            />
            <button className="button" type="submit" value="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
