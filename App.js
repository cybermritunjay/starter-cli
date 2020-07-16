import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Navigator from './common/navigation/navigation'
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navigator />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
