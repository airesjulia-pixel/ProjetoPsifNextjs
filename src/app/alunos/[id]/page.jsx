"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AlunoDetalhes() {
  const { id } = useParams();
  const router = useRouter();

  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [secaoAberta, setSecaoAberta] = useState(null);

  useEffect(() => {
    async function carregarAluno() {
      try {
        setCarregando(true);
        const { data, error } = await supabase
          .from("alunos")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Erro ao buscar detalhes do aluno:", error.message);
          setAluno(null);
        } else {
          setAluno(data);
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      carregarAluno();
    }
  }, [id]);

  function alternarSecao(secao) {
    setSecaoAberta(secaoAberta === secao ? null : secao);
  }

  if (carregando) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.contentContainer}>
          <p style={{ color: "#64748b", padding: "40px 0", textAlign: "center" }}>
            Carregando informações do aluno...
          </p>
        </div>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.contentContainer}>
          <h2>Aluno não encontrado</h2>
          <button onClick={() => router.push("/alunos")} style={styles.btnVoltar}>
            ← Voltar para lista de alunos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentContainer}>
        {/* Botão Superior de Navegação */}
        <button onClick={() => router.push("/alunos")} style={styles.btnVoltar}>
          ← Voltar para lista de alunos
        </button>

        {/* Cartão de Cabeçalho do Perfil (Com todos os dados principais do aluno) */}
        <div style={styles.perfilHeaderCard}>
          {/* Identificação: Foto, Nome e Situação */}
          <div style={styles.alunoIdentificacao}>
            <div style={styles.avatar}>
              {aluno.nome?.[0] || "?"}
            </div>
            <div>
              <h1 style={styles.alunoNome}>{aluno.nome}</h1>
              <span style={styles.badgeSituacao}>
                {aluno.situacao || "Em acompanhamento"}
              </span>
            </div>
          </div>

          {/* 3 Cartões de Informação Rápida */}
          <div style={styles.miniCardsRow}>
            <div style={styles.miniCard}>
              <span style={styles.miniCardLabel}>Curso</span>
              <strong style={styles.miniCardValue}>{aluno.curso}</strong>
            </div>

            <div style={styles.miniCard}>
              <span style={styles.miniCardLabel}>Turma</span>
              <strong style={styles.miniCardValue}>{aluno.turma}</strong>
            </div>

            <div style={styles.miniCard}>
              <span style={styles.miniCardLabel}>Matrícula</span>
              <strong style={styles.miniCardValue}>{aluno.matricula}</strong>
            </div>
          </div>

          {/* Botão Novo Atendimento */}
          <div>
            <Link
              href={`/atendimentos?alunoId=${aluno.id}&alunoNome=${encodeURIComponent(aluno.nome)}`}
              style={styles.btnNovoAtendimento}
            >
              + Novo atendimento
            </Link>
          </div>
        </div>

        {/* Seções de Prontuário e Acompanhamento */}
        <div style={styles.sectionsContainer}>
          {/* 1. Laudos e Diagnósticos */}
          <div style={styles.sectionCard}>
            <button style={styles.sectionHeaderButton} onClick={() => alternarSecao("laudos")}>
              <span style={styles.sectionTitle}>🩺 Laudos e Diagnósticos</span>
              <span style={styles.chevron}>{secaoAberta === "laudos" ? "▲" : "▼"}</span>
            </button>
            {secaoAberta === "laudos" && (
              <div style={styles.sectionBody}>
                <div style={styles.laudoItem}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={styles.laudoTag}>TDAH - CID F90.0</span>
                    <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Emitido em: 15/02/2026</span>
                  </div>
                  <p style={{ margin: "4px 0", fontSize: "0.95rem", color: "#334155" }}>
                    <strong>Profissional Responsável:</strong> Dra. Juliana Mendes (Neurologista)
                  </p>
                  <p style={{ margin: "8px 0 0", fontSize: "0.9rem", color: "#64748b", lineHeight: "1.5" }}>
                    Recomenda-se acompanhamento psicopedagógico individualizado quinzenal, tempo adicional em avaliações escritas e flexibilização de prazos para entregas de trabalhos.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 2. Documentos e Arquivos */}
          <div style={styles.sectionCard}>
            <button style={styles.sectionHeaderButton} onClick={() => alternarSecao("docs")}>
              <span style={styles.sectionTitle}>📁 Documentos e Arquivos</span>
              <span style={styles.chevron}>{secaoAberta === "docs" ? "▲" : "▼"}</span>
            </button>
            {secaoAberta === "docs" && (
              <div style={styles.sectionBody}>
                <div style={styles.docRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "1.4rem" }}>📄</span>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "#1a3b5c", display: "block" }}>
                        Laudo_Neurologico_Oficial.pdf
                      </strong>
                      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                        PDF • 1.4 MB • Enviado em 15/02/2026
                      </span>
                    </div>
                  </div>
                  <button style={styles.btnDownload} onClick={() => alert("Visualizando documento...")}>
                    Visualizar documento
                  </button>
                </div>

                <div style={styles.docRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "1.4rem" }}>📄</span>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "#1a3b5c", display: "block" }}>
                        Termo_Consentimento_Familia.pdf
                      </strong>
                      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                        PDF • 340 KB • Enviado em 20/02/2026
                      </span>
                    </div>
                  </div>
                  <button style={styles.btnDownload} onClick={() => alert("Visualizando documento...")}>
                    Visualizar documento
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Relatórios Semanais */}
          <div style={styles.sectionCard}>
            <button style={styles.sectionHeaderButton} onClick={() => alternarSecao("relatorios")}>
              <span style={styles.sectionTitle}>📝 Relatórios Semanais</span>
              <span style={styles.chevron}>{secaoAberta === "relatorios" ? "▲" : "▼"}</span>
            </button>
            {secaoAberta === "relatorios" && (
              <div style={styles.sectionBody}>
                <p style={{ margin: 0, color: "#64748b", fontSize: "0.95rem" }}>
                  1 relatório psicopedagógico arquivado referente ao semestre atual.
                </p>
              </div>
            )}
          </div>

          {/* 4. Observações */}
          <div style={styles.sectionCard}>
            <button style={styles.sectionHeaderButton} onClick={() => alternarSecao("obs")}>
              <span style={styles.sectionTitle}>💬 Observações</span>
              <span style={styles.chevron}>{secaoAberta === "obs" ? "▲" : "▼"}</span>
            </button>
            {secaoAberta === "obs" && (
              <div style={styles.sectionBody}>
                <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem", lineHeight: "1.5" }}>
                  O aluno demonstra boa capacidade de comunicação e tem mostrado interesse e participação nas dinâmicas de apoio escolar.
                </p>
              </div>
            )}
          </div>

          {/* 5. Evolução do Aluno */}
          <div style={styles.sectionCard}>
            <button style={styles.sectionHeaderButton} onClick={() => alternarSecao("evolucao")}>
              <span style={styles.sectionTitle}>📈 Evolução do Aluno</span>
              <span style={styles.chevron}>{secaoAberta === "evolucao" ? "▲" : "▼"}</span>
            </button>
            {secaoAberta === "evolucao" && (
              <div style={styles.sectionBody}>
                <p style={{ margin: 0, color: "#64748b", fontSize: "0.95rem" }}>
                  Plano de desenvolvimento psicopedagógico em andamento no contraturno escolar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    padding: "36px 40px",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  contentContainer: {
    maxWidth: "1100px",
    width: "100%"
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
    alignItems: "center"
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
    marginBottom: "24px"
  },
  alunoIdentificacao: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
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
    fontWeight: "700"
  },
  alunoNome: {
    fontSize: "1.45rem",
    fontWeight: "700",
    color: "#1a3b5c",
    margin: "0 0 6px 0"
  },
  badgeSituacao: {
    backgroundColor: "#f0fdf4",
    color: "#16a34a",
    fontSize: "0.8rem",
    fontWeight: "700",
    padding: "4px 12px",
    borderRadius: "20px",
    border: "1px solid #bbf7d0"
  },
  miniCardsRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  miniCard: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 18px",
    textAlign: "center"
  },
  miniCardLabel: {
    display: "block",
    fontSize: "0.75rem",
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: "2px"
  },
  miniCardValue: {
    display: "block",
    fontSize: "0.95rem",
    color: "#1a3b5c",
    fontWeight: "700"
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
    whiteSpace: "nowrap"
  },
  sectionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.02)",
    overflow: "hidden"
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
    textAlign: "left"
  },
  sectionTitle: {
    fontSize: "1.05rem",
    fontWeight: "600",
    color: "#1a3b5c"
  },
  chevron: {
    fontSize: "0.9rem",
    color: "#94a3b8"
  },
  sectionBody: {
    padding: "18px 24px 22px",
    borderTop: "1px solid #f1f5f9",
    backgroundColor: "#fcfdfe"
  },
  laudoItem: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "16px"
  },
  laudoTag: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    fontSize: "0.8rem",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "6px"
  },
  docRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    marginBottom: "10px",
    flexWrap: "wrap",
    gap: "10px"
  },
  btnDownload: {
    backgroundColor: "#ffffff",
    border: "1px solid #1a3b5c",
    color: "#1a3b5c",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer"
  }
};