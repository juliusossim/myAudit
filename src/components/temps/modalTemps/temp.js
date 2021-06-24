import React from 'react';
import { mapBackendErrors } from '../../../utilities/validation';

const ModalTemplate = ({
  status, data, setShow, handleClose, text
}) => (
  <div className={
    (status === 'failed')
      ? 'mt-5 p-5'
      : 'mt-5 p-5 bg-wema'
  }
  >
    <div className="text-white">

      <div>
        <h5 className="center-text text-muted">{status}</h5>
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
              <div>
                <p>
                  {
                    text
                  }
                </p>
                <p className="d-none">
                  {
                    status === 'success'
                    && setTimeout(handleClose, 3000)
                  }
                </p>
              </div>

            )
        }
      </div>

    </div>
  </div>
);
export default ModalTemplate;
