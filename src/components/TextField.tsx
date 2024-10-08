import { Box, BoxProps, TextField, TextFieldProps } from '@mui/material';
import { Small } from './Typography';

export interface BazarTextFieldProps {}

const StyledTextField: React.FC<TextFieldProps & BoxProps> = ({
  label,
  InputProps,
  ...props
}: any) => {
  const boxProps: any = {};
  const textFieldProps: any = {};

  for (const key in props) {
    if (spacePropList.includes(key)) {
      boxProps[key] = props[key];
    } else textFieldProps[key] = props[key];
  }

  return (
    <Box sx={{ borderRadius: '10px' }} {...boxProps}>
      {label && (
        <Small
          display="block"
          mb={1}
          textAlign="left"
          fontWeight="600"
          color="grey.700"
        >
          {label}
        </Small>
      )}
      <TextField
        InputProps={{
          ...InputProps,
          style: {
            borderRadius: '10px',
            ...InputProps?.style,
            padding: '15px 5px',
            height: '55px',
            '.MuiOutlinedInput-input': {
              padding: 0,
            },
          },
        }}
        {...textFieldProps}
      />
    </Box>
  );
};

const spacePropList = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',
];

export default StyledTextField;
