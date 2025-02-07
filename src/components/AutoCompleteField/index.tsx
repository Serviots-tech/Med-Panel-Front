import { AutoComplete, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { invalidText } from '../../helpers/utils';

type Props = {
	defaultOption?: boolean;
	defaultLabel?: string;
	value: string | string[];
	options: { value: string | number; label: string }[];
	onChange: (value: string | number | string[]) => void;
	placeholder: string;
	required: boolean;
	helperText: string;
	label?: string;
	isError: boolean;
	size?: 'small' | 'middle' | 'large';
	width?: string | number;
	className?: string;
	labelSuffix?: any;
	labelSuffixContent?: any;
	disabled?: boolean;
	mode?: 'multiple' | 'tags' | undefined;
	loading?: boolean;
	isViewOnly?: boolean;
};

const AutoCompleteField = (props: Props) => {
	const {
		value,
		options,
		placeholder,
		size = 'middle',
		required,
		helperText = 'Field required',
		onChange,
		label,
		isError,
		className,
		labelSuffix,
		width,
		mode,
		labelSuffixContent,
		disabled = false,
		isViewOnly = false,
	} = props;
	
	const [hasError, setHasError] = useState(false);
	const [inputValue, setInputValue] = useState<string | string[]>(value);

	const handleChange = (newValue: string | string[]) => {
		if (required && typeof newValue === 'string') {
			setHasError(invalidText(newValue));
		}
		if (required && Array.isArray(newValue) && newValue.length === 0) {
			setHasError(true);
		} else {
			setHasError(false);
		}
		setInputValue(newValue);
		onChange(newValue);
	};

	useEffect(() => {
		setInputValue(value);
		setHasError(false);
	}, [value, options]);

	return (
		<div className={`input-field ${className}`}>
			{!options?.length && isViewOnly ? null : (
				<>
					{label && (
						<p className={`${isViewOnly ? 'mb-1' : 'mb-2'} text-gray-700 font-semibold`}>
							{label} {required && !isViewOnly && <span className="text-red-500">*</span>}
							<Popover content={labelSuffixContent} trigger="hover" className="cursor-pointer">
								{labelSuffix}
							</Popover>
						</p>
					)}
					{isViewOnly ? (
						Array.isArray(value) && mode === 'multiple' ? (
							<p>
								<Popover
									content={
										<ul className="max-h-80 overflow-auto">
											{value.map((val) => (
												<li key={val}>{options.find((option) => option.value === val)?.label || val}</li>
											))}
										</ul>
									}
									trigger="hover"
									placement="topRight"
								>
									{options.find((option) => option.value === value[0])?.label || value[0]}
									{value.length > 1 && '...'}
								</Popover>
							</p>
						) : (
							<p>{options.find((option) => option.value === value)?.label || value}</p>
						)
					) : (
						<div>
							<AutoComplete
								showSearch
								optionFilterProp="label"
								value={inputValue}
								options={options}
								onChange={handleChange}
								size={size}
								placeholder={placeholder}
								maxTagCount="responsive"
								status={hasError || isError ? 'error' : ''}
								className={`w-full ${width ? width : 'w-full'}`}
								disabled={disabled}
								allowClear
							/>
							{(hasError || isError) && <p className="text-red-500 text-xs ml-1">{helperText}</p>}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AutoCompleteField;
