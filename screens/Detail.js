import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Banner from '../components/Banner';
import { theme } from '../helpers/utils';
import { Divider } from 'react-native-paper';

function DetailsScreen() {
  const route = useRoute();
  const [surah, setSurah] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://api.quran.gading.dev/surah/${
        route?.params?.surah_number ?? '1'
      }`;
      const req = await fetch(url);
      const response = await req.json();
      setSurah(response?.data);
    } catch (e) {
      setSurah({});
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route?.params, route?.params?.surah_number]);
  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
        padding: 10,
      }}>
      <Banner
        title={surah?.name?.transliteration?.id ?? '-'}
        subTitle={surah?.name?.translation?.id ?? '-'}
      />
      {/* Basmallah */}
      {surah?.number != 1 && surah?.number != 9 && (
        <View
          style={{
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 500,
              textAlign: 'center',
            }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </Text>
        </View>
      )}
      <View style={{ marginTop: 15, paddingBottom: 30 }}>
        <FlatList
          data={surah?.verses}
          renderItem={({ item, index }) => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 10,
                    paddingVertical: 20,
                  }}>
                  <View style={{ width: '3%' }}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderTopLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        borderColor: theme.color.indigo,
                        marginBottom: 20,
                      }}>
                      <Text>{item?.number?.inSurah}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '90%',
                      paddingLeft: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        textAlign: 'right',
                      }}>
                      {item?.text?.arab}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 300,
                        marginTop: 10,
                        textAlign: 'justify',
                        marginLeft: 'auto'
                      }}>
                      {item?.text?.transliteration?.en}
                    </Text>
                  </View>
                </View>
                <Divider />
              </>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;
