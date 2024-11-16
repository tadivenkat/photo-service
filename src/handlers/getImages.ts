import { IRequest } from "itty-router";
import images from "../data/images";

const getImages = (request: IRequest) => {
    let imagesCopy = images;
    const count = request.query["count"]
    if (count) {
        imagesCopy = imagesCopy.slice(0, parseInt(count[0]));
    }
    return new Response(JSON.stringify(imagesCopy), { headers: { "content-type": "application/json" }, status: 200 });
}

export default getImages;