"use client"; 

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase"; 
import "./Evolucao.css";

const STATUS_COLOR = {
  concluido: "verde",
  atencao: "amarelo",
  informativo: "azul",
  alta: "verde",
};

export default function Evolucao() {
  const { id: alunoId } = useParams();
  const router = useRouter();

  const [aluno, setAluno] = useState(null);
  const [marcos, setMarcos] = useState([]);
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

        const marcosRef = collection(db, "alunos", alunoId, "evolucao");
        const marcosQuery = query(marcosRef, orderBy("data", "asc"));
        const marcosSnap = await getDocs(marcosQuery);

        const lista = marcosSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setMarcos(lista);
      } catch (e) {
        console.error("Erro ao carregar evolução do aluno:", e);
        setErro("Não foi possível carregar a evolução do aluno.");
      } finally {
        setCarregando(false);
      }
    }

    if (alunoId) carregarDados();
  }, [alunoId]);

  return (
    <div className="evolucao-page">
      <header className="evolucao-header">
        <button
          className="evolucao-voltar"
          onClick={() => router.back()}
          aria-label="Voltar"
        >
          ←
        </button>
        <div className="evolucao-titulo-bloco">
          <h1>Evolução do aluno</h1>
          {aluno && <span className="evolucao-subtitulo">{aluno.nome}</span>}
        </div>
      </header>

      <main className="evolucao-conteudo">
        {carregando && <p className="evolucao-estado">Carregando evolução...</p>}

        {erro && <p className="evolucao-estado evolucao-erro">{erro}</p>}

        {!carregando && !erro && marcos.length === 0 && (
          <p className="evolucao-estado">
            Ainda não há marcos de evolução registrados para este aluno.
          </p>
        )}

        {!carregando && !erro && marcos.length > 0 && (
          <ol className="evolucao-linha">
            {marcos.map((marco) => (
              <li className="evolucao-item" key={marco.id}>
                <span
                  className={`evolucao-ponto evolucao-ponto--${
                    STATUS_COLOR[marco.status] || "azul"
                  }`}
                  aria-hidden="true"
                />
                <div className="evolucao-item-conteudo">
                  <span className="evolucao-data">{marco.data}</span>
                  <h2 className="evolucao-item-titulo">{marco.titulo}</h2>
                  <p className="evolucao-item-descricao">{marco.descricao}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </main>
    </div>
  );
}