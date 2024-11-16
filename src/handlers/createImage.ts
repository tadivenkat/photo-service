import { IRequest } from "itty-router";
import images from "../data/images";
import IImage from "../data/image";

const createImage = async function(request: IRequest) {
    const imageFromRequest : IImage = await request.json();
    const newImage : IImage = {"id": images.length + 1, "url": imageFromRequest.url, "author": imageFromRequest.author};
    images.push(newImage);
    return new Response(JSON.stringify(newImage), { headers: { "content-type": "application/json" }, status: 201 });
}

export default createImage;