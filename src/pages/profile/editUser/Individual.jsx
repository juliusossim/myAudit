import React, { useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { myProfile } from '../../../../redux/actions/profileActions';
import FormBuilder from '../../../../components/form/builders/form';
import formBuilderProps from '../../constants/withdrawalDetails';
import TextInput from '../../../../components/form/inputs/TextInput';
import Modal from '../../../../components/microComponents/modal';

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
