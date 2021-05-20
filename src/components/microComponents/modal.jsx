import React from 'react';

const Modal = ({
  content,
  className,
  transition
}) => (
  <div className={`${className} ${transition || 'custom-modal custom-path'} c-modal`}>
    {content}
  </div>
);

export default Modal;
