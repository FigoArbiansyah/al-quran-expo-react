import { View, Image } from 'react-native';
import Quran from '../assets/quran.png';

const Logo = ({ style }) => {
  return <Image source={Quran} style={{ width: 50, height: 50, ...style }} />;
};

export default Logo;
