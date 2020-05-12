import React from 'react';
import Stories from '../stories/Stories';
import Story from '../stories/Story';
import StoryEditor from '../stories/StoryEditor';
import Events from '../events/Events';
import EventEditor from '../events/EventEditor';
import Event from '../events/Event';
import SignUpPage from '../auth/SignUpPage';
import LogInPage from '../auth/LogInPage';
import Proyects from '../proyects/Proyects';
import ProyectEditor from '../proyects/ProyectEditor';
import Proyect from '../proyects/Proyect';
import Objects from '../objects/Objects';
import Lost_n_founds from '../lost_n_founds/Lost_n_founds';
import Users from '../users/Users';

import { Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/' component={Stories} />
        <Route exact path='/sign-up' component={SignUpPage} />
        <Route exact path='/log-in' component={LogInPage} />
        <Route exact path='/stories/new' component={StoryEditor} />
        <Route exact path='/events' component={Events} />
        <Route exact path='/events/new/' component={EventEditor} />
        <Route exact path='/proyects' component={Proyects} />
        <Route exact path='/proyects/new/' component={ProyectEditor} />
        <Route path='/stories/edit/:id' component={StoryEditor} />
        <Route path='/stories/:id' component={Story} />
        <Route path='/events/edit/:id' component={EventEditor} />
        <Route path='/events/:id' component={Event} />
        <Route path='/proyects/edit/:id' component={ProyectEditor} />
        <Route path='/proyects/:id' component={Proyect} />
        <Route exact path='/objects' component={Objects} />
        <Route exact path='/lost_n_founds' component={Lost_n_founds} />
        <Route exact path='/users' component={Users} />
      </Switch>
    </section>
  );
};

export default Routes;
