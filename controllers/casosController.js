const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");

async function getAllCasos(req, res) {
    try {
        // Bônus: busca por termo
        if (req.query.q) {
            const casos = await casosRepository.search(req.query.q);
            return res.json(casos);
        }

        // Bônus: filtros
        const filter = {};
        if (req.query.agente_id) filter.agente_id = req.query.agente_id;
        if (req.query.status) filter.status = req.query.status;

        let casos;
        if (Object.keys(filter).length > 0) {
            casos = await casosRepository.findBy(filter);
        } else {
            casos = await casosRepository.findAll();
        }

        res.json(casos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar casos" });
    }
}

async function getCasoById(req, res) {
    try {
        const caso = await casosRepository.findById(req.params.id);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        res.json(caso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar caso" });
    }
}

async function createCaso(req, res) {
    try {
        const { agente_id } = req.body;
        // Valida se o agente existe antes de criar o caso
        const agente = await agentesRepository.findById(agente_id);
        if (!agente) {
            return res.status(400).json({
                message:
                    "O 'agente_id' fornecido não corresponde a um agente existente.",
            });
        }

        const [newCaso] = await casosRepository.create(req.body);
        res.status(201).json(newCaso);
    } catch (error) {
        res.status(400).json({
            message: "Dados inválidos para criação do caso",
        });
    }
}

async function updateCaso(req, res) {
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
        res.status(400).json({ message: "Dados inválidos para atualização" });
    }
}

async function deleteCaso(req, res) {
    try {
        const rowsDeleted = await casosRepository.remove(req.params.id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar caso" });
    }
}

// Bônus: GET /casos/:caso_id/agente
async function getAgenteByCasoId(req, res) {
    try {
        const caso = await casosRepository.findById(req.params.caso_id);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        const agente = await agentesRepository.findById(caso.agente_id);
        if (!agente) {
            return res
                .status(404)
                .json({ message: "Agente responsável não encontrado" });
        }

        res.json(agente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agente do caso" });
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
