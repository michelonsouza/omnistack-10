import React from 'react';
import { ActivityIndicator, View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
  }
})

export default function Profile({ navigation }) {
  const githubUsername = navigation.getParam('github_username');

  const size = Platform.OS === 'ios' ? 'large' : 100;

  function renderLoading() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={size} color="#7d40e7" />
      </View>
    )
  }

  return (
    <WebView startInLoadingState={true} renderLoading={renderLoading} style={styles.webview} source={{ uri: `https://github.com/${githubUsername}` }} />
  );
}
