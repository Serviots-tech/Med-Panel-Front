/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Medicine } from '../types/medicine';
// import { XMarkIcon } from '@heroicons/react/16/solid';
import { Modal, Row, Col, Typography, Divider } from 'antd';
import { Image } from 'antd';
import { configData } from '../helpers/config';

const { Text } = Typography;

interface MedicineModalProps {
    medicine: Medicine | null;
    onClose: () => void;
    doseFormData: any
}

const MedicineModal: React.FC<MedicineModalProps> = ({ medicine, onClose, doseFormData }) => {
    if (!medicine) return null;

    const getDoseFormName = (doseFormId: string) => {
        const matchedItem = doseFormData.find((item: any) => item.id === doseFormId);
        return matchedItem ? matchedItem.name : "Unknown";
    };

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
                        <Text strong>Brand Name :- </Text>
                        <Text>{medicine.brandName}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Price :- </Text>
                        <Text>{medicine.price}</Text>
                    </Col>
                </Row>
                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Generic Name :- </Text>
                        <Text>{medicine.productType}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Unit :- </Text>
                        <Text>{medicine.unitType}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Dosage Form :- </Text>
                        <Text>{getDoseFormName(medicine.doseFormId)}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>NDC :- </Text>
                        <Text>{medicine.ndc}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Strength :- </Text>
                        <Text>{medicine.weightage}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Manufacturer :- </Text>
                        <Text>{medicine.manufacturer}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Pack Size :- </Text>
                        <Text>{medicine.packSize}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Route of Administration :- </Text>
                        <Text>{medicine.routeOfAdministration}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Side Effects :- </Text>
                        <Text>{medicine.sideEffects}</Text>
                    </Col>

                    <Col span={8}>
                        <Text strong>Prescription Required :- </Text>
                        <Text>{medicine.prescriptionReq}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Barcode SKU :- </Text>
                        <Text>{medicine.barcodeSKU}</Text>
                    </Col>

                    <Col span={8}>
                        <Text strong>Schedule Type :- </Text>
                        <Text>{medicine.scheduleType}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>GST Percentage :- </Text>
                        <Text>{medicine.gstPercentage}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    {medicine?.image?.length && (
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
                    )}
                </Row>
            </div>
        </Modal>
    );
};

export default MedicineModal;
