/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ChangeEvent, useState } from 'react';
import { invalidText } from '../../helpers/utils';

type Props = {
  name: string;
  label: string;
  value: string | number;
  placeholder?: string;
  required: boolean;
  isError: boolean;
  onChange: (value: string) => void;
  helperText?: string;
  prefix?: any;
  suffix?: any;
  regex?: string;
  disabled?: boolean;
  type?: string;
  size?: SizeType;
  showLabel?: boolean;
  style?: any;
  width?: any;
  rows?: number;
  isViewOnly?: boolean;
  isLogin?:boolean
};

const InputField = (props: Props) => {
  const {
    name,
    label,
    value,
    placeholder,
    isError = false,
    prefix = null,
    suffix = null,
    regex,
    required = false,
    onChange,
    disabled = false,
    type = 'text',
    helperText = 'Invalid field',
    size = 'large',
    showLabel = true,
    style,
    width,
    rows,
    isViewOnly = false,
    isLogin=false
  } = props;

  const [hasError, setHasError] = useState(false);

  const handleChange = (value: string) => {
    if (required) {
      setHasError(invalidText(value));
    }
    onChange(value);
  };

  const handleBlur = (value: string) => {
    if (required) {
      setHasError(invalidText(value));
    }

    if (regex) {
      const _regex = new RegExp(regex);
      setHasError(!_regex.test(value));
    }
  };

  return (
    <div className="input-field">
      {showLabel && label && (
        <p className={`mb-1 text-gray-700 font-semibold ${isViewOnly ? 'mb-2' : ''} ${isLogin ? 'text-2xl' : ''}`}>
          {label}{' '}
          {required && !isViewOnly && <span className="text-red-500">*</span>}
        </p>
      )}
      {isViewOnly ? (
        <p className="text-gray-700">{value}</p>
      ) : (
        <div>
          {!rows ? (
            <Input
              name={name}
              status={isError || hasError ? 'error' : ''}
              placeholder={placeholder}
              prefix={prefix}
              suffix={suffix}
              value={value}
              required={required}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value)
              }
              onBlur={(e: ChangeEvent<HTMLInputElement>) =>
                handleBlur(e.target.value)
              }
              type={type}
              size={size}
              disabled={disabled}
              className={`w-full ${width ? width : ''} ${isError || hasError ? 'border-red-500' : ''} ${style}`}
            />
          ) : (
            <Input.TextArea
              name={name}
              status={isError || hasError ? 'error' : ''}
              placeholder={placeholder}
              rows={rows}
              value={value}
              required={required}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(e.target.value)
              }
              onBlur={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleBlur(e.target.value)
              }
              size={size}
              disabled={disabled}
              className={`w-full ${isError || hasError ? 'border-red-500' : ''} ${style}`}
            />
          )}
          {(isError || hasError) && (
            <p className="text-red-500 text-[10px] mt-1 ml-1">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
