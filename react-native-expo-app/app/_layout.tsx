// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

// app/_layout.tsx
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : DefaultTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Drawer>
            <Drawer.Screen
              name="dashboard"
              options={{ title: 'Dashboard', headerTitle: 'Dashboard' }}
            />
            <Drawer.Screen
              name="department"
              options={{ title: 'Department', headerTitle: 'Department' }}
            />
            <Drawer.Screen
              name="workspace"
              options={{ title: 'Workspace', headerTitle: 'Workspace' }}
            />
            <Drawer.Screen
              name="user"
              options={{ title: 'User', headerTitle: 'User' }}
            />
            <Drawer.Screen
              name="role"
              options={{ title: 'Role', headerTitle: 'Role' }}
            />
            <Drawer.Screen
              name="apps"
              options={{ title: 'Apps', headerTitle: 'Apps' }}
            />
          </Drawer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}