import { Link } from 'react-router-dom'

function Inicial() {
    
    return (
        <div className="principal">
            <h1>Jogo Valores J&F</h1>
            <p><strong>Jogo focado em reforçar os valores da J&F, de forma criativa e divertida.</strong></p>
            <Link to="/login">
                <button>Começar o jogo</button>
            </Link>
            
        </div>
    )

}

export default Inicial