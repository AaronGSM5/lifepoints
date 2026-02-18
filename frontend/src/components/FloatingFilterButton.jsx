import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MyTheme } from '@/constants/Colors';

const FloatingFilterButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Animationswert: 0 = geschlossen, 1 = geöffnet
  const animationValue = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    // Wenn wir schließen, setzen wir den State erst nach der Animation auf false
    if (isExpanded) {
        animateMenu(0);
        setTimeout(() => setIsExpanded(false), 300); // Timeout entspricht der Animationsdauer
    } else {
        setIsExpanded(true);
        // Kleiner Timeout, damit das Rendern stattfinden kann, bevor die Animation startet
        setTimeout(() => animateMenu(1), 10);
    }
  };

  const animateMenu = (toValue) => {
    Animated.timing(animationValue, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true, // Wichtig für Performance
    }).start();
  };

  // --- Interpolationen für die Animationen ---

  // Rotation des Hauptbuttons (Filter wird zum X)
  const mainButtonRotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  // Animation für die Unterbuttons (Einblenden und nach unten gleiten)
  const subButtonOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  
  // Slide-In Effekt: Startet 30 Pixel weiter oben und gleitet auf Position 0
  const subButtonTranslateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 0],
  });

  const subButtonStyle = {
    opacity: subButtonOpacity,
    transform: [{ translateY: subButtonTranslateY }],
  };


  // Hilfsfunktion für die kleinen Buttons
  const SubButton = ({ iconName, iconLibrary, onPress }) => {
    
    const IconTag = iconLibrary === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;
    return (
      <TouchableOpacity 
        style={[styles.roundButton, styles.subButton, { backgroundColor: MyTheme.secondary }]} 
        onPress={onPress}
        activeOpacity={0.7}
        // Verhindert Klicks, wenn das Menü geschlossen ist (aber noch unsichtbar da ist)
        pointerEvents={isExpanded ? 'auto' : 'none'} 
      >
        <IconTag name={iconName} size={24} color={MyTheme.text} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.menuContainer} pointerEvents="box-none">
      
      {/* --- Der Haupt-Filter-Button --- */}
      <TouchableOpacity 
        onPress={toggleMenu} 
        activeOpacity={0.8}
        style={[styles.roundButton, styles.mainButton]}
      >
        {/* Wir animieren das Icon, damit es sich beim Wechsel dreht */}
        <Animated.View style={{ transform: [{ rotate: mainButtonRotation }] }}>
           <Ionicons 
             name={isExpanded ? "close" : "filter"} 
             size={24} 
             color={MyTheme.text} 
           />
        </Animated.View>
      </TouchableOpacity>

      {/* --- Container für die Unterbuttons --- */}
      {/* Wir nutzen hier einen Trick: Die Buttons sind immer im DOM, 
          aber wir animieren ihre Opacity. pointerEvents in SubButton 
          verhindert Geisterklicks wenn opacity 0 ist. */}
      <Animated.View style={[styles.subButtonsContainer, subButtonStyle]}>
        
        <SubButton 
            iconName="heart"
            iconLibrary="Ionicons"
            onPress={() => console.log("Herz gedrückt")} 
        />
        <SubButton 
            iconName="emoticon-happy-outline"
            iconLibrary="MaterialCommunityIcons"
            onPress={() => console.log("Smiley gedrückt")} 
        />
         <SubButton 
            iconName="emoticon-neutral-outline"
            iconLibrary="MaterialCommunityIcons"
            onPress={() => console.log("Stern gedrückt")} 
        />
         <SubButton 
            iconName="emoticon-angry-outline"
            iconLibrary="MaterialCommunityIcons"
            onPress={() => console.log("Stern gedrückt")} 
        />
        
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Der Gesamtcontainer, der absolut oben links sitzt
  menuContainer: {
    position: 'absolute',
    top: 20, // Abstand von oben (Statusbar berücksichtigen)
    right: 20, // Abstand von links
    zIndex: 999, // Ganz oben auf dem Stapel
    alignItems: 'center', // Zentriert die Unterbuttons unter dem Hauptbutton
  },
  // Grundstil für alle runden Buttons
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // Schatten für Android
    elevation: 6,
    // Schatten für iOS
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
  },
  mainButton: {
    backgroundColor: MyTheme.secondary,
    zIndex: 10,
  },
  subButtonsContainer: {
    marginTop: 15, // Abstand zwischen Hauptbutton und erstem Unterbutton
    gap: 15, // Abstand zwischen den Unterbuttons (braucht neueres React Native)
    // Alternativ für ältere RN Versionen statt 'gap':
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // height: 210, // (60 Button + 15 Margin) * 3
  },
  subButton: {
    width: 35, height: 35, borderRadius: 30,
    zIndex: 5,
  }
});

export default FloatingFilterButton;