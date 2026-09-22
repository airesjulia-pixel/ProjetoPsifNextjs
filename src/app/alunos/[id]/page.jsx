"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import "./AlunoDetalhe.css";

const secoesConfig = [
  { titulo: "Dados do aluno", chave: "dados", icone: "📋" },
  { titulo: "Histórico de atendimentos", chave: "historico", icone: "🗂️" },
  { titulo: "Relatórios", chave: "relatorios", icone: "📄" },
  { titulo: "Documentos", chave: "documentos", icone: "📁" },
  { titulo: "Observações", chave: "observacoes", icone: "📝" },
  { titulo: "Evolução", chave: "evolucao", icone: "📈" },
];

export default function AlunoDetalhe() {
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const APIKEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const SUPABASE_BASE = SUPABASE_URL?.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

  useEffect(() => {
    const buscarAluno = async () => {
      try {
        const response = await fetch(
          `${SUPABASE_BASE}/rest/v1/alunos?id=eq.${id}&select=*`,
          {
            headers: {
              apikey: APIKEY,
              Authorization: `Bearer ${APIKEY}`,
            },
          }
        );
        const data = await response.json();

        if (!response.ok || !Array.isArray(data)) {
          console.error("Erro ao buscar aluno:", data);
          setAluno(null);
          return;
        }
        setAluno(data[0] ?? null);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        setAluno(null);
      } finally {
        setCarregando(false);
      }
    };

    if (id) buscarAluno();
  }, [id]);

  if (carregando) {
    return <div className="aluno-detalhe">Carregando...</div>;
  }

  if (!aluno) {
    return (
      <div className="aluno-detalhe">
        <Link href="/alunos" className="voltar">← Voltar</Link>
        <p>Aluno não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="aluno-detalhe">
      <Link href="/alunos" className="voltar">← Voltar</Link>

      <div className="aluno-topo">
        <div className="aluno-detalhe-header">
          <div className="aluno-avatar-grande">{aluno.nome?.[0]}</div>
          <div>
            <h1>{aluno.nome}</h1>
            {aluno.situacao && (
              <span className="aluno-situacao">{aluno.situacao}</span>
            )}
          </div>
        </div>

        <Link
          href={`/atendimentos?alunoId=${id}&alunoNome=${encodeURIComponent(aluno.nome)}`}
          className="btn-novo-atendimento"
        >
          + Novo Atendimento
        </Link>
      </div>

      <div className="aluno-info-grid">
        <div className="info-item">
          <span>Curso</span>
          <strong>{aluno.curso || "—"}</strong>
        </div>
        <div className="info-item">
          <span>Turma</span>
          <strong>{aluno.turma || "—"}</strong>
        </div>
        <div className="info-item">
          <span>Matrícula</span>
          <strong>{aluno.matricula || "—"}</strong>
        </div>
      </div>

      <h2 className="aluno-secoes-titulo">Acompanhamento</h2>

      <div className="aluno-secoes-grid">
        {secoesConfig.map((s) => (
          <Link href={`/alunos/${id}/${s.chave}`} key={s.chave} className="aluno-secao-card">
            <span className="secao-icone">{s.icone}</span>
            <span className="secao-titulo">{s.titulo}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}