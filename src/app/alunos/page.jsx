"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./Alunos.css";

const cursosConfig = {
  "Informática": {
    unidade: "série",
    opcoes: ["1ª série", "2ª série", "3ª série"],
    temTurmaAB: false,
  },
  "Energias Renováveis": {
    unidade: "série",
    opcoes: ["1ª série", "2ª série", "3ª série"],
    temTurmaAB: true,
  },
  "ADS": {
    unidade: "período",
    opcoes: ["1º período", "2º período", "3º período", "4º período", "5º período", "6º período"],
    temTurmaAB: false,
  },
};

export default function Alunos() {
  const [busca, setBusca] = useState("");
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [serieSelecionada, setSerieSelecionada] = useState(null);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [alunos, setAlunos] = useState([]);

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const APIKEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // remove barra final e "/rest/v1" caso já estejam na variável de ambiente
  const SUPABASE_BASE = SUPABASE_URL?.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

  const buscarAlunos = async () => {
    try {
      const response = await fetch(`${SUPABASE_BASE}/rest/v1/alunos?select=*`, {
        headers: {
          apikey: APIKEY,
          Authorization: `Bearer ${APIKEY}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro ao buscar alunos:", data);
        setAlunos([]);
        return;
      }

      if (!Array.isArray(data)) {
        console.error("Resposta inesperada da API:", data);
        setAlunos([]);
        return;
      }

      setAlunos(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      setAlunos([]);
    }
  };

  useEffect(() => {
    buscarAlunos();
  }, []);

  const cursos = Object.keys(cursosConfig);
  const configAtual = cursoSelecionado ? cursosConfig[cursoSelecionado] : null;

  const turmaCompleta =
    serieSelecionada &&
    (configAtual?.temTurmaAB
      ? turmaSelecionada && `${serieSelecionada} ${turmaSelecionada}`
      : serieSelecionada);

  const alunosFiltrados = (Array.isArray(alunos) ? alunos : []).filter((a) => {
    const bateBusca = a.nome.toLowerCase().includes(busca.toLowerCase());
    const bateCurso = !cursoSelecionado || a.curso === cursoSelecionado;
    const bateTurma = !turmaCompleta || a.turma === turmaCompleta;
    return bateBusca && bateCurso && bateTurma;
  });

  function voltar() {
    if (turmaSelecionada) {
      setTurmaSelecionada(null);
    } else if (serieSelecionada) {
      setSerieSelecionada(null);
    } else if (cursoSelecionado) {
      setCursoSelecionado(null);
    }
  }

  return (
    <div className="alunos">
      <h1>Meus alunos</h1>

      <input
        className="alunos-busca"
        placeholder="Pesquisar aluno..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {(cursoSelecionado || busca) && (
        <div className="alunos-caminho">
          {cursoSelecionado && (
            <button className="voltar-btn" onClick={voltar}>← Voltar</button>
          )}
          {cursoSelecionado && <span className="caminho-texto">{cursoSelecionado}</span>}
          {serieSelecionada && <span className="caminho-texto">/ {serieSelecionada}</span>}
          {turmaSelecionada && <span className="caminho-texto">/ Turma {turmaSelecionada}</span>}
        </div>
      )}

      {!cursoSelecionado && (
        <div className="alunos-filtros">
          {cursos.map((c) => (
            <button key={c} onClick={() => setCursoSelecionado(c)}>
              {c}
            </button>
          ))}
        </div>
      )}

      {cursoSelecionado && !serieSelecionada && (
        <div className="alunos-filtros">
          {configAtual.opcoes.map((s) => (
            <button key={s} onClick={() => setSerieSelecionada(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {cursoSelecionado && serieSelecionada && configAtual.temTurmaAB && !turmaSelecionada && (
        <div className="alunos-filtros">
          {["A", "B"].map((t) => (
            <button key={t} onClick={() => setTurmaSelecionada(t)}>
              Turma {t}
            </button>
          ))}
        </div>
      )}

      {(busca || (cursoSelecionado && serieSelecionada && (!configAtual.temTurmaAB || turmaSelecionada))) && (
        <div className="alunos-lista">
          {alunosFiltrados.length === 0 && (
            <p className="alunos-vazio">Nenhum aluno encontrado.</p>
          )}
          {alunosFiltrados.map((aluno) => (
            <Link href={`/alunos/${aluno.id}`} key={aluno.id} className="aluno-card">
              <div className="aluno-avatar">{aluno.nome[0]}</div>
              <div>
                <strong>{aluno.nome}</strong>
                <p>{aluno.curso} · {aluno.turma}</p>
                <span className="aluno-situacao">{aluno.situacao}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}