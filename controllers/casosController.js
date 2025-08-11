const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");

async function getAllCasos(req, res, next) {
    try {
        const casos = await casosRepository.findAll(req.query);
        res.json(casos);
    } catch (error) {
        next(error);
    }
}

async function getCasoById(req, res, next) {
    try {
        const caso = await casosRepository.findById(req.params.id);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        res.json(caso);
    } catch (error) {
        next(error);
    }
}

async function createCaso(req, res, next) {
    try {
        const { agente_id } = req.body;
        if (agente_id) {
            const agente = await agentesRepository.findById(agente_id);
            if (!agente) {
                return res
                    .status(400)
                    .json({ message: "O 'agente_id' fornecido não existe." });
            }
        }
        const [newCaso] = await casosRepository.create(req.body);
        res.status(201).json(newCaso);
    } catch (error) {
        next(error);
    }
}

async function updateCaso(req, res, next) {
    try {
        const [updatedCaso] = await casosRepository.update(
            req.params.id,
            req.body
        );
        if (!updatedCaso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        res.json(updatedCaso);
    } catch (error) {
        next(error);
    }
}

async function deleteCaso(req, res, next) {
    try {
        const rowsDeleted = await casosRepository.remove(req.params.id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

async function getAgenteByCasoId(req, res, next) {
    try {
        const caso = await casosRepository.findById(req.params.caso_id);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        if (!caso.agente_id) {
            return res
                .status(404)
                .json({ message: "Caso não possui agente responsável" });
        }
        const agente = await agentesRepository.findById(caso.agente_id);
        if (!agente) {
            return res
                .status(404)
                .json({ message: "Agente responsável não encontrado" });
        }
        res.json(agente);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCasos,
    getCasoById,
    createCaso,
    updateCaso,
    patchCaso: updateCaso,
    deleteCaso,
    getAgenteByCasoId,
};
