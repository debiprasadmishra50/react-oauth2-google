import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';

export const Container = styled(Box)`
  width: 100%;
  min-height: 100vh;
  padding: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 450px) {
    padding: 110px 16px;
    min-height: 80vh;
  }
`;

export const Slogan = styled(Grid)`
  font-weight: bold;
  font-size: 42px;
  color: #ffffff;
`;

export const AppleContainer = styled(Grid)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
