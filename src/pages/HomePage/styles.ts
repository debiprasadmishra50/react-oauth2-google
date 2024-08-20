import styled from '@emotion/styled';
import { Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100vw; */
  max-width: 1225px;
  margin: auto;
`;

export const NewReleaseContainer = styled(Box)`
  width: 100%;
`;

export const OnSaleGamesContainer = styled(Grid)`
  width: 100%;
`;

export const TopGamesContainer = styled(Grid)`
  width: 100%;
  /* padding: 0 32px 48px 0; */
`;

export const Header = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  color: #2b3445;
  margin: 0 15px;
`;

export const StyledLink = styled(Link)`
  font-size: 15px;
  line-height: 120%;
  color: #2b3445;
  margin-bottom: 24px;
  text-decoration: none;
  display: flex;
`;

export const SignInCoverContainer = styled(Box)`
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  width: 100%;
  position: relative;
  margin-bottom: 32px;
`;

export const SigninCoverImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
`;

export const SignInCarouselContainer = styled(Box)`
  background-size: cover;
  background-position: center;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
`;

export const SignInCoverWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Heading = styled(Grid)`
  font-weight: 700;
  line-height: 65px;
  color: #fff;
  margin-bottom: 16px;
`;

export const SignInButton = styled(Button)`
  min-width: 164px;
  padding: 8px;
`;
