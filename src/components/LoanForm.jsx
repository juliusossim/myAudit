import React, { useState } from 'react';
import SelectInput from './common/inputs/SelectInput';
import TextareaInput from './common/inputs/TextareaInput';
import TextInput from './common/inputs/TextInput';

const LoanForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value
    }));
  };

  return (
    <div className="w-100">
      <div className="loan-form-container">
        <div className="loan-form">
          <center>
            <h3 className="m-b-20">Loan Form</h3>
          </center>
          <div className="row">
            <div className="col-6">
              <TextInput
                label="First Name"
                name="firstName"
                value={formData?.firstName || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
            <div className="col-6">
              <TextInput
                label="Last Name"
                name="lastName"
                value={formData?.lastName || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextInput
                label="Middle Name"
                name="middleName"
                value={formData?.middleName || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
            <div className="col-6">
              <TextInput
                label="BVN"
                name="bvn"
                value={formData?.bvn || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextInput
                label="Email Address"
                name="email"
                value={formData?.email || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
            <div className="col-6">
              <TextInput
                label="Phone Number"
                name="phoneNumber"
                value={formData?.phoneNumber || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextInput
                label="Account Number"
                name="accountNumber"
                value={formData?.accountNumber || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
            <div className="col-6">
              <SelectInput
                label="Bank"
                name="bankId"
                value={formData?.bankId || ''}
                options={['']}
                onChange={handleChange}
                className="w-100"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextInput
                label="Date of Birth"
                name="dateOfBirth"
                value={formData?.dateOfBirth || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextInput
                label="Asset Name"
                name="assetName"
                value={formData?.assetName || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
            <div className="col-6">
              <TextInput
                label="Asset Amount"
                name="assetAmount"
                value={formData?.assetAmount || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TextareaInput
                label="Asset Name"
                name="assetDescription"
                value={formData?.assetDescription || ''}
                onChange={handleChange}
                className="w-100"
                rows={4}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <SelectInput
                label="Select Loan Type"
                name="loanTypeId"
                value={formData?.loanTypeId || ''}
                options={['']}
                onChange={handleChange}
                className="w-100"
              />
            </div>
            <div className="col-6">
              <TextInput
                label="Loan Tenor"
                name="loanTenor"
                value={formData?.loanTenor || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextInput
                label="Part Repayment Amount"
                name="partRepaymentAmount"
                value={formData?.partRepaymentAmount || ''}
                onChange={handleChange}
                className="w-100"
              />
            </div>
          </div>
          <center>
            <button type="button" className="btn btn-large">Submit Form</button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default LoanForm;

// {
//   "firstName": null,
//   "lastName": null,
//   "middleName": null,
//   "bvn": null,
//   "email": null,
//   "phoneNumber": null,
//   "accountNumber": null,
//   "bankId": null,
//   "dateOfBirth": "0001-01-01T00:00:00"
//   "assetName": null,
//   "assetAmount": 0.0,
//   "assetDescription": null,
//   "loanTypeId": null,
//   "loanTenor": 0,
//   "partRepaymentAmount": 0,
// }
