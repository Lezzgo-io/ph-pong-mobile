import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import moment from 'moment-timezone';

import Global from './src/util/Global';

import BottomTabs from './src/components/bottom-tabs/BottomTabs';

function App() {
  moment.tz.setDefault('Asia/Singapore');

  const [auth, setAuth] = useState(false);

  return (
    <Global.Provider value={{auth, setAuth}}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </Global.Provider>
  );
}

export default App;
