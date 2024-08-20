import * as yup from 'yup';

export const initialValues = {
  email: '',
  password: '',
};

export const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('invalid email')
    .required((params) => `${params.path} is required`),
  password: yup.string().required((params) => `${params.path} is required`),
});
