import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children }) {
  return (
    <>
      <Header />

      <main className="max-w-xl m-auto p-4">{children}</main>

      <Footer />
    </>
  );
}
