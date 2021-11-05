import * as React from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Typography
} from '@material-ui/core';
import { FcExpand } from 'react-icons/all';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const ControlledAccordions = ({ data, removeAccordion }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      {
        data?.map((item, index) => (
          <Accordion
            key={item.panel}
            expanded={expanded === item.panel}
            onChange={handleChange(item.panel)}
          >
            <AccordionSummary
              expandIcon={<FcExpand />}
              aria-controls="panel1bh-content"
              id={item.panel}
            >
              <div>
                <div className="bold h6">
                  {item.name}
                  <span className={item.showIndex ? 'bold mx-1' : 'd-none'}>
                    {index}
                  </span>
                  {item.afterIndex}
                </div>
              </div>
              <div className={item.desc ? '' : 'd-none'} sx={{ color: 'text.secondary' }}>
                {item.desc}
              </div>
              <Button className={item.panel === 1 || removeAccordion === undefined ? 'd-none' : 'text-danger ml-5'} onClick={() => removeAccordion(item)}>X</Button>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {item.details}
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div>
  );
};

export default ControlledAccordions;
