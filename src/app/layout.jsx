"use client";

import { useState } from "react";
import Login from "../components/Login";
import Layout from "../components/Layout";
//import "./globals.css";

const estiloFonte = `
  * {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
  }
`;

export default function RootLayout({ children }) {
  const [usuario, setUsuario] = useState(null);

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: estiloFonte }} />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}