import { Input } from 'antd';
import { ChangeEvent } from 'react';
import { CustomSize } from '../../types/medicine';

type Props = {
	placeHolder: string;
	handleChange: (value: string) => void;
	// handleChangeApi: (value: string) => void;
	value: string | number;
	className?: string;
	suffixIcon?: any;
	prefixIcon?: any;
	size?: CustomSize;
};

const SearchComponent = (props: Props) => {
	const {
		placeHolder,
		handleChange,
		value,
		className,
		suffixIcon,
		size = 'large',
	} = props;

	// Handle input change
	const handleSearchChange = (value: string) => {
		handleChange(value);
	};

	return (
		<Input
			className={className}
			placeholder={placeHolder}
			suffix={suffixIcon && suffixIcon}
			onChange={(e: ChangeEvent<HTMLInputElement>) =>
				handleSearchChange(e.target.value)
			}
			value={value}
			size={size}
		/>
	);
};

export default SearchComponent;
