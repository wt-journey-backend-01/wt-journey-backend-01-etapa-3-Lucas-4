const agentesRepository = require("../repositories/agentesRepository");

async function getAllAgentes(req, res, next) {
    try {
        const agentes = await agentesRepository.findAll(req.query);
        res.json(agentes);
    } catch (error) {
        next(error);
    }
}

async function getAgenteById(req, res, next) {
    try {
        const agente = await agentesRepository.findById(req.params.id);
        if (!agente) {
            return res.status(404).json({ message: "Agente não encontrado" });
        }
        res.json(agente);
    } catch (error) {
        next(error);
    }
}

async function createAgente(req, res, next) {
    try {
        const [newAgente] = await agentesRepository.create(req.body);
        res.status(201).json(newAgente);
    } catch (error) {
        next(error);
    }
}

async function updateAgente(req, res, next) {
    try {
        const [updatedAgente] = await agentesRepository.update(
            req.params.id,
            req.body
        );
        if (!updatedAgente) {
            return res.status(404).json({ message: "Agente não encontrado" });
        }
        res.json(updatedAgente);
    } catch (error) {
        next(error);
    }
}

async function deleteAgente(req, res, next) {
    try {
        const rowsDeleted = await agentesRepository.remove(req.params.id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: "Agente não encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    patchAgente: updateAgente,
    deleteAgente,
};
