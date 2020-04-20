import React from "react";
import Feed from "../feed/Feed";
import Story from "../stories/Story";
import StoryEditor from "../stories/StoryEditor";
import Events from "../events/Events";
import EventEditor from "../events/EventEditor";
import Event from "../events/Event";

import { Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/" component={Feed} />
        <Route exact path="/stories/new" component={StoryEditor} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/new/" component={EventEditor} />
        <Route path="/stories/edit/:id" component={StoryEditor} />
        <Route path="/stories/:id" component={Story} />
        <Route path="/events/:id" component={Event} />
      </Switch>
    </section>
  );
};

export default Routes;
