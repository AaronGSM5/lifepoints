import { View, StyleSheet } from 'react-native';
import React from 'react';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from './AppText';

export default function NotificationEntry({ notification }) {
  return (
    <View style={styles.container}>
      <AppText type='body'>
        {notification.title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.primary,
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: MyTheme.secondary,
  }
})