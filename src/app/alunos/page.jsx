"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const filtrosOpcoes = ["Todos", "1ª série", "2ª série", "3ª série"];

export default function MeusAlunos() {
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarAlunos() {
      try {
        setCarregando(true);
        const { data, error } = await supabase
          .from("alunos")
          .select("*, turma(curso, periodo, ano)");

        if (error) {
          console.error("Erro ao carregar alunos:", error.message);
          setAlunos([]);
        } else {
          setAlunos(data || []);
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
      } finally {
        setCarregando(false);
      }
    }

    carregarAlunos();
  }, []);

  // Filtra por nome, matrícula e série
  const alunosFiltrados = alunos.filter((aluno) => {
    const termo = busca.toLowerCase();
    const bateBusca =
      !busca ||
      aluno.nome?.toLowerCase().includes(termo) ||
      aluno.matricula?.toLowerCase().includes(termo);
    const bateFiltro =
      filtroAtivo === "Todos" ||
      aluno.turma?.curso?.toLowerCase().includes(filtroAtivo.toLowerCase()) ||
      aluno.turma?.periodo?.toLowerCase().includes(filtroAtivo.toLowerCase());
    return bateBusca && bateFiltro;
  });

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentContainer}>
        {/* Cabeçalho */}
        <header style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h1 style={styles.title}>Meus Alunos</h1>
            <span style={styles.counterBadge}>
              {alunosFiltrados.length}
            </span>
          </div>
          <p style={styles.subtitle}>
            Gerenciamento de alunos e acompanhamento psicopedagógico
          </p>
        </header>

        {/* Barra de Filtros */}
        <div style={styles.filterToolbar}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Pesquisar por nome ou matrícula..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.pillsContainer}>
            {filtrosOpcoes.map((opcao) => {
              const ativo = filtroAtivo === opcao;
              return (
                <button
                  key={opcao}
                  onClick={() => setFiltroAtivo(opcao)}
                  style={{
                    ...styles.pillButton,
                    backgroundColor: ativo ? "#1a3b5c" : "#ffffff",
                    color: ativo ? "#ffffff" : "#64748b",
                    borderColor: ativo ? "#1a3b5c" : "#cbd5e1"
                  }}
                >
                  {opcao}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mensagens de status */}
        {carregando && (
          <div style={styles.statusBox}>
            <p style={{ color: "#64748b", margin: 0 }}>Carregando alunos do sistema...</p>
          </div>
        )}

        {!carregando && alunosFiltrados.length === 0 && (
          <div style={styles.statusBox}>
            <p style={{ color: "#64748b", margin: 0 }}>
              Nenhum aluno encontrado para os critérios selecionados.
            </p>
          </div>
        )}

        {/* Grade de Cartões */}
        {!carregando && (
          <div style={styles.gridAlunos}>
            {alunosFiltrados.map((aluno) => (
              <Link
                key={aluno.matricula}
                href={`/alunos/${aluno.matricula}`}
                style={styles.cardAluno}
              >
                <div style={styles.cardTop}>
                  <div style={styles.avatar}>
                    {aluno.nome?.[0] || "?"}
                  </div>
                  <span style={styles.badgeSituacao}>
                    {aluno.situacao || "Em acompanhamento"}
                  </span>
                </div>

                <div style={styles.cardInfo}>
                  <strong style={styles.alunoNome}>{aluno.nome}</strong>
                  <div style={styles.alunoDetalhe}>
                    <span>{aluno.turma?.curso}</span>
                    <span>•</span>
                    <span>{aluno.turma?.periodo}</span>
                  </div>
                  <div style={styles.alunoMatricula}>
                    Matrícula: <strong>{aluno.matricula}</strong>
                  </div>
                </div>

                <div style={styles.cardFooter}>
                  <span style={styles.linkText}>Ver ficha completa</span>
                  <span style={styles.arrowIcon}>
                    <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
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
    maxWidth: "1150px",
    width: "100%"
  },
  header: {
    marginBottom: "24px"
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1a3b5c",
    margin: 0
  },
  counterBadge: {
    backgroundColor: "#e2e8f0",
    color: "#1a3b5c",
    fontSize: "0.85rem",
    fontWeight: "700",
    padding: "3px 10px",
    borderRadius: "20px"
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    margin: "6px 0 0 0"
  },
  filterToolbar: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
    flexWrap: "wrap"
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "9px 14px",
    border: "1.5px solid #dce7f0",
    width: "320px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
  },
  searchIcon: {
    display: "flex",
    alignItems: "center",
    marginRight: "8px",
    color: "#94a3b8"
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "0.92rem",
    color: "#1e293b",
    backgroundColor: "transparent"
  },
  pillsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap"
  },
  pillButton: {
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "0.83rem",
    fontWeight: "600",
    cursor: "pointer",
    border: "1.5px solid",
    transition: "all 0.15s ease"
  },
  statusBox: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "40px 20px",
    textAlign: "center",
    border: "1px solid #e2e8f0"
  },
  gridAlunos: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 340px))",
    gap: "20px"
  },
  cardAluno: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "180px",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    boxSizing: "border-box"
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  avatar: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    backgroundColor: "#d1e2f0",
    color: "#1a3b5c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    fontWeight: "700"
  },
  badgeSituacao: {
    backgroundColor: "#f0fdf4",
    color: "#16a34a",
    fontSize: "0.75rem",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #bbf7d0"
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  alunoNome: {
    fontSize: "1.05rem",
    color: "#1a3b5c",
    fontWeight: "700"
  },
  alunoDetalhe: {
    fontSize: "0.85rem",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  alunoMatricula: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginTop: "2px"
  },
  cardFooter: {
    marginTop: "16px",
    paddingTop: "12px",
    borderTop: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  linkText: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#1a3b5c"
  },
  arrowIcon: {
    display: "flex",
    alignItems: "center",
    color: "#1a3b5c"
  }
};