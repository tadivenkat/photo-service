import { IRequest } from "itty-router";

export default function getImages(request: IRequest) {
    const images = [
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
    return new Response(JSON.stringify(images), { headers: { "content-type": "application/json" }, status: 200 });
}