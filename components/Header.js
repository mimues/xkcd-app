import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

export const Header = () => {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const { locale, locales } = useRouter();

  let q = searchRef.current?.value;
  // const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    // const q = getValue();
    q = searchRef.current?.value;
    if (!q) return;

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults);
      });
  };

  const restOfLocales = locales.filter((l) => l !== locale);

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="font-bold">
        <Link href="/">
          <a className="transition hover:opacity-80">
            next<span className="font-light">xkcd</span>
          </a>
        </Link>
      </h1>
      <nav className="flex items-center">
        <ul className="flex justify-between gap-2 items-center">
          <li className="mb-0">
            <input
              className="border border-gray-400 rounded-md px-4 py-2 text-xs"
              ref={searchRef}
              type="search"
              onChange={handleChange}
            ></input>
            <div className="relative">
              {Boolean(results.length) && (
                <div className="absolute top-0 left-0 z-10 bg-slate-50">
                  <ul className="w-full border overflow-hidden rounded-lg shadow-lg border-gray-50">
                    <li key="all-results">
                      <Link href={`/search?q=${q}`}>
                        <a className="px-2 py-1 m-0 block text-sm font-semibold hover:bg-slate-200 italic text-gray-300">
                          Ver {results.length} resultados
                        </a>
                      </Link>
                    </li>
                    {results.map((result) => (
                      <li key={result.id}>
                        <Link href={`/comic/${result.id}`}>
                          <a className="px-2 py-1 m-0 block text-sm font-semibold hover:bg-slate-200">
                            {result.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>

          <li className="mb-0">
            <Link href='/' locale={restOfLocales[0]}>
              <a className="text-sm font-bold border rounded-lg p-2 border-gray-400 uppercase">{restOfLocales[0]}</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
