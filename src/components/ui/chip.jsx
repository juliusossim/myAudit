import React from 'react';

const Chip = ({
  text, img, clss, del, onClick
}) => (
  <button type="button" onClick={onClick} className="chip">
    {img && <img src={img} alt="avatar" width="96" height="96" /> }
    {text}
    <button type="button" className="closebtn" onClick={() => del(text)}>&times;</button>
  </button>
);

export default Chip;
