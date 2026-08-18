import "./Notificacoes.css";

const notificacoes = [
  { texto: "Novo relatório enviado — Anitta Peniwyse", tempo: "10 min" },
  { texto: "José possui atendimento hoje", tempo: "20 min" },
  { texto: "Documento anexado ao prontuário de Valquíria", tempo: "1h" },
];

export default function Notificacoes() {
  return (
    <div className="notificacoes">
      <h1>Notificações</h1>
      <div className="notificacoes-lista">
        {notificacoes.map((n, i) => (
          <div className="notificacao-item" key={i}>
            🔔 <div><p>{n.texto}</p><span>{n.tempo}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}