export const formValidationProps = {
    required: { value: false, message: '' },
    minLength: { value: null, message: '' },
    maxLength: { value: null, message: '' },
    min: { value: null, message: '' },
    max: { value: null, message: '' },
    pattern: { value: null, message: '' },
    validate: { value: null, message: '' },
};

export const attributeDefinition = {
    min: ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range'],
    max: ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range'],
    minLength: ['text', 'search', 'url', 'tel', 'email', 'password'],
    maxLength: ['text', 'search', 'url', 'tel', 'email', 'password'],
    required: [
        'text',
        'search',
        'url',
        'tel',
        'email',
        'date',
        'month',
        'week',
        'time',
        'datetime-local',
        'number',
        'password',
        'checkbox',
        'radio',
        'file',
        'select-one',
        'select-multiple',
    ],
    validate: ['text', 'search', 'url', 'tel', 'email', 'date', 'month', 'week', 'time', 'datetime-local', 'number', 'password', 'file'],
    confirmation: ['text', 'search', 'url', 'tel', 'email', 'date', 'month', 'week', 'time', 'datetime-local', 'number', 'password'],
    pattern: ['text', 'search', 'url', 'tel', 'email', 'date', 'month', 'week', 'time', 'datetime-local', 'password'],
};

export const validInputRules = (type, rules) => {
    if (!type || !rules) return;
    const validRules = {};

    for (const key in rules) {
        if (Object.hasOwnProperty.call(rules, key)) {
            const inputs = attributeDefinition[key];

            if (inputs?.includes(type)) {
                validRules[key] = { ...rules[key] };
            }
        }
    }

    return { ...validRules };
};

export const validationEngine = ({ type, name, value, rules, compareFieldValue }) => {
    const invalidInputs = {};
    const validRules = validInputRules(type, rules);

    const filteredValue = typeof value === 'string' ? value.trim() : value;

    if (validRules.required) {
        let isValid = false;

        if (typeof value === 'string') isValid = value.trim();

        if (typeof value === 'boolean') isValid = value;

        if (Array.isArray(filteredValue) || type === 'file') isValid = filteredValue.length;

        if (!isValid) {
            invalidInputs[name] = {
                type: 'required',
                message: validRules.required.message ? validRules.required.message : '',
            };
            return invalidInputs;
        }
    }
    if (validRules.confirmation && value !== compareFieldValue) {
        invalidInputs[name] = {
            type: 'confirmation',
            message: validRules.confirmation.message ? validRules.confirmation.message : '',
        };
        return invalidInputs;
    }
    if (validRules.minLength && value.trim().length < +validRules.minLength.value) {
        invalidInputs[name] = {
            type: 'minLength',
            message: validRules.minLength.message ? validRules.minLength.message : '',
        };
        return invalidInputs;
    }
    if (validRules.maxLength && value.trim().length > +validRules.maxLength.value) {
        invalidInputs[name] = {
            type: 'maxLength',
            message: validRules.maxLength.message ? validRules.maxLength.message : '',
        };
        return invalidInputs;
    }
    if (validRules.max && +value > +validRules.max.value) {
        invalidInputs[name] = {
            type: 'max',
            message: validRules.max.message ? validRules.max.message : '',
        };
        return invalidInputs;
    }
    if (validRules.min && +value < +validRules.min.value) {
        invalidInputs[name] = {
            type: 'min',
            message: validRules.min.message ? validRules.min.message : '',
        };
        return invalidInputs;
    }
    if (validRules.pattern && !validRules.pattern.value.test(value)) {
        invalidInputs[name] = {
            type: 'pattern',
            message: validRules.pattern.message ? validRules.pattern.message : '',
        };
        return invalidInputs;
    }
    return invalidInputs;
};
