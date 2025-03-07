import router from "../stats";

const request = require("supertest");
const Koa = require("koa");
const fetch = require("node-fetch-commonjs");

const app = new Koa();
app.use(router.routes());

jest.mock("node-fetch-commonjs");

describe("Stats", () => {
  it("should return data", async () => {
    fetch.mockImplementation(async (url: string) => {
      if (url.includes("VisitsSummary.getVisits")) {
        return Promise.resolve({
          json: () => ({ value: 20 }),
        });
      }
      if (url.includes("Actions.get")) {
        return Promise.resolve({
          json: () => ({ nb_pageviews: 10, nb_searches: 4 }),
        });
      }
      if (url.includes("Events.getAction")) {
        return Promise.resolve({
          json: () => [
            { label: "positive", nb_events: 3 },
            { label: "negative", nb_events: 2 },
          ],
        });
      }
      return Promise.reject("unkown url");
    });
    const response = await request(app.callback()).get(`/api/v1/stats`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "nbDocuments": 25,
        "nbPageViews": 10,
        "nbSearches": 4,
        "nbVisits": 20,
      }
    `);
    expect(response.ok).toBe(true);
  });

  it("should render an error", async () => {
    fetch.mockImplementation(async () => {
      return Promise.reject("MATOMO IS DOWN");
    });
    const response = await request(app.callback()).get(`/api/v1/stats`);
    expect(response.status).toBe(502);
    expect(response.body).toStrictEqual({});
    expect(response.ok).toBe(false);
  });
});
