import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getUsersByState, authUserService } from "../../requests/UserRequests";
import Chat from "./Chat";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openChats, setOpenchats] = useState([]);
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getUsersByState("1"); // accepted users only
      setLoading(false);
      setUsers(res.data);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    authUserService.currentUser.subscribe((x) => setUser(x));
    getData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        {openChats.map((user_id) => (
          <Chat id={user_id} user={user.user} />
        ))}
        <div className="dropup">
          <button
            className="upbtn"
            onClick={() => (show ? setShow(false) : setShow(true))}
          >
            Chats
          </button>
          <div id={show ? "" : "hide"} className="dropup-content">
            <ul>
              {users.map(
                (other_user) =>
                  other_user.id != user.user.id && (
                    <li
                      key={other_user.id}
                      onClick={() =>
                        openChats.indexOf(other_user.id) < 0 &&
                        setOpenchats([...openChats, other_user.id])
                      }
                    >
                      {other_user.name} {other_user.last_name}
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Chats;
