'use client'
import Estrelas from "../../components/Estrelas"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Avaliacoes() {
  const params = useParams()
  const [avaliacoes, setAvaliacoes] = useState([])
  const [filme, setFilme] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getAvalia() {
      const response = await fetch("http://localhost:3004/avaliacoes/filme/" + params.filme_id)
      const dados = await response.json()
      setAvaliacoes(dados)
    }
    getAvalia()

    async function getFilme() {
      const response = await fetch("http://localhost:3004/filmes/" + params.filme_id)
      const dado = await response.json()
      setFilme(dado)
      setIsLoading(false)
    }
    getFilme()
  }, [])

  function AjustaData(data) {
    const anoMesDia = data.split("T")[0]
    const partes = anoMesDia.split("-")
    return partes[2] + "/" + partes[1] + "/" + partes[0]
  }

  const listaAvaliacoes = avaliacoes.map(avalia => (
    <tr key={avalia.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">{avalia.cliente.nome}</td>
      <td className="px-6 py-4">{AjustaData(avalia.data)}</td>
      <td className="px-6 py-4">{avalia.estrelas} estrelas</td>
      <td className="px-6 py-4">{avalia.comentario}</td>
    </tr>
  ))

  if (isLoading) {
    return (
      <div>
        <h2>Listagem das Avaliações do Filme</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl flex justify-around mt-2 mx-auto p-4 border border-gray-200 rounded-lg shadow">
      <div>
        <p className="mt-2 font-bold text-xl">Filme: {filme.titulo} </p>
        <img src={filme.foto} alt="Capa" width={200} />
        <Estrelas soma={filme.total} num={filme.num} />&nbsp;
        <p className="mt-1">({filme.num} avaliações)</p>
      </div>

      <div>
        <h2 className="mt-2 font-bold text-2xl">
          Avaliações dos Clientes do CineClube<br />
        </h2>
        <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">Nome do Cliente</th>
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4">Avaliação</th>
              <th className="px-6 py-4">Comentário</th>
            </tr>
          </thead>
          <tbody>
            {listaAvaliacoes}
          </tbody>
        </table>
      </div>
    </div>
  )
}