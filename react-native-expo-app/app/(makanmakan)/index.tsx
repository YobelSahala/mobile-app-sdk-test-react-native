import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/makan.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Makan! 🍔</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Makan</ThemedText>
        <ThemedText>
          Makan <ThemedText type="defaultSemiBold">makan/(makan)/makan.tsx</ThemedText> makan makan makan.
          Makan{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          makan makan makan makan.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Makan</ThemedText>
        <ThemedText>
          Makan makan Makan makan makan makan makan makan makan's makan makan makan makan makan.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Makan</ThemedText>
        <ThemedText>
          makan makan makan, run{' '}
          <ThemedText type="defaultSemiBold">npm run makan-makan</ThemedText> makan makan makan makan{' '}
          <ThemedText type="defaultSemiBold">makan</ThemedText> makan. makan makan makan makan makan{' '}
          <ThemedText type="defaultSemiBold">makan</ThemedText> makan{' '}
          <ThemedText type="defaultSemiBold">makan-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 290,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'relative',
  },
});
