"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import "./AlunoDetalhe.css";

export default function AlunoDetalhe() {
  const { id } = useParams();

  const secoes = [
    { titulo: "Dados do aluno", rota: `/alunos/${id}/dados` },
    { titulo: "Histórico de atendimentos", rota: `/alunos/${id}/historico` },
    { titulo: "Relatórios", rota: `/alunos/${id}/relatorios` },
    { titulo: "Documentos", rota: `/alunos/${id}/documentos` },
    { titulo: "Observações", rota: `/alunos/${id}/observacoes` },
    { titulo: "Evolução", rota: `/alunos/${id}/evolucao` },
  ];

  return (
    <div className="aluno-detalhe">
      {/* 1. Mudou de 'to' para 'href' */}
      <Link href="/alunos" className="voltar">← Voltar</Link>

      <div className="aluno-detalhe-header">
        <div className="aluno-avatar-grande">A</div>
        <div>
          <h1>Anitta Peniwyse</h1>
          <span className="aluno-situacao">Em acompanhamento</span>
        </div>
      </div>

      <div className="aluno-info-grid">
        <div><span>Curso</span><strong>Informática</strong></div>
        <div><span>Turma</span><strong>3ª série</strong></div>
        <div><span>Matrícula</span><strong>20208222</strong></div>
      </div>

      <div className="aluno-secoes">
        {secoes.map((s) => (
          /* 2. Mudou de 'to' para 'href' */
          <Link href={s.rota} key={s.titulo} className="aluno-secao-item">
            {s.titulo} <span>›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}