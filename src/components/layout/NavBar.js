import React, { useEffect, useState } from 'react';
import Img from '../../images/picpay.png'
import Overlay from '../overlay/Overlay'
import styles from './NavBar.module.css'

function NavBar() {

    const [rankingData, setRankingData] = useState([]);

    const apiUrl = "https://valores-back.onrender.com/user/ranking";

    // Função para buscar os dados da API
    const fetchRankingData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Erro ao buscar os dados da API");
            console.log("requisição feita com sucesso")
            const data = await response.json();
            setRankingData(data); // Atualiza o estado com os dados
            console.log("dados carregados!")
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
            setRankingData([]); // Caso haja erro, define o estado como array vazio
        }
    };

    // Chama a função para buscar os dados quando o componente for montado
    useEffect(() => {
        fetchRankingData();
    }, []);
    
    return (
        <nav className={styles.navbar}>
            <img src={Img} alt="picpay" id='picpay' className={styles.picpay} />
            <Overlay />
        </nav>
    )

}

export default NavBar