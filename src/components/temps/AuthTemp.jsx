import React from 'react';
import { mapBackendErrors } from '../../utilities/validation';

const modalTemplate = ({ store, handleClose, setShow }) => (
  <div className={
    // eslint-disable-next-line no-nested-ternary
    (store?.status === 'failed')
      ? 'mt-5 p-5 bg-danger'
      : (
        store?.status === 'pending'
          ? 'mt-5 p-5 '
          : 'mt-5 p-5 bg-wema'
      )
  }
  >
    <div className="text-white">
      {
        store?.status === 'pending'
        && (
          <div className="center-text text-success">
            Loading...
          </div>
        )
      }
      {
        store?.status !== 'pending'
        && (
          <div className="">
            <h5 className="center-text">{store?.status}</h5>
            <ul>
              {
                store?.status === 'failed'
                  ? (
                    <ul>
                      {
                        mapBackendErrors(store?.data).map(
                          (err) => (
                            <li key={err}>
                              {err}
                            </li>
                          )
                        )
                      }
                    </ul>
                  )
                  : (
                    <p>
                      your account is created
                      you will now be redirected to your projects
                      {
                        setTimeout(handleClose, 3000)
                      }
                    </p>
                  )
              }
            </ul>
            <button onClick={() => setShow(false)} type="button" className="btn w-25 center btn-small float-right">
              Ok
            </button>
          </div>
        )
      }
    </div>
  </div>
);
export default modalTemplate;
