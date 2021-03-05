import React from 'react';
import AuthFormLayout from '../src/components/auth/AuthFormLayout';
import SignupForm from '../src/components/auth/SignupForm';



interface signupProps {

}

const signin: React.FC<signupProps> = ({}) => {
  return (
    <AuthFormLayout title='Sign Up' >
      <SignupForm/>
    </AuthFormLayout>
  );
}


export default signin;