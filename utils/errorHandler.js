function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    // Erros de violação de constraint do banco
    if (err.code === "23502" || err.code === "22P02") {
        // not_null_violation ou invalid_text_representation
        return res.status(400).json({
            message: "Payload inválido ou campos obrigatórios ausentes.",
        });
    }

    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
}

module.exports = errorHandler;
