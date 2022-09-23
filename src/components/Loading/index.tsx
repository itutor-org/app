import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { SpinnerLoading, SplashScreen } from './styles';

import splashImg from '../../../assets/splash.png';
import { theme } from '../../styles/theme';

interface LoadingProps extends ActivityIndicatorProps {
  isTransparent?: boolean;
  color?: string;
  size?: 'small' | 'large';
}

export function Loading({
  isTransparent = true,
  size = 'small',
  color = theme.colors.white,
  ...rest
}: LoadingProps) {
  return (
    <SplashScreen
      transparent={isTransparent}
      source={splashImg}
      defaultSource={splashImg}>
      <SpinnerLoading transparent={isTransparent}>
        <ActivityIndicator {...rest} size={size} color={color} />
      </SpinnerLoading>
    </SplashScreen>
  );
}
