import { compose, display, spacing, styled } from '@mui/system';

const StyledImage = styled('img')(compose(spacing, display));

StyledImage.defaultProps = {
  display: 'block',
};

export default StyledImage;

// compose,
// borders,
// display,
// flexbox,
// palette,
// positions,
// shadows,
// sizing,
// spacing,
// typography
