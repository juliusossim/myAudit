import * as React from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Typography
} from '@material-ui/core';
import { FcExpand } from 'react-icons/all';

const ControlledAccordions = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {
        data?.map((item) => (
          <Accordion expanded={expanded === item.panel} onChange={handleChange(item.panel)}>
            <AccordionSummary
              expandIcon={<FcExpand />}
              aria-controls="panel1bh-content"
              id={item.panel}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                <h6 className="bold">
                  {item.name}
                </h6>
              </Typography>
              <Typography className={item.desc ? '' : 'd-none'} sx={{ color: 'text.secondary' }}>{item.desc}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {item.details}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div>
  );
};

export default ControlledAccordions;
