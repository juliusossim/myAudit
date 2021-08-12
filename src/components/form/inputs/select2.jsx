import React, { useEffect, useMemo } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextInput from './TextInput';
import Chip from '../../ui/chip';

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
    multi,
    skeleton,
    excuseSkeleton
  }
) => {
  const [searchTerm, setSearchterm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectOptions, setSelectOptions] = React.useState(options);
  const [selectedOption, setSelectedOption] = React.useState(value);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [multiOptions, setMultiOptions] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const handleChange = (e) => {
    setSearchterm(e.target.value);
  };
  const isMulti = multi !== undefined;
  const deselect = (dat) => {
    const filtered = selectedOptions.filter((da) => da !== dat);
    const filtered2 = multiOptions.filter((da) => da[optionIndex] !== dat);
    setSelectedOptions([...filtered]);
    setMultiOptions(filtered2);
  };
  const handleSelect = (opt) => {
    if (!isMulti) {
      setSelectedOption(opt[optionIndex]);
    }
    let temp = [];
    let basket = [];
    if (selectedOptions.includes(opt[optionIndex])) {
      temp = selectedOptions.filter((item) => item !== opt[optionIndex]);
      basket = multiOptions.filter((item) => item !== opt);
    } else {
      temp = [...selectedOptions, opt[optionIndex]];
      basket = [...multiOptions, opt];
    }
    const selectedValues = basket.map((tem) => tem[optionIndex]);
    const selectedApiValues = basket.map((tem) => tem[valueIndex]);
    setSelectedOptions([...temp]);
    setMultiOptions(basket);
    setSearchterm('');
    setEdit(false);
    console.log(selectedValues, selectedApiValues);
    onChange({
      target: {
        name,
        value: isMulti ? selectedValues : opt[optionIndex],
        apiValue: isMulti ? selectedApiValues : opt[valueIndex]
      }
    });
  };

  const available = () => options?.filter((option) => {
    const temp = option.constructor === Object ? option[optionIndex] : option;
    return temp?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  });

  const optionsProp = selectOptions?.map((option) => (
    typeof option === 'object'
      ? (
        <li
          className="li"
          value={option[valueIndex]}
          key={option[optionIndex]}
          title={option[titleIndex]}
        >
          <Button className="btn-plain text-success no-border text-hover-white" onClick={() => handleSelect(option)}>
            {
              selectedOption === option[optionIndex]
              && <IoCheckmark />
            }
            {option[optionIndex]}
          </Button>
        </li>
      ) : (
        <li
          value={option}
          className="li"
          key={option}
          title={option}
        >
          <Button name={name} className="font-09 text-wema btn-plain text-success no-border text-hover-white" onClick={() => handleSelect(option)}>
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
    if (searchResults?.length > 0) {
      setSelectOptions(searchResults);
    } else {
      setSelectOptions(options);
    }
  }, [searchResults, options]);

  return (
    <div className={`${error?.length > 0 ? `${className} col-12 ` : `${className}`} form-group`}>
      <div className="">
        <div
          onMouseEnter={() => {
            setShow(true);
            setEdit(true);
          }}
          onMouseLeave={() => setShow(false)}
        >
          <label htmlFor={name} className={value?.length ? 'active-field' : ''}>
            {label}
          </label>
          {
            multi !== undefined
              ? (
                <div className="border-farm border-radius-5 px-1 multi-empty">
                  {
                    selectedOptions.length < 1
                      ? `select ${label}`
                      : selectedOptions.map((opt) => <Chip key={opt} text={opt} del={deselect} />)
                  }
                </div>
              )
              : (
                <TextInput
                  name={name}
                  value={selectedOption}
                  readOnly
                  onChange={() => value}
                />
              )
          }

          <Card className={show ? 'ontop' : 'd-none'}>
            <div className="card-body">
              <div
                className={error?.length > 0 ? 'error-field' : 'center-center'}
                id={name}
                onChange={onChange}
                onBlur={((e) => typeof onBlur === 'function'
                  && onBlur(e, validations))}
              >
                <div className="mb-3">
                  <input type="search" placeholder={selectedOption || `search ${label} here...`} value={searchTerm} onChange={handleChange} />
                </div>
                <div className="select-2 text-left col-12">

                  {optionsProp}

                </div>
              </div>
            </div>

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

      </div>
    </div>
  );
};
export default Select2;
