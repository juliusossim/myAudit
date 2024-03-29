import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import { apiOptions } from '../../../../services/fetch';
import useCreateBoilerPlate from '../../../../components/hooks/useCreateBoilerPlate';
import PageTemp from '../../../../components/temps/PageTemp';

const AddNotesTemp = (engagementId) => {
  /* redux hooks */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.engagement?.newNote);
  /* state */
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  /* boilerPlate hooks params */
  const options = {
    action: 'CREATE_NOTE',
    apiOpts: apiOptions({
      body: formData,
      endpoint: 'ENGAGEMENT',
      param: engagementId,
      afterParam: 'notes',
      auth: true,
      method: 'post'
    })
  };

  /* boilerPlate hooks */
  const {
    handleBlur, handleChange, status, handleChecked, create, data
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store,
    action: 'CREATE_NOTE_COMPLETE'
  });

  return (
    <div className="max-w-350 margin-center">
      <div className="text-center center-vertical-2">
        <svg width="50" height="49" viewBox="0 0 50 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M31.7415 11.0195H18.2686C17.6293 11.0203 17.1113 11.5404 17.1105 12.1822V42.245L16.9561 42.2923L13.651 43.3084C13.3249 43.4083 12.9798 43.2241 12.8798 42.8968L3.0486 10.656C2.94897 10.3285 3.13246 9.98196 3.45856 9.88167L8.55172 8.31594L23.317 3.77843L28.4101 2.2127C28.5666 2.16433 28.7359 2.18046 28.8806 2.25752C29.0253 2.33458 29.1335 2.46626 29.1814 2.62351L31.6944 10.8645L31.7415 11.0195Z" fill="#F2F2F2" />
          <path d="M34.6819 10.8644L31.6532 0.932128C31.5515 0.597902 31.3216 0.317983 31.0142 0.153998C30.7067 -0.00998709 30.347 -0.0445924 30.0142 0.0578006L22.8535 2.25835L8.08905 6.79664L0.928383 8.99796C0.235751 9.21149 -0.153895 9.94774 0.0575005 10.6435L10.409 44.5881C10.5783 45.1418 11.0875 45.52 11.6644 45.5205C11.7944 45.5206 11.9238 45.501 12.0481 45.4624L16.9567 43.954L17.1111 43.906V43.744L16.9567 43.7912L12.0025 45.3143C11.3912 45.5014 10.7443 45.1564 10.5565 44.5431L0.205762 10.5978C0.115496 10.303 0.145755 9.98427 0.289864 9.71191C0.433973 9.43955 0.68009 9.23594 0.97392 9.146L8.13459 6.94468L22.8991 2.40717L30.0598 0.205849C30.1701 0.172038 30.2848 0.154799 30.4002 0.154691C30.9085 0.155837 31.3567 0.489257 31.5058 0.977086L34.5206 10.8644L34.5685 11.0195H34.7291L34.6819 10.8644Z" fill="#3F3D56" />
          <path d="M9.47095 9.90685C9.1655 9.90664 8.89587 9.7065 8.80612 9.41336L7.81171 6.15232C7.75774 5.97541 7.77599 5.78422 7.86245 5.62083C7.94891 5.45743 8.09649 5.33522 8.27271 5.28108L21.8559 1.10603C22.2228 0.993621 22.6111 1.20068 22.7237 1.56882L23.7181 4.8299C23.83 5.19825 23.6238 5.58802 23.2572 5.70118L9.67395 9.87624C9.60818 9.8965 9.53976 9.90682 9.47095 9.90685Z" fill="#FFA500" />
          <ellipse cx="14.6808" cy="1.93353" rx="1.54408" ry="1.55023" fill="#FFA500" />
          <ellipse cx="14.6809" cy="1.93356" rx="0.977759" ry="0.981651" fill="white" />
          <path d="M46.5266 45.1243H20.4316C20.0694 45.1239 19.7758 44.8292 19.7754 44.4655V13.0734C19.7758 12.7097 20.0694 12.415 20.4316 12.4146H46.5266C46.8888 12.415 47.1824 12.7097 47.1828 13.0734V44.4655C47.1824 44.8292 46.8888 45.1239 46.5266 45.1243Z" fill="#E6E6E6" />
          <path fillRule="evenodd" clipRule="evenodd" d="M34.5688 11.0195L34.5209 10.8645H48.6879C49.4123 10.8655 49.9993 11.4549 50.0003 12.1822V47.6824C49.9993 48.4097 49.4123 48.999 48.6879 49.0001H18.2695C17.5451 48.999 16.9581 48.4097 16.957 47.6824V43.7913L17.1114 43.744V47.6824C17.1122 48.3242 17.6302 48.8443 18.2695 48.8451H48.6879C49.3271 48.8443 49.8452 48.3242 49.8459 47.6824V12.1822C49.8452 11.5404 49.3271 11.0203 48.6879 11.0195H34.5688Z" fill="#3F3D56" />
          <path d="M40.582 14.2749H26.3765C25.9929 14.2745 25.6821 13.9624 25.6816 13.5773V10.1668C25.6821 9.78175 25.9929 9.46967 26.3765 9.46924H40.582C40.9656 9.46967 41.2764 9.78175 41.2768 10.1668V13.5773C41.2764 13.9624 40.9656 14.2745 40.582 14.2749Z" fill="#FFA500" />
          <ellipse cx="33.4777" cy="8.15154" rx="1.54408" ry="1.55023" fill="#FFA500" />
          <ellipse cx="33.4776" cy="8.15151" rx="0.940489" ry="0.944233" fill="white" />
        </svg>
        <PageTemp
          status={status}
          initial={(
            <div>
              <div className="my-1 w-100">
                <DragNDropTemp
                  formData={formData}
                  setFormData={setFormData}
                  seProgress={setProgress}
                  progress={progress}
                  name="engagement_letter"
                  label="Engagement Letter"
                  setProgress={setProgress}
                />
              </div>
              <button className="btn bg-theme-black text-theme" type="button" onClick={create}>
                Add Note
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default AddNotesTemp;
