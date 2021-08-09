import { useCallback, useRef, useState } from 'react';
import { formValidationProps, validationEngine } from './utils/use-form-utils';

const initFormState = {
    submitCount: 0,
    isValid: false,
    errors: {},
    isSubmitting: false,
};

const useForm = (defaultValues = {}) => {
    const [formState, setFormState] = useState(initFormState);
    const formStateRef = useRef(initFormState);
    const formInputs = useRef({});
    // const onSubmit = useRef();

    // const { isValid, isSubmitting } = formState;
    // useEffect(() => {
    //     if (!onSubmit.current || !isValid) return;

    //     // onSubmit.current.submitHandler();
    // }, [isValid, isSubmitting]);

    const getValues = useCallback((name = '') => {
        const formValues = {};

        if (name.trim().length) return (formValues[name] = formInputs.current[name].attributes.value);
        const inputs = { ...formInputs.current };
        for (const fieldName in inputs) {
            if (Object.hasOwnProperty.call(inputs, fieldName)) {
                formValues[fieldName] = formInputs.current[fieldName].attributes.value;
            }
        }

        return formValues;
    }, []);

    const handleSubmit = useCallback(
        (onSubmitFn) => {
            return function (e) {
                e.preventDefault();

                const form = e.target;
                const serializeForm = {};
                const invalidInputs = {};

                for (const element of form.elements) {
                    if (element.nodeName === 'BUTTON') continue;

                    const name = element.getAttribute('name');
                    if (!name) continue;
                    const { type } = element;
                    const { value } = formInputs.current[name].attributes;

                    serializeForm[name] = value;
                    const compareFieldName = formInputs.current[name].attributes.rules?.confirmation?.value;

                    const compareFieldValue = compareFieldName ? getValues(compareFieldName) : '';
                    const errors = validationEngine({ type, name, value, rules: formInputs.current[name].attributes.rules, compareFieldValue });

                    if (Object.keys(errors).length !== 0)
                        invalidInputs[name] = {
                            ...errors[name],
                        };
                }

                const inputsWithError = Object.keys(invalidInputs);
                if (inputsWithError[0]) formInputs.current[inputsWithError[0]].attributes.ref.focus();

                if (inputsWithError.length !== 0) {
                    formStateRef.current.submitCount += 1;
                    formStateRef.current.errors = { ...invalidInputs };
                    formStateRef.current.isValid = false;
                    formStateRef.current.isSubmitting = false;
                }
                if (!inputsWithError.length) {
                    // valid.current = true;
                    formStateRef.current.isValid = true;
                    formStateRef.current.isSubmitting = false;

                    onSubmitFn(serializeForm);
                } else {
                    setFormState({ ...formStateRef.current });
                }

                // onSubmit.current = {
                //     submitHandler: function () {
                //         onSubmitFn(serializeForm);
                //     },
                // };
            };
        },
        [getValues]
    );

    const handleChange = useCallback(
        (e) => {
            const { type } = e.target;
            const name = e.target.getAttribute('name');
            let value = e.target.value;

            if (type === 'checkbox') value = e.target.checked;

            if (type === 'select-multiple') value = [...e.target.options].filter((opt) => opt.selected).map((opt) => opt.value);

            if (type === 'file') value = e.target.files;

            formInputs.current[name].attributes.value = value;

            //  || formStateRef.current.submitCount > 0
            if (formStateRef.current.submitCount > 0) {
                const compareFieldName = formInputs.current[name].attributes.rules?.confirmation?.value;

                const compareFieldValue = compareFieldName ? getValues(compareFieldName) : '';

                const errors = validationEngine({ type, name, value, rules: formInputs.current[name].attributes.rules, compareFieldValue });

                if (formStateRef.current.errors[name]) {
                    const prevErrorType = formStateRef.current.errors[name].type;
                    if (errors[name]) {
                        if (errors[name].type !== prevErrorType) {
                            formStateRef.current.errors = { ...formStateRef.current.errors, ...errors };
                            setFormState({ ...formStateRef.current });
                        }
                    } else {
                        delete formStateRef.current.errors[name];
                        setFormState({ ...formStateRef.current });
                    }
                    return;
                }

                if (errors[name]) {
                    formStateRef.current.errors = { ...formStateRef.current.errors, ...errors };
                    setFormState({ ...formStateRef.current });
                }
            }
        },
        [getValues]
    );

    const registerNode = useCallback(
        (ref) => {
            if (!ref) return;

            const name = ref.getAttribute('name');
            ref.value = defaultValues[name] || ref.value;
            let value = ref.value;

            if (ref.hasAttribute('value')) ref.removeAttribute('value');
            // if (e.target.hasAttribute('value')) e.target.removeAttribute('value');
            if (ref.type === 'checkbox') value = ref.checked;

            if (ref.type === 'select-multiple') value = [...ref.options].filter((opt) => opt.selected).map((opt) => opt.value);

            if (ref.type === 'file') value = ref.files;

            formInputs.current[name]['attributes'] = {
                ...formInputs.current[name]['attributes'],

                ref: ref,
                value: value,
            };
        },
        [defaultValues]
    );

    const reset = useCallback((names = {}) => {
        const form = formInputs.current;

        formStateRef.current.isValid = false;
        for (const key in names) {
            if (Object.hasOwnProperty.call(names, key)) {
                if (form[key]) {
                    form[key].attributes.value = names[key];
                    form[key].attributes.ref.value = names[key];
                }
            }
        }
    }, []);

    const register = useCallback(
        (name, attributes = formValidationProps) => {
            if (!formInputs.current[name])
                formInputs.current[name] = {
                    attributes: {
                        name: name,
                        rules: {
                            ...attributes,
                        },
                        ref: null,
                        value: null,
                    },
                };

            return {
                name,
                onChange: handleChange,
                onBlur: handleChange,
                ref: registerNode,
            };
        },
        [registerNode, handleChange]
    );

    return { formState, register, handleSubmit, getValues, reset };
};

export default useForm;
