import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Importera translate, getCurrentLocale och den nya addLocaleListener
import { addLocaleListener, getCurrentLocale, translate } from './utils/i18n';

import RuneDetailScreen from './screens/RuneDetailScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentAppLocale, setCurrentAppLocale] = useState(getCurrentLocale()); // State för att tvinga omrenderering

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'CinzelDecorative': require('./assets/fonts/CinzelDecorative-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  // Prenumerera på språkändringar
  useEffect(() => {
    const unsubscribe = addLocaleListener(() => {
      setCurrentAppLocale(getCurrentLocale()); // Uppdatera state för att trigga re-render
    });

    // Cleanup-funktion för att sluta prenumerera när komponenten avmonteras
    return () => unsubscribe();
  }, []); // Tom beroende-array så den körs bara en gång vid mount

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // Använd currentAppLocale som en 'key' för att tvinga NavigationContainer
    // och dess barn att laddas om när språket ändras.
    <NavigationContainer key={currentAppLocale}>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: translate('search_title') }}
        />
        <Stack.Screen
          name="RuneDetail"
          component={RuneDetailScreen}
          options={{ title: translate('rune_detail_title') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}