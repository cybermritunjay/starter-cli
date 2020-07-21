import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Navigator from './common/navigation/navigation'
export default function App() {
  return (

    <SafeAreaView style={styles.container} >
      <StatusBar />
      <Navigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.height
  },
});
