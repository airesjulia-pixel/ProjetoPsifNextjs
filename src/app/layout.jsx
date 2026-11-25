"use client";

import { usePathname } from "next/navigation";
import Layout from "../components/Layout"; // Mantém o seu componente de layout original

const estiloFonte = `
* {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
  }
`;

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname?.startsWith("/login");

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
        {isLoginPage ? (
          // Se for /login: mostra APENAS a tela de login (sem a barra lateral)
          <main>{children}</main>
        ) : (
          // Se for qualquer outra página: usa o seu Layout com a barra lateral
          <Layout>
            {children}
          </Layout>
        )}
      </body>
    </html>
  );
}