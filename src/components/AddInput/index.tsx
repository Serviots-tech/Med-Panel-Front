import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"; // Import minus icon
import { Button, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ChangeEvent, useState } from "react";

type Props = {
    name1?: string;
    name2?: string;
    label: string;
    value: { name: string; strength: string }[];
    placeholder1?: string;
    placeholder2?: string;
    required: boolean;
    isError: boolean;
    onChange: (updatedValues: { name: string; strength: string }[]) => void;
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
    isLogin?: boolean;
};

function AddInput(props: Props) {
    const {
        name1,
        name2,
        label,
        value,
        placeholder1,
        placeholder2,
        prefix = null,
        suffix = null,
        required = false,
        onChange,
        disabled = false,
        type = "text",
        size = "large",
    } = props;
        console.log("🚀 ~ AddInput ~ value:", value)

    const [errors, setErrors] = useState<{ name: boolean; strength: boolean }[]>([]);

    const validateFields = (index: number) => {
        const updatedErrors = [...errors];
        const fieldValue = value[index] || { name: "", strength: "" };

        updatedErrors[index] = {
            name: !fieldValue.name.trim(),
            strength: !fieldValue.strength.trim(),
        };

        setErrors(updatedErrors);
        return !updatedErrors[index].name && !updatedErrors[index].strength;
    };

    const addInputRow = () => {
        if (value.length > 0) {
            const lastIndex = value.length - 1;
            if (!validateFields(lastIndex)) return;
        }

        setErrors([...errors, { name: false, strength: false }]); // Reset errors for the new row
        onChange([...value, { name: "", strength: "" }]);
    };

    const handleRemoveRow = (index: number) => {
        const updatedValues = value.filter((_, i) => i !== index);
        onChange(updatedValues);

        const updatedErrors = errors.filter((_, i) => i !== index);
        setErrors(updatedErrors);
    };

    const handleChange = (index: number, field: "name" | "strength", inputValue: string) => {
        let sanitizedValue = inputValue.replace(/^[-@\$+#]+/, ""); 
        const updatedValues = [...value];
        updatedValues[index] = { ...updatedValues[index], [field]: sanitizedValue };
        onChange(updatedValues);

        // Remove error message when user fills the input
        const updatedErrors = [...errors];
        updatedErrors[index] = {
            ...updatedErrors[index],
            [field]: !sanitizedValue.trim(),
        };
        setErrors(updatedErrors);
    };

    return (
        <div className="flex flex-col gap-2">
            {(value.length === 0 ? [{ name: "", strength: "" }] : value).map((val, index) => (
                <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        {index === 0 && (
                            <p className="mb-1 text-gray-700 font-semibold">{label}</p>
                        )}
                        {index === 0 && (
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<PlusOutlined style={{ fontSize: 10 }} />}
                                onClick={addInputRow}
                                size="small"
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <Input
                                name={name1}
                                placeholder={placeholder1}
                                prefix={prefix}
                                suffix={suffix}
                                value={val?.name || ""}
                                required={required}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, "name", e.target.value)
                                }
                                type={type}
                                size={size}
                                disabled={disabled}
                            />
                            {errors[index] && errors[index].name && (
                                <p className="text-red-500 text-xs ps-2">Please fill the input.</p>
                            )}
                        </div>
                        <div>
                            <Input
                                name={name2}
                                placeholder={placeholder2}
                                prefix={prefix}
                                suffix={suffix}
                                value={val?.strength || ""}
                                required={required}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, "strength", e.target.value)
                                }
                                type={type}
                                size={size}
                                disabled={disabled}
                            />
                            {errors[index] && errors[index].strength && (
                                <p className="text-red-500 text-xs ps-2">Please fill the input.</p>
                            )}
                        </div>
                        {value.length > 1 && (
                            <Button
                                type="default"
                                shape="circle"
                                icon={<MinusCircleOutlined style={{ fontSize: 12, color: "red" }} />}
                                onClick={() => handleRemoveRow(index)}
                                size="small"
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AddInput;
