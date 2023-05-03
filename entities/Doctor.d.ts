import { hospital } from "./Hospital"

export type Doctor = {
    doctor_id: string,
    name: string,
    slug: string,
    is_popular: boolean,
    about: string,
    overview: string,
    photo: {
        size_formatted: string,
        url: string,
        formats: {
            thumbnail: string,
            large: string,
            medium: string,
            small: string,
        }
    },
    sip: string,
    experience: string,
    price: {
        raw: number,
        formatted: string,
    },
    specialization: {
        id: string,
        name: string,
    },
    hospital: hospital[],
    about_preview: string,
}