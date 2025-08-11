const agentesRepository = require("../repositories/agentesRepository");

// A função agora é 'async'
async function getAllAgentes(req, res) {
    // Usamos 'await' para esperar a resposta do banco
    const agentes = await agentesRepository.findAll();
    res.json(agentes);
}

async function getAgenteById(req, res) {
    const agente = await agentesRepository.findById(req.params.id);
    if (!agente) {
        return res.status(404).json({ message: "Agente não encontrado" });
    }
    res.json(agente);
}

async function createAgente(req, res) {
    // O retorno de 'create' é um array com o objeto criado
    const [newAgente] = await agentesRepository.create(req.body);
    res.status(201).json(newAgente);
}

async function updateAgente(req, res) {
    const [updatedAgente] = await agentesRepository.update(
        req.params.id,
        req.body
    );
    if (!updatedAgente) {
        return res.status(404).json({ message: "Agente não encontrado" });
    }
    res.json(updatedAgente);
}

// ... e assim por diante para patch e delete

async function deleteAgente(req, res) {
    // .del() retorna o número de linhas deletadas
    const rowsDeleted = await agentesRepository.remove(req.params.id);
    if (rowsDeleted === 0) {
        return res.status(404).json({ message: "Agente não encontrado" });
    }
    res.status(204).send();
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    patchAgente: updateAgente, // PATCH pode reutilizar a lógica do PUT
    deleteAgente,
};
