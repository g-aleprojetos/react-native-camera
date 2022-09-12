import React from 'react';
import { SafeAreaView } from 'react-native';
import Camera from './src/Components/Camera';

const App = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <Camera/>
    </SafeAreaView>
  );
};

export default App;
