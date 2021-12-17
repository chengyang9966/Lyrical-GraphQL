import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SongList from './components/SongList';
import './style/style.css';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetails from './components/SongDetails';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      songs: {
        keyFields: ['id']
      },
      lyrics: {
        keyFields: ['id']
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only'
    },
    query: {
      fetchPolicy: 'network-only'
    }
  }
});
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App>
        <Router>
          <Switch>
            <Route exact path='/' component={SongList} />
            <Route exact path='/songs/new' component={SongCreate} />
            <Route path='/songs/:id' component={SongDetails} />
          </Switch>
        </Router>
      </App>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
