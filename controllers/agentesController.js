const agentesRepository = require("../repositories/agentesRepository");

async function getAllAgentes(req, res) {
    try {
        let agentes = await agentesRepository.findAll();

        // Bônus: Filtrar por cargo
        if (req.query.cargo) {
            agentes = agentes.filter(
                (agente) =>
                    agente.cargo.toLowerCase() === req.query.cargo.toLowerCase()
            );
        }

        // Bônus: Ordenar por data de incorporação
        if (req.query.sort === "dataDeIncorporacao") {
            agentes.sort(
                (a, b) =>
                    new Date(a.dataDeIncorporacao) -
                    new Date(b.dataDeIncorporacao)
            );
        } else if (req.query.sort === "-dataDeIncorporacao") {
            agentes.sort(
                (a, b) =>
                    new Date(b.dataDeIncorporacao) -
                    new Date(a.dataDeIncorporacao)
            );
        }

        res.json(agentes);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agentes" });
    }
}

async function getAgenteById(req, res) {
    try {
        const agente = await agentesRepository.findById(req.params.id);
        if (!agente) {
            return res.status(404).json({ message: "Agente não encontrado" });
        }
        res.json(agente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agente" });
    }
}

async function createAgente(req, res) {
    try {
        const [newAgente] = await agentesRepository.create(req.body);
        res.status(201).json(newAgente);
    } catch (error) {
        res.status(400).json({
            message: "Dados inválidos para criação do agente",
        });
    }
}

async function updateAgente(req, res) {
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
        res.status(400).json({ message: "Dados inválidos para atualização" });
    }
}

async function deleteAgente(req, res) {
    try {
        const rowsDeleted = await agentesRepository.remove(req.params.id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: "Agente não encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar agente" });
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
