import styled from 'styled-components/native';

export const SearchWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
  margin-bottom: ${({ theme }) => theme.margins.MD}px;
`;
