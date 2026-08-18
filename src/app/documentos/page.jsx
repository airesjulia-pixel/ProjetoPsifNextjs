import "./Documentos.css";

const documentos = [
  { nome: "Laudo médico.pdf", tamanho: "2,1 MB" },
  { nome: "Relatório psicológico.pdf", tamanho: "2,4 MB" },
  { nome: "Parecer pedagógico.pdf", tamanho: "1,8 MB" },
];

export default function Documentos() {
  return (
    <div className="documentos">
      <h1>Documentos</h1>
      <input className="documentos-busca" placeholder="Pesquisar documento..." />
      <div className="documentos-lista">
        {documentos.map((doc, i) => (
          <div className="documento-item" key={i}>
            📄 <div><strong>{doc.nome}</strong><span>{doc.tamanho}</span></div>
          </div>
        ))}
      </div>
      <button className="documentos-add">+ Adicionar documento</button>
    </div>
  );
}