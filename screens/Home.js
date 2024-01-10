import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../helpers/utils';
import Banner from '../components/Banner';
import CardSurah from '../components/CardSurah';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const { useState, useEffect } = React;

function HomeScreen({ navigation }) {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = 'https://api.quran.gading.dev/surah';
      const req = await fetch(url);
      const response = await req.json();
      setSurahs(response);
    } catch (e) {
      setSurahs([]);
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={{ padding: 10, backgroundColor: 'white' }}>
      <Banner title="Quran App" />
      <View style={{ marginTop: 10 }}>
        {loading ? (
          <View style={{ marginTop: 15 }}>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <FlatList
            data={surahs?.data}
            renderItem={({ item, index }) => {
              return <CardSurah key={index} item={item} />;
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
