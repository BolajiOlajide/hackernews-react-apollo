import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import LinkList from './LinkList.component';
import CreateLink from './CreateLink.component';
import Header from './Header.component';
import Auth from './Auth.component';
import Search from './Search.component';

// styles
import '../styles/App.css';


const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/new/1' />} />
        <Route exact path="/create" component={CreateLink} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/top' component={LinkList} />
        <Route exact path='/new/:page' component={LinkList} />
      </Switch>
    </div>
  </div>
);

export default App;
