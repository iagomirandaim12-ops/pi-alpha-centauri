import React,  { useEffect, useState } from 'react'
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

async function cadastrarTarefa(event) {
  event.preventDefault()

  if (!dataValidaBrasil(novaTarefa.prazo)) {
  setTipoMensagem('erro')
  setMensagem('Digite a data no formato dd/mm/aaaa.')

  setTimeout(() => {
    setMensagem('')
  }, 5000)

  return
}

    const partesData = novaTarefa.prazo.split('/')
    const prazoFormatado = `${partesData[2]}-${partesData[1]}-${partesData[0]}`


  await api.post('/tarefas', {
    ...novaTarefa,
    prazo: prazoFormatado
  })

  setTipoMensagem('sucesso')
  setMensagem('Tarefa cadastrada com sucesso!')

  setTimeout(() => {
  setMensagem('')
}, 5000)

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

    setTipoMensagem('sucesso')
    setMensagem('Status da tarefa atualizado com sucesso!')

    setTimeout(() => {
      setMensagem('')
    }, 5000)

    carregarDados()
  } catch (error) {
    setTipoMensagem('erro')
    setMensagem('Erro ao atualizar o status da tarefa.')

    setTimeout(() => {
      setMensagem('')
    }, 5000)
  }
}

async function excluirTarefa(idTarefa) {
  const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?')

  if (!confirmar) {
    return
  }

  try {
    await api.delete(`/tarefas/${idTarefa}`)

    setTipoMensagem('sucesso')
    setMensagem('Tarefa excluída com sucesso!')

    setTimeout(() => {
      setMensagem('')
    }, 5000)

    carregarDados()
  } catch (error) {
    setTipoMensagem('erro')
    setMensagem('Erro ao excluir a tarefa.')

    setTimeout(() => {
      setMensagem('')
    }, 5000)
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


<section className="panel">
  <h2>Cadastrar nova tarefa</h2>

  {mensagem && (
  <div className={`mensagem ${tipoMensagem}`}>
    {mensagem}
  </div>
)}

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
