import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';

// mutation
import { POST_MUTATION } from '../mutations/link.mutation';

// graphql queries
import { FEED_QUERY } from '../queries/link.query';

// constants
import { LINKS_PER_PAGE } from '../utils/constants';


class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  }

  onChange = event => {
      this.setState({
          [event.target.name]: event.target.value
      });
  }

  render() {
    const { description, url } = this.state;
    return (
      <Fragment>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            name="description"
            onChange={this.onChange}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            name="url"
            onChange={this.onChange}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push('/new/1')}
          update={(store, { data: { post } }) => {
            const first = LINKS_PER_PAGE
            const skip = 0
            const orderBy = 'createdAt_DESC'
            const data = store.readQuery({
              query: FEED_QUERY,
              variables: { first, skip, orderBy }
            })
            data.feed.links.unshift(post)
            store.writeQuery({
              query: FEED_QUERY,
              data,
              variables: { first, skip, orderBy }
            })
          }}
        >
            {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </Fragment>
    )
  }
}

export default CreateLink;
