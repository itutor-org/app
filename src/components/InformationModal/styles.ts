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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  height: 20%;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.black};
`;

export const Message = styled.Text`
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-weight: ${({ theme }) => theme.font_weight.regular};
  color: ${({ theme }) => theme.colors.dark_blue};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.margins.SM}px;
`;

export const ButtonsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.dark_yellow};
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.font_size.MD}px;
`;
