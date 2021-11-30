import * as React from 'react';
import uuid from 'react-uuid';
import { isEmpty, isUndefined } from 'lodash';
// import Slider, { Range } from 'rc-slider';
// import 'rc-slider/assets/index.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';
import {
  formatDonation,
  notifier,
  sentenceCaps,
  stringDoesNotExist
} from '../../utilities/stringOperations';
import FormBuilder from '../form/builders/form';
import sliderProps from './constants/sliderprops';

export default function SliderSizes({
  max, min, formData, setFormData, name, label, props, val
}) {
  const [value, setValue] = React.useState(val || min || 0);
  const [disableSlider, setDisableSlider] = React.useState(false);
  const ma = Number(max) || 100;
  const mi = Number(min) || 0;

  const handleSliderChange = (event, newValue) => {
    if (stringDoesNotExist(formData.materiality_amount)) {
      setDisableSlider(true);
      return notifier({
        type: 'info',
        title: 'Amount is Empty',
        text: 'First fill out the materiality amount.'
      });
    }
    const amount = parseInt(newValue, 10) * formatDonation(formData.materiality_amount) / 100;
    return setValue(amount);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
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
      label: `${mi}%`
    },
    {
      value: ma,
      label: `${ma}%`
    }
  ];

  return (
    <Box>
      <label className="mb-4">{sentenceCaps(label)}</label>
      <div className="row">
        <div className="col-md-8 center-horizontal">
          <Slider
            color="secondary"
            disabled={disableSlider && stringDoesNotExist(formData.materiality_amount)}
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
