import React from 'react';
import AuthFormLayout from '../src/components/auth/AuthFormLayout';
import SigninForm from '../src/components/auth/SigninForm';



interface signinProps {

}

const signin: React.FC<signinProps> = ({}) => {
  return (
    <AuthFormLayout title='Sign Up' >
      <SigninForm/>
    </AuthFormLayout>
  );
}


export default signin;