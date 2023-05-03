import { urls } from "../utils/api_url"

export const getAllDoctorData = async() => {
    return await fetch(urls.baseUrl, {
        method: 'GET',
    });
}