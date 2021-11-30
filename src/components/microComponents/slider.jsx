import * as React from 'react';
import uuid from 'react-uuid';
import { isEmpty, isUndefined } from 'lodash';
// import Slider, { Range } from 'rc-slider';
// import 'rc-slider/assets/index.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';
import { sentenceCaps } from '../../utilities/stringOperations';

export default function SliderSizes({
  max, min, formData, setFormData, name, label, props, val
}) {
  const [value, setValue] = React.useState(val || min || 0);
  const ma = Number(max) || 100;
  const mi = Number(min) || 0;

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  useEffect(() => {
    setFormData({
      ...formData, [name]: value
    });
  }, [value]);
  const marks = [
    {
      value: mi,
      label: mi
    },
    {
      value: ma,
      label: ma
    }
  ];

  return (
    <Box>
      <label className="mb-4">{sentenceCaps(label)}</label>
      <div className="row">
        <div className="col-md-8 center-horizontal">
          <Slider
            // key={uuid()}
            aria-label="input-slider"
            min={mi}
            onChange={handleSliderChange}
            max={ma}
            marks={marks}
            // value={value}
            valueLabelDisplay="on"
          />
        </div>
         <div className={isUndefined(props) ? 'd-none' : 'col-md-4'}>
          <FormBuilder
            formItems={
              sliderProps(
                {
                  ...props, 
                  name,
                  handleChange: handleInputChange,
                  handleBlur,
                  formData
                }
              )
            }
          />
         </div>
      </div>

    </Box>
  );
}
