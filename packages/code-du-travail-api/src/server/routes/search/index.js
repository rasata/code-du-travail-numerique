const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSearchBody = require("./search.elastic");
const getSavedResult = require("./search.getSavedResult");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const MAX_RESULTS = 10;

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/search?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.excludeSources A `excludeSources` querystring param containing the sources (comma separatied list) to exclude from the results
 * @param {string} querystring.skipSavedResults A `skipSavedResults` querystring param indicates that we skip the savedResults search
 * @returns {Object} Results.
 */
router.get("/search", async ctx => {
  const query = ctx.request.query.q;
  const skipSavedResults =
    Boolean(ctx.request.query.skipSavedResults) ||
    ctx.request.query.skipSavedResults === "";
  const excludeSources = (ctx.request.query.excludeSources || "").split(",");

  // shortcut ES if we find a known query
  const knownQueryResult =
    !skipSavedResults && getSavedResult(query, excludeSources);

  if (knownQueryResult) {
    ctx.body = knownQueryResult;
    return;
  }

  const size = Math.min(ctx.request.query.size || MAX_RESULTS, 100);
  const body = getSearchBody({ query, size, excludeSources });

  // query data
  const response = await elasticsearchClient.search({ index, body });

  ctx.body = response.body.hits.hits;
});

module.exports = router;
