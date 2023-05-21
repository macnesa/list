import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CatList from './Catlist';
 
import { SafeAreaView } from 'react-native-safe-area-context';  
  
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>PT. Buana Varia Komputama<Text style={{color: "#00C1FF"}}></Text></Text>
        <CatList />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#112945', 
  },
  mainTitle: {
    color:"#3f618d",
    fontWeight: "bold",
    marginTop:10, 
    fontSize: 22,
    marginLeft:10,
  }
});
