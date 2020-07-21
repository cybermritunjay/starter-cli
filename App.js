import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './common/store';
import Navigator from './common/navigation/navigation'
export default function App() {
  const [isReady, setIsReady] = useState(true)
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <SafeAreaView style={styles.container} >
          <StatusBar />
          {isReady ? <ActivityIndicator /> : <Navigator />}
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.height
  },
});
