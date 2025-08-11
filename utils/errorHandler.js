// Middleware de tratamento de erros
function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Erros conhecidos (ex: validação) podem ter um status code específico
    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    // Erros inesperados
    res.status(500).json({ message: "Algo deu errado no servidor!" });
}

module.exports = errorHandler;
