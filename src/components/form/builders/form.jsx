import React from 'react';
// import uuid from 'react-uuid';
import TextInput from '../inputs/TextInput';
import SelectInput from '../inputs/SelectInput';
import TextareaInput from '../inputs/TextareaInput';
import FileInput from '../inputs/FileInput';
import DateInput from '../inputs/DateInput';
import CurrencyInput from '../inputs/CurrencyInput';
import Select2 from '../inputs/select2';
import TagsInput from '../inputs/ArrayInput';
import FileInputDrop from '../inputs/FileInputDrop';

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
        skeleton,
        excuseSkeleton,
        variant,
        stringValue,
        accepted,
        hidePasswordValidations,
        element,
        formData,
        uploads,
        meta
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
            loading={loading}
            btn={btn}
            skeleton={skeleton}
            excuseSkeleton={excuseSkeleton}
            btnMethod={btnMethod}
            stringValue={stringValue}
          />
        );
      case 'custom':
        return (
          <React.Fragment key={name}>
            {
              element
            }
          </React.Fragment>
        );
      case 'tags':
        return (
          <TagsInput
            key={name}
            formData={formData}
            setFormData={setFormData}
            className={className}
            placeholder={placeholder}
            type={type}
            name={name}
            label={label}
            helperText={helperText}
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
            btnMethod={btnMethod}
            loading={loading}
            skeleton={skeleton}
            excuseSkeleton={excuseSkeleton}
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
            excuseSkeleton={excuseSkeleton}
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
            variant={variant}
            name={name}
            value={value}
            className={className}
            error={error}
            label={label}
            placeholder={placeholder}
            rows={rows}
            minDate={minDate}
            validations={validations}
            btn={btn}
            helperText={helperText}
            btnMethod={btnMethod}
            skeleton={skeleton}
            excuseSkeleton={excuseSkeleton}
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
            accepted={accepted}
            onChange={onChange}
            text={text}
            validations={validations}
            btn={btn}
            btnMethod={btnMethod}
            skeleton={skeleton}
            excuseSkeleton={excuseSkeleton}
            loading={loading}
            onBlur={onBlur}
            uploads={uploads}
            helperText={helperText}
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
            excuseSkeleton={excuseSkeleton}
            helperText={helperText}
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
            hidePasswordValidations={hidePasswordValidations}
            handleReveal={handleReveal}
            btn={btn}
            btnMethod={btnMethod}
            loading={loading}
            skeleton={skeleton}
            excuseSkeleton={excuseSkeleton}
            helperText={helperText}
            placeholder={placeholder}
            meta={meta}
          />
        );
      }
    }
    return true;
  }
);

export default FormBuilder;
