import jsyaml from 'js-yaml';

/* eslint-disable */
const flattenHash = (data) => {
    let result = {};
    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            let l;
            for (let i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop + "[" + i + "]");
            if (l === 0)
                result[prop] = [];
        } else {
            let isEmpty = true;
            for (let p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "/" + p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}

const unflattenHash = (data) => {
    if (Object(data) !== data || Array.isArray(data))
        return data;
    let regex = /\.?([^/\[\]]+)|\[(\d+)\]/g,
        resultholder = {};
    for (let p in data) {
        let cur = resultholder,
            prop = "",
            m;
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
        cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
};

const sortObjectByKeys = (hash, values) => {
    const keys = Object.keys(hash);
    let orderedHash = [];
    keys.sort(function(a, b) {
        return values[a].key.localeCompare(values[b].key)
    });
    keys.forEach(function(k) {
        orderedHash.push(hash[k]);
    });

    return orderedHash;
}

const fillSpecWithValues = (parsedSpec, values) => {
    const leafValues = values.filter((value) => !value.key.endsWith(">"))
    const nodeValues = sortObjectByKeys(values.filter((value) => value.key.endsWith(">")), values)
    let flatten = flattenHash(parsedSpec);
    leafValues.forEach((value) => {
        flatten[value.key] = value.value
    })

    let stringifiedJson = JSON.stringify(flatten);
    nodeValues.forEach((value) => {
        stringifiedJson = stringifiedJson.replaceAll(value.key, value.value)
    })
    const parsedJson = JSON.parse(stringifiedJson);
    const unflatten = unflattenHash(parsedJson)
    const parsedYml = jsyaml.dump(unflatten);
    return parsedYml;
}

export default fillSpecWithValues;