import React, { useState } from 'react';
import {
  useHistory
} from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/all';
import { useSelector } from 'react-redux';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import Loader from '../../components/microComponents/loader';
import PageTemp from '../../components/temps/PageTemp';
import NoNotesTemp from './temps/notes/NoNotesTemp';
import AddNotesTemp from './temps/notes/AddNotesTemp';

const Notes = ({ link, engagementId }) => {
  const { push } = useHistory();
  /* redux hooks */
  const store = useSelector((state) => state.engagement?.notes);
  /* state */
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState(false);

  /* boilerPlate hooks params */
  const options = {
    action: 'NOTES',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENT',
      auth: true,
      param: engagementId,
      afterParam: 'notes',
      method: 'get'
    })
  };

  /* boilerPlate hooks */
  const {
    view, status, data
  } = useViewBoilerPlate({
    setFormData: setNotes,
    formData: notes,
    store,
    options
  });

  return (
    <div className="w-100">
      <div className="d-flex custom-top-bar-borderless left-14-neg min-w-300-w justify-content-between bg-white">
        <div className="text-theme-black font-title-small">
          Activities Note
        </div>
        <button type="button" className="font-title-small bg-theme-light text-theme">
          <HiOutlineChevronRight className="mt-2" />
        </button>
      </div>
      <PageTemp
        status={status}
        noDataTemp={(
          <div>
            {
              addNote
                ? <AddNotesTemp />
                : <NoNotesTemp setAdd={setAddNote} />
            }
          </div>
        )}
        data={data?.notes}
        retry={view}
        view={(
          <div>
            {
              addNote
                ? <AddNotesTemp />
                : <div>hi</div>
            }
          </div>
        )}
      />
    </div>
  );
};

export default Notes;
