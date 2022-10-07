import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #0000007f;
`;

export const ModalContent = styled.View`
  background-color: #fff;
  border-radius: 5px;
  padding: ${({ theme }) => theme.font_size.MD}px;
  align-items: center;
  width: 80%;
  padding-top: ${({ theme }) => theme.font_size.LG}px;
`;

export const Message = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.dark_blue};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.margins.LG}px;
`;

export const ButtonsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ConfirmButton = styled.TouchableOpacity`
  width: 130px;
  height: 33px;
  background-color: ${({ theme }) => theme.colors.dark_yellow};
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DenyButton = styled(ConfirmButton)`
  background-color: ${({ theme }) => theme.colors.light_red};
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.font_size.MD}px;
`;
