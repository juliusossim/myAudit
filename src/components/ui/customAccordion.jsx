import * as React from 'react';
import { AiOutlineExpandAlt, BsArrowsAngleContract } from 'react-icons/all';
import Box from '@material-ui/core/Box';

const CustomAccordion = ({
  data, removeAccordion, panel, currentPanel, setCurrentPanel, className
}) => {
  const handleClick = () => {
    setCurrentPanel(panel === currentPanel ? 1 : panel);
  };
  return (
    <Box className={`${className} custom-card`}>
      <Box onClick={handleClick} className="my-3">
        <div className="d-flex justify-content-between">
          <div>
            {data.name}
          </div>
          <div className="">
            <button type="button" onClick={handleClick}>
              {
                panel === currentPanel
                  ? <BsArrowsAngleContract />
                  : <AiOutlineExpandAlt />
              }
            </button>
          </div>
        </div>
      </Box>
      <div className={currentPanel === panel ? '' : 'd-none'}>
        {data.details}
      </div>
    </Box>
  );
};

export default CustomAccordion;
