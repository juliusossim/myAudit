import React from 'react';
import TextInput from '../inputs/TextInput';
import SelectInput from '../inputs/SelectInput';
import TextareaInput from '../inputs/TextareaInput';
import FileInput from '../inputs/FileInput';
import DateInput from '../inputs/DateInput';
import CurrencyInput from '../inputs/CurrencyInput';
import Select2 from '../inputs/select2';

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
        valueIndex,
        titleIndex,
        reveal,
        helperText,
        handleReveal,
        btn,
        btnMethod,
        loading,
        states,
        lgas,
        skeleton
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
            valueIndex={valueIndex}
            titleIndex={titleIndex}
            validations={validations}
            btn={btn}
            skeleton={skeleton}
            btnMethod={btnMethod}
          />
        );
      case 'select2':
        return (
          <Select2
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
            valueIndex={valueIndex}
            titleIndex={titleIndex}
            validations={validations}
            btn={btn}
            skeleton={skeleton}
            btnMethod={btnMethod}
            states={states}
            lgas={lgas}
          />
        );
      case 'currency':
        return (
          <CurrencyInput
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
            skeleton={skeleton}
          />
        );
      case 'date':
        return (
          <DateInput
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
            helperText={helperText}
            btnMethod={btnMethod}
            skeleton={skeleton}
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
            skeleton={skeleton}
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
            skeleton={skeleton}
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
            skeleton={skeleton}
          />
        );
      }
    }
    return true;
  }
);

export default FormBuilder;
