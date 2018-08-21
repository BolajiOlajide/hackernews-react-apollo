import React, { Component } from 'react';
import { Query } from 'react-apollo'

// graphql queries
import { FEED_QUERY } from '../queries/link.query';

// components
import Link from './Link.component';


class LinkList extends Component {
    render() {
      return (
        <Query query={FEED_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error: {error.message}</div>

            const linksToRender = data.feed.links;

            return (
              <div>
                {linksToRender.map(link => <Link key={link.id} link={link} />)}
              </div>
            )
          }}
        </Query>
      )
    }
  }

export default LinkList;
