import React, { useState } from 'react';
import SimpleSnackbar from '../../microComponents/snackBar';
import { copyText } from '../../../utilities/stringOperations';
import PageTemp from '../PageTemp';

const ManualTemp = ({ data, handleCancel, status }) => {
  const [open, setOpen] = useState(false);

  const temp = (
    <div className="">
      <p>
        <span className="mr-1"> Account Number:</span>
        <span className="bold text-wema">
          {data.accountNumber}
        </span>
        <button type="button" className="btn-plain  border-bottom ml-2 hover-wema" onClick={() => copyText({ str: data?.accountNumber, callback: () => setOpen(true) })}>
          copy
        </button>
      </p>
      <p>
        <span className="mr-1"> Bank:</span>
        <span className="bold text-wema">
          Wema Bank
        </span>
      </p>
      <p>
        <span className="mr-1"> Reference:</span>
        <span className="bold text-wema">
          {data.transactionReference}
        </span>
        <button type="button" className="btn-plain  border-bottom ml-2 hover-wema" onClick={() => copyText({ str: data?.transactionReference, callback: () => setOpen(true) })}>
          copy
        </button>
      </p>
    </div>
  );

  return (
    <div>
      <div className="">
        <p className="font-bold text-wema">
          Manual Donation Pending
        </p>
        <p>
          Complete your donation by paying to the account details below:
        </p>
      </div>
      <PageTemp
        view={temp}
        initial={temp}
        status={status}
      />

      <div>
        <div className="bold">
          <p>
            Kindly use the transaction reference
          </p>
          {/* <p className="text-muted mx-1 h3">{data.transactionReference}</p> */}
          <p>as your narrative</p>
        </div>
      </div>
      <div className="mt-2">
        <p>Please confirm your have successfully donated</p>
      </div>
      <div className="">
        <button type="button" className="btn-plain border-wema text-wema" onClick={() => handleCancel(true)}>
          I have Donated
        </button>
        <button type="button" className="btn-plain text-danger border-wema float-right" onClick={() => handleCancel(false)}>
          cancel
        </button>
      </div>
      <SimpleSnackbar open={open} setOpen={setOpen} message="copied to clipboard" />
    </div>
  );
};

export default ManualTemp;
