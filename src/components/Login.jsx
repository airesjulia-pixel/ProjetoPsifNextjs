"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase"; // Verifique se o caminho do seu client supabase está correto

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede a página de recarregar do zero
    setCarregando(true);
    setErro("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErro("E-mail ou senha incorretos.");
        setCarregando(false);
        return;
      }

      // Login bem-sucedido! Força o redirecionamento para a raiz
      window.location.href = "/";
    } catch (err) {
      console.error("Erro no login:", err);
      setErro("Ocorreu um erro ao tentar entrar.");
      setCarregando(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2 style={styles.title}>PSIFWEB</h2>
        <p style={styles.subtitle}>Acesso da Psicopedagoga</p>

        {erro && <div style={styles.errorBox}>{erro}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>E-mail institucional</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@ifpb.edu.br"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            style={styles.input}
          />
        </div>

        <button 
          type="submit" 
          disabled={carregando} 
          style={styles.button}
        >
          {carregando ? "A entrar..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1a3b5c", // Fundo azul igual ao seu print
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#1a3b5c",
    textAlign: "center",
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#64748b",
    textAlign: "center",
    marginBottom: "24px",
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "16px",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1a3b5c",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
};