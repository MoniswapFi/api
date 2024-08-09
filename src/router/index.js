const { Router } = require("express");
const beraChainBartioTokens = require("../tokens/bera-bartio.json");
const assert = require("assert");

const tokensDictionary = {
    80084: beraChainBartioTokens,
    bartio: beraChainBartioTokens,
};

const router = Router();

router.get("/tokens/:chainIdOrName", (req, res) => {
    try {
        const key = req.params.chainIdOrName;
        const result = tokensDictionary[key];
        assert.ok(result !== null && typeof result !== "undefined", "invalid chain id or name");

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/tokens/:chainIdOrName/:addressOrSymbol", (req, res) => {
    try {
        const key = req.params.chainIdOrName;
        const addOrSym = req.params.addressOrSymbol;
        const tokens = tokensDictionary[key];
        assert.ok(tokens !== null && typeof tokens !== "undefined", "invalid chain id or name");

        const result = tokens.find(
            (token) =>
                token.address.toLowerCase() === addOrSym.toLowerCase() ||
                token.symbol.toLowerCase() === addOrSym.toLowerCase()
        );
        assert.ok(result !== null && typeof result !== "undefined", "token not found");

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
