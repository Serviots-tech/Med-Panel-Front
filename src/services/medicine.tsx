/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { configData } from '../helpers/config';

// Set base URL for API
const API_URL = configData.baseURL;

// Get all medicines with pagination
export const getMedicines = async (query: any) => {
    try {
        // Pass the page and limit as query parameters to the backend API
        const response = await axios.get(`${API_URL}/medicines/get-all`, {
            params: {
                page: query?.currentPage,
                limit: query?.pageSize,
                targetField:query?.targetField,
                search:query?.search,
                userId:query?.userId,
                selectedDate:query?.selectedDate,
                sorterField:query?.sorterField,
                sorterValue:query?.sorterValue
            },
            headers: {
				Authorization: `bearer ${localStorage.getItem('accessToken')}`,
            }
        });
        return {
            data: response.data.data,
            pagination: response.data.pagination,
        };
    } catch (error) {
        // console.error("Error fetching medicines:", error);
        // throw new Error("Unable to fetch medicines");
    }
};


// Get a single medicine by ID
export const getMedicineById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/medicines/${id}`,
            {
                headers: {
                    Authorization: `bearer ${localStorage.getItem('accessToken')}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        // Log the error and handle appropriately
        console.error(`Error fetching medicine with ID ${id}:`, error);
        throw new Error(`Unable to fetch medicine with ID: ${id}`);
    }
};

// Create a new medicine
export const createMedicine = async (medicineData: any) => {

        const response = await axios.post(`${API_URL}/medicines/add`, medicineData,{
            headers: {
                'Content-Type': 'multipart/form-data',
				Authorization: `bearer ${localStorage.getItem('accessToken')}`,
            }
        });
        return response.data;

};

// Update an existing medicine
export const updateMedicine = async (id: string, medicineData: any) => {

        const response = await axios.put(`${API_URL}/medicines/${id}`, medicineData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        console.log('Medicine updated successfully', response.data);
        return response.data;
    
};

// Delete a medicine
export const deleteMedicine = async (id: string): Promise<boolean> => {
    try {
        const response = await axios.delete(`${API_URL}/medicines/${id}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error deleting medicine:", error);
        return false;
    }
};
