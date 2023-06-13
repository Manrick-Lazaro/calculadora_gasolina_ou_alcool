import logo from "./assets/logo.png"
import "./app.css"
import { useState, FormEvent } from "react"

// alcool / gasolina < 0.7? alcool : gasolina
interface InfoProps {
  title: string;
  gasolina: number | string;
  alcool: number | string;
}

function App() {
  const [gasolina, setGasolina] = useState(0)
  const [alcool, setAlcool] = useState(0)
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent) {
    event.preventDefault()

    const calc = alcool / gasolina
    
    if(calc <= 0.7) {
      setInfo({
        title: "compensa usar Álcool",
        gasolina: moeda(Number(gasolina)),
        alcool: moeda(Number(alcool))
      }) 
    } else {
        setInfo({
          title: "compensa usar Gasolina",
          gasolina: moeda(Number(gasolina)),
          alcool: moeda(Number(alcool))
        })
    }  
  }  

  function moeda(valor: number){
    const valorConvertido = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    })

    return valorConvertido
  }

  return (
    <div className="container">
      <main className="main">
        <img src={logo} alt="logo calculadora gasolina ou alcool" className="logo"/>
        <h2 className="title">Qual é a melhor opção?</h2>

        <form className="form" onSubmit={calcular}>
          <label htmlFor="" >Qual o preço do álcool por litro?</label>
          <input 
            type="number" 
            className="input" 
            placeholder="0" 
            min={1} 
            step={0.01} 
            required 
            value={(alcool)} 
            onChange={(e) => setAlcool(Number(e.target.value))}
          />

          <label htmlFor="">Qual o preço da gasolina por litro?</label>
          <input 
            type="number" 
            className="input" 
            placeholder="0" 
            min={1} 
            step={0.01} 
            required 
            value={gasolina} 
            onChange={(e) => setGasolina(Number(e.target.value))}
          />
        
          <input type="submite" className="button" value={"Calcular"} onClick={calcular}/>
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">{info?.title}</h2>

            <span>Álcool: {info?.alcool}</span>
            <span>Gasolina: {info?.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
