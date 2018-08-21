import React from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import LinkList from './LinkList.component';
import CreateLink from './CreateLink.component';
import Header from './Header.component';

// styles
import '../styles/App.css';


const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" component={LinkList} />
        <Route exact path="/create" component={CreateLink} />
      </Switch>
    </div>
  </div>
)

export default App;
