import React, { useRef } from 'react';
import ProgressBar from '../../microComponents/circularProgress';
import {
  dragHandler,
  dragInHandler, dragOutHandler, dropHandler
} from '../../../utilities/handlers';

export const ImageWrapper = ({ upload, removeItem }) => (
  <>
    <img
      src={
        upload.uri
      }
      className="h-7h"
      alt={upload}
    />
    <button onClick={() => removeItem(upload)} type="button" className="text-white btn-sm btn-danger radius50  remove-media">x</button>

  </>
);
export const ProgressWrapper = ({ progress }) => (
  <ProgressBar
    progress={progress}
    size={80}
    strokeWidth={3}
    circleOneStroke="#f1ecf3b0"
    circleTwoStroke="#A01B88"
  />
);

export const DragAndDropUploader = ({ handleDrop, uploads }) => {
  const [dragging, setDragging] = React.useState(false);
  const [dragCounter, setDragCounter] = React.useState(false);
  const dropRef = useRef();
  return (
    <div
      className="h-7h"
      ref={dropRef.current}
      onDragEnter={(e) => dragInHandler(e, dragCounter, setDragCounter, setDragging)}
      onDragLeave={(e) => dragOutHandler(e, dragCounter, setDragCounter, setDragging)}
      onDrop={(e) => dropHandler(e, dragCounter, setDragCounter, setDragging, handleDrop)}
      onDragOver={(e) => dragHandler(e)}
    >
      <div
        className=""
      >
        {dragging
          ? (
            <div>
              <div>
                <div>drop here </div>
              </div>
            </div>
          )
          : (
            <div>
              Drop files or click button below
              <div className="row max-h-100 scroll-y drop-box">
                <div className="text-theme-blue theme-font-2 font-tinier" key={uploads}>{uploads}</div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export const InfoBarTemp = ({ data }) => (
  <div className="row">
    {
      data.map((item) => (
        <div className="col-md-3 mt-2 col-6">
          <div className=" bg-white p-2 border-radius-5">
            <p className="font-small theme-font text-theme-faint">{item.title}</p>
            <p className="theme-font pt-3 pl-1 pb-2 theme-font font-title text-theme-black">{item.val}</p>
          </div>

        </div>

      ))
    }
  </div>
);
