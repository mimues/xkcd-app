import { Layout } from "components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { search } from "services/search";
import { useI18N } from "context/i18n.js";

export default function Search({ query, results }) {
  const { t } = useI18N();

  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>

      <Layout>
        <h1>
          {t('SEARCH_RESULTS_TITLE', results?.length, query)}
        </h1>
        {results.map((result) => (
          <Link href={`/comic/${result.id}`} key={result.id}>
            <a className="bg-slate-300 hover:bg-slate-50 flex flex-row justify-start content-center">
              <Image
                width={50}
                height={50}
                src={result.img}
                alt={result.alt}
                className="rounded-full"
              />

              <h2>{result.title}</h2>
            </a>
          </Link>
        ))}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const { results } = await search({ query: q });
  // ESTO ES UNA MALA PRÁCTICA
  //   const results = await fetch('https://localhost:3000/api/search?q=' + q).then(
  //     (res) => res.json()
  //   );

  return {
    props: {
      query: q,
      results
    },
  };
}
