/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react';
import { Modal, Input, Form, Button } from 'antd';
import { toast } from 'react-toastify';
import { postApi } from '../../apis';

const AddUserModal = ({ isAddUserModelOpen, setIsAddUserModelOpen,fetchUsers }: { isAddUserModelOpen: boolean, setIsAddUserModelOpen: any,fetchUsers :any }) => {

    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setIsAddUserModelOpen(false);
    };

    const handleSubmit = async (values: any) => {


        try {
            setLoading(true);
            await postApi(`/user/create-user`,{...values,role:"USER"});
            fetchUsers()
            toast.success("User logged in successfully");
        }
        catch (e: any) {
            console.log("🚀 ~ handleSubmit ~ e:", e)
            toast.error(e?.response?.data?.message || "Fail to create user,try again..")
        }
        finally {
            setLoading(false);
        }
        setIsAddUserModelOpen(false); // Close modal after submit
    };

    return (
        <Modal
            title="Add User"
            visible={isAddUserModelOpen}
            onCancel={handleCancel}
            footer={null}
            className="modal-container"
        >
            <Form
                onFinish={handleSubmit}
                layout="vertical"
                className="space-y-4"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please enter the user name' },
                    ]}
                >
                    <Input
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Enter name"
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter a valid email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Enter email"
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please enter a password' },
                        { min: 6, message: 'Password must be at least 6 characters' },
                    ]}
                >
                    <Input.Password
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Enter password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        loading={loading}
                        htmlType="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserModal;
