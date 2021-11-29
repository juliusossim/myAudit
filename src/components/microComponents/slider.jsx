import * as React from 'react';
import { isEmpty, isUndefined } from 'lodash';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';
import { sentenceCaps } from '../../utilities/stringOperations';
import TextInput from '../form/inputs/TextInput';
import FormBuilder from '../form/builders/form';
import planningProps from '../../pages/Engagements/constants/planningProps';
import sliderProps from './constants/sliderprops';

export default function SliderSizes({
  max, min, formData, setFormData, name, label, props, val
}) {
  const [value, setValue] = React.useState(val || min || 0);
  const [ma, setMa] = React.useState(max || 100);
  const [mi, setMi] = React.useState(min || 0);

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
      value: min,
      label: min
    },
    {
      value: max,
      label: max
    }
  ];

  return (
    <Box>
      <label className="mb-4">{sentenceCaps(label)}</label>
      <div className="row">
        <div className="col-md-8 center-horizontal">
          <Slider
            aria-label="input-slider"
            defaultValue={mi}
            min={mi}
            onChange={handleSliderChange}
            max={ma}
            marks={marks}
            value={value}
            valueLabelDisplay="on"
          />
        </div>
        {/* <div className={isUndefined(props) ? 'd-none' : 'col-md-4'}> */}
        {/*  <FormBuilder */}
        {/*    formItems={ */}
        {/*      sliderProps( */}
        {/*        { */}
        {/*          ...props, */}
        {/*          name, */}
        {/*          handleChange: handleInputChange, */}
        {/*          handleBlur, */}
        {/*          formData */}
        {/*        } */}
        {/*      ) */}
        {/*    } */}
        {/*  /> */}
        {/* </div> */}
      </div>

    </Box>
  );
}
