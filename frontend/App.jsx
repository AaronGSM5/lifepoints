import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navbar from './src/components/Navbar';
import Toolbar from './src/components/Toolbar';
import Content from './src/components/Content';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>

          <Toolbar />
          <Content />
          <Navbar activePage={activePage} setActivePage={setActivePage}/>
        
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
