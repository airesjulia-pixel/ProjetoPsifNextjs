"use client"; 

import { useState } from "react";
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

const alunosMock = [
  { id: 1, nome: "Anitta Peniwyse", curso: "Informática", turma: "3ª série", situacao: "Em acompanhamento" },
  { id: 2, nome: "José", curso: "Informática", turma: "3ª série", situacao: "Em acompanhamento" },
  { id: 3, nome: "Valquíria", curso: "Energias Renováveis", turma: "2ª série A", situacao: "Em acompanhamento" },
  { id: 4, nome: "Maria Eduarda", curso: "Energias Renováveis", turma: "1ª série B", situacao: "Alta" },
  { id: 5, nome: "Rafael", curso: "ADS", turma: "4º período", situacao: "Em acompanhamento" },
];

export default function Alunos() {
  const [busca, setBusca] = useState("");
  const [cursoSelecionado, setCursoSelecionado] = useState(null); // ex: "Informática"
  const [serieSelecionada, setSerieSelecionada] = useState(null); // ex: "1ª série" ou "1º período"
  const [turmaSelecionada, setTurmaSelecionada] = useState(null); // ex: "A" ou "B"

  const cursos = Object.keys(cursosConfig);
  const configAtual = cursoSelecionado ? cursosConfig[cursoSelecionado] : null;

  // monta o nome final da turma pra comparar com o mock (ex: "2ª série A")
  const turmaCompleta =
    serieSelecionada && (configAtual?.temTurmaAB ? turmaSelecionada && `${serieSelecionada} ${turmaSelecionada}` : serieSelecionada);

  const alunosFiltrados = alunosMock.filter((a) => {
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

      {/* Breadcrumb / caminho atual */}
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

      {/* Nível 1: escolher o curso */}
      {!cursoSelecionado && (
        <div className="alunos-filtros">
          {cursos.map((c) => (
            <button key={c} onClick={() => setCursoSelecionado(c)}>
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Nível 2: escolher a série/período dentro do curso */}
      {cursoSelecionado && !serieSelecionada && (
        <div className="alunos-filtros">
          {configAtual.opcoes.map((s) => (
            <button key={s} onClick={() => setSerieSelecionada(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Nível 3: escolher turma A/B (só quando o curso tem) */}
      {cursoSelecionado && serieSelecionada && configAtual.temTurmaAB && !turmaSelecionada && (
        <div className="alunos-filtros">
          {["A", "B"].map((t) => (
            <button key={t} onClick={() => setTurmaSelecionada(t)}>
              Turma {t}
            </button>
          ))}
        </div>
      )}

      {/* Lista de alunos */}
      {(busca || (cursoSelecionado && serieSelecionada && (!configAtual.temTurmaAB || turmaSelecionada))) && (
        <div className="alunos-lista">
          {alunosFiltrados.length === 0 && (
            <p className="alunos-vazio">Nenhum aluno encontrado.</p>
          )}
          {alunosFiltrados.map((aluno) => (
            /* Corrigido aqui: 'to' virou 'href' */
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