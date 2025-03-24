/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Medicine } from '../types/medicine';
import { Modal, Row, Col, Typography, Divider } from 'antd';
import { Image } from 'antd';
import { configData } from '../helpers/config';
import { getCategoryLabel, getPackagingLabel, PackagingType, ProductCategory } from '../helpers/utils';

const { Text } = Typography;

interface MedicineModalProps {
    medicine: Medicine | null;
    onClose: () => void;
    doseFormData: any
}

const MedicineModal: React.FC<MedicineModalProps> = ({ medicine, onClose, doseFormData }) => {
    if (!medicine) return null;

    const saltName: any[] = []
    const saltStrength: any[] = []

    const getDoseFormName = (doseFormId: string) => {
        const matchedItem = doseFormData.find((item: any) => item.id === doseFormId);
        return matchedItem ? matchedItem.name : "";
    };


    if (medicine?.saltComposition !== null) {
        medicine?.saltComposition.map((val: any) => {
            const parsedVal = JSON.parse(val)
            saltName.push(parsedVal?.name)
            saltStrength.push(parsedVal?.strength)
        })
    }

    return (
        <Modal
            title="Medicine Details"
            visible={true}
            onCancel={onClose}
            footer={null}
            width={700}
            bodyStyle={{ padding: '20px' }}
            className="rounded-lg"
        >
            <div className="space-y-6">
                {/* Medicine Details Section */}
                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Medicine Name :- </Text>
                        <Text>{medicine.medicineName}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Manufacturer :- </Text>
                        <Text>{medicine.manufacturer}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Marketed By :- </Text>
                        <Text>{medicine.marketedBy}</Text>
                    </Col>

                </Row>
                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Product Type :- </Text>
                        <Text>{medicine.productType}</Text>
                    </Col>

                    <Col span={8}>
                        <Text strong>Dosage Form :- </Text>
                        <Text>{getDoseFormName(medicine.doseFormId)}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Pack Size :- </Text>
                        <Text>{getPackagingLabel(medicine.packSize as PackagingType)}
                        </Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Weightage :- </Text>
                        <Text>{medicine.weightage}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Unit :- </Text>
                        <Text>{medicine.unitType}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Price :- </Text>
                        <Text>{medicine.price}</Text>
                    </Col>

                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Prescription Required :- </Text>
                        <Text>{medicine.prescriptionReq}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Price :- </Text>
                        <Text>{medicine.price}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Barcode SKU :- </Text>
                        <Text>{medicine.barcodeSKU}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                <Col span={8}>
                        <Text strong>HSN Code :- </Text>
                        <Text>{medicine.hsnCode}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Salt Composition:- </Text>
                        {saltName?.map((val, index) => (
                            <div className='flex'>{index + 1}.  <li className='ps-3' key={index}> {val}</li></div>
                        ))}
                    </Col>
                    <Col span={8}>
                        <Text strong>Salt Strength:- </Text>
                        {saltStrength?.map((val, index) => (
                            <div className='flex w-[212px]'>{index + 1}.  <li className='ps-3 break-words whitespace-normal w-[200px]' key={index}> {val}</li></div>
                        ))}
                    </Col>
                    {/* <Col span={8}>
                        <Text strong>Route of Administration :- </Text>
                        <Text>{medicine.routeOfAdministration}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Side Effects :- </Text>
                        <Text>{medicine.sideEffects}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>GST Percentage :- </Text>
                        <Text>{medicine.gstPercentage}</Text>
                    </Col> */}
                </Row>

                <Divider />
                <Row gutter={24}>
                <Col span={8}>
                        <Text strong>GST Percentage :- </Text>
                        <Text>{medicine.gstPercentage}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Flavors :- </Text>
                        <Text>{medicine.flavors}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Offers :- </Text>
                        <Text>{medicine.offers}</Text>
                    </Col>

                </Row>
                <Divider />
                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Sub Category :- </Text>
                        <Text>{getCategoryLabel(medicine.subCategory as ProductCategory)}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Route of Administration :- </Text>
                        <Text>{medicine.routeOfAdministration}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Side Effects :- </Text>
                        <Text>{medicine.sideEffects}</Text>
                    </Col>

                </Row>
                <Divider />
                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>NDC :- </Text>
                        <Text>{medicine.ndc}</Text>
                    </Col>
                    

                </Row>

                {medicine?.image?.length ? (
                    <>
                        <Divider />
                        <Row gutter={24}>
                            <Col span={24}>
                                <Text strong>Image:</Text>
                                <Row gutter={16}>
                                    {(medicine?.image as any).map((url: string, index: number) => (
                                        <Col span={8} key={index}>
                                            <Image
                                                src={`${configData.s3baseURL}${url}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                preview={true}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </>
                ) : <></>}
            </div>
        </Modal>
    );
};

export default MedicineModal;
