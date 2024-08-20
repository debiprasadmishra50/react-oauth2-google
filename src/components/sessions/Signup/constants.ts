import * as yup from 'yup';

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
};

export const formSchema = yup.object().shape({
  fullName: yup.string().required((params) => `${params.path} is required`),
  email: yup
    .string()
    .email('invalid email')
    .required((params) => `${params.path} is required`),
  password: yup
    .string()
    .required((params) => `${params.path} is required`)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
});
