import 'bootstrap/dist/css/bootstrap.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from "@apollo/client";

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './Components/Navigation';
import Lumin from './Components/Lumin';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const client = new ApolloClient({
  uri: 'https://pangaea-interviews.now.sh/api/graphql',
  cache: new InMemoryCache()
});

export const ALL_PRODUCTS = gql`
  query GetProducts {
      products {
        id
        image_url
        title
        price
      }
    }
`;

export const ALL_CURRENCY = gql`
query GetCurrency {
    currency
  }
`;

const Home = () => {

  return <>
    <Navigation />
    <BrowserRouter>
      <Routes>
        <Route path="*" exact  element={<Lumin />}/>
      </Routes>  
    </BrowserRouter>      
  </>
  
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);