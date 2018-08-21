import React, { Component, Fragment } from 'react';
import { withApollo } from 'react-apollo';

import Link from './Link.component';
import { FEED_SEARCH_QUERY } from '../queries/link.query';


class Search extends Component {
  state = {
    links: [],
    filter: ''
  }

    _executeSearch = async () => {
        // ... you'll implement this 🔜
        const { filter } = this.state;
        const result = await this.props.client.query({
            query: FEED_SEARCH_QUERY,
            variables: { filter },
        });
        const links = result.data.feed.links;
        this.setState({ links });
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

  render() {
    return (
      <Fragment>
        <div>
          Search
          <input
            type='text'
            name='filter'
            onChange={this.onChange}
            value={this.state.filter}
          />
          <button onClick={() => this._executeSearch()}>OK</button>
        </div>
        {this.state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </Fragment>
    )
  }
}

export default withApollo(Search);
