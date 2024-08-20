import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  minWidth: 0,
  minHeight: 0,
  borderRadius: '10px',
  hover: {
    background: '#fff',
  },
});

export const ActionButtonLarge = styled(Button)({
  height:"65px",
  padding:"11px 24px 11px 24px",
  borderRadius:"10px",
  fontSize: "16px",
  fontWeight:"600",
  color:"#000",
  boxShadow:"none",
  textTransform:"none",
});

export const ActionButtonMedium = styled(Button)({
  height:"45px",
  padding:"11px 24px 11px 24px",
  borderRadius:"10px",
  fontSize: "13px",
  fontWeight:"600",
  color:"#000",
  boxShadow:"none",
  textTransform:"none",
});

export default StyledButton;
