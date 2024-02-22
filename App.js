import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Global from './src/util/Global';

import BottomTabs from './src/components/bottom-tabs/BottomTabs';

function App() {
  const [auth, setAuth] = useState(true);

  return (
    <Global.Provider value={{auth, setAuth}}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </Global.Provider>
  );
}

export default App;
