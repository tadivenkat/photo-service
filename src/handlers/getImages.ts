import { IRequest } from "itty-router";

export default function getImages(request: IRequest) {
    let images = [
        {
            "id": 1,
            "url": "https://photos.google.com/1",
            "author": "John Doe"
        },
        {
            "id": 2,
            "url": "https://photos.google.com/2",
            "author": "Venkat"
        },
        {
            "id": 3,
            "url": "https://photos.google.com/3",
            "author": "Santhi"
        }
    ]
    const count = request.query["count"]
    if (count) {
        images = images.slice(0, parseInt(count[0]));
    }
    return new Response(JSON.stringify(images), { headers: { "content-type": "application/json" }, status: 200 });
}