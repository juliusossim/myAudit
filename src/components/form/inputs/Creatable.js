import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

const Selectable = ({
  prop, data, api, selected, creatable, nextStep
}) => {
  const [value, setValue] = React.useState(null);
  const [reset, setReset] = React.useState(prop.reset);
  const [content, setContent] = React.useState(prop.value);
  const [focused, setFocused] = React.useState(false);

  useEffect(() => {
    if (reset) {
      setValue(null);
      setContent('');
    }
  }, [reset]);
  useEffect(() => {
    if (data?.constructor !== Object && data?.length < 1) {
      return api();
    }
    return false;
  }, []);
  const handleChange = (event) => {
    setReset(false);
    setFocused(false);
    setContent(event.target.value);
    setValue(event.target.value);
  };
  const makeSelect = (item) => {
    selected(item);
    setFocused(false);
    setContent(item[prop.name]);
    setValue(null);
  };

  const showOptions = () => {
    const available = (items) => items.filter((option) => {
      if (!reset || typeof reset === 'undefined') {
        return option[prop.name].toLowerCase().includes(value?.toLowerCase());
      }
      return false;
    });
    const isExist = data?.length > 0
      && available(data)?.map((option, index) => (
        <div>
          {option[prop.name] !== value && creatable && index === 0 && (
            <div>
              <div className="text-muted ">create new</div>
              <Button
                type="button"
                className="text-success"
                onClick={() => makeSelect({ [prop.name]: value })}
              >
                <AddIcon />
                {value}
              </Button>
            </div>
          )}

          {/* <Button */}
          {/*  key={`it's ${index}`} */}
          {/*  onClick={() => makeSelect(option)} */}
          {/*  type="button" */}
          {/* > */}
          {/*  {option[prop.name]} */}
          {/* </Button> */}
        </div>
      ));
    // eslint-disable-next-line no-nested-ternary
    return isExist.length > 0 ? (
      isExist
    ) : (
      creatable ? (
        <div>
          <div className="text-muted ">create new</div>
          <Button
            type="button"
            className="text-success"
            onClick={() => makeSelect({ [prop.name]: value })}
          >
            <AddIcon />
            {value}
          </Button>
        </div>
      ) : (
        <div>
          <div>{nextStep ? nextStep.message : 'no data matches your input'}</div>
          {nextStep && (!reset || typeof reset === 'undefined') && <div>{nextStep.action}</div>}
        </div>
      )
    );
  };

  return (
    <>
      <TextField
        className="col-12 mb-2"
        label={prop.label}
        name={prop.name}
        placeholder="Create or select"
        variant={prop.variant}
        value={content}
        type="select"
        SelectProps={{
          native: true
        }}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        // onBlur={() => setFocused(false)}
      />
      {value && <div className="card">{showOptions()}</div>}
      {/* {focused && <div className="card">{allData()}</div>} */}
    </>
  );
};
export default Selectable;
