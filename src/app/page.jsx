"use client";
import "./Dashboard.css";

export default function Dashboard() {
  const proximosAtendimentos = [
    { hora: "09:00", nome: "Anitta Peniwyse" },
    { hora: "10:30", nome: "José" },
    { hora: "14:00", nome: "Valquíria" },
  ];

  return (
    <div className="dashboard">
      <h1>Olá! 👋</h1>
      <p className="dashboard-subtitle">Bom dia!</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <span className="dashboard-card-number">08</span>
          <span className="dashboard-card-label">Atendimentos hoje</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-number">124</span>
          <span className="dashboard-card-label">Alunos ativos</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-number">05</span>
          <span className="dashboard-card-label">Relatórios pendentes</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-number">03</span>
          <span className="dashboard-card-label">Alertas importantes</span>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-panel">
          <h2>Próximos atendimentos</h2>
          <ul className="dashboard-list">
            {proximosAtendimentos.map((item, i) => (
              <li key={i}>
                <strong>{item.hora}</strong> {item.nome}
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-panel">
          <h2>Ações rápidas</h2>
          <div className="dashboard-actions">
            <button>+ Novo atendimento</button>
            <button>+ Novo aluno</button>
            <button>+ Novo relatório</button>
            <button>📅 Agenda</button>
          </div>
        </div>
      </div>
    </div>
  );
}