/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getMedicines, deleteMedicine } from '../services/medicine';
import { Medicine } from '../types/medicine';
import MedicineTable from '../components/MedicineTable';
import MedicineModal from '../components/MedicineModal';
import { TablePaginationConfig } from 'antd';
import { getApi } from '../apis';
import dayjs from 'dayjs';

const MedicineListPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [doseFormData, setDoseFormData] = useState<any>()
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [selectedField,setSelectedField]= useState('medicineName')
    const [selectedUser,setSelectedUser]= useState(null)
    // const [selectDate,setSelectedDate]=useState(dayjs())
    const [selectDate, setSelectedDate] = useState(dayjs().startOf("day"));
    const [userOptions, setUserOptions] = useState<any>()

    const debounceDelay = 700;

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedSearch(searchValue);
        }, debounceDelay);
      
        return () => clearTimeout(handler);
      }, [searchValue]);
      

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const fetchMedicines = async () => {
        try {
            setIsLoading(true)
            const query = {
                currentPage,
                pageSize,
                search: searchValue,
                targetField: selectedField,
                userId:selectedUser ?? null,
                selectedDate:selectDate?? null,
            }
            
            const response = await getMedicines(query);

            if (response && Array.isArray(response.data)) {
                setMedicines(response.data);
                setCurrentPage(response?.pagination?.page)
                setTotalRecords(response?.pagination?.totalRecords)
            } else {
                setMedicines([]);
                setCurrentPage(1)
                setTotalRecords(0)
            }
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
        finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, [currentPage, pageSize, debouncedSearch,selectedUser,selectDate,selectedField]);


    const handleViewDetails = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedicine(null);
    };

    useEffect(() => {
        fetchDoseForms()
        fetchUsersData()
    }, [])

    const fetchDoseForms = async () => {
        try {
            const doseFoemData = await getApi('/dose-form/get-all')
            setDoseFormData(doseFoemData?.data?.data?.data?.data)
        }
        catch (error: any) {
            console.log("🚀 ~ fetchDoseForms ~ error:", error)
            
        }
    }
    const fetchUsersData = async () => {
        try {
            const userData:any = await getApi('/user/get-all')
            const userOptionsData=userData?.data?.data?.map((item:any) => ({
                label: item.name,
                value: item.id
            }));
            setUserOptions(userOptionsData)
        }
        catch (error: any) {
            console.log("🚀 ~ fetchDoseForms ~ error:", error)
        }
    }

    // Handle deleting a medicine
    const handleDelete = async (medicine: Medicine) => {
        try {
            const isDeleted = await deleteMedicine(medicine.id);
            if (isDeleted) {
                setMedicines(medicines.filter(med => med.id !== medicine.id));
            }
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
    };

    // Handle page change
    const handlePageChange = (pagination: TablePaginationConfig,
    ) => {
        setCurrentPage(pagination?.current as number)
        setTotalRecords(pagination?.total as number)
        setpageSize(pagination?.pageSize as number)
    };

    return (
        <div className="max-w-8xl m-12 p-5">
            <h1 className="text-3xl font-bold text-center">All Medicine List</h1>
            <hr className='mt-5' />
            <div>
                <MedicineTable
                    medicines={medicines}
                    isLoading={isLoading}
                    onViewDetails={handleViewDetails}
                    onDelete={handleDelete}
                    onAddNew={() => console.log("Add new medicine clicked")}
                    setMedicines={setMedicines}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalRecords={totalRecords}
                    pagesize={pageSize}
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                    setSelectedField={setSelectedField}
                    selectedField={selectedField}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    userOptions={userOptions}
                    setSelectedDate={setSelectedDate}
                    seletedDate={selectDate}
                    setDebouncedSearch={setDebouncedSearch}
                    setSearchValue={setSearchValue}
                />

                {/* Modal for Medicine Details */}
                {isModalOpen && selectedMedicine && (
                    <MedicineModal
                        medicine={selectedMedicine}
                        onClose={closeModal}
                        doseFormData={doseFormData}
                    />
                )}
            </div>
        </div>
    );
};

export default MedicineListPage;
