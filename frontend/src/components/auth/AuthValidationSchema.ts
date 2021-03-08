import * as yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';

interface ValidationSchema {
  [key: string]: RequiredStringSchema<string | undefined, Record<string, unknown>>
}

export const SignUpValidationSchema: ValidationSchema = {
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .max(30, 'Password should be of Maximum 30 characters length')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required('Password is required'),
}

export const SignInValidationSchema: ValidationSchema = {
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
}