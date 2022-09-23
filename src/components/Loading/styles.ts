import styled from 'styled-components/native';

interface LoadingProps {
  transparent: boolean;
}

export const SplashScreen = styled.ImageBackground<LoadingProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  color: #cc3333;
  height: ${({ transparent }) => (transparent ? '0' : '100%')};
`;

export const SpinnerLoading = styled.View<LoadingProps>`
  margin-top: ${({ transparent }) => (transparent ? '0' : '400px')};
`;
