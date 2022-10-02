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

export const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.font_size.LG}px;
  font-family: ${({ theme }) => theme.font_family.bold};
  color: ${({ theme }) => theme.colors.black};
  margin: ${({ theme }) => theme.margins.MD}px;
`;
