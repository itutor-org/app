import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.margins.MD}px;
  border-radius: 6px;
  background-color: #f1f1f1;
  margin: 0 0 ${({ theme }) => theme.margins.SM}px;
`;
