import ItemFilme from "./components/ItemFilme";
import Pesquisa from "./components/Pesquisa";

async function getFilmes() {
  const response = await fetch("http://localhost:3004/filmes", 
        { cache: 'no-store' })
  const dados = await response.json()
  return dados
}

export interface filmeProps {
  id: number
  titulo: string
  genero: string
  duracao: number
  preco: number
  foto: string
  num: number
  total: number
  sinopse: string
}

export default async function Home() {

  const filmes = await getFilmes()

  const listaFilmes = filmes.map((filme: filmeProps) => (
    <ItemFilme key={filme.id} filme={filme} />
  ))

  return (
    <div className="max-w-7xl mx-auto">
      <Pesquisa />
      <h1 className="mt-5 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">Últimos Lançamentos: <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Direto do Cinema</span></h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {listaFilmes}
      </div>

    </div>
  );
}
