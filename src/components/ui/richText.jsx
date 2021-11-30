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
  useEffect(() => {
    handleData();
  }, [value]);
  return (
    <div>
      <div className="font-tinier text-theme-faint">Work here or click button below to attach file</div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
};
export const QuillEditorSnow = ({ value, handleSetValue }) => (
  <ReactQuill theme="snow" value={value} onChange={handleSetValue} />
);
