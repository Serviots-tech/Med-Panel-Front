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
		prefixIcon,
		size = 'large',
	} = props;

	// const debouncedSearch = useCallback(
	// 	debounce((value: string) => handleChangeApi(value), 2000),
	// 	[]
	// );

	// Handle input change
	const handleSearchChange = (value: string) => {
		handleChange(value);
		// debouncedSearch(value);
	};

	// Cleanup the debounce effect on unmount
	// useEffect(() => {
	// 	return () => {
	// 		debouncedSearch.cancel();
	// 	};
	// }, [debouncedSearch]);

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
