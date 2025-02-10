/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { MedicineFormInput } from '../types/medicine';
import { Button, Col, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import InputField from './InputField';
import { invalidText, validateFormData } from '../helpers/utils';
import SelectDropdown from './SelectDropdown';
import { Image } from 'antd';
import { configData } from '../helpers/config';
import { Loader } from './Loader';
import AutoCompleteField from './AutoCompleteField';
import { getMedicines } from '../services/medicine';

interface MedicineFormProps {
    formData: MedicineFormInput;
    handleSubmit: (e: React.FormEvent) => void;
    formError: any;
    setFormError: any
    isSubmitFormLoading: boolean;
    isLoading: boolean;
    doseFormData: any;
    fileList: any;
    setFileList: any;
    setFormData: any
}

export const MedicineForm: React.FC<MedicineFormProps> = ({ formData, setFormData, handleSubmit, formError, setFormError, isSubmitFormLoading, isLoading, doseFormData, fileList, setFileList }) => {

    let isRemoving = false;
    const [hasError, setHasError] = useState(false);

    const [saltCompositionOptions, setSaltCompotisionOptions] = useState([])
    const [medicineNameOptions, setMedicineNameOptions] = useState([])
    const [manufacturerOptions, setManufacturerOptions] = useState([])
    const [marketedByOptions, setMarketedByOptions] = useState([])
    const [brandNameOptions, setBrandNameOptions] = useState([])
    const [weightageOptions, setWeightageOptions] = useState([])
    const [saltStrengthOptions, setSaltStrengthOptions] = useState([])
    const [flavorsOptions, setFlavorsOptions] = useState([])
    const [offersOptions, setOffersOptions] = useState([])
    console.log("🚀 ~ hasError:", hasError)

    const debounceDelay = 300;
    let debounceTimeout: number | undefined;

    const handleSaltCompositionSearch = useCallback((value: string) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const query = {
                        targetField: 'saltComposition',
                        search: value,
                    };
                    const res = await getMedicines(query);
                    setSaltCompotisionOptions(
                        res?.data.map((item: any) => ({
                            label: item.saltComposition,
                            value: item.saltComposition,
                        }))
                    );
                } catch (e) {
                    setSaltCompotisionOptions([]);
                }
            } else {
                setSaltCompotisionOptions([]);
            }
        }, debounceDelay);
    }, []);

    const handleMedicineNameSearch = useCallback((value: string) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const query = {
                        targetField: 'medicineName',
                        search: value,
                    };
                    const res = await getMedicines(query);
                    setMedicineNameOptions(
                        res?.data.map((item: any) => ({
                            label: item.medicineName,
                            value: item.medicineName,
                        }))
                    );
                } catch (e) {
                    setMedicineNameOptions([]);
                }
            } else {
                setMedicineNameOptions([]);
            }
        }, debounceDelay);
    }, []);

    const handleManufacturerSearch = useCallback((value: string) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const query = {
                        targetField: 'manufacturer',
                        search: value,
                    };
                    const res = await getMedicines(query);
                    setManufacturerOptions(
                        res?.data.map((item: any) => ({
                            label: item.manufacturer,
                            value: item.manufacturer,
                        }))
                    );
                } catch (e) {
                    setManufacturerOptions([]);
                }
            } else {
                setManufacturerOptions([]);
            }
        }, debounceDelay);
    }, []);

    const handleMarketedBySearch = useCallback((value: string) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const query = {
                        targetField: 'marketedBy',
                        search: value,
                    };
                    const res = await getMedicines(query);
                    setMarketedByOptions(
                        res?.data.map((item: any) => ({
                            label: item.marketedBy,
                            value: item.marketedBy,
                        }))
                    );
                } catch (e) {
                    setMarketedByOptions([]);
                }
            } else {
                setMarketedByOptions([]);
            }
        }, debounceDelay);
    }, []);

    const handleBrandNameSearch = useCallback((value: string) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const query = {
                        targetField: 'brandName',
                        search: value,
                    };
                    const res = await getMedicines(query);
                    setBrandNameOptions(
                        res?.data.map((item: any) => ({
                            label: item.brandName,
                            value: item.brandName,
                        }))
                    );
                } catch (e) {
                    setBrandNameOptions([]);
                }
            } else {
                setBrandNameOptions([]);
            }
        }, debounceDelay);
    }, []);
    const handleWeightageSearch = useCallback((value: string) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const query = {
                        targetField: 'weightage',
                        search: value,
                    };
                    const res = await getMedicines(query);
                    setWeightageOptions(
                        res?.data.map((item: any) => ({
                            label: item.weightage,
                            value: item.weightage,
                        }))
                    );
                } catch (e) {
                    setWeightageOptions([]);
                }
            } else {
                setWeightageOptions([]);
            }
        }, debounceDelay);
    }, []);

    const handlSaltStrengthSearch = useCallback((value: string) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const query = {
                        targetField: 'saltStrength',
                        search: value,
                    };
                    const res = await getMedicines(query);
                    setSaltStrengthOptions(
                        res?.data.map((item: any) => ({
                            label: item.saltStrength,
                            value: item.saltStrength,
                        }))
                    );
                } catch (e) {
                    setSaltStrengthOptions([]);
                }
            } else {
                setSaltStrengthOptions([]);
            }
        }, debounceDelay);
    }, []);

    const handlFlavorsSearch = useCallback((value: string) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const query = {
                        targetField: 'flavors',
                        search: value,
                    };
                    const res = await getMedicines(query);
                    setFlavorsOptions(
                        res?.data.map((item: any) => ({
                            label: item.flavors,
                            value: item.flavors,
                        }))
                    );
                } catch (e) {
                    setFlavorsOptions([]);
                }
            } else {
                setFlavorsOptions([]);
            }
        }, debounceDelay);
    }, []);
    const handlOffersSearch = useCallback((value: string) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const query = {
                        targetField: 'offers',
                        search: value,
                    };
                    const res = await getMedicines(query);
                    setOffersOptions(
                        res?.data.map((item: any) => ({
                            label: item.offers,
                            value: item.offers,
                        }))
                    );
                } catch (e) {
                    setOffersOptions([]);
                }
            } else {
                setOffersOptions([]);
            }
        }, debounceDelay);
    }, []);

    const propsUpload = {
        name: 'file',
        accept: '.jpg,.jpeg,.png',
        maxCount: 4,
        multiple: true,
        fileList: fileList,
        beforeUpload: () => {
            return false; // Prevent automatic upload
        },
        onChange(info: any) {
            const { file, fileList: newFileList } = info;

            if (file?.size) {
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    toast.error('Image must be smaller than 1MB!');
                    return;
                }
            }

            if (!isRemoving) {
                // Filter valid files and limit the total count
                const updatedFileList = newFileList.slice(-4).filter((file: any) => file.size / 1024 / 1024 < 1);
                setFileList(updatedFileList);
            } else {
                // setIsRemoving(false);
                isRemoving = false
            }
        },
        onDrop: () => {
            setFileList([]);
        },
        onRemove: (file: any) => {
            // setIsRemoving(true);
            isRemoving = true
            setFileList((prevList: any[]) => prevList.filter((item) => item.uid !== file.uid));
        },
    };
    const handleChangeValue = async (
        value: string | number | null | string[] | boolean,
        name: string,
        required: boolean,
        regex?: RegExp | null
    ) => {
        if (required && typeof value === 'string') {
            setHasError(invalidText(value));
        }
        if (required && Array.isArray(value) && value.length === 0) {
            setHasError(true);
        }

        if (typeof value === 'string' && regex) {
            const _regex = new RegExp(regex);
            setHasError(!_regex.test(value));
        }
        // if (name === 'productType' && value !== 'drug') {
        //     // Remove formError.barcodeSKU if it exists
        //     if (formError.hasOwnProperty('barcodeSKU')) {
        //         delete formError.barcodeSKU;
        //         setFormError(formError)
        //     }
        // }
        if (name === 'saltComposition') {

            handleSaltCompositionSearch(value as string);
        }
        if (name === 'medicineName') {

            handleMedicineNameSearch(value as string);
        }
        if (name === 'manufacturer') {

            handleManufacturerSearch(value as string);
        }
        if (name === 'marketedBy') {

            handleMarketedBySearch(value as string);
        }

        if (name === 'brandName') {

            handleBrandNameSearch(value as string);
        }

        if (name === 'weightage') {

            handleWeightageSearch(value as string);
        }

        if (name === 'saltStrength') {

            handlSaltStrengthSearch(value as string);
        }

        if (name === 'flavors') {

            handlFlavorsSearch(value as string);
        }
        if (name === 'offers') {

            handlOffersSearch(value as string);
        }
        


        OnChange(value, name);
    };

    const OnChange = (
        value: string | number | null | string[] | boolean,
        key: string,
    ) => {
        setFormData((prev: any) => {
            return {
                ...prev,
                [key]: value,
            };
        });
        const checkFormError = validateFormData(
            { [key]: value },
            { ...formError }
        );
        setFormError(checkFormError);
    };

    return (
        <div>
            {isLoading ? (
                <div className="spinner">
                    <Loader />
                </div>
            ) : (
                <form className="bg-white p-6 rounded-lg shadow-md space-y-4">

                    <Row gutter={[50, 20]} >
                        <Col span={8}>
                            {/* <InputField
                                name="medicineName"
                                value={formData?.medicineName}
                                label="Medicine Name"
                                required={true}
                                helperText="Medicine name is required"
                                placeholder='Medicine Name'
                                onChange={(value) => {
                                    handleChangeValue(
                                        value,
                                        'medicineName',
                                        true
                                    );
                                }}
                                // regex="^\d{10}$"
                                isError={formError.medicineName}
                                disabled={false}
                            /> */}
                            <AutoCompleteField
                                placeholder="Medicine Name"
                                options={medicineNameOptions}
                                value={String(formData.medicineName)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'medicineName', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Medicine name is required"
                                label="Medicine Name"
                                disabled={false}
                                isError={formError.medicineName}

                            />
                        </Col>

                        <Col span={8}>
                            {/* <InputField
                                name="manufacturer"
                                value={formData.manufacturer}
                                label="Manufacturer"
                                required={true}
                                helperText="Manufacturer is required"
                                placeholder="Manufacturer"
                                onChange={(value) => handleChangeValue(value, 'manufacturer', true)}
                                isError={formError.manufacturer}
                                disabled={false}
                            /> */}

                            <AutoCompleteField
                                placeholder="Manufacturer"
                                options={manufacturerOptions}
                                value={String(formData.manufacturer)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'manufacturer', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Manufacturer is required"
                                label="Manufacturer"
                                disabled={false}
                                isError={formError.manufacturer}

                            />
                        </Col>

                        <Col span={8}>
                            {/* <InputField
                                name="marketedBy"
                                value={formData.marketedBy}
                                label="Marketed By"
                                required={false}
                                helperText="Marketed By are required"
                                placeholder="Marketed By"
                                onChange={(value) => handleChangeValue(value, 'marketedBy', false)}
                                isError={formError.marketedBy}
                                disabled={false}
                            /> */}

                            <AutoCompleteField
                                placeholder="Marketed By"
                                options={marketedByOptions}
                                value={String(formData.marketedBy)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'marketedBy', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Marketed By is required"
                                label="Marketed By"
                                disabled={false}
                                isError={formError.marketedBy}

                            />

                        </Col>

                        <Col span={8}>
                            {/* <InputField
                                name="brandName"
                                value={formData?.brandName}
                                label="Brand Name"
                                required={false}
                                helperText="Brand name is required"
                                placeholder="Brand Name"
                                onChange={(value) => handleChangeValue(value, 'brandName', true)}
                                isError={formError.brandName}
                                disabled={false}
                            /> */}

                            <AutoCompleteField
                                placeholder="Brand Name"
                                options={brandNameOptions}
                                value={String(formData.brandName)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'brandName', true);
                                }}
                                size="large"
                                required={false}
                                helperText="Brand Name is required"
                                label="Brand Name"
                                disabled={false}
                                isError={formError.brandName}

                            />
                        </Col>


                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Product Type"
                                options={[
                                    { label: 'Drug', value: 'Drug' },
                                    { label: 'Surgical', value: 'Surgical' },
                                    { label: 'Cosmetic', value: 'Cosmetic' },
                                    { label: 'Generic', value: 'Generic' },
                                    { label: 'Homeopathic', value: 'Homeopathic' },
                                    { label: 'Ayurvedic', value: 'Ayurvedic' },
                                    { label: 'OTC', value: 'OTC' },
                                    { label: 'Dairy & Beverages', value: 'Dairy_Beverages' },
                                    { label: 'Fruits & Vegetales', value: 'Fruits_vegetales' },
                                    { label: 'Home & Kitchen', value: 'Home_Kitchen' },
                                    { label: 'Jewelley', value: 'Jewelley' }
                                ]}
                                value={formData.productType}
                                onChange={(value: any) => {
                                    handleChangeValue(value, 'productType', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Product type is required"
                                label="Product Type"
                                disabled={false}
                                isError={formError.productType}
                            />
                        </Col>

                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Dosage Form"
                                options={doseFormData?.map((item: any) => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                                value={formData.doseFormId}
                                onChange={(value) => handleChangeValue(value, 'doseFormId', true)}
                                size="large"
                                required={true}
                                helperText="Dosage form is required"
                                label="Dosage Form"
                                disabled={false}
                                isError={formError.doseFormId}
                            />
                        </Col>


                        {/* Pack Size */}
                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select pack size"
                                options={[
                                    { label: "Bottle", value: "BOTTLE" },
                                    { label: "Strip", value: "STRIP" },
                                    { label: "Jar", value: "JAR" },
                                    { label: "Tube", value: "TUBE" },
                                    { label: "Packet", value: "PACKET" },
                                    { label: "Box", value: "BOX" },
                                    { label: "Sachet", value: "SACHET" },
                                    { label: "Vial", value: "VIAL" },
                                    { label: "Kit", value: "KIT" },
                                    { label: "Bag", value: "BAG" },
                                ]}
                                value={formData.packSize}
                                onChange={(value: any) => {
                                    handleChangeValue(value, 'packSize', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Pack size is required"
                                label="Select Pack Size"
                                disabled={false}
                                isError={formError.packSize}
                            />
                        </Col>

                        <Col span={8}>
                            {/* <InputField
                                name="weightage"
                                value={formData?.weightage}
                                label="Weightage"
                                required={true}
                                helperText="Weightage is required"
                                placeholder="Weightage"
                                onChange={(value) => handleChangeValue(value, 'weightage', true)}
                                isError={formError.weightage}
                                disabled={false}
                            /> */}

                            <AutoCompleteField
                                placeholder="Weightage"
                                options={weightageOptions}
                                value={String(formData.weightage)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'weightage', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Weightage is required"
                                label="Weightage"
                                disabled={false}
                                isError={formError.weightage}

                            />
                        </Col>

                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Unit"
                                options={[
                                    { label: 'Gm', value: 'GM' },
                                    { label: 'Ml', value: 'ML' },
                                    { label: 'Kit', value: 'KIT' },
                                    { label: 'Kg', value: 'KG' },
                                    { label: 'Piece', value: 'PIECE' },
                                    { label: 'Tablet', value: 'TABLET' },
                                    { label: 'Capsule', value: 'CAPSULE' },
                                    { label: 'Ltr', value: 'LTR' },
                                    { label: 'MDI', value: 'MDI' }

                                ]}
                                value={formData.unitType}
                                onChange={(value: any) => {
                                    handleChangeValue(value, 'unitType', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Unit is required"

                                label="Select Unit"
                                disabled={false}
                                isError={formError.unitType}
                            />
                        </Col>


                        <Col span={8}>
                            <InputField
                                name="price"
                                value={formData.price}
                                label="Price"
                                required={true}
                                helperText="Price is required"
                                placeholder="Price"
                                type="number"
                                onChange={(value) => handleChangeValue(value, 'price', true)}
                                isError={formError.price}
                                disabled={false}
                            />
                        </Col>



                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Prescription Required"
                                options={[
                                    // { label: 'Select', value: 'Select' },
                                    { label: 'YES', value: 'YES' },
                                    { label: 'NO', value: 'NO' }
                                ]}
                                value={formData.prescriptionReq}
                                onChange={(value) => handleChangeValue(value, 'prescriptionReq', true)}
                                size="large"
                                required={true}
                                helperText={formError.prescriptionReq ? "Prescription Required is required" : ""}
                                label="Prescription Required"
                                disabled={false}
                                isError={!!formError.prescriptionReq}
                            />
                        </Col>

                        <Col span={8}>

                            <SelectDropdown
                                placeholder="Select schedule type"
                                options={[
                                    { label: 'H', value: 'H' },
                                    { label: 'H1', value: 'H1' },
                                    { label: 'G', value: 'G' },
                                    { label: 'NRX', value: 'NRX' },
                                    { label: 'TB', value: 'TB' },
                                    { label: 'NON_SCHEDULE', value: 'NON_SCHEDULE' }
                                ]}
                                value={formData.scheduleType}
                                onChange={(value: any) => {
                                    handleChangeValue(value, 'scheduleType', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Schedule Type is required"
                                label="Schedule Type"
                                disabled={false}
                                isError={formError.scheduleType}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="barcodeSKU"
                                value={formData.barcodeSKU || ''}
                                label="Barcode SKU (Unique) or GTIN"
                                required={false}
                                helperText={formError.barcodeSKU ? "Barcode SKU is required" : ""}
                                placeholder="Barcode SKU (Unique)"
                                onChange={(value) => handleChangeValue(value, 'barcodeSKU', false)}
                                isError={!!formError.barcodeSKU}
                                disabled={false}
                            />
                        </Col>


                        <Col span={8}>
                            <InputField
                                name="hsnCode"
                                value={formData.hsnCode}
                                label="HSN Code"
                                required={false}
                                helperText="HSN code are required"
                                placeholder="HSN Code"
                                onChange={(value) => handleChangeValue(value, 'hsnCode', false)}
                                isError={formError.hsnCode}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <AutoCompleteField
                                placeholder="Salt Composition"
                                options={saltCompositionOptions}
                                value={String(formData.saltComposition)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'saltComposition', true);
                                }}
                                size="large"
                                required={false}
                                helperText="Salt Composition is required"
                                label="Salt Composition"
                                disabled={false}
                                isError={formError.saltComposition}

                            />
                        </Col>


                        <Col span={8}>
                            {/* <InputField
                                name="saltStrength"
                                value={formData.saltStrength}
                                label="Salt Strength"
                                required={false}
                                helperText="Salt strength are required"
                                placeholder="Salt strength"
                                onChange={(value) => handleChangeValue(value, 'saltStrength', false)}
                                isError={formError.saltStrength}
                                disabled={false}
                            /> */}
                            <AutoCompleteField
                                placeholder="Salt strength"
                                options={saltStrengthOptions}
                                value={String(formData.saltStrength)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'saltStrength', true);
                                }}
                                size="large"
                                required={false}
                                helperText="Salt strength is required"
                                label="Salt Strength"
                                disabled={false}
                                isError={formError.saltStrength}

                            />
                        </Col>

                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select GST Percentage"
                                options={Array.from({ length: 29 }, (_, index) => ({
                                    label: `${index}%`,
                                    value: index
                                }))}
                                value={String(formData.gstPercentage)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'gstPercentage', true);
                                }}
                                size="large"
                                required={true}
                                helperText="GST percentage is required"
                                label="GST Percentage"
                                disabled={false}
                                isError={formError.gstPercentage}

                            />
                        </Col>

                        <Col span={8}>
                            {/* <InputField
                                name="flavors"
                                value={formData.flavors}
                                label="Flavors"
                                required={false}
                                helperText="Flavors are required"
                                placeholder="Flavors"
                                onChange={(value) => handleChangeValue(value, 'flavors', false)}
                                isError={formError.flavors}
                                disabled={false}
                            /> */}

                            <AutoCompleteField
                                placeholder="Flavors"
                                options={flavorsOptions}
                                value={String(formData.flavors)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'flavors', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Flavors is required"
                                label="Flavors"
                                disabled={false}
                                isError={formError.flavors}

                            />
                        </Col>

                        <Col span={8}>
                            {/* <InputField
                                name="offers"
                                value={formData.offers}
                                label="Offers"
                                required={false}
                                helperText="Offers are required"
                                placeholder="Offers"
                                onChange={(value) => handleChangeValue(value, 'offers', false)}
                                isError={formError.offers}
                                disabled={false}
                            /> */}

                            <AutoCompleteField
                                placeholder="Offers"
                                options={offersOptions}
                                value={String(formData.offers)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'offers', true);
                                }}
                                size="large"
                                required={false}
                                helperText="Offers is required"
                                label="Offers"
                                disabled={false}
                                isError={formError.offers}

                            />
                        </Col>

                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Sub Category Type"
                                options={[
                                    {label:'Select Value',value:""},
                                    { label: 'Mother Care', value: 'MOTHER_CARE' },
                                    { label: 'Protein Powders & Drinks', value: 'PROTEIN_POWDERS_DRINKS' },
                                    { label: 'Vitamins & Supplements', value: 'VITAMINS_SUPPLEMENTS' },
                                    { label: 'Sexual Health Supplements', value: 'SEXUAL_HEALTH_SUPPLEMENTS' },
                                    { label: 'Feminine Hygiene', value: 'FEMININE_HYGIENE' },
                                    { label: 'Grooming', value: 'GROOMING' },
                                    { label: 'Hair Care', value: 'HAIR_CARE' },
                                    { label: 'Oral Care', value: 'ORAL_CARE' },
                                    { label: 'Fragrances', value: 'FRAGRANCES' },
                                    { label: 'Pet Product', value: 'PET_PRODUCT' },
                                    { label: 'Cleaning Essentials', value: 'CLEANING_ESSENTIALS' },
                                    { label: 'Food & Drink', value: 'FOOD_DRINK' },
                                    { label: 'Diapers & Wipes', value: 'DIAPERS_WIPES' },
                                    { label: 'Baby Product', value: 'BABY_PRODUCT' },
                                    { label: 'Skin Care', value: 'SKIN_CARE' },
                                ]}
                                value={formData.subCategory as string}
                                onChange={(value: any) => {
                                    handleChangeValue(value, 'subCategory', true);
                                }}
                                size="large"
                                required={false}
                                helperText="Sub Category is required"
                                label="Sub Category"
                                disabled={false}
                                isError={formError.subCategory}
                            />
                        </Col>

                        {/* Route of Administration */}
                        <Col span={8}>
                            <InputField
                                name="routeOfAdministration"
                                value={formData.routeOfAdministration}
                                label="Route of Administration"
                                required={false}
                                helperText="Route of administration is required"
                                placeholder="Route of Administration"
                                onChange={(value) => handleChangeValue(value, 'routeOfAdministration', false)}
                                isError={formError.routeOfAdministration}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="sideEffects"
                                value={formData.sideEffects}
                                label="Side Effects"
                                required={false}
                                helperText="Side effects are required"
                                placeholder="Side Effects"
                                onChange={(value) => handleChangeValue(value, 'sideEffects', false)}
                                isError={formError.sideEffects}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="ndc"
                                value={formData.ndc}
                                label="NDC"
                                required={false}
                                helperText={formError.ndc ? "NDC is required" : ""}
                                placeholder="NDC"
                                onChange={(value) => handleChangeValue(value, 'ndc', false)}
                                isError={!!formError.ndc}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <p className="mb-1 text-gray-700 font-semibold">
                                Image<span className="text-red-500"> *</span>
                            </p>
                            <Upload {...propsUpload}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>

                            {(Array.isArray(formData?.image) && !fileList.length) && (
                                <Row gutter={[16, 16]} justify="start" className='mt-10'>
                                    {formData.image.map((url: string, index: number) => (
                                        <Col span={6} key={index}>
                                            <Image
                                                src={`${configData?.s3baseURL || ''}${url}`} // Fallback for s3baseURL
                                                style={{
                                                    width: '100%', // Adjust width to fit the column
                                                    height: 'auto', // Maintain aspect ratio
                                                    objectFit: 'cover',
                                                }}
                                                preview={true}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )}

                        </Col>
                    </Row>

                    <div className="flex justify-center">
                        <Button
                            type='primary'
                            onClick={handleSubmit}
                            loading={isSubmitFormLoading}
                        >
                            {formData.id ? 'Update' : 'Add'} Medicine
                        </Button>
                    </div>
                </form>
            )
            }
        </div>
    );

}