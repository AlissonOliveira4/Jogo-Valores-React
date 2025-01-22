import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Final.module.css';
import ImgTwitter from '../../images/twitter2.avif';
import ImgFacebook from '../../images/facebook.png';
import ImgWhatsapp from '../../images/whatsapp.png';

function Final() {

    const navigate = useNavigate();
    const pontos = parseInt(localStorage.getItem("pontos"));

    // Atualizar o texto de pontos
    useEffect(() => {
        let ponto = document.getElementById("ponto");
        if (ponto) {
            ponto.textContent = `${pontos} pontos!`;
        } else {
            console.log("Elemento não encontrado!");
        }
    }, [pontos]);

    // Atualizar feedback de acordo com os pontos
    useEffect(() => {
        const feedbacks = ['perfeito', 'bom', 'médio', 'ruim'];
        const mensagens = [
            "Seu resultado foi excelente! Com incríveis 70 pontos",
            "Seu resultado foi bom! Mas precisa estudar um pouco mais sobre os valores",
            "Seu resultado foi mediano! Então estude mais sobre os valores",
            "Seu resultado foi ruim! Você deveria estudar mais sobre os valores"
        ];

        let feedbackIndex = 3; // Default feedback (ruim)

        if (pontos === 70) feedbackIndex = 0; 
        else if (pontos >= 50) feedbackIndex = 1;
        else if (pontos >= 30) feedbackIndex = 2;

        let feedback = document.getElementById(feedbacks[feedbackIndex]);
        let mensagem = feedback.querySelector("p").innerHTML;
        localStorage.setItem("mensagem", mensagem);
        feedback.classList.remove("hidden");

        console.log(localStorage.getItem("mensagem"));
    }, [pontos]);

    // Função para requisição PUT
    function fazPut(url, body) {
        console.log(body);

        let request = new XMLHttpRequest();
        request.open("PUT", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(body));

        request.onload = function() {
            console.log(this.responseText);
        };

        return request.responseText;
    }

    // Função para atualizar dados do usuário
    function updateUser(event) {
        event.preventDefault();
        let url = `https://valores-back.onrender.com/user/update-user?nome=${localStorage.getItem("nome")}`;
        console.log(url);

        let tempoObj = JSON.parse(localStorage.getItem("timer"));
        const horas = 0;
        let minutos = tempoObj ? tempoObj.minutes : 0;
        let segundos = tempoObj ? tempoObj.seconds : 0;

        let tempoFormatado = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

        let body = {
            "nome": localStorage.getItem("nome"),
            "pontos": parseInt(localStorage.getItem("pontos")),
            "tempo": tempoFormatado
        };

        fazPut(url, body);
        navigate("/");
    }

    // Função para atualizar links de compartilhamento
    function atualizarLinksCompartilhamento() {
        console.log("Atualizando links de compartilhamento");

        const titulo = document.getElementById("titulo").innerHTML;
        const pontos = parseInt(document.getElementById("ponto").innerHTML);
        const mensagem = localStorage.getItem("mensagem");
        const urlPagina = "https://valores-front.onrender.com"; // URL atual da página

        let textoCompartilhamento = "";

        if (pontos >= 40) {
            textoCompartilhamento = `Acabei de jogar e consegui ${pontos} pontos! E você, consegue mais? 💪 #JogoValores \n`;
        } else {
            textoCompartilhamento = `Parece que preciso estudar mais! 😅 Eu fiz ${pontos} pontos. Você consegue fazer melhor? 💪 #JogoValores \n`;
        }

        console.log(textoCompartilhamento);

        // Atualizar links dos botões de compartilhamento
        document.getElementById("btn-facebook").href =
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlPagina)}&quote=${encodeURIComponent(textoCompartilhamento)}`;

        document.getElementById("btn-whatsapp").href =
            `https://api.whatsapp.com/send?text=${encodeURIComponent(textoCompartilhamento + " " + urlPagina)}`;

        document.getElementById("btn-twitter").href =
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(textoCompartilhamento)}&url=${encodeURIComponent(urlPagina)}`;

        console.log("Links atualizados com sucesso");
    }

    // Atualizar links de compartilhamento ao carregar o componente
    useEffect(() => {
        atualizarLinksCompartilhamento();
    }, [pontos]); // Reexecutar quando os pontos mudam

    return (
        <>
            <form className="principal" onSubmit={updateUser}>
                <h1 id="titulo">Parabéns por ter finalizado o jogo!</h1>
                <h3 className={styles.pontos} id="ponto"></h3>
                <div className="feedback hidden" id="perfeito">
                    <p>Seu resultado foi excelente! Com incríveis 70 pontos</p>
                </div>
                <div className="feedback hidden" id="bom">
                    <p>Seu resultado foi bom! Mas precisa estudar um pouco mais sobre os valores</p>
                </div>
                <div className="feedback hidden" id="médio">
                    <p>Seu resultado foi mediano! Então estude mais sobre os valores</p>
                </div>
                <div className="feedback hidden" id="ruim">
                    <p>Seu resultado foi ruim! Você deveria estudar mais sobre os valores</p>
                </div>

                <button type="submit" >Retornar ao menu</button>
                
            </form>
            <div className={styles.share}>
                <a id="btn-twitter" href="#" target="_blank">
                    <img width="40" height="40" src={ImgTwitter} />
                </a> 
                <a id="btn-facebook" href="#" target="_blank">
                    <img width="50" height="50" src={ImgFacebook} />
                </a>               
                <a id="btn-whatsapp" href="#" target="_blank">
                    <img width="40" height="40" src={ImgWhatsapp} />
                </a>    
            </div>
        </>
    );
}

export default Final;
