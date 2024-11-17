import { IRequest } from "itty-router";
import IImage from "../data/iimage";
import { Env } from "../env";

const createImage = async function(request: IRequest, env: Env) {
    const imageFromRequest : IImage = await request.json();
    try {
        env.DB
            .prepare(`INSERT INTO images (category_id, user_id, image_url, title, format, resolution, file_size_bytes) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`)
            .bind(
                imageFromRequest.category_id, 
                imageFromRequest.user_id, 
                imageFromRequest.image_url, 
                imageFromRequest.title, 
                imageFromRequest.format, 
                imageFromRequest.resolution, 
                imageFromRequest.file_size_bytes)
            .run();
    } catch (e) {
        let message;
        if (e instanceof Error) {
            message = e.message;
        }
        console.log({message: message});
        return new Response('Error', { status: 500 });
    }
    return new Response(JSON.stringify(imageFromRequest), { headers: { "content-type": "application/json" }, status: 201 });
}

export default createImage;