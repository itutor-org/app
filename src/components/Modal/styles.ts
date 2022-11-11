import styled, { DefaultTheme } from 'styled-components/native';

interface ModalContentProps {
  height: number;
  theme: DefaultTheme;
}

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #0000007f;
`;

export const ModalContent = styled.View<ModalContentProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 5px;
  padding: ${({ theme }) => theme.font_size.MD}px;
  width: 80%;
  height: ${(props) => props.height}px;
`;

export const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.black};
  margin-top: ${({ theme }) => theme.margins.LG}px;
`;
