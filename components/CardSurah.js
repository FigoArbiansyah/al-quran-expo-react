import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../helpers/utils';
import { useNavigation } from '@react-navigation/native';

const CardSurah = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Detail', {
          surah_number: item?.number
        });
      }}
      style={{
        padding: 10,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: theme.color.indigo,
        backgroundColor: 'white',
        elevation: 5,
        marginBottom: 7,
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 10,
      }}>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: theme.color.indigo,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 10,
            }}>
            {item?.number}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
            }}>
            {item?.name?.transliteration?.id ?? '-'}
          </Text>
          <Text
            style={{
              color: theme.color.slate,
            }}>
            {item?.name?.translation?.id ?? '-'}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 18, marginRight: 10, fontWeight: 500 }}>
          {item?.name?.short ?? '-'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardSurah;
