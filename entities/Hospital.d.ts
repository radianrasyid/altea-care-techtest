export type Hospital = {
    id: string,
    name: string,
    image: {
        size_formatted: string,
        url: string,
        formats: {
            thumbnail: string,
            large: string,
            medium: string,
            small: string,
        },
    },
    icon: {
        size_formatted: string,
        url: string,
        formats: {
            thumbnail: string,
            large: string,
            medium: string,
            small: string,
        },
    },
}