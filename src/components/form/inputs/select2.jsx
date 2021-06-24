import React, { useEffect, useMemo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { IoCheckmark } from 'react-icons/io5';
import Popper from '@material-ui/core/Popper';
import { bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Popup from '../../microComponents/popup';
import TextInput from './TextInput';

const Select2 = (
  {
    label,
    name,
    value,
    className,
    onChange,
    onBlur,
    disabled,
    validations,
    error,
    options,
    optionIndex,
    valueIndex,
    titleIndex,
    skeleton
  }
) => {
  const [searchTerm, setSearchterm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectOptions, setSelectOptions] = React.useState(options);
  const [selectedOption, setSelectedOption] = React.useState(value);
  const [show, setShow] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const handleChange = (e) => {
    setSearchterm(e.target.value);
  };
  const handleSelect = (opt) => {
    setSelectedOption(opt);
    setSearchterm('');
    setEdit(false);
    onChange({
      target: {
        name,
        value: opt
      }
    });
  };

  const available = () => options.filter((option) => {
    const temp = option.constructor === Object ? option[optionIndex] : option;
    return temp.toLowerCase().includes(searchTerm?.toLowerCase());
  });
  const optionsProp = selectOptions.map((option) => (
    typeof option === 'object'
      ? (
        <li
          value={option[valueIndex]}
          key={option[optionIndex]}
          title={option[titleIndex]}
        >
          <Button onClick={() => handleSelect(option[optionIndex])}>
            {
              selectedOption === option[optionIndex]
              && <IoCheckmark />
            }
            {option[optionIndex]}
          </Button>
        </li>
      ) : (
        <li
          type="button"
          value={option}
          key={option}
          title={option}
        >
          <Button name={name} className="text-center" onClick={() => handleSelect(option)}>
            {
              selectedOption === option
              && <IoCheckmark />
            }
            {option}
          </Button>
        </li>
      )));
  useEffect(() => {
    setSearchResults(available());
  }, [searchTerm, options]);
  useEffect(() => {
    if (searchResults.length > 0) {
      setSelectOptions(searchResults);
    } else {
      setSelectOptions(options);
    }
  }, [searchResults, options]);

  return (
    <div className={`${error?.length > 0 ? `${className} col-12 ` : `${className}`} form-group`}>
      <div className="container-fluid">
        {
          skeleton
            ? <Skeleton animation="wave" />
            : (
              <div
                onMouseEnter={() => {
                  setShow(true);
                  setEdit(true);
                }}
                onMouseLeave={() => setShow(false)}
                className="row"
              >
                <label htmlFor={name} className={value?.length ? 'active-field' : ''}>
                  {label}
                </label>
                <TextInput
                  name={name}
                  value={selectedOption}
                />
                <Card className={show ? 'ontop' : 'd-none'}>
                  <CardContent>
                    <ul
                      className={error?.length > 0 ? 'error-field' : ''}
                      id={name}
                      onChange={onChange}
                      onBlur={((e) => typeof onBlur === 'function'
                       && onBlur(e, validations))}
                    >
                      <li>
                        <input type="search" value={searchTerm} onChange={handleChange} />
                      </li>
                      <li className="select-2 ">
                        <ul>
                          {optionsProp}
                        </ul>
                      </li>
                    </ul>
                  </CardContent>

                </Card>
                {
                  error?.length > 0
                    ? (
                      <ul className="error-msg">
                        {
                          error.map(
                            (err) => <li key={err}>{err}</li>
                          )
                        }
                      </ul>
                    )
                    : null
                }
              </div>
            )
        }
      </div>
    </div>
  );
};
export default Select2;
