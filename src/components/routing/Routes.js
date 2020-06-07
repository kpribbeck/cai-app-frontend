import React, { useState } from "react";
import Story from "../stories/Story";
import Stories from "../stories/Stories";
import StoryEditor from "../stories/StoryEditor";
import Event from "../events/Event";
import Events from "../events/Events";
import EventEditor from "../events/EventEditor";
import LogInPage from "../auth/LogInPage";
import SignUpPage from "../auth/SignUpPage";
import Proyect from "../proyects/Proyect";
import Proyects from "../proyects/Proyects";
import ProyectEditor from "../proyects/ProyectEditor";
import Object from "../objects/Object";
import Objects from "../objects/Objects";
import Loans from "../loans/Loans";
import ObjectEditor from "../objects/ObjectEditor";
import LostFound from "../lost-founds/LostFound";
import LostFounds from "../lost-founds/LostFounds";
import LostFoundsEditor from "../lost-founds/LostFoundEditor";
import Users from "../users/Users";
import { Route, Switch } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../chat/Footer";
import PopUpContainer from "../pop-up/PopUpContainer";
import UserRequests from "../users/UserRequests";
import UserProfile from "../users/UserProfile";
import { authUserService } from "../../requests/UserRequests";

const Routes = () => {
  const [triggerNotification, setTrigger] = useState(0);
  const [notificationData, setNotification] = useState({
    title: "",
    message: "",
  });

  const createNotification = (title, message) => {
    setNotification({ title: title, message: message });
    setTrigger(1);
  };

  return (
    <section className="container">
      <Navbar />
      <PopUpContainer
        trigger={triggerNotification}
        setTrigger={setTrigger}
        data={notificationData}
      />
      <Switch>
        <Route
          exact
          path="/profile"
          render={() => (
            <UserProfile user={authUserService.currentUser.source.value.user} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => <Stories createNotification={createNotification} />}
        />
        <Route
          exact
          path="/sign-up"
          render={() => <SignUpPage createNotification={createNotification} />}
        />
        <Route
          exact
          path="/log-in"
          render={() => <LogInPage createNotification={createNotification} />}
        />
        <Route
          exact
          path="/stories/new"
          render={() => <StoryEditor createNotification={createNotification} />}
        />
        <Route
          exact
          path="/events"
          render={() => <Events createNotification={createNotification} />}
        />
        <Route
          exact
          path="/events/new/"
          render={() => <EventEditor createNotification={createNotification} />}
        />
        <Route
          exact
          path="/proyects"
          render={() => <Proyects createNotification={createNotification} />}
        />
        <Route
          exact
          path="/objects/new"
          render={() => (
            <ObjectEditor createNotification={createNotification} />
          )}
        />
        <Route
          exact
          path="/lost-founds/new"
          render={() => (
            <LostFoundsEditor createNotification={createNotification} />
          )}
        />
        <Route
          exact
          path="/proyects/new/"
          render={() => (
            <ProyectEditor createNotification={createNotification} />
          )}
        />
        <Route
          path="/stories/edit/:id"
          render={() => <StoryEditor createNotification={createNotification} />}
        />
        <Route path="/stories/:id" component={Story} />
        <Route
          path="/events/edit/:id"
          render={() => <EventEditor createNotification={createNotification} />}
        />
        <Route
          path="/users/edit/:id"
          render={() => (
            <SignUpPage
              createNotification={createNotification}
              user={authUserService.currentUser.source.value}
            />
          )}
        />
        <Route path="/events/:id" component={Event} />
        <Route
          path="/proyects/edit/:id"
          render={() => (
            <ProyectEditor createNotification={createNotification} />
          )}
        />
        <Route path="/proyects/:id" component={Proyect} />
        <Route
          path="/lost-founds/edit/:id"
          render={() => (
            <LostFoundsEditor createNotification={createNotification} />
          )}
        />
        <Route path="/lost-founds/:id" component={LostFound} />
        <Route
          path="/objects/edit/:id"
          render={() => (
            <ObjectEditor createNotification={createNotification} />
          )}
        />
        <Route path="/objects/:id" component={Object} />
        <Route
          exact
          path="/objects"
          render={() => <Objects createNotification={createNotification} />}
        />
        <Route
          exact
          path="/loans"
          render={() => <Loans createNotification={createNotification} />}
        />
        <Route
          exact
          path="/lost-founds"
          render={() => <LostFounds createNotification={createNotification} />}
        />
        <Route
          exact
          path="/users"
          render={() => <Users createNotification={createNotification} />}
        />
        <Route
          exact
          path="/users/requests/pending"
          render={() => (
            <UserRequests
              state={"-1"}
              createNotification={createNotification}
            />
          )}
        />
        <Route
          exact
          path="/users/requests/rejected"
          render={() => (
            <UserRequests state={"0"} createNotification={createNotification} />
          )}
        />
      </Switch>
      {authUserService.currentUser.source.value && <Footer />}
    </section>
  );
};

export default Routes;
