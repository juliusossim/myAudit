import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { notifier } from '../../utilities/stringOperations';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useStoreParams from '../../components/hooks/useStoreParams';
import { apiOptions } from '../../services/fetch';
import { projectAction } from '../../redux/actions/projectActions';
import FormBuilder from '../../components/form/builders/form';
import newEngagementProps from '../Engagements/constants/newEngagement';
import inviteUser from './constants/registration/inviteUser';

const InviteUser = () => {
  /* state */
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  /* redux */
  const store = useSelector((state) => state.auth?.inviteUser);
  const options = {
    action: 'INVITE_USER',
    apiOpts: apiOptions({
      body: formData,
      endpoint: 'INVITE_USER',
      auth: true,
      method: 'post'
    })
  };
  const {
    handleBlur, handleChange, status, handleChecked, create, data, backErrors, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store,
    action: 'INVITE_USER_COMPLETE',
    redirect: '/app/dashboard'
  });

  return (
    <div className="">
      <div className="d-flex ml-4 custom-top-bar justify-content-between">
        <div className="text-theme-black bold">
          INVITE USER
        </div>
      </div>
      <div className="content">
        <div className="p-5 box-shadow">
          <div className="max-w-750">

            {
              status === 'pending'
                ? <Loader />
                : (
                  <div className="d-flex justify-content-between wrap">
                    <div className="col-md-6 mt-md-5">
                      <div className="d-flex justify-content-between wrap">
                        <FormBuilder
                          formItems={
                            inviteUser(
                              {
                                formData,
                                handleBlur,
                                handleChange,
                                errors,
                                handleChecked
                              }
                            )
                          }
                        />
                        <div className="p-3">
                          <button className=" btn" type="button" onClick={create}>Invite User</button>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <svg width="291" height="458" viewBox="0 0 291 458" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M265.132 404.432L265.048 407.924L264.814 418.301L200.493 441.243L157.056 456.735L155.223 451.651L153.277 458L54.919 427.033L53.3944 397.136V397.129L53.0581 390.485L245.743 379.751L249.522 384.555L250.27 385.51L265.132 404.432V404.432Z" fill="#2F2E41" />
                        <path d="M125.476 86.809C125.476 86.809 112.545 125.439 109.958 125.439C107.372 125.439 134.528 155.485 134.528 155.485L174.616 173.727L188.841 124.366C188.841 124.366 175.909 97.5396 178.495 83.5899L125.476 86.809Z" fill="#8A5454" />
                        <ellipse cx="146.167" cy="62.1287" rx="47.8467" ry="39.7031" fill="#8A5454" />
                        <path d="M152.632 144.754L114.403 117.205L91.8541 126.512L42.7142 152.265C42.7142 152.265 55.6457 384.046 49.1799 392.63C49.1799 392.63 63.4046 419.456 147.46 403.361C231.515 387.265 253.498 385.119 253.498 385.119L235.394 243.475L257.378 154.412L183.535 111.564L160.391 144.754L152.632 144.754Z" fill="#FFA500" />
                        <path d="M10.3852 234.891C10.3852 234.891 -9.01208 285.324 5.21263 290.69C19.4373 296.055 31.0757 293.909 31.0757 293.909L53.0594 249.914L10.3852 234.891Z" fill="#8A5454" />
                        <path d="M279.362 226.306L291 271.375V362.585C291 362.585 274.189 420.53 261.257 405.507C248.326 390.484 248.593 385.727 248.593 385.727L265.137 364.731L257.378 278.886L236.762 237.936L279.362 226.306Z" fill="#8A5454" />
                        <path d="M191.427 22.4257C191.427 22.4257 175.909 -5.47374 146.167 0.964603C116.424 7.40294 99.6129 17.0604 98.3198 26.7179C97.0266 36.3755 98.9664 50.8617 98.9664 50.8617C98.9664 50.8617 102.199 31.0102 122.89 35.3024C143.58 39.5946 175.909 36.3755 175.909 36.3755L181.082 75.0055C181.082 75.0055 186.901 68.0306 193.367 72.3228C199.833 76.6151 212.117 31.0101 191.427 22.4257Z" fill="#2F2E41" />
                        <path d="M237.101 235.167L241.778 255.346L287.608 245.256L279.19 226.629L237.101 235.167V235.167Z" fill="#3F3D56" />
                        <path d="M9.53406 234.534L2.22734 254.168L48.3932 263.145L51.5187 243.421L9.53406 234.534V234.534Z" fill="#3F3D56" />
                        <path d="M227.635 152.265L257.378 154.412C257.378 154.412 291 230.599 287.121 232.745C283.241 234.891 236.688 247.767 230.222 244.548C223.756 241.329 227.635 152.265 227.635 152.265Z" fill="#FFA500" />
                        <path d="M53.0594 154.412L42.7141 152.265C42.7141 152.265 23.3168 172.654 16.851 196.261C10.3852 219.868 1.33315 243.475 6.50577 243.475C11.6784 243.475 58.232 258.498 58.232 258.498L53.0594 154.412Z" fill="#FFA500" />
                        <ellipse cx="157.599" cy="152.121" rx="9.35322" ry="7.76127" fill="#3F3D56" />
                        <ellipse cx="120.542" cy="54.7531" rx="9.69714" ry="8.32592" fill="#3F3D56" />
                        <ellipse cx="158.987" cy="62.5144" rx="9.35322" ry="7.76127" fill="#3F3D56" />
                        <path d="M229.812 289.346L129.903 315.482L89.1264 208.151C127.623 203.671 160.926 194.96 189.035 182.015C194.245 218.626 207.558 254.431 229.812 289.346Z" fill="#E6E6E6" />
                        <path d="M220.459 300.988L120.55 327.124L79.7733 219.793C118.27 215.313 151.573 206.602 179.682 193.657C184.892 230.268 198.204 266.073 220.459 300.988Z" fill="white" />
                        <path d="M16.8511 259.571C16.8511 259.571 1.33319 283.178 5.21266 290.69C9.09213 298.201 41.421 302.493 45.3005 302.493C49.1799 302.493 95.7335 293.909 95.7335 293.909C95.7335 293.909 166.857 266.009 146.167 252.06C125.476 238.11 86.6814 271.375 86.6814 271.375H55.6457L38.8347 261.717L16.8511 259.571Z" fill="#8A5454" />
                      </svg>

                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
