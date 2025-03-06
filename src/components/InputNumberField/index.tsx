/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputNumber } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ChangeEvent, useState } from 'react';
import { invalidText } from '../../helpers/utils';

type Props = {
	name: string;
	label?: string;
	value?: number;
	placeholder?: string;
	required: boolean;
	isError: boolean;
	onChange: (value: number | null) => void;
	helperText?: string;
	prefix?: any;
	suffix?: any;
	regex?: string;
	disabled?: boolean;
	type?: string;
	formatter?: string;
	parser?: string;
	size?: SizeType;
	showLabel?: boolean;
	style?: any;
};

const InputNumberField = (props: Props) => {
	const {
		name,
		label,
		value,
		placeholder,
		isError = false,
		prefix = null,
		suffix = null,
		required = false,
		onChange,
		disabled = false,
		type = 'text',
		helperText = 'Invalid field',
		size = 'large',
		showLabel = true,
		style,
	} = props;
	const [hasError, setHasError] = useState(false);

	const handleChange = (value: number | null) => {
		if (required) {
			setHasError(invalidText(value));
		}

		onChange(value);
	};

	const handleBlur = (value: number | null) => {
		if (required) {
			setHasError(invalidText(value));
		}
	};

	return (
		<div className="input-field">
			{showLabel && label && (
				<p className="label">
					{label} {required && <span className="red">*</span>}
				</p>
			)}
			<div>
				<InputNumber
					name={name}
					status={isError || hasError ? 'error' : ''}
					placeholder={placeholder}
					prefix={prefix}
					suffix={suffix}
					value={value}
					required={required}
					onChange={(_value: number | null) => {
						handleChange(_value);
					}}
					onBlur={(e: ChangeEvent<HTMLInputElement>) =>
						handleBlur(Number(e.target.value))
					}
					type={type}
					// formatter={handleFormatter}
					// parser={handleParser}
					disabled={disabled}
					size={size}
					style={{ width: '100%', ...style }}
				/>
				{(isError || hasError) && (
					<p
						className="red"
						style={{
							fontSize: '12px',
							marginLeft: '2px',
						}}
					>
						{helperText}
					</p>
				)}
			</div>
		</div>
	);
};

export default InputNumberField;
