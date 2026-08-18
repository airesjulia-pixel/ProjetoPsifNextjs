"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase"; 
import "./HistoricoAtendimentos.css";

const TIPO_COR = {
  individual: "verde",
  relatorio: "azul",
  reuniao: "amarelo",
};

export default function HistoricoAtendimentos() {
  const { id: alunoId } = useParams();
  const router = useRouter();

  const [aluno, setAluno] = useState(null);
  const [atendimentos, setAtendimentos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);

        const alunoRef = doc(db, "alunos", alunoId);
        const alunoSnap = await getDoc(alunoRef);
        if (alunoSnap.exists()) {
          setAluno({ id: alunoSnap.id, ...alunoSnap.data() });
        }

        const atendimentosRef = collection(db, "alunos", alunoId, "atendimentos");
        const atendimentosQuery = query(atendimentosRef, orderBy("data", "desc"));
        const atendimentosSnap = await getDocs(atendimentosQuery);

        const lista = atendimentosSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setAtendimentos(lista);
      } catch (e) {
        console.error("Erro ao carregar histórico de atendimentos:", e);
        setErro("Não foi possível carregar o histórico de atendimentos.");
      } finally {
        setCarregando(false);
      }
    }

    if (alunoId) carregarDados();
  }, [alunoId]);

  const atendimentosFiltrados = atendimentos.filter((a) =>
    (a.titulo || "").toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="historico-page">
      <header className="historico-header">
        <button
          className="historico-voltar"
          onClick={() => router.back()}
          aria-label="Voltar"
        >
          ←
        </button>
        <div className="historico-titulo-bloco">
          <h1>Histórico de atendimentos</h1>
          {aluno && <span className="historico-subtitulo">{aluno.nome}</span>}
        </div>
      </header>

      <div className="historico-busca-bloco">
        <input
          type="text"
          className="historico-busca"
          placeholder="Pesquisar atendimento"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <main className="historico-conteudo">
        {carregando && <p className="historico-estado">Carregando histórico...</p>}

        {erro && <p className="historico-estado historico-erro">{erro}</p>}

        {!carregando && !erro && atendimentosFiltrados.length === 0 && (
          <p className="historico-estado">
            Nenhum atendimento encontrado para este aluno.
          </p>
        )}

        {!carregando && !erro && atendimentosFiltrados.length > 0 && (
          <ol className="historico-linha">
            {atendimentosFiltrados.map((atendimento) => (
              <li className="historico-item" key={atendimento.id}>
                <span
                  className={`historico-ponto historico-ponto--${
                    TIPO_COR[atendimento.tipo] || "azul"
                  }`}
                  aria-hidden="true"
                />
                <div className="historico-item-conteudo">
                  <span className="historico-data">{atendimento.data}</span>
                  <h2 className="historico-item-titulo">{atendimento.titulo}</h2>
                  <p className="historico-item-descricao">{atendimento.descricao}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </main>
    </div>
  );
}