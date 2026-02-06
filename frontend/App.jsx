import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navbar from './src/components/Navbar';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>

          <View style={{ height: 56, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Placeholder Toolbar</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Placeholder Content</Text>
          </View>
          <Navbar activePage={activePage} setActivePage={setActivePage}/>
        
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
