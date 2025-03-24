/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { TablePaginationConfig } from 'antd';
import { getApi } from '../../apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UsersTable from './Table/UserTable';
// import { FilterValue, SorterResult } from 'antd/es/table/interface';

const UsersListPage: React.FC = () => {
    const [usersData, setUsersData] = useState<any>([]);

    const navigate= useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(false)


    // Fetching the list of doseForm
    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const query = {
                currentPage,
                pageSize
            }
            const response = await getApi('/user/get-all',query);
            console.log("🚀 ~ fetchDoseForms ~ response:", response)
            setUsersData((response?.data as any)?.data?.data);
            setCurrentPage(1)
            setTotalRecords((response?.data as any)?.data?.data?.total)

        } catch (error: any) {
            console.error("Error fetching doseForm:", error);
            toast.error(error.message || "Fail to fetch dose")
        }
        finally {
            setIsLoading(false)
        }
    };

    // Fetch the doseForm when the component is mounted or when page/pageSize changes
    useEffect(() => {
        fetchUsers();
    }, [currentPage, pageSize]);



    // Handle page change
    const handlePageChange = (pagination: TablePaginationConfig,
        // filters: Record<string, FilterValue | null>,
        // sorter: SorterResult<DoseForm>[],
    ) => {
        setCurrentPage(pagination?.current as number)
        setTotalRecords(pagination?.total as number)
        setpageSize(pagination?.pageSize as number)
    };

    return (
        <div className="max-w-8xl m-12 p-5">
            <div className="flex items-center">
                <button
                    className="flex text-3xl items-center text-blue-500 font-bold hover:text-blue-700"
                    onClick={() => navigate(-1)} // Assuming you're using React Router's `navigate`
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <h1 className="text-3xl font-bold text-center flex-1">All DoseForm List</h1>
            </div>
            <hr className='mt-5' />
            <div>
                <UsersTable
                    usersData={usersData}
                    isLoading={isLoading}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalRecords={totalRecords}
                    pagesize={pageSize}
                    fetchUsers={fetchUsers}
                />
            </div>
        </div>
    );
};

export default UsersListPage;
