import React, { useState, forwardRef } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/AppText";

const AppInput = forwardRef(({ 
  label, 
  icon, 
  error, 
  style, 
  containerStyle, 
  rightIcon, 
  onRightIconPress,
  bottomMargin = true,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle, { marginBottom: bottomMargin ? Spacing.lg : 0 }]}>
      {/* Optionales Label über dem Input */}
      {label && <AppText style={styles.label} bold>{label}</AppText>}

      <View style={[
        styles.container, 
        isFocused && styles.containerFocused,
        error && styles.containerError
      ]}>
        
        {/* Linkes Icon (z.B. Search) */}
        {icon && (
          <MaterialIcons 
            name={icon} 
            size={20} 
            color={isFocused ? MyTheme.primaryAccent : MyTheme.muted} 
            style={styles.leftIcon} 
          />
        )}

        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor={MyTheme.muted}
          selectionColor={MyTheme.primaryAccent}
          underlineColorAndroid="transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          // Web-Fix gegen den blauen Rahmen
          {...{ accessibilityRole: "text" }}
          cursorColor={MyTheme.primaryAccent}
          {...props}
        />

        {/* Rechtes Icon (z.B. Clear-Button oder Auge bei Passwort) */}
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <MaterialIcons name={rightIcon} size={20} color='white' />
          </TouchableOpacity>
        )}
      </View>

      {/* Fehlermeldung */}
      {error && <AppText style={styles.errorText}>{error}</AppText>}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: Spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 54,
    paddingHorizontal: Spacing.md,
  },
  containerFocused: {
    borderColor: MyTheme.primaryAccent,
    backgroundColor: 'rgba(47, 196, 146, 0.08)',
  },
  containerError: {
    borderColor: '#ef4444',
  },
  input: {
    flex: 1,
    color: MyTheme.text,
    fontSize: 16,
    height: '100%',
    // WICHTIG: Entfernt blauen Rahmen im Web
    ...({ outlineStyle: 'none' }),
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    backgroundColor: MyTheme.primaryAccent,
    width: 40,
    height: 40,
    borderRadius: Spacing.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -Spacing.sm,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  }
});

export default AppInput;