import React from 'react';
import { FaSearch } from 'react-icons/all';
import Skeleton from '@material-ui/lab/Skeleton';

const SearchInput = ({
  btn, btnMethod, className, disabled, error, label, placeholder,
  name, onBlur, onChange, onFocus, onKeyDown, onKeyPress,
  readOnly, title, validations, value, skeleton, excuseSkeleton
}) => (
  <div className={`${error?.length > 0 ? `${className} col-12` : `${className}`} form-group search-input`}>
    {
      skeleton !== undefined && !skeleton && excuseSkeleton !== name
        ? (
          <Skeleton animation="wave" />
        )
        : (
          <>
            <input
              className={error?.length > 0 ? 'error-field' : ''}
              type="text"
              placeholder={placeholder}
              name={name}
              id={name}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              title={title}
              readOnly={readOnly}
              onBlur={((e) => typeof onBlur === 'function'
                && onBlur(e, validations))}
              disabled={disabled}
              onKeyPress={onKeyPress}
              onKeyDown={onKeyDown}
            />
            <button type="button" className="searchBtn text-wema">
              <FaSearch />
            </button>
          </>
        )
    }
  </div>

);

export default SearchInput;
