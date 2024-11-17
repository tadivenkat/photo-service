import { IRequest } from "itty-router";
import { Env } from "../env";

const getmage = async (request: IRequest, env: Env) => {
    const id = request.params.id;
    let result;
    try {
        result = await env.DB.prepare(`
                SELECT i.*, c.display_name AS category
                FROM images i
                INNER JOIN image_categories c ON i.category_id = c.id
                WHERE i.id = ?1`)
            .bind(id)
            .first();
    } catch (e) {
        let message;
        if (e instanceof Error) {
            message = e.message;
        }
        console.log({message: message});
        return new Response('Error', { status: 500 });
    }
    if (!result) {
        return new Response('There was a problem retrieving image with id: ' + id, { status: 500 });
    }
    return new Response(JSON.stringify(result), {headers: { 'Content-type': 'application/json' }, status: 200});
}

export default getmage;