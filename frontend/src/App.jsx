import React, { useEffect, useState } from 'react'
import { api } from './services/api'
import DashboardCard from './components/DashboardCard'

function App() {
  const [dashboard, setDashboard] = useState(null)
  const [tarefas, setTarefas] = useState([])
  const [adultos, setAdultos] = useState([])
  const [secoes, setSecoes] = useState([])
  const [mensagem, setMensagem] = useState('')
  const [tipoMensagem, setTipoMensagem] = useState('sucesso')

  const [novaTarefa, setNovaTarefa] = useState({
    titulo: '',
    descricao: '',
    prazo: '',
    prioridade: 'Média',
    status: 'Pendente',
    tipo_tarefa: 'Pontual',
    id_responsavel: '',
    id_secao: ''
  })

  const [novaSecao, setNovaSecao] = useState({
    nome_secao: ''
  })

  const [novoAdulto, setNovoAdulto] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo_funcao: '',
    id_secao: ''
  })

  function mostrarMensagem(texto, tipo = 'sucesso') {
    setTipoMensagem(tipo)
    setMensagem(texto)

    setTimeout(() => {
      setMensagem('')
    }, 5000)
  }

  async function carregarDados() {
    const dashboardResponse = await api.get('/dashboard')
    const tarefasResponse = await api.get('/tarefas')
    const adultosResponse = await api.get('/adultos')
    const secoesResponse = await api.get('/secoes')

    setDashboard(dashboardResponse.data)
    setTarefas(tarefasResponse.data)
    setAdultos(adultosResponse.data)
    setSecoes(secoesResponse.data)
  }

  function alterarCampo(event) {
    const { name, value } = event.target

    setNovaTarefa({
      ...novaTarefa,
      [name]: value
    })
  }

  function alterarCampoSecao(event) {
    const { name, value } = event.target

    setNovaSecao({
      ...novaSecao,
      [name]: value
    })
  }

  function alterarCampoAdulto(event) {
    const { name, value } = event.target

    setNovoAdulto({
      ...novoAdulto,
      [name]: value
    })
  }

  async function cadastrarSecao(event) {
    event.preventDefault()

    if (!novaSecao.nome_secao.trim()) {
      mostrarMensagem('Digite o nome da seção.', 'erro')
      return
    }

    try {
      await api.post('/secoes', novaSecao)

      mostrarMensagem('Seção cadastrada com sucesso!')

      setNovaSecao({
        nome_secao: ''
      })

      carregarDados()
    } catch (error) {
      mostrarMensagem('Erro ao cadastrar seção.', 'erro')
    }
  }

  async function excluirSecao(idSecao) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta seção?')

    if (!confirmar) {
      return
    }

    try {
      await api.delete(`/secoes/${idSecao}`)
      mostrarMensagem('Seção excluída com sucesso!')
      carregarDados()
    } catch (error) {
      mostrarMensagem('Erro ao excluir seção. Verifique se há adultos ou tarefas vinculados a ela.', 'erro')
    }
  }

  async function cadastrarAdulto(event) {
    event.preventDefault()

    if (!novoAdulto.nome.trim() || !novoAdulto.tipo_funcao.trim()) {
      mostrarMensagem('Nome e função do adulto são obrigatórios.', 'erro')
      return
    }

    try {
      await api.post('/adultos', {
        ...novoAdulto,
        id_secao: novoAdulto.id_secao || null
      })

      mostrarMensagem('Adulto voluntário cadastrado com sucesso!')

      setNovoAdulto({
        nome: '',
        email: '',
        telefone: '',
        tipo_funcao: '',
        id_secao: ''
      })

      carregarDados()
    } catch (error) {
      mostrarMensagem('Erro ao cadastrar adulto voluntário.', 'erro')
    }
  }

  async function excluirAdulto(idAdulto) {
    const confirmar = window.confirm('Tem certeza que deseja excluir este adulto voluntário?')

    if (!confirmar) {
      return
    }

    try {
      await api.delete(`/adultos/${idAdulto}`)
      mostrarMensagem('Adulto voluntário excluído com sucesso!')
      carregarDados()
    } catch (error) {
      mostrarMensagem('Erro ao excluir adulto. Verifique se há tarefas vinculadas a ele.', 'erro')
    }
  }

  async function cadastrarTarefa(event) {
    event.preventDefault()

    if (!dataValidaBrasil(novaTarefa.prazo)) {
      mostrarMensagem('Digite a data no formato dd/mm/aaaa.', 'erro')
      return
    }

    const partesData = novaTarefa.prazo.split('/')
    const prazoFormatado = `${partesData[2]}-${partesData[1]}-${partesData[0]}`

    try {
      await api.post('/tarefas', {
        ...novaTarefa,
        prazo: prazoFormatado
      })

      mostrarMensagem('Tarefa cadastrada com sucesso!')

      setNovaTarefa({
        titulo: '',
        descricao: '',
        prazo: '',
        prioridade: 'Média',
        status: 'Pendente',
        tipo_tarefa: 'Pontual',
        id_responsavel: '',
        id_secao: ''
      })

      carregarDados()
    } catch (error) {
      mostrarMensagem('Erro ao cadastrar tarefa.', 'erro')
    }
  }

  function formatarDataBrasil(data) {
    if (!data) return ''

    const partes = data.split('-')
    return `${partes[2]}/${partes[1]}/${partes[0]}`
  }

  function dataValidaBrasil(data) {
    const regex = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/

    if (!regex.test(data)) {
      return false
    }

    const [dia, mes, ano] = data.split('/').map(Number)
    const dataTeste = new Date(ano, mes - 1, dia)

    return (
      dataTeste.getFullYear() === ano &&
      dataTeste.getMonth() === mes - 1 &&
      dataTeste.getDate() === dia
    )
  }

  async function atualizarStatusTarefa(idTarefa, novoStatus) {
    try {
      await api.patch(`/tarefas/${idTarefa}/status`, {
        status_novo: novoStatus,
        observacao: 'Alteração realizada pela tela de gestão de tarefas'
      })

      mostrarMensagem('Status da tarefa atualizado com sucesso!')
      carregarDados()
    } catch (error) {
      mostrarMensagem('Erro ao atualizar o status da tarefa.', 'erro')
    }
  }

  async function excluirTarefa(idTarefa) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?')

    if (!confirmar) {
      return
    }

    try {
      await api.delete(`/tarefas/${idTarefa}`)
      mostrarMensagem('Tarefa excluída com sucesso!')
      carregarDados()
    } catch (error) {
      mostrarMensagem('Erro ao excluir a tarefa.', 'erro')
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>PI Alpha Centauri</h1>
          <p>Gestão e rastreabilidade de tarefas voluntárias</p>
        </div>
      </header>

      {mensagem && (
        <div className={`mensagem ${tipoMensagem}`}>
          {mensagem}
        </div>
      )}

      <section className="panel">
        <h2>Cadastrar nova seção</h2>

        <form onSubmit={cadastrarSecao} className="form">
          <div className="form-grid">
            <div>
              <label>Nome da seção</label>
              <input
                type="text"
                name="nome_secao"
                value={novaSecao.nome_secao}
                onChange={alterarCampoSecao}
                placeholder="Ex: Alcateia, Tropa Escoteira"
                required
              />
            </div>
          </div>

          <button type="submit">Cadastrar seção</button>
        </form>

        <table className="tabela-tarefas">
          <thead>
            <tr>
              <th>Seção</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {secoes.map((secao) => (
              <tr key={secao.id_secao}>
                <td>{secao.nome_secao}</td>
                <td className="acoes">
                  <button
                    className="btn-acao excluir"
                    onClick={() => excluirSecao(secao.id_secao)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>Cadastrar adulto voluntário</h2>

        <form onSubmit={cadastrarAdulto} className="form">
          <div className="form-grid">
            <div>
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={novoAdulto.nome}
                onChange={alterarCampoAdulto}
                required
              />
            </div>

            <div>
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={novoAdulto.email}
                onChange={alterarCampoAdulto}
              />
            </div>

            <div>
              <label>Telefone</label>
              <input
                type="text"
                name="telefone"
                value={novoAdulto.telefone}
                onChange={alterarCampoAdulto}
              />
            </div>

            <div>
              <label>Função</label>
              <input
                type="text"
                name="tipo_funcao"
                value={novoAdulto.tipo_funcao}
                onChange={alterarCampoAdulto}
                placeholder="Ex: Chefe de seção, Assistente"
                required
              />
            </div>

            <div>
              <label>Seção</label>
              <select
                name="id_secao"
                value={novoAdulto.id_secao}
                onChange={alterarCampoAdulto}
              >
                <option value="">Sem seção vinculada</option>
                {secoes.map((secao) => (
                  <option key={secao.id_secao} value={secao.id_secao}>
                    {secao.nome_secao}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit">Cadastrar adulto</button>
        </form>

        <table className="tabela-tarefas">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th>Seção</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {adultos.map((adulto) => (
              <tr key={adulto.id_adulto}>
                <td>{adulto.nome}</td>
                <td>{adulto.tipo_funcao}</td>
                <td>{adulto.nome_secao || '-'}</td>
                <td className="acoes">
                  <button
                    className="btn-acao excluir"
                    onClick={() => excluirAdulto(adulto.id_adulto)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>Cadastrar nova tarefa</h2>

        <form onSubmit={cadastrarTarefa} className="form">
          <div className="form-grid">
            <div>
              <label>Título</label>
              <input
                type="text"
                name="titulo"
                value={novaTarefa.titulo}
                onChange={alterarCampo}
                required
              />
            </div>

            <div>
              <label>Prazo</label>
              <input
                type="text"
                name="prazo"
                value={novaTarefa.prazo}
                onChange={alterarCampo}
                placeholder="dd/mm/aaaa"
                maxLength="10"
                required
              />
            </div>

            <div>
              <label>Prioridade</label>
              <select
                name="prioridade"
                value={novaTarefa.prioridade}
                onChange={alterarCampo}
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
                <option value="Crítica">Crítica</option>
              </select>
            </div>

            <div>
              <label>Status</label>
              <select
                name="status"
                value={novaTarefa.status}
                onChange={alterarCampo}
              >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Impedida">Impedida</option>
                <option value="Concluída">Concluída</option>
              </select>
            </div>

            <div>
              <label>Tipo de tarefa</label>
              <select
                name="tipo_tarefa"
                value={novaTarefa.tipo_tarefa}
                onChange={alterarCampo}
              >
                <option value="Pontual">Pontual</option>
                <option value="Recorrente">Recorrente</option>
                <option value="Emergencial">Emergencial</option>
              </select>
            </div>

            <div>
              <label>Responsável</label>
              <select
                name="id_responsavel"
                value={novaTarefa.id_responsavel}
                onChange={alterarCampo}
                required
              >
                <option value="">Selecione um responsável</option>
                {adultos.map((adulto) => (
                  <option key={adulto.id_adulto} value={adulto.id_adulto}>
                    {adulto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Seção</label>
              <select
                name="id_secao"
                value={novaTarefa.id_secao}
                onChange={alterarCampo}
                required
              >
                <option value="">Selecione uma seção</option>
                {secoes.map((secao) => (
                  <option key={secao.id_secao} value={secao.id_secao}>
                    {secao.nome_secao}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={novaTarefa.descricao}
              onChange={alterarCampo}
              rows="4"
              required
            />
          </div>

          <button type="submit">Cadastrar tarefa</button>
        </form>
      </section>

      <section className="cards">
        {dashboard?.resumoPorStatus?.map((item) => (
          <DashboardCard
            key={item.status}
            titulo={item.status}
            valor={item.quantidade}
          />
        ))}
      </section>

      <section className="panel">
        <h2>Próximas tarefas</h2>

        <table className="tabela-tarefas">
          <colgroup>
            <col className="col-tarefa" />
            <col className="col-responsavel" />
            <col className="col-prazo" />
            <col className="col-prioridade" />
            <col className="col-status" />
            <col className="col-acoes" />
          </colgroup>

          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Responsável</th>
              <th>Prazo</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.id_tarefa}>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.responsavel}</td>
                <td>{formatarDataBrasil(tarefa.prazo)}</td>
                <td>{tarefa.prioridade}</td>
                <td>
                  <span className={`badge ${tarefa.status.replaceAll(' ', '-').toLowerCase()}`}>
                    {tarefa.status}
                  </span>
                </td>

                <td className="acoes">
                  {tarefa.status === 'Pendente' && (
                    <>
                      <button
                        className="btn-acao"
                        onClick={() => atualizarStatusTarefa(tarefa.id_tarefa, 'Em andamento')}
                      >
                        Iniciar
                      </button>

                      <button
                        className="btn-acao concluir"
                        onClick={() => atualizarStatusTarefa(tarefa.id_tarefa, 'Concluída')}
                      >
                        Concluir
                      </button>
                    </>
                  )}

                  {tarefa.status === 'Em andamento' && (
                    <>
                      <button
                        className="btn-acao concluir"
                        onClick={() => atualizarStatusTarefa(tarefa.id_tarefa, 'Concluída')}
                      >
                        Concluir
                      </button>

                      <button
                        className="btn-acao impedir"
                        onClick={() => atualizarStatusTarefa(tarefa.id_tarefa, 'Impedida')}
                      >
                        Impedir
                      </button>
                    </>
                  )}

                  {(tarefa.status === 'Concluída' || tarefa.status === 'Impedida') && (
                    <button
                      className="btn-acao"
                      onClick={() => atualizarStatusTarefa(tarefa.id_tarefa, 'Pendente')}
                    >
                      Reabrir
                    </button>
                  )}

                  <button
                    className="btn-acao excluir"
                    onClick={() => excluirTarefa(tarefa.id_tarefa)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default App