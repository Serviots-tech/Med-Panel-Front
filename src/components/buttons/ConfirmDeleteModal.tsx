import { ExclamationCircleOutlined } from '@ant-design/icons';

import React from 'react';
import { Modal } from 'antd';

interface ConfirmDeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    medicineName: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onClose, onConfirm, medicineName }) => {
    return (
        <Modal
            title="Are you sure?"
            visible={open}
            onCancel={onClose}
            onOk={onConfirm}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
        >
            <div className="flex justify-center mb-4">
                <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
            </div>
            <p>
                Are you sure you want to permanently delete the medicine <strong>{medicineName}</strong> from your list?
                This action cannot be undone and the data will be lost forever.
            </p>
        </Modal>
    );
};

export default ConfirmDeleteModal;
