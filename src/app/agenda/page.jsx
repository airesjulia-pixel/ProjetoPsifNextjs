import "./Agenda.css";

const atendimentosHoje = [
  { hora: "09:00", nome: "Anitta Peniwyse", tipo: "Atendimento individual" },
  { hora: "10:30", nome: "José", tipo: "Reunião com professor" },
];

export default function Agenda() {
  return (
    <div className="agenda">
      <h1>Agenda</h1>
      <div className="agenda-hoje">
        <h2>Atendimentos de hoje</h2>
        {atendimentosHoje.map((a, i) => (
          <div className="agenda-item" key={i}>
            <strong>{a.hora}</strong>
            <div>
              <p>{a.nome}</p>
              <span>{a.tipo}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="agenda-novo">+ Novo agendamento</button>
    </div>
  );
}