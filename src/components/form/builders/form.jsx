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
        file,
        removeItem,
        multiple,
        setFormData,
        progress,
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
        handleReveal,
        btn,
        btnMethod,
        loading
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
            btn={btn}
            btnMethod={btnMethod}
          />
        );
      case 'file_input':
        return (
          <FileInput
            key={name}
            value={value}
            file={file}
            removeItem={removeItem}
            multiple={multiple}
            setFormData={setFormData}
            progress={progress}
            className={className}
            name={name}
            error={error}
            label={label}
            onChange={onChange}
            text={text}
            validations={validations}
            btn={btn}
            btnMethod={btnMethod}
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
            btn={btn}
            btnMethod={btnMethod}
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
            btn={btn}
            btnMethod={btnMethod}
            loading={loading}
          />
        );
      }
    }
    return true;
  }
);

export default FormBuilder;
