import React from 'react';
import { mapBackendErrors } from '../../../utilities/validation';

const ModalTemplate = ({
  status, data, setShow, handleClose, text
}) => (
  <div className={
    // eslint-disable-next-line no-nested-ternary
    (status === 'failed')
      ? 'mt-5 p-5'
      : (
        status === 'pending'
          ? 'mt-5 p-5 '
          : 'mt-5 p-5 bg-wema'
      )
  }
  >
    <div className="text-white">
      {
        status === 'pending'
          && (
            <div className="center-text text-success">
              {text.loading}
            </div>
          )
      }
      {
        status !== 'pending'
          && (
            <div className="">
              <h5 className="center-text text-muted">{status}</h5>
              <ul>
                {
                  status === 'failed'
                    ? (
                      <div>
                        <ul>
                          {
                            mapBackendErrors(data).map(
                              (err) => (
                                typeof err !== 'undefined' && (
                                  <li key={`${new Date()}`} className="text-warning">
                                    {err}
                                  </li>
                                )
                              )
                            )
                          }
                        </ul>
                        <button onClick={() => setShow(false)} type="button" className="btn w-25 center btn-small float-right">
                          Ok
                        </button>
                      </div>
                    )
                    : (
                      <p>
                        {
                          text.success
                        }
                        {
                          status === 'success'
                          && setTimeout(handleClose, 3000)
                        }
                      </p>
                    )
                }
              </ul>
            </div>
          )
      }
    </div>
  </div>
);
export default ModalTemplate;
