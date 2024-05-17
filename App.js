import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/navigator/TabNavigator";
import {Provider} from "react-redux";
import store from "./src/redux/store/store";


const App = () => {

  return (
      <Provider store={store}>
          <NavigationContainer>
              <TabNavigator/>
          </NavigationContainer>
      </Provider>
  );
};

export default App;
