import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #0000007f;
  padding: 20px;
  position: absolute;
`;

export const CloseDiv = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
  padding: ${({ theme }) => theme.font_size.MD}px;
  width: 100%;
`;

export const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.black};
  width: 100%;
  text-align: center;
`;
