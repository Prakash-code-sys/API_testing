import Ajv from 'ajv';
const ajv = new Ajv({allErrors: true});

export function validateSchema(data, schema) {
    const validate = ajv.compile(schema);
    const isValid = validate(data);
    if (!isValid) {
        throw new Error(`Schema validation failed:\n${ajv.errorsText(validate.errors)}`);
    }

    return true;


}
