import { Home, Files, Users, ScrollText, CalendarDays, StickyNote, Bell, LogOut, BrainCircuit } from "lucide-react";
import Link from "next/link";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">
          <BrainCircuit size={22} />
        </span>
        <div>
          <strong>PSIF</strong>
          <p>Plataforma de Suporte Psicopedagógico</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link href="/" className="sidebar-link">
          <Home size={18} /> Início
        </Link>
        <Link href="/alunos" className="sidebar-link">
          <Users size={18} /> Alunos
        </Link>
        <Link href="/relatorios" className="sidebar-link">
          <ScrollText size={18} /> Relatórios
        </Link>
        <Link href="/agenda" className="sidebar-link">
          <CalendarDays size={18} /> Agenda
        </Link>
        <Link href="/documentos" className="sidebar-link">
          <StickyNote size={18} /> Documentos
        </Link>
        <Link href="/notificacoes" className="sidebar-link">
          <Bell size={18} /> Notificações
        </Link>
      </nav>

      <button className="sidebar-logout">
        <LogOut size={18} /> Sair
      </button>
    </aside>
  );
}