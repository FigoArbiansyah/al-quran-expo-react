import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native';
import { theme } from '../helpers/utils';
import Logo from './Logo';
import moment from 'moment-timezone';

const { useState, useEffect } = React;

const Banner = ({ title, subTitle, style }) => {
  const [time, setTime] = useState(
    moment.tz('Asia/Jakarta').format('HH:mm:ss')
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment.tz('Asia/Jakarta').format('HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <LinearGradient
      style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        position: 'relative',
        minHeight: '6rem',
        overflow: 'hidden',
        borderRadius: 5,
        ...style,
      }}
      start={[0.1, 0.1]}
      colors={[theme.color.softViolet, theme.color.indigo]}>
      <Text
        style={{ color: 'white', fontSize: 22, fontWeight: 500, zIndex: 1 }}>
        {title}
      </Text>
      <Text
        style={{ color: 'white', fontSize: 14, zIndex: 1, marginTop: 5 }}>
        {subTitle ?? `${time} WIB`}
      </Text>
      <Logo
        style={{
          width: 120,
          height: 120,
          position: 'absolute',
          bottom: -40,
          right: 0,
          zIndex: 2,
        }}
      />
    </LinearGradient>
  );
};

export default Banner;
