// app/apps.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';
// import tracker from 'react-native-tracking-sdk';
import tracker from '../../react-native-tracking-sdk/src/index.js';

export default function AppsScreen() {
  const [visible, setVisible] = useState(false);

  // console.log(tracker, '<<<<')

  const onToggleSnackBar = () => {
    tracker.trackEvent('button_clicked', {
      button_name: 'login_button',
      screen: 'AppScreen'
    });
    setVisible(!visible);
  } 
  const onDismissSnackBar = () => {
    tracker.trackEvent('button_clicked', {
      button_name: 'login_button',
      screen: 'AppScreen'
    });
    setVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is an Apps page</Text>
      <Button mode="contained" onPress={onToggleSnackBar} style={styles.button}>
        Where are you?
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => onDismissSnackBar(),
        }}
      >
        Hey traveler, you're on page Apps now!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});