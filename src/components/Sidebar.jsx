import Link from "next/link";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">💠</span>
        <div>
          <strong>PSIF</strong>
          <p>Plataforma de Suporte Psicopedagógico</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link href="/" className="sidebar-link">🏠 Início</Link>
        <Link href="/atendimentos" className="sidebar-link">📋 Atendimentos</Link>
        <Link href="/alunos" className="sidebar-link">👥 Alunos</Link>
        <Link href="/relatorios" className="sidebar-link">📄 Relatórios</Link>
        <Link href="/agenda" className="sidebar-link">📅 Agenda</Link>
        <Link href="/documentos" className="sidebar-link">📁 Documentos</Link>
        <Link href="/notificacoes" className="sidebar-link">🔔 Notificações</Link>
      </nav>

      <button className="sidebar-logout">🚪 Sair</button>
    </aside>
  );
}