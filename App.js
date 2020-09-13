import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { fcmService } from './src/FCMService';
import { localNotificationService } from './src/LocalNotificationService'

const App = () => {
  const [messageFirebase, setMessageFirebase] = useState('')

  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onRegister: ", token)
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify, options
      )
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      alert('Open Notification: ' + notify.body)
      setMessageFirebase(notify.body)
    }

    return () => {
      console.log('[App] unRegister')
      fcmService.unRegister()
      localNotificationService.unregister()
    }

  }, [])

  return (
    <View style={styles.container}>
      <Text>React Native Notification</Text>
      <Button
        title='Press me'
        onPress={() => localNotificationService.cancelAllLocalNotifications()}
      />
      <View style={{ marginTop: 20 }}>
        <Text>{messageFirebase}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
