import { useNavigate, Link } from 'react-router-dom'
import Voltar from '../../images/voltar.webp'
import styles from './Login.module.css'

function Login() {
    const navigate = useNavigate();

    console.log("Reiniciou!");
    const minutes = 10;
    const seconds = 0;
    localStorage.removeItem("timer");
    localStorage.setItem("timer", JSON.stringify({ minutes, seconds }));
    localStorage.setItem("pontos", 0);

    console.log("timer: "+localStorage.getItem("timer"))

    function fazPost(url, body){
        console.log(body);
    
        let request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(body));
    
        request.onload = function() {
            console.log(this.responseText);
        }
    
        console.log("Requisição de login feita com sucesso!")
        
        return request.responseText;
    }
    
    function saveUser(event){
      event.preventDefault();
      let url = "https://valores-back.onrender.com/user/create-user";
      let nome = document.getElementById("nome").value;
    
      console.log(nome);
    
      localStorage.setItem("nome", nome);
    
      let body = {
            "nome": nome,
            "pontos": 0
      };
    
      fazPost(url, body);

      navigate("/determinação")

    }

    return (
        <>
            <header>
                <Link to="/">
                    <img src={Voltar} alt="voltar" id={styles.voltar} />
                </Link>
            </header>
            <form className={styles.grupo} onSubmit={saveUser}>
                <div className={styles.login}>
                    <label htmlFor="nome">Digite seu apelido:</label>
                    <input type="text" name="nome" id="nome" required />
                </div>

                <button type="sumbit">Próximo</button>
                   
            </form>
        </>
    )

}

export default Login