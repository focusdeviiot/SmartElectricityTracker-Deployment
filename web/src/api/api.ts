import apiClient from "./axios";
import { Response } from '../models/response';

export const getMasterDevice = async (): Promise<Response> => {
    try {
        const response = await apiClient.get<Response>('devices',{});
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export const getDeviceByUserID = async (): Promise<Response> => {
    try {
        const response = await apiClient.get<Response>('devices-byuser',{});
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export const getReportDeviceVolt = async (data): Promise<Response> => {
    try {
        const response = await apiClient.post<Response>('reports_volt', { ...data });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export const getReportDeviceAmpere = async (data): Promise<Response> => {
    try {
        const response = await apiClient.post<Response>('reports_ampere', { ...data });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}


export const getReportDeviceWatt = async (data): Promise<Response> => {
    try {
        const response = await apiClient.post<Response>('reports_watt', { ...data });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}


export const getUsersCountDevice = async (data): Promise<Response> => {
    try {
        const response = await apiClient.post<Response>('admin/users-count-device', { ...data });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const getUsersDeviceByUserID = async (data): Promise<Response> => {
    try {
        const response = await apiClient.get<Response>('admin/users-device', {
            params: { ...data }
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export const createUser = async (data): Promise<Response> => {
    try {
        const response = await apiClient.post<Response>('admin/user', { ...data });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export const updateUser = async (data): Promise<Response> => {
    try {
        const response = await apiClient.put<Response>('admin/user', { ...data });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export const deleteUser = async (data): Promise<Response> => {
    try {
        const response = await apiClient.delete<Response>('admin/user', {
            params: { ...data }
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export const getUserByUserId = async (data): Promise<Response> => {
    try {
        const response = await apiClient.get<Response>('admin/user', {
            params: { ...data }
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export const updateUserDevice = async (data): Promise<Response> => {
    try {
        const response = await apiClient.put<Response>('admin/users-device', { ...data });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

