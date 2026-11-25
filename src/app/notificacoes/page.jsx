import { Bell, Home, Settings } from "lucide-react";
import "./Notificacoes.css";

const notificacoes = [
  { texto: "Novo relatório enviado —  Ana Silva", tempo: "10 min" },
  // ... resto dos itens
];

export default function Notificacoes() {
  return (
    <div className="notificacoes">
      <h1>Notificações</h1>
      <div className="notificacoes-lista">
        {notificacoes.map((n, i) => (
          <div className="notificacao-item" key={i}>
            <Bell size={20} />
            <div>
              <p>{n.texto}</p>
              <span>{n.tempo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}