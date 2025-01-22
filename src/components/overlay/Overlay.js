import React, { useState, useEffect } from "react";
import styles from "./Overlay.module.css";
import tela1 from '../../images/tela1.png';
import tela2 from '../../images/tela2.png';
import tela3 from '../../images/tela3.png';
import tela4 from '../../images/tela4.png';
import tela5 from '../../images/tela5.png';
import tela6 from '../../images/tela6.png';

function Overlay() {
    const [visibleOverlay, setVisibleOverlay] = useState(null);
    const [rankingData, setRankingData] = useState([]);

    const apiUrl = "https://valores-back.onrender.com/user/ranking";

    // Função para buscar os dados do ranking
    const fetchRankingData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Erro ao buscar os dados da API");
            console.log("Requisição do ranking feita com sucesso!")
            const data = await response.json();
            setRankingData(data); // Atualiza o estado com os dados do ranking
            console.log("Dados carregados!")
        } catch (error) {
            console.error("Erro ao carregar os dados do ranking:", error);
            setRankingData([]); // Caso haja erro, define o estado como array vazio
        }
    };

    // Chama a função fetchRankingData quando o overlay de ranking for exibido
    useEffect(() => {
        if (visibleOverlay === "ranking") {
            fetchRankingData(); // Faz a requisição para pegar o ranking quando o overlay for aberto
        }
    }, [visibleOverlay]);

    const handleClose = () => setVisibleOverlay(null);

    const renderOverlayContent = () => {
        switch (visibleOverlay) {
            case "tutorial":
                return (
                    <>
                        <h3>Tutorial</h3>
                        <p>Antes de começar o jogo devemos ler as regras para assim termos uma melhor experiência nele</p>
                        <br />
                        <img src={tela1} alt="tela1" id="tela1"/>
                        <p>Após terminar de ler as regras clique no botão fechar para voltar ao menu</p>
                        <br />
                        <img src={tela2} alt="tela2" id="tela2" />
                        <p>Em seguida, clique no botão “Começar o jogo” para assim dar início ao jogo</p><br />
                        <img src={tela3} alt="tela3" id="tela3" />
                        <p>Depois de ter clicado nesse botão, você será redirecionado para a tela de login, aonde deve colocar seu apelido no jogo</p><br />
                        <img src={tela4} alt="tela4" id="tela4" />
                        <p>Agora estando no jogo, você deve selecionar 3 atributos corretos de cada valor para ganhar pontos</p><br />
                        <img src={tela5} alt="tela5" id="tela5" />
                        <p>Ao final do jogo você receberá um feedback do seu desempenho, conforme os seus pontos ganhos ao decorrer do jogo</p><br />
                        <img src={tela6} alt="tela6" id="tela6" />
                        <p>Clicando no botão de “Retornar ao menu”, será redirecionado para a página inicial, voltando ao início do jogo</p><br /><br />
                    </>
                );
            case "regras":
                return (
                    <>
                        <h3>Regras</h3>
                        <p>
                            1° - O quiz tem que ser feito individualmente.<br /><br />
                            2° - Só pode selecionar no máximo 3 repostas de cada valor.<br /><br />
                            3° - Digite seu apelido antes de ir para o jogo!<br /><br />
                            4° - Não é permitido utilizar fontes externas, apenas o seu conhecimento.<br /><br />
                            5° - É estritamente proibido o uso do inspecionar das páginas do jogo!<br /><br />
                            6° - O jogo só tem 10 minutos, então seja rápido. <br />
                        </p>
                    </>
                );
            case "ranking":
                return (
                    <>
                        <h3>Ranking</h3>
                        <table id="ranking-table">
                            <thead>
                                <tr>
                                    <th>Posição</th>
                                    <th>Nome</th>
                                    <th>Pontos</th>
                                    <th>Tempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankingData.length > 0 ? (
                                    rankingData.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.nome}</td>
                                            <td>{user.pontos}</td>
                                            <td>{user.tempo}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">Carregando...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className={styles.info}>
                {/* Botões para abrir os overlays */}
                <button onClick={() => setVisibleOverlay("tutorial")}>Tutorial</button>
                <button onClick={() => setVisibleOverlay("regras")}>Regras</button>
                <button onClick={() => setVisibleOverlay("ranking")}>Ranking</button>
            </div>
            {/* Overlay */}
            {visibleOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        {renderOverlayContent()}
                        <button className="closeOverlay" onClick={handleClose}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Overlay;
