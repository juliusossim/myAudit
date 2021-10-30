/* eslint-disable react/jsx-props-no-spreading */
/* green checkbox */
import withStyles from '@material-ui/core/styles/withStyles';
import * as colors from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import Radio from '@material-ui/core/Radio';

export const GreenCheckbox = withStyles({
  root: {
    color: colors.green[400],
    '&$checked': {
      color: colors.green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);
export const PinkCheckbox = withStyles({
  root: {
    color: colors.pink[400],
    '&$checked': {
      color: colors.pink[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);
export const IndigoCheckbox = withStyles({
  root: {
    color: colors.indigo[400],
    '&$checked': {
      color: colors.indigo[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);
export const PurpleCheckbox = withStyles({
  root: {
    color: colors.purple[400],
    '&$checked': {
      color: colors.purple[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);
export const BlueCheckbox = withStyles({
  root: {
    color: colors.blue[400],
    '&$checked': {
      color: colors.blue[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);
export const BlueGreyCheckbox = withStyles({
  root: {
    color: colors.blueGrey[400],
    '&$checked': {
      color: colors.blueGrey[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);
export const GreenRadioButton = withStyles({
  root: {
    color: colors.green[400],
    '&$checked': {
      color: colors.green[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);
export const BlueGreyRadioButton = withStyles({
  root: {
    color: colors.blueGrey[400],
    '&$checked': {
      color: colors.blueGrey[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);
export const BlueRadioButton = withStyles({
  root: {
    color: colors.blue[400],
    '&$checked': {
      color: colors.blue[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);
export const PurpleRadioButton = withStyles({
  root: {
    color: colors.purple[400],
    '&$checked': {
      color: colors.purple[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);
