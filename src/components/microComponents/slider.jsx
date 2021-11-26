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
  max, min, formData, setFormData, name, label, props
}) {
  const [value, setValue] = React.useState(30);

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

  return (
    <Box>
      <label className="mb-4">{sentenceCaps(label)}</label>
      <div className="row">
        <div className="col-md-8 center-horizontal">
          <Slider
            aria-label="input-slider"
            min={min || 0}
            onChange={handleSliderChange}
            max={max || 100}
            value={typeof value === 'number' ? value : 0}
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
