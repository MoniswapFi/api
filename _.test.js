const path = require("path");
const fs = require("fs");
const { z } = require("zod");
const { isAddress } = require("ethereum-address");

const files = ["bera-bartio.json", "bera-mainnet.json"];
const directory = path.join(__dirname, "src/tokens");

const TokenInfo = z.array(
    z
        .object({
            name: z.string(),
            symbol: z.string(),
            address: z.string().refine((arg) => isAddress(arg)),
            logoURI: z.union([z.string().url().min(1), z.string().base64().min(1)]),
            decimals: z
                .number()
                .int()
                .max(2 ** 8),
            chainId: z.number().int(),
        })
        .strict()
);

const runCheck = () => {
    for (const file of files) {
        const concatenatedPath = path.join(directory, file);
        const fileContent = fs.readFileSync(concatenatedPath);
        const parsedContent = JSON.parse(fileContent.toString());

        const { error } = TokenInfo.safeParse(parsedContent);

        if (error) {
            console.error(error);
            process.exit(1);
        }
    }
};

runCheck();
