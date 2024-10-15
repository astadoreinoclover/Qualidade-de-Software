'use client'
import { useContext } from "react"
import { filmeProps } from "../page"
import { ClienteContext } from "../context/ClienteContext"
import Estrelas from "./Estrelas"
import { FaRegComments } from "react-icons/fa6"
import { RiChatNewFill } from "react-icons/ri"

import Link from "next/link"

function ItemFilme({ filme }: { filme: filmeProps }) {
  const { idClienteLogado } = useContext(ClienteContext)

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={filme.foto} alt="Capa do Filme" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{filme.titulo}</h5>
        </a>
        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
          {filme.genero} - {filme.duracao} min.
        </p>
        <p className="mb-3 font-bold">
          Alugue por R$: {Number(filme.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
        </p>
        <p className="text-sm text-gray-500 dark:text-white mb-2">
          {filme.sinopse}
        </p>

        {idClienteLogado &&
          <div>
            <Estrelas soma={filme.total} num={filme.num} />
            <div className="float-end">
              <Link href={"/avaliacoes/" + filme.id}>
                <FaRegComments className="text-xl text-blue-600 me-2 inline" style={{ cursor: 'pointer' }} />
              </Link>
              <Link href={"/avaliar/" + filme.id}>
                <RiChatNewFill className="text-xl text-red-600 inline" style={{ cursor: 'pointer' }} />
              </Link>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default ItemFilme