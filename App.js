import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';

import {setContext} from '@apollo/client/link/context';

const App = () => {
  // const [tokenState, setTokenState] = useState();
  const BASE_URI = 'http://localhost:3000/graphql';

  const [apolloClient, setApolloClient] = useState(
    new ApolloClient({
      uri: BASE_URI,
      cache: new InMemoryCache(),
    }),
  );
  const [user, setUser] = useState(null);

  const httpLink = createHttpLink({
    uri: BASE_URI,
    credentials: 'same-origin',
  });

  async function onAuthStateChanged(user) {
    setUser(user);
    if (user) {

      const token = await user?.getIdToken();
      console.log('Get token successfull.');
      const authLink = setContext((_, {headers}) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });

      setApolloClient(client);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
