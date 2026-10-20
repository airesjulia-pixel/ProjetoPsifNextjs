"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function NovoAtendimento() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const alunoIdUrl = searchParams.get("alunoId");
  const alunoNomeUrl = searchParams.get("alunoNome");

  const [form, setForm] = useState({
    alunoId: "",
    aluno: "",
    data: new Date().toISOString().split("T")[0], // Data de hoje por padrão
    tipo: "Individual",
    prioridade: "Média",
    descricao: "",
  });

  useEffect(() => {
    if (alunoIdUrl) {
      setForm((f) => ({
        ...f,
        alunoId: alunoIdUrl,
        aluno: alunoNomeUrl || "",
      }));
    }
  }, [alunoIdUrl, alunoNomeUrl]);

  function handleChange(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function handleSalvar(e) {
    e.preventDefault();
    console.log("Atendimento salvo:", form);
    alert(`Atendimento salvo com sucesso para ${form.aluno}! (Prioridade: ${form.prioridade})`);
    router.push(`/alunos/${form.alunoId || ""}`);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        backgroundColor: "#f8fafc",
        fontFamily: "system-ui, sans-serif"
      }}
    >
      <div style={{ width: "100%", maxWidth: "650px", marginBottom: "16px" }}>
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            background: "none",
            border: "none",
            color: "#1e40af",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "0.95rem"
          }}
        >
          ← Voltar
        </button>
      </div>

      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "650px",
          borderRadius: "16px",
          padding: "36px 40px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
          border: "1px solid #e2e8f0"
        }}
      >
        <header style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>
            Novo Atendimento
          </h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.95rem" }}>
            Registro de atendimento psicopedagógico do aluno.
          </p>
        </header>

        <form onSubmit={handleSalvar} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Nome do Aluno (Bloqueado pois veio da ficha dele) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#334155", textTransform: "uppercase" }}>
              Aluno
            </label>
            <input
              type="text"
              value={form.aluno || "Aluno não selecionado"}
              disabled
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1.5px solid #cbd5e1",
                backgroundColor: "#f1f5f9",
                color: "#1e293b",
                fontWeight: "600",
                fontSize: "0.95rem",
                boxBox: "border-box",
                cursor: "not-allowed"
              }}
            />
          </div>

          {/* Data e Tipo */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#334155", textTransform: "uppercase" }}>
                Data
              </label>
              <input
                type="date"
                value={form.data}
                onChange={(e) => handleChange("data", e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "0.95rem"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#334155", textTransform: "uppercase" }}>
                Tipo
              </label>
              <select
                value={form.tipo}
                onChange={(e) => handleChange("tipo", e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "0.95rem"
                }}
              >
                <option value="Individual">Individual</option>
                <option value="Reunião com professor">Reunião com professor</option>
                <option value="Reunião com família">Reunião com família</option>
                <option value="Relatório semanal">Relatório semanal</option>
              </select>
            </div>
          </div>

          {/* Seletor de Prioridade: Baixa, Média, Alta */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#334155", textTransform: "uppercase" }}>
              Nível de Prioridade
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              {[
                { nome: "Baixa", cor: "#15803d", bg: "#f0fdf4", borda: "#22c55e" },
                { nome: "Média", cor: "#854d0e", bg: "#fefce8", borda: "#eab308" },
                { nome: "Alta", cor: "#b91c1c", bg: "#fef2f2", borda: "#ef4444" }
              ].map((p) => {
                const selecionado = form.prioridade === p.nome;
                return (
                  <button
                    type="button"
                    key={p.nome}
                    onClick={() => handleChange("prioridade", p.nome)}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: selecionado ? `2px solid ${p.borda}` : "1.5px solid #e2e8f0",
                      backgroundColor: selecionado ? p.bg : "#ffffff",
                      color: selecionado ? p.cor : "#64748b",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: p.borda
                      }}
                    />
                    {p.nome}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Descrição */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#334155", textTransform: "uppercase" }}>
              Observações / Descrição
            </label>
            <textarea
              rows={4}
              placeholder="Descreva detalhes, combinados, queixas ou observações..."
              value={form.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1.5px solid #cbd5e1",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                resize: "vertical"
              }}
            />
          </div>

          {/* Botão de Salvar */}
          <button
            type="submit"
            style={{
              marginTop: "8px",
              padding: "14px",
              backgroundColor: "#1e40af",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(30, 64, 175, 0.25)"
            }}
          >
            Salvar atendimento
          </button>
        </form>
      </div>
    </div>
  );
}