import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #0000007f;
`;

export const ModalContent = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  padding: ${({ theme }) => theme.font_size.MD}px;
  width: 80%;
  padding-top: ${({ theme }) => theme.font_size.LG}px;
`;

export const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  font-weight: ${({ theme }) => theme.font_weight.bold};
  color: ${({ theme }) => theme.colors.black};
  margin: 0 0 ${({ theme }) => theme.font_size.MD}px 0;
`;
