"use client";
import { useState } from "react";
import "./NovoAtendimento.css";

export default function NovoAtendimento() {
  const [form, setForm] = useState({
    aluno: "",
    data: "",
    tipo: "Individual",
    descricao: "",
  });

  function handleChange(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function handleSalvar() {
    console.log("Atendimento salvo:", form);
    alert("Atendimento salvo! (ainda sem conexão com o banco de dados)");
  }

  return (
    <div className="novo-atendimento">
      <h1>Novo atendimento</h1>

      <label>Aluno</label>
      <select value={form.aluno} onChange={(e) => handleChange("aluno", e.target.value)}>
        <option value="">Selecione...</option>
        <option>Anitta Peniwyse</option>
        <option>José</option>
        <option>Valquíria</option>
      </select>

      <label>Data</label>
      <input type="date" value={form.data} onChange={(e) => handleChange("data", e.target.value)} />

      <label>Tipo de atendimento</label>
      <select value={form.tipo} onChange={(e) => handleChange("tipo", e.target.value)}>
        <option>Individual</option>
        <option>Reunião com professor</option>
        <option>Reunião com família</option>
        <option>Relatório semanal</option>
      </select>

      <label>Descrição</label>
      <textarea
        rows={5}
        placeholder="Descreva o atendimento..."
        value={form.descricao}
        onChange={(e) => handleChange("descricao", e.target.value)}
      />

      <button onClick={handleSalvar}>Salvar atendimento</button>
    </div>
  );
}