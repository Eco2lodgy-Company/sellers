// import 'react-native-url-polyfill/auto'
// import { useState, useEffect } from 'react'
// import { supabase } from '@/lib/supabase'
// import Auth from '@/components/Auth'
// import { View, Text } from 'react-native'
// import { Session } from '@supabase/supabase-js'

// export default function App() {
//   const [session, setSession] = useState<Session | null>(null)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//   return (
//     <View>
//       <Auth />
//       {session && session.user && <Text>{session.user.id}</Text>}
//     </View>
//   )
// }
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/onboarding/onboard'
// import Profile from '@/screens/profile'; // Ton fichier de profil
// import Notifications from '@/screens/notifications'; // Ton fichier de notifications

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboard">
        {/* Déclare tes écrans ici */}
        <Stack.Screen
          name="Onboard"
          component={OnboardingScreen}
          options={{ title: 'Onboarding' }}
        />
        {/* <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Mon Profil' }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ title: 'Notifications' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
