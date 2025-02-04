/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
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
    console.log("🚀 ~ hasError:", hasError)

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
    const handleChangeValue = (
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
        if (name === 'productType' && value !== 'drug') {
            // Remove formError.barcodeSKU if it exists
            if (formError.hasOwnProperty('barcodeSKU')) {
                delete formError.barcodeSKU;
                setFormError(formError)
            }
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
                    {/* Replace with an actual spinner component */}
                    <Loader />
                </div>
            ) : (
                <form className="bg-white p-6 rounded-lg shadow-md space-y-4">

                    <Row gutter={[50, 20]} >
                        <Col span={8}>
                            <InputField
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
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="brandName"
                                value={formData?.brandName}
                                label="Brand Name"
                                required={false}
                                helperText="Brand name is required"
                                placeholder="Brand Name"
                                onChange={(value) => handleChangeValue(value, 'brandName', true)}
                                isError={formError.brandName}
                                disabled={false}
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
                                    { label: 'OTC', value: 'OTC' }
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

                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Unit"
                                options={[
                                    { label: 'gm', value: 'gm' },
                                    { label: 'ml', value: 'ml' },
                                    { label: 'kit', value: 'kit' },
                                    { label: 'kg', value: 'kg' },
                                    { label: 'piece', value: 'piece' },
                                    { label: 'Tablet', value: 'Tablet' },
                                    { label: 'Capsule', value: 'Capsule' },
                                    { label: 'ltr', value: 'ltr' },
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

                        {/* Dosage Form */}
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


                        <Col span={8}>
                            <InputField
                                name="weightage"
                                value={formData?.weightage}
                                label="Weightage"
                                required={true}
                                helperText="Weightage is required"
                                placeholder="Weightage"
                                onChange={(value) => handleChangeValue(value, 'weightage', true)}
                                isError={formError.weightage}
                                disabled={false}
                            />
                        </Col>


                        {/* Manufacturer */}
                        <Col span={8}>
                            <InputField
                                name="manufacturer"
                                value={formData.manufacturer}
                                label="Manufacturer"
                                required={true}
                                helperText="Manufacturer is required"
                                placeholder="Manufacturer"
                                onChange={(value) => handleChangeValue(value, 'manufacturer', true)}
                                isError={formError.manufacturer}
                                disabled={false}
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

                        {/* Contraindications */}

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



                    </Row>


                    {/* </div> */}
                    <div className="flex justify-center">
                        <Button
                            // htmlType="submit"
                            type='primary'
                            onClick={handleSubmit}
                            loading={isSubmitFormLoading}
                        // className="bg-blue-500 text-white p-2 rounded-md w-full max-w-xs hover:bg-blue-600"
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