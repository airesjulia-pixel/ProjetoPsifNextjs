"use client";

import { useState } from "react";
import Login from "../components/Login";
import Layout from "../components/Layout";
//import "./globals.css";

export default function RootLayout({ children }) {
  const [usuario, setUsuario] = useState(null);

  if (usuario) {
    return (
      <html lang="pt-BR">
        <body>
          <Login onLogin={(user) => setUsuario(user)} />
        </body>
      </html>
    );
  }

  return (
    <html lang="pt-BR">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}