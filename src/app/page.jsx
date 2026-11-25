"use client";

import { useRouter } from "next/navigation";
import { Users, Stethoscope, FileText, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Cabeçalho com botão de Sair */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Olá, Psicopedagoga!</h1>
          <p style={styles.subtitle}>
            Plataforma de Suporte Psicopedagógico (PSIF) • Visão Geral
          </p>
        </div>
        <button onClick={handleLogout} style={styles.btnLogout}>
          Sair
        </button>
      </header>

      {/* Grade com os 4 Cards de Métricas */}
      <div style={styles.metricsGrid}>
        <div style={styles.cardDestaque}>
          <div style={styles.cardHeader}>
            <span style={styles.cardLabel}>Alunos Ativos</span>
            <span style={styles.cardIcon}><Users size={22} /></span>
          </div>
          <div style={styles.cardNumberDestaque}>124</div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardLabel}>Atendimentos no Mês</span>
            <span style={styles.cardIcon}><Stethoscope size={22} /></span>
          </div>
          <div style={styles.cardNumber}>08</div>
          <span style={styles.cardDesc}>Registros realizados</span>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardLabel}>Relatórios</span>
            <span style={styles.cardIcon}><FileText size={22} /></span>
          </div>
          <div style={styles.cardNumber}>05</div>
          <span style={styles.cardDesc}>Acompanhamentos pendentes</span>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardLabel}>Alertas</span>
            <span style={{ ...styles.cardIcon, color: "#d97706" }}><AlertTriangle size={22} /></span>
          </div>
          <div style={{ ...styles.cardNumber, color: "#d97706" }}>03</div>
          <span style={styles.cardDesc}>Casos prioritários</span>
        </div>
      </div>

      {/* Painel Central */}
      <div style={styles.bannerContainer}>
        <div style={styles.bannerInfo}>
          <h2 style={styles.bannerTitle}>Gestão de Alunos e Atendimentos</h2>
          <p style={styles.bannerText}>
            Para registrar uma nova sessão, acesse a ficha do aluno correspondente e clique no botão de atendimento individual.
          </p>
          <button
            onClick={() => router.push("/alunos")}
            style={styles.btnAcessarAlunos}
          >
            Acessar Meus Alunos
          </button>
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
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  title: {
    fontSize: "1.9rem",
    fontWeight: "700",
    color: "#1a3b5c",
    margin: "0 0 6px 0"
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    margin: 0
  },
  btnLogout: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "600",
    cursor: "pointer"
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "32px"
  },
  metricCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
    display: "flex",
    flexDirection: "column"
  },
  cardDestaque: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
    display: "flex",
    flexDirection: "column"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  cardLabel: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.04em"
  },
  cardIcon: {
    display: "flex",
    alignItems: "center",
    color: "#1a3b5c"
  },
  cardNumber: {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#1e293b",
    lineHeight: "1.1",
    marginBottom: "6px"
  },
  cardNumberDestaque: {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#1a3b5c",
    lineHeight: "1.1",
    marginBottom: "6px"
  },
  cardDesc: {
    fontSize: "0.82rem",
    color: "#94a3b8"
  },
  bannerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)"
  },
  bannerInfo: {
    maxWidth: "600px"
  },
  bannerTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1a3b5c",
    margin: "0 0 10px 0"
  },
  bannerText: {
    fontSize: "0.95rem",
    color: "#64748b",
    lineHeight: "1.5",
    marginBottom: "20px"
  },
  btnAcessarAlunos: {
    backgroundColor: "#1a3b5c",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 24px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(26, 59, 92, 0.2)"
  }
};