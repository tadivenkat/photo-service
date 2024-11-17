interface IImage {
    id?: number;
    category_id: number;
    user_id: number;
    image_url: string;
    title: string;
    format: string;
    resolution: string;
    file_size_bytes: number;
}

export default IImage;