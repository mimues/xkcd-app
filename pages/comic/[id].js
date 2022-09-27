import React from "react";
import Head from "next/head";
import Image from "next/image";
import fs, { stat } from "fs/promises";
import Link from "next/link";
import { basename } from "path";
import { Layout } from "components/Layout";

export default function Comic({
  img,
  alt,
  title,
  width,
  height,
  prevId,
  nextId,
  hasPrevious,
  hasNext,
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <section className="max-w-lg m-auto">
          <h1 className="font-bold mb-2 text-xl text-center">{title}</h1>
          <div className="max-w-xs m-auto mb-2">
            <Image
              layout="responsive"
              width={width}
              height={height}
              src={img}
              alt={alt}
            />
          </div>
          <p>{alt}</p>

          {/* Pagination */}
          <div className="flex justify-between mt-4 font-bold ">
            {hasPrevious && (
              <Link href={`/comic/${prevId}`}>
                <a className="text-gray-600">⬅ Previous</a>
              </Link>
            )}
            {hasNext && (
              <Link href={`/comic/${nextId}`}>
                <a className="text-gray-600">Next ➡</a>
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths({ locales }) {
  const files = await fs.readdir("./comics");
  let paths = []

  // locales -> ['en', 'es']
  locales.forEach(locale => {
    paths = paths.concat(files.map((file) => {
      const id = basename(file, ".json");
      return { params: { id }, locale };
    }))
  })

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await fs.readFile(`./comics/${id}.json`, "utf8");
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  //check the existence of files
  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = (prevResult.status = "fulfilled");
  const hasNext = (nextResult.status = "fulfilled");

  //se podría hacer también así directamente con la api, pero haríamos 2500 fetch y dependeríamos de la api
  // const res = await fetch(`https://xkcd.com/${id}/info.0.json`)
  // const json = await res.json()
  // console.log(json)

  // const files = await fs.readdir('./comics')
  // const latestComicsFiles = files.slice(-12)

  // const promisesReadFiles = latestComicsFiles.map(async (file) => {
  //   const content = await fs.readFile(`./comics/${file}`, 'utf-8')
  //   return JSON.parse(content)
  // })

  // const latestComics = await Promise.all(promisesReadFiles)
  // console.log(latestComics)

  return {
    props: {
      ...comic,
      prevId,
      nextId,
      hasPrevious,
      hasNext,
    },
  };
}
