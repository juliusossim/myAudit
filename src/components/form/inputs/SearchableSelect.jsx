import React from 'react';
import { HiOutlinePlus } from 'react-icons/all';

const Selectable = ({
  prop, data, selected, creatable, nextStep
}) => {
  const [value, setValue] = React.useState(null);
  const [content, setContent] = React.useState(prop.value);
  const [focused, setFocused] = React.useState(false);

  const handleChange = (event) => {
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

  const allData = () => data.map((option, index) => {
    const temp = { ...option };
    if (prop.name === 'fullName') {
      temp.fullName = `${option.first_name} ${option.last_name}`;
    }
    return (
      <div>
        <button
          key={temp}
          type="button"
          onClick={() => makeSelect(temp)}
          value={temp[prop.valueProp]}
        >
          {temp[prop.name]}
        </button>
      </div>
    );
  });
  const available = () => data.filter((option) => {
    const temp = { ...option };
    if (prop.name === 'fullName') {
      temp.fullName = `${option.first_name} ${option.last_name}`;
    }

    return temp[prop.name].toLowerCase().includes(value.toLowerCase());
  });

  const isExist = data.length > 0
    && available(data).map((option, index) => (
      <div>
        {option[prop.name] !== value && creatable && index === 0 && (
          <div>
            <div className="text-muted ">create new</div>
            <button
              className="text-success"
              type="button"
              onClick={() => makeSelect({ [prop.name]: value })}
            >
              <HiOutlinePlus />
              {value}
            </button>
          </div>
        )}

        <button
          key={option}
          type="button"
          onClick={() => makeSelect(option)}
          value={option[prop.valueProp]}
        >
          {option[prop.name]}
        </button>
      </div>
    ));
  const showOptions = () => (isExist.length > 0 ? (
    isExist
  )
    : (
      <div>
        {
          creatable
          && (
            <div>
              <div className="text-muted ">create new</div>
              <button
                type="button"
                className="text-success"
                onClick={() => makeSelect({ [prop.name]: value })}
              >
                <HiOutlinePlus />
                {value}
              </button>
            </div>
          )
        }

        {
          !creatable
          && (
            <div>
              <div>{nextStep ? nextStep.message : 'no data matches your input'}</div>
              {nextStep && <div>{nextStep.action}</div>}
            </div>
          )
        }
      </div>
    )

  );

  return (
    <>
      <input
        className="col-12 mb-2"
        name={prop.name}
        placeholder="Create or select"
        value={content}
        type="select"
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        // onBlur={() => setFocused(false)}
      />
      {value && <div className="card">{showOptions()}</div>}
      {focused && <div className="card">{allData()}</div>}
    </>
  );
};
export default Selectable;
