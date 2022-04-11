export const makeUpdatedModel = (args) => {
    const keys = Object.keys(args);
    let result = {};
    keys.filter(key => key !== 'id')
        .forEach((key) => {
            let newValue = {};
            if (args[key]) {
                if (key.endsWith('Id')) {
                    const simpleKey = key.replace('Id', '');
                    newValue = {
                        [simpleKey]: {
                            connect: {id: args[key]}
                        }
                    };
                } else {
                    newValue = {[key]: args[key]};
                }
            }
            result = {...result, ...newValue}
        });

    return result;
}

export const integerize = (v) => {
    if(typeof v === 'string') {
        const digitsInString = (v.match("[0-9]+")||[null]);
        const isAllDigits = digitsInString[0] === v;
        return isAllDigits ? parseInt(v, 10) : v;
    }
    return v;
}


