const stripCosmosSystemValues = (obj) => {
    const systemKeys = ["_id", "__v"];

    const strippedObj = { ...obj };

    for (const key of systemKeys) {
        delete strippedObj[key];
    }

    return strippedObj;
}

module.exports = { stripCosmosSystemValues };