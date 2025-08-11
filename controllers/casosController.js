const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository"); // Necessário para validações e bônus

// GET /casos (com bônus de filtro e busca)
async function getAllCasos(req, res) {
    try {
        // Bônus: Busca por termo (full-text search)
        if (req.query.q) {
            const query = req.query.q;
            const casos = await casosRepository.search(query);
            return res.json(casos);
        }

        // Bônus: Filtros (agente_id, status)
        const filters = {};
        if (req.query.agente_id) {
            filters.agente_id = req.query.agente_id;
        }
        if (req.query.status) {
            filters.status = req.query.status;
        }

        let casos;
        // Se houver filtros, usa a função findBy, senão, busca todos
        if (Object.keys(filters).length > 0) {
            casos = await casosRepository.findBy(filters);
        } else {
            casos = await casosRepository.findAll();
        }

        res.json(casos);
    } catch (error) {
        console.error("Erro ao buscar casos:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

// GET /casos/:id
async function getCasoById(req, res) {
    try {
        const caso = await casosRepository.findById(req.params.id);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        res.json(caso);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

// POST /casos
async function createCaso(req, res) {
    try {
        const { titulo, descricao, status, agente_id } = req.body;

        // Validações
        if (!titulo || !descricao || !status || !agente_id) {
            return res
                .status(400)
                .json({
                    message:
                        "Dados inválidos. Campos obrigatórios: titulo, descricao, status, agente_id.",
                });
        }
        if (status !== "aberto" && status !== "solucionado") {
            return res
                .status(400)
                .json({
                    message:
                        "O campo 'status' pode ser somente 'aberto' ou 'solucionado'.",
                });
        }
        // Verifica se o agente existe no banco
        const agenteExiste = await agentesRepository.findById(agente_id);
        if (!agenteExiste) {
            return res
                .status(400)
                .json({
                    message:
                        "O 'agente_id' fornecido não corresponde a um agente existente.",
                });
        }

        // Knex retorna um array com o(s) objeto(s) criado(s)
        const [newCaso] = await casosRepository.create({
            titulo,
            descricao,
            status,
            agente_id,
        });
        res.status(201).json(newCaso);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

// PUT /casos/:id
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
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

// PATCH /casos/:id
// Reutiliza a mesma lógica do PUT, pois nosso repositório já faz a atualização parcial.
const patchCaso = updateCaso;

// DELETE /casos/:id
async function deleteCaso(req, res) {
    try {
        // .del() ou remove() retorna o número de linhas deletadas
        const rowsDeleted = await casosRepository.remove(req.params.id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor" });
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
            // Isso indica uma inconsistência de dados, mas 404 é apropriado
            return res
                .status(404)
                .json({
                    message: "Agente responsável pelo caso não foi encontrado",
                });
        }

        res.json(agente);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

module.exports = {
    getAllCasos,
    getCasoById,
    createCaso,
    updateCaso,
    patchCaso,
    deleteCaso,
    getAgenteByCasoId,
};
