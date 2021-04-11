import React from 'react';
import AuthFormLayout from '../src/components/auth/AuthFormLayout';
import SignupForm from '../src/components/auth/SignupForm';

const signup: React.FC = () => {
  return (
    <AuthFormLayout title='Sign Up' >
      <SignupForm/>
    </AuthFormLayout>
  );
}


export default signup;