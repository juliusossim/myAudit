import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { AiOutlineDelete } from 'react-icons/all';
import { tagsHandler } from '../../../utilities/handlers';

const TagsInput = ({
  formData, setFormData, className, placeholder, type, label, name, helperText
}) => {
  const [val, setVal] = useState('');
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = (item) => {
    const newItems = [...formData[name]];
    setFormData({
      ...formData, [name]: newItems.filter((t) => t !== item)
    });
  };
  const handleChange = (e) => {
    setVal(e.target.value);
  };
  const handleKeyUp = (e) => tagsHandler({
    e, formData, setFormData, setVal
  });
  return (
    <div className={className}>
      <label htmlFor="id" className="theme-font text-theme-black">
        {label}
      </label>
      <div className="flex flex-wrap theme-font text-theme-black border-radius-5 tag-input">
        {
          formData[name]?.map((item) => (
            <Chip
              className="m-1"
              key={item}
              label={item}
              onClick={handleClick}
              onDelete={() => handleDelete(item)}
              deleteIcon={<AiOutlineDelete />}
              variant="filled"
            />
          ))
        }
        <input id="id" type={type} placeholder={placeholder} name={name} onKeyDown={handleKeyUp} value={val.replace(/,/g, '')} onChange={handleChange} />
      </div>
      <p className="font-tinier text-theme-blue">{helperText}</p>
    </div>
  );
};
export default TagsInput;
