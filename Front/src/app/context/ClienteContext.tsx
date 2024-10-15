'use client'
import { ReactNode, createContext, useState } from "react"

interface ClienteProps {
  id: number | null
  nome: string
}

type ClienteContextData = {
  idClienteLogado: number | null
  nomeClienteLogado: string
  mudaLogin: ({ id, nome }: ClienteProps) => void
}

// cria um contexto
export const ClienteContext = createContext({} as ClienteContextData)

function ClienteProvider({ children }: { children: ReactNode } ) {
  const [idClienteLogado, setIdClienteLogado] = useState<number|null>(null)
  const [nomeClienteLogado, setNomeClienteLogado] = useState<string>("")

  function mudaLogin({id, nome}: ClienteProps) {
    setIdClienteLogado(id)
    setNomeClienteLogado(nome)
  }

  return (
    <ClienteContext.Provider value={{idClienteLogado, nomeClienteLogado, mudaLogin}}>
      {children}
    </ClienteContext.Provider>
  )

}

export default ClienteProvider