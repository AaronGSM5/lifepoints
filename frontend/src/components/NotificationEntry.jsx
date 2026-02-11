import { View, Text } from 'react-native';
import React from 'react';
import { MyTheme } from '@/constants/Colors';

export default function NotificationEntry({ notification }) {
  return (
    <View
      style={{
        backgroundColor: MyTheme.primary,        // dunkle Card
        padding: 16,                     // innenabstand
        borderRadius: 12,                // abgerundete Ecken
        marginBottom: 12,                // Abstand zur nächsten Karte
        shadowColor: '#000',             // iOS Schatten
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,                    // Android Schatten
      }}
    >
      <Text
        style={{
          color: MyTheme.text,
          fontSize: 16,
          fontWeight: '500',
        }}
      >
        {notification.title}
      </Text>
    </View>
  );
}
