import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import falha from "../../images/falha.png";
import sucesso from "../../images/sucesso.png";
import styles from "./Valores.module.css";

function Valores({ img, valor, proximo }) {
  const [pontos, setPontos] = useState(
    parseInt(localStorage.getItem("pontos")) || 0
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const [timer, setTimer] = useState(() => {
    const savedTime = JSON.parse(localStorage.getItem("timer"));
    return savedTime || { minutes: 10, seconds: 0 };
  });
  const [data, setData] = useState(null);
  const [overlayType, setOverlayType] = useState(null);

  const navigate = useNavigate();

  const url = `https://valores-back.onrender.com/valores/get-value?nome=${valor}`;

  function shuffleArray(array) {
    const shuffled = [...array]; // Cria uma cópia do array original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Troca os elementos
    }
    return shuffled;
  }

  // Carregar valores da API
  useEffect(() => {
    
    setSelectedItems([]); // Reseta os itens selecionados

    async function carregarValores() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar os dados da API");
        const data = await response.json();
        
        // Embaralha as perguntas antes de definir o estado
        const perguntasEmbaralhadas = shuffleArray(data.perguntas);
        setData({ ...data, perguntas: perguntasEmbaralhadas });

      } catch (error) {
        console.error("Erro:", error);
        alert(
          "Houve um problema ao carregar os valores. Por favor, tente novamente."
        );
      }
    }
    carregarValores();
  }, [url]);

  // Timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer.minutes === 0 && timer.seconds === 0) {
        clearInterval(timerInterval);
        localStorage.removeItem("timer");
        alert("Tempo esgotado!");
        navigate("/final");
        return;
      }

      setTimer((prevTimer) => {
        const { minutes, seconds } = prevTimer;
        if (seconds === 0) return { minutes: minutes - 1, seconds: 59 };
        return { minutes, seconds: seconds - 1 };
      });
    }, 1000);

    localStorage.setItem("timer", JSON.stringify(timer));

    return () => clearInterval(timerInterval);
  }, [timer, navigate]);

  // Lidar com seleção de itens
  function toggleSelection(index) {
    if (selectedItems.includes(index)) {
      setSelectedItems((prevItems) => prevItems.filter((i) => i !== index));
    } else {
      if (selectedItems.length >= 3) {
        alert("Você só pode selecionar até 3 itens.");
        return;
      }
      setSelectedItems((prevItems) => [...prevItems, index]);
    }
  }

  // Lógica ao clicar em "Próximo"
  function acertou(event) {
    event.preventDefault();

    const corretas = selectedItems.filter(
      (index) => data.perguntas[index].situacao
    ).length;

    console.log(corretas+" corretas")

    let pontosGanhos;
    if (corretas === 3) {
      pontosGanhos = 10;
      setOverlayType("sucesso");
    } else {
      pontosGanhos = corretas * 3; // 3 pontos por resposta correta
      setOverlayType("falha");
    }

    const novoPontos = pontos + pontosGanhos;

    setPontos(novoPontos);
    localStorage.setItem("pontos", novoPontos);

    console.log("pontos no localStorage: "+localStorage.getItem("pontos"))

    setTimeout(() => {
      setOverlayType(null);
      navigate(`/${proximo}`);
    }, 3750);
  }

  return (
    <>
      <header>
        <div className={styles.temporizador}>
          {String(timer.minutes).padStart(2, "0")}:
          {String(timer.seconds).padStart(2, "0")}
        </div>
        <h3>Valores J&F</h3>
      </header>

      <form className={styles.grupo} onSubmit={acertou}>
        <div id={styles.valor}>
          <img src={img} alt="Imagem do valor" />
          <h1>{data?.nome || "Carregando..."}</h1>
          <img src={img} alt="Imagem do valor" />
        </div>

        <p>{data?.frase}</p>
        <ul id={styles.escolha}>
          {data?.perguntas.map((pergunta, index) => (
            <li
            key={index}
            id={String.fromCharCode(97 + index)} //ASC II - "a", "b", "c", ... 
            className={
              selectedItems.includes(index) ? `${styles.selected}` : ""
            }
            onClick={() => toggleSelection(index)}
          >
            {pergunta.pergunta}
          </li>
                  
          ))}
        </ul>
        <button type="submit" id={styles.botao}>
          Próximo
        </button>
      </form>

      {overlayType && (
        <div className={`${styles.overlay}`}>
          <div className={styles.overlay_content}>
            {overlayType === "falha" && (
              <div className={styles.imagem}>
                <img src={falha} alt="falha" />
              </div>
            )}
            {overlayType === "sucesso" && (
              <div className={styles.imagem}>
                <img src={sucesso} alt="sucesso" />
              </div>
            )}
            <p>{data?.exemplo || "Carregando..."}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Valores;
