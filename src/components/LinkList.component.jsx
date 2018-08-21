import React, { Component } from 'react';
import { Query } from 'react-apollo'

// graphql stuffs
import { FEED_QUERY } from '../queries/link.query';
import { NEW_LINKS_SUBSCRIPTION } from '../subscriptions/link.subscription';
import { NEW_VOTES_SUBSCRIPTION } from '../subscriptions/vote.subscription';

// components
import Link from './Link.component';


class LinkList extends Component {
    _updateCacheAfterVote = (store, createVote, linkId) => {
      const data = store.readQuery({ query: FEED_QUERY })

      const votedLink = data.feed.links.find(link => link.id === linkId)
      votedLink.votes = createVote.link.votes

      store.writeQuery({ query: FEED_QUERY, data })
    }

    _subscribeToNewVotes = subscribeToMore => {
      subscribeToMore({
        document: NEW_VOTES_SUBSCRIPTION
      });
    }

    _subscribeToNewLinks = subscribeToMore => {
      subscribeToMore({
        document: NEW_LINKS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newLink = subscriptionData.data.newLink.node;

          return Object.assign({}, prev, {
            feed: {
              links: [newLink, ...prev.feed.links],
              count: prev.feed.links.length + 1,
              __typename: prev.feed.__typename
            }
          });
        }
      });
    }

    render() {
      return (
        <Query query={FEED_QUERY}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error: {error.message}</div>;

            this._subscribeToNewLinks(subscribeToMore);
            this._subscribeToNewVotes(subscribeToMore);
            const linksToRender = data.feed.links;

            return (
              <div>
                {linksToRender.map((link, index) => {
                  return  <Link key={link.id} link={link} index={index} updateStoreAfterVote={this._updateCacheAfterVote} />
                })}
              </div>
            );
          }}
        </Query>
      )
    }
  }

export default LinkList;
