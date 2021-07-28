import React, { useState } from 'react';
import FormBuilder from '../../../components/form/builders/form';
import formBuilderProps from '../constants/withdrawalDetails';

const user = { ...JSON.parse(localStorage.getItem('user')) };

const Index = () => {
  const [formData] = useState({ ...user, account_name: `${user.first_name || ''} ${user.last_name || ''}` });

  return (
    <div className="w-600 margin-center m-t-40 ">
      <div className="login-form-container p-20">
        <FormBuilder
          formItems={
            formBuilderProps(
              {
                formData
              }
            )
          }
        />
      </div>
    </div>

  );
};
export default Index;
