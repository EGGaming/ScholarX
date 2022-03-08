import { Dimensions } from 'react-native';

export default function isViewport(type: 'xs' | 'md' | 'lg') {
  const { width, height } = Dimensions.get('window');
  switch (type) {
    case 'xs':
      return width <= 375 || height <= 820;
    case 'md':
      return width <= 390 || height <= 870;
    case 'lg':
      return width <= 420 || height <= 900;
  }
}
