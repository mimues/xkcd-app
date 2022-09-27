import algoliasearch from "algoliasearch/lite";

const client = algoliasearch(process.env.APP_ID, process.env.API_KEY);
const index = client.initIndex("prod_comics");

//caché guarra midu
const CACHE = {};

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] };

  const { hits } = await index.search(query, {
    attributesToRetrieve: ["id", "title", "img", "alt"],
    hitsPerPage: 10,
  });

  CACHE[query] = hits;

  return { results: hits };
};
