import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    setErro("");
    setCarregando(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        setErro("E-mail ou senha inválidos.");
        return;
      }

      onLogin?.(data.user);
    } catch (err) {
      console.error(err);
      setErro("Não foi possível fazer login.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">PSIFWEB</h1>
        <p className="login-subtitle">Acesso da Psicopedagoga</p>

        <form onSubmit={handleSubmit}>
          <label>E-mail institucional</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@ifpb.edu.br"
          />

          <label>Senha</label>

          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
          />

          {erro && <p className="login-erro">{erro}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}