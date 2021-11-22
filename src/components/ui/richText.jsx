import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

export const QuillEditorBubble = ({ setFormData, name, formData }) => {
  const [value, setValue] = useState('');
  const handleData = () => setFormData({
    ...formData,
    [name]: value
  });
  // useEffect(() => {
  //   handleData();
  // }, [value]);
  return (
    <ReactQuill theme="snow" value={value} onChange={setValue} />
  );
};
export const QuillEditorSnow = ({ value, handleSetValue }) => (
  <ReactQuill theme="snow" value={value} onChange={handleSetValue} />
);
