import { ChangeEvent, useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SizeType } from "antd/es/config-provider/SizeContext";

type Props = {
    name1?: string;
    name2?: string;
    label: string;
    value: { name: string, strength: string }[];
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
        type = 'text',
        size = 'large',
    } = props;

    const addInputRow = () => {
        const updatedValues = [...value, { name: "", strength: "" }];
        onChange(updatedValues);
    };

    const handleChange = (index: number, field: 'name' | 'strength', value: string) => {
        const updatedValues = [...props.value];
        updatedValues[index] = { ...updatedValues[index], [field]: value };
        onChange(updatedValues);
    };
    return (
        <div className="flex flex-col gap-2">
            {value.map((val, index) => (
                <>
                    <div className="flex items-center gap-2">
                        {index === 0 && (<p className={`mb-1 text-gray-700 font-semibold `}>
                            {label}
                        </p>)}
                        <div className="flex items-center gap-2">
                            <div key={index} className="flex items-center gap-2">
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
                        </div>
                    </div>

                    
                        <>
                            <div className="flex items-center gap-2">
                                <Input
                                    name={name1}
                                    placeholder={placeholder1}
                                    prefix={prefix}
                                    suffix={suffix}
                                    value={val?.name || ""}
                                    required={required}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        handleChange(index, 'name', e.target.value)
                                    }
                                    type={type}
                                    size={size}
                                    disabled={disabled}

                                />
                                <Input
                                    name={name2}
                                    placeholder={placeholder2}
                                    prefix={prefix}
                                    suffix={suffix}
                                    value={val?.strength || ""}
                                    required={required}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        handleChange(index, 'strength', e.target.value)
                                    }
                                    type={type}
                                    size={size}
                                    disabled={disabled}
                                />

                            </div>
                        </>

                    

                </>
            ))}
        </div>
    );
}

export default AddInput;
