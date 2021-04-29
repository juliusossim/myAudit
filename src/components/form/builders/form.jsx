import React from 'react';
import TextInput from '../inputs/TextInput';
import SelectInput from '../inputs/SelectInput';
import TextareaInput from '../inputs/TextareaInput';
import FileInput from '../inputs/FileInput';

const FormBuilder = ({ formItems }) => formItems?.map(
  ({ kind, props }, key) => {
    if (typeof kind !== 'undefined' && typeof kind === 'string') {
      const {
        label,
        name,
        value,
        className,
        type,
        text,
        onChange,
        onKeyPress,
        readOnly,
        onBlur,
        onKeyDown,
        disabled,
        minDate,
        maxDate,
        rows,
        placeholder,
        error,
        validations,
        options,
        optionIndex,
        reveal,
        handleReveal
      } = props;
      switch (kind) {
      case 'select':
        return (
          <SelectInput
            key={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            className={className}
            disabled={disabled}
            error={error}
            label={label}
            options={options}
            optionIndex={optionIndex}
            validations={validations}
          />
        );
      case 'file_input':
        return (
          <FileInput
            key={name}
            value={value}
            className={className}
            name={name}
            error={error}
            label={label}
            onChange={onChange}
            text={text}
            validations={validations}
          />
        );
      case 'text_area':
        return (
          <TextareaInput
            key={name}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            name={name}
            value={value}
            className={className}
            error={error}
            label={label}
            placeholder={placeholder}
            rows={rows}
            validations={validations}
          />
        );
      default:
        return (
          <TextInput
            key={name}
            label={label}
            name={name}
            value={value}
            className={className}
            onChange={onChange}
            type={type}
            id={name}
            error={error}
            readOnly={readOnly}
            onBlur={onBlur}
            disabled={disabled}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            min={minDate}
            max={maxDate}
            validations={validations}
            reveal={reveal}
            handleReveal={handleReveal}
          />
        );
      }
    }
    return true;
  }
);

export default FormBuilder;
