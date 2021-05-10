import React from 'react';

const Modal = ({
  content,
  className
}) => (
  <div className={`${className} custom-modal`}>
    {content}
  </div>
);

export default Modal;
