const beraChainBartioTokens = require("../tokens/bera-bartio.json");
const beraChainMainnetTokens = require("../tokens/bera-mainnet.json");
const assert = require("assert");

const tokensDictionary = {
    80084: beraChainBartioTokens,
    bartio: beraChainBartioTokens,
    80094: beraChainMainnetTokens,
    berachain: beraChainMainnetTokens,
};

exports.getById = function (req, res) {
    try {
        const key = req.params.chainIdOrName;
        const result = tokensDictionary[key];
        assert.ok(result !== null && typeof result !== "undefined", "invalid chain id or name");

        return res.status(200).json(result.sort((a, b) => (a.symbol < b.symbol ? -1 : a.symbol > b.symbol ? +1 : 0)));
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getBySymbol = function (req, res) {
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
};
