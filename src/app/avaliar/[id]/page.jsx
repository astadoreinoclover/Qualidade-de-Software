'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Estrelas from '../../components/Estrelas'
import { useContext } from "react"
import { ClienteContext } from "../../context/ClienteContext"

export default function Avaliar() {
  const params = useParams()
  const [filme, setFilme] = useState({})
  const { idClienteLogado } = useContext(ClienteContext)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { estrelas: 3 }
  })

  useEffect(() => {
    async function getFilme() {
      const response = await fetch("http://localhost:3004/filmes/" + params.id)
      const dado = await response.json()
      // console.log(dado)
      setFilme({
        id: dado.id,
        titulo: dado.titulo,
        genero: dado.genero,
        preco: dado.preco,
        duracao: dado.duracao,
        foto: dado.foto,
        sinopse: dado.sinopse,
        total: dado.total,
        num: dado.num
      })
    }
    getFilme()
    //    console.log(filme)
  }, [])

  async function enviaComentario(data) {
    const avaliacao = { ...data, cliente_id: idClienteLogado, filme_id: filme.id }

    const avalia = await fetch("http://localhost:3004/avaliacoes",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(avaliacao)
      },
    )

    if (avalia.status == 201) {
      alert("Ok! Avaliação cadastrada com sucesso")
      reset()
    } else {
      alert("Erro no cadastro da avaliação...")
    }
  }

  return (
    <div className="max-w-screen-xl flex flex-wrap justify-around mt-2 mx-auto p-4 border border-gray-200 rounded-lg shadow">
      <div className="max-w-sm p-6">
        <img src={filme.foto} alt="Filme" width={500} className="mx-auto" />
        <h5 className="my-3 font-bold text-2xl text-gray-900 md:text-xl dark:text-gray-400">
          {filme.titulo}
        </h5>
        <p className="my-3 text-xl text-gray-900 md:text-xl dark:text-gray-400">
          {filme.genero} - {filme.duracao} min
        </p>
        <p className="text-sm text-gray-500 dark:text-white mb-2">
          {filme.sinopse}
        </p>
        <div className="flex justify-between">
          <Estrelas soma={filme.total} num={filme.num} />
          <p className="mt-1">{filme.num} avaliações</p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(enviaComentario)}>
          <h3 className="font-bold text-2xl mt-4">Cadastre seu comentário sobre este filme</h3>
          <hr />
          <div className="my-4">
            <label htmlFor="comentario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Seu Comentário:</label>
            <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="comentario" rows="3"
              {...register("comentario")}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="estrelas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sua Avaliação (Estrelas)</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("estrelas")}>
              <option value="1">1 Estrela</option>
              <option value="2">2 Estrelas</option>
              <option value="3">3 Estrelas</option>
              <option value="4">4 Estrelas</option>
              <option value="5">5 Estrelas</option>
            </select>
          </div>
          <input type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mt-3" value="Enviar" />
        </form>
      </div>
    </div>
  )
}