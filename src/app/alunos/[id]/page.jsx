
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Stethoscope,
  Folder,
  ClipboardList,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

export default function AlunoDetalhes() {
  const params = useParams();
  const router = useRouter();

  // O endereço /alunos/2026002 recebe a matrícula do aluno
  const matricula = params.id;

  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [secaoAberta, setSecaoAberta] = useState(null);

  // Buscar somente o aluno correspondente à matrícula
  useEffect(() => {
    async function carregarAluno() {
      try {
        setCarregando(true);
        setErro("");

        const { data, error } = await supabase
          .from("alunos")
          .select("matricula, nome, id_turma, email")
          .eq("matricula", matricula)
          .single();

        if (error) {
          console.error("Erro ao buscar aluno:", error.message);
          setAluno(null);
          setErro(error.message);
          return;
        }

        setAluno(data);
      } catch (err) {
        console.error("Erro inesperado:", err);
        setAluno(null);
        setErro("Não foi possível carregar os dados do aluno.");
      } finally {
        setCarregando(false);
      }
    }

    if (matricula) {
      carregarAluno();
    }
  }, [matricula]);

  // Abrir e fechar seções
  function alternarSecao(secao) {
    setSecaoAberta(secaoAberta === secao ? null : secao);
  }

  // Tela de carregamento
  if (carregando) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.contentContainer}>
          <p style={styles.mensagemCarregando}>
            Carregando informações do aluno...
          </p>
        </div>
      </div>
    );
  }

  // Aluno não encontrado
  if (!aluno) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.contentContainer}>
          <h2 style={{ color: "#1a3b5c" }}>
            Aluno não encontrado
          </h2>

          <p style={{ color: "#64748b" }}>
            {erro || "Não existe um aluno cadastrado com essa matrícula."}
          </p>

          <button
            onClick={() => router.push("/alunos")}
            style={styles.btnVoltar}
          >
            <ArrowLeft size={18} style={{ marginRight: "6px" }} />
            Voltar para lista de alunos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentContainer}>

        {/* VOLTAR */}
        <button
          onClick={() => router.push("/alunos")}
          style={styles.btnVoltar}
        >
          <ArrowLeft size={18} style={{ marginRight: "6px" }} />
          Voltar para lista de alunos
        </button>

        {/* IDENTIFICAÇÃO DO ALUNO */}
        <div style={styles.perfilHeaderCard}>

          <div style={styles.alunoIdentificacao}>
            <div style={styles.avatar}>
              {aluno.nome?.[0]?.toUpperCase() || "?"}
            </div>

            <div>
              <h1 style={styles.alunoNome}>
                {aluno.nome}
              </h1>

              <span style={styles.badgeSituacao}>
                Cadastro do aluno
              </span>
            </div>
          </div>

          {/* INFORMAÇÕES DO ALUNO */}
          <div style={styles.miniCardsRow}>

            <div style={styles.miniCard}>
              <span style={styles.miniCardLabel}>
                Matrícula
              </span>

              <strong style={styles.miniCardValue}>
                {aluno.matricula}
              </strong>
            </div>

            <div style={styles.miniCard}>
              <span style={styles.miniCardLabel}>
                Turma (ID)
              </span>

              <strong style={styles.miniCardValue}>
                {aluno.id_turma ?? "Não informada"}
              </strong>
            </div>

            <div style={styles.miniCard}>
              <span style={styles.miniCardLabel}>
                E-mail
              </span>

              <strong style={styles.miniCardValue}>
                {aluno.email || "Não informado"}
              </strong>
            </div>

          </div>

          {/* NOVO ATENDIMENTO */}
          <div>
            <Link
              href={`/atendimentos?alunoId=${encodeURIComponent(
                aluno.matricula
              )}&alunoNome=${encodeURIComponent(aluno.nome)}`}
              style={styles.btnNovoAtendimento}
            >
              + Novo atendimento
            </Link>
          </div>

        </div>

        {/* SEÇÕES DO ALUNO */}
        <div style={styles.sectionsContainer}>

          {/* 1. LAUDOS E DIAGNÓSTICOS */}
          <div style={styles.sectionCard}>

            <button
              style={styles.sectionHeaderButton}
              onClick={() => alternarSecao("laudos")}
            >
              <span style={styles.sectionTitle}>
                <Stethoscope size={18} style={styles.iconeTitulo} />
                Laudos e Diagnósticos
              </span>

              <span style={styles.chevron}>
                {secaoAberta === "laudos" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </button>

            {secaoAberta === "laudos" && (
              <div style={styles.sectionBody}>
                <p style={styles.textoVazio}>
                  Nenhum laudo ou diagnóstico registrado para este aluno.
                </p>
              </div>
            )}

          </div>

          {/* 2. DOCUMENTOS E ARQUIVOS */}
          <div style={styles.sectionCard}>

            <button
              style={styles.sectionHeaderButton}
              onClick={() => alternarSecao("docs")}
            >
              <span style={styles.sectionTitle}>
                <Folder size={18} style={styles.iconeTitulo} />
                Documentos e Arquivos
              </span>

              <span style={styles.chevron}>
                {secaoAberta === "docs" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </button>

            {secaoAberta === "docs" && (
              <div style={styles.sectionBody}>
                <p style={styles.textoVazio}>
                  Nenhum documento anexado para este aluno.
                </p>
              </div>
            )}

          </div>

          {/* 3. RELATÓRIOS SEMANAIS */}
          <div style={styles.sectionCard}>

            <button
              style={styles.sectionHeaderButton}
              onClick={() => alternarSecao("relatorios")}
            >
              <span style={styles.sectionTitle}>
                <ClipboardList size={18} style={styles.iconeTitulo} />
                Relatórios Semanais
              </span>

              <span style={styles.chevron}>
                {secaoAberta === "relatorios" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </button>

            {secaoAberta === "relatorios" && (
              <div style={styles.sectionBody}>
                <p style={styles.textoVazio}>
                  Nenhum relatório registrado para este aluno.
                </p>
              </div>
            )}

          </div>

          {/* 4. OBSERVAÇÕES */}
          <div style={styles.sectionCard}>

            <button
              style={styles.sectionHeaderButton}
              onClick={() => alternarSecao("obs")}
            >
              <span style={styles.sectionTitle}>
                <MessageSquare size={18} style={styles.iconeTitulo} />
                Observações
              </span>

              <span style={styles.chevron}>
                {secaoAberta === "obs" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </button>

            {secaoAberta === "obs" && (
              <div style={styles.sectionBody}>
                <p style={styles.textoVazio}>
                  Nenhuma observação registrada para este aluno.
                </p>
              </div>
            )}

          </div>

          {/* 5. EVOLUÇÃO DO ALUNO */}
          <div style={styles.sectionCard}>

            <button
              style={styles.sectionHeaderButton}
              onClick={() => alternarSecao("evolucao")}
            >
              <span style={styles.sectionTitle}>
                <TrendingUp size={18} style={styles.iconeTitulo} />
                Evolução do Aluno
              </span>

              <span style={styles.chevron}>
                {secaoAberta === "evolucao" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </button>

            {secaoAberta === "evolucao" && (
              <div style={styles.sectionBody}>
                <p style={styles.textoVazio}>
                  Nenhum registro de evolução para este aluno.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

// ESTILIZAÇÃO
const styles = {
  pageWrapper: {
    padding: "36px 40px",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  contentContainer: {
    maxWidth: "1100px",
    width: "100%",
    margin: "0 auto",
  },

  mensagemCarregando: {
    color: "#64748b",
    padding: "40px 0",
    textAlign: "center",
  },

  textoVazio: {
    margin: 0,
    color: "#64748b",
    fontSize: "0.95rem",
    padding: "4px 0",
    lineHeight: "1.5",
  },

  btnVoltar: {
    background: "none",
    border: "none",
    color: "#1a3b5c",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    marginBottom: "20px",
    display: "inline-flex",
    alignItems: "center",
  },

  perfilHeaderCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "26px 32px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "24px",
  },

  alunoIdentificacao: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#d1e2f0",
    color: "#1a3b5c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    fontWeight: "700",
    flexShrink: 0,
  },

  alunoNome: {
    fontSize: "1.45rem",
    fontWeight: "700",
    color: "#1a3b5c",
    margin: "0 0 6px 0",
  },

  badgeSituacao: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    fontSize: "0.8rem",
    fontWeight: "700",
    padding: "4px 12px",
    borderRadius: "20px",
    border: "1px solid #bae6fd",
  },

  miniCardsRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  miniCard: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 18px",
    textAlign: "center",
    minWidth: "90px",
  },

  miniCardLabel: {
    display: "block",
    fontSize: "0.75rem",
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: "4px",
  },

  miniCardValue: {
    display: "block",
    fontSize: "0.95rem",
    color: "#1a3b5c",
    fontWeight: "700",
    overflowWrap: "anywhere",
  },

  btnNovoAtendimento: {
    backgroundColor: "#1a3b5c",
    color: "#ffffff",
    padding: "12px 22px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    boxShadow: "0 2px 8px rgba(26, 59, 92, 0.2)",
    display: "inline-block",
    whiteSpace: "nowrap",
  },

  sectionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.02)",
    overflow: "hidden",
  },

  sectionHeaderButton: {
    width: "100%",
    padding: "18px 24px",
    background: "none",
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    textAlign: "left",
  },

  sectionTitle: {
    fontSize: "1.05rem",
    fontWeight: "600",
    color: "#1a3b5c",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },

  iconeTitulo: {
    flexShrink: 0,
  },

  chevron: {
    display: "flex",
    alignItems: "center",
    color: "#94a3b8",
  },

  sectionBody: {
    padding: "18px 24px 22px",
    borderTop: "1px solid #f1f5f9",
    backgroundColor: "#fcfdfe",
  },
};
