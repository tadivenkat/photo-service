/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Router } from "itty-router";

const router = Router();
router.get("/", () => new Response("Welcome to Photo Service!", { status: 200 }))
	.get("/ping", () => new Response("pong", { status: 200 }))
	.get("*", () => new Response("Not found", { status: 404 }));

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return router.fetch(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
