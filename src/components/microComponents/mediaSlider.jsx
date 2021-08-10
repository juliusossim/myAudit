import React from 'react';
import { Paper } from '@material-ui/core';

const MediaSlider = ({
  mediaFiles, setSelected, selected, mediaIndex, altIndex, slideClass
}) => (
  <div className="brandWrapper">
    <div className="d-flex">
      {
        mediaFiles?.map((media) => (
          <div className="mx-2 h-7h">
            <Paper key={media[mediaIndex] || media.uri} className={selected === media ? slideClass : ''} onClick={() => setSelected(media)}>
              <img className="media-slide" width="100%" src={media[mediaIndex] || media?.uri} alt={media[altIndex] || 'some media'} />
            </Paper>
          </div>
        ))
      }
    </div>
  </div>
);
export default MediaSlider;
