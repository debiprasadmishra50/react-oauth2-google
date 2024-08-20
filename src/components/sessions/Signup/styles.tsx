import styled from '@emotion/styled';
import { Card, CardProps } from '@mui/material';
import { styled as MUIStyled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const fbStyle = {
  background: '#3B5998',
  color: 'white',
};
export const googleStyle = {
  background: '#4285F4',
  color: '#000000',
  ':hover': {
    background: '#84B5FB',
  },
};

export type StyledCardProps = {
  passwordVisibility?: boolean;
};

export const StyledCard = MUIStyled<React.FC<StyledCardProps & CardProps>>(
  ({ children, passwordVisibility, ...rest }) => <Card {...rest}>{children}</Card>
)<CardProps>(({ theme, passwordVisibility }) => ({
  width: 506,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },

  marginTop: '84px',
  boxShadow: 'none',
  '.passwordEye': {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400],
  },
  '.facebookButton': {
    marginBottom: 10,
    '&:hover': fbStyle,
    ...fbStyle,
  },
  '.googleButton': {
    '&:hover': googleStyle,
    ...googleStyle,
  },
  '.agreement': {
    marginTop: 12,
    marginBottom: 24,
  },
}));

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const StyledAnchor = styled.a`
  text-decoration: none;
`;

export const StyledGoogleAnchor = styled(StyledAnchor)`
  color: #fff;
  width: 100%;
`;
