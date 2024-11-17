// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';
import IImage from '../src/data/iimage';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Photo-Service worker', () => {
	it('responds with Welcome message (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Welcome to Photo Service!"`);
	});

	it('responds with 404 status code when an invalid path is requested', async () => {
		const response = await SELF.fetch('https://example.com/invalid-path');
		expect(response.status).toEqual(404);
	});

	it('responds with Welcome message (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toMatchInlineSnapshot(`"Welcome to Photo Service!"`);
	});

	describe("GET /images", () => {
		it("should return 200 status code", async () => {
			const response = await SELF.fetch("https://example.com/images");
			expect(response.status).toEqual(200);
		});
		it("should return images size equal to count query param", async () => {
			const response = await SELF.fetch("https://example.com/images?count=2");
			const images : IImage[] = await response.json();
			expect(images.length).toEqual(2);
		});
		it("should return all images", async () => {
			const response = await SELF.fetch("https://example.com/images");
			const images : IImage[] = await response.json();
			expect(images.length).toEqual(3);
		});
		it("should return images containing an image with id 1", async () => {
			const response = await SELF.fetch("https://example.com/images");
			const images : IImage[] = await response.json();
			expect(images.find(image => image.id == 1)).not.toBeNull();
		});
	});

	describe("GET /images/:id", () => {
		it("should return an image with id 1", async () => {
			const response = await SELF.fetch("https://example.com/images/1");
			const image : IImage = await response.json();
			expect(image.id).toEqual(1);
		});
	});
});
