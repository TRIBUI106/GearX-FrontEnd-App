import { apiService } from "./axiosConfig";

// Upload single or multiple files
export const uploadMediaApi = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });
    
    return await apiService.post("media/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
