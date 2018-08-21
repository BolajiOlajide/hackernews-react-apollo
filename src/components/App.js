import React, { Component, Fragment } from 'react';

// components
import LinkList from './LinkList.component';
import CreateLink from './CreateLink.component';

// styles
import '../styles/App.css';


class App extends Component {
  render() {
    return (
      <Fragment>
        <CreateLink />
        <LinkList />
      </Fragment>
    );
  }
}

export default App;
