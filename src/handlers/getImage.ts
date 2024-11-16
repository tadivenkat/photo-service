import { IRequest } from "itty-router";
import images from "../data/images";

export default function getImage(request: IRequest) {
    const id = request.params.id;
    const image = images.find(image => image.id == parseInt(id));
    if (image) {
        return new Response(JSON.stringify(image), { headers: { "content-type": "application/json" }, status: 200 });
    }
    return new Response("Image not found", { status: 404 });
}