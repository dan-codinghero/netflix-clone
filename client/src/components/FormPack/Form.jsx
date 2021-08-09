import React, { Fragment } from 'react';
import { emailPattern } from '../../constants/regex';
import useForm from '../../hooks/use-form/use-form';
import FloatInputContents from '../UI/Input/FloatInputContents';
import Notify from '../UI/Notification/Notify';
import './FormPack.css';

export const FIELDS = {
    EMAIL: {
        name: 'email',
        defaultValue: null,
        label: 'Email',
        errorClass: 'error',
        errorMessage: 'Please enter a valid email.',
        className: '',
        validations: { required: { value: true }, pattern: { value: emailPattern } },
        attributes: {
            type: 'email',
            // defaultValue: null,
        },
    },
    PASSWORD: {
        name: 'password',
        label: 'Password',
        errorClass: 'error',
        errorMessage: 'Your password must contain between 4 and 60 characters.',
        className: '',
        validations: { required: { value: true }, minLength: { value: 4 }, maxLength: { value: 60 } },
        attributes: {
            type: 'password',
        },
    },
    PROFILE1: {
        name: 'account-owner',
        label: 'Your Account',
        errorClass: 'error',
        errorMessage: 'Name should be less than 15 characters.',
        className: '',
        validations: { required: { value: true }, maxLength: { value: 15 } },
        attributes: {
            type: 'text',
        },
    },
    PROFILE2: {
        name: 'profile-2',
        label: 'Name',
        errorClass: 'error',
        errorMessage: 'Name should be less than 15 characters.',
        className: '',
        validations: { maxLength: { value: 15 } },
        attributes: {
            type: 'text',
        },
    },
    PROFILE3: {
        name: 'profile-3',
        label: 'Name',
        errorClass: 'error',
        errorMessage: 'Name should be less than 15 characters.',
        className: '',
        validations: { maxLength: { value: 15 } },
        attributes: {
            type: 'text',
        },
    },
    PROFILE4: {
        name: 'profile-4',
        label: 'Name',
        errorClass: 'error',
        errorMessage: 'Name should be less than 15 characters.',
        className: '',
        validations: { maxLength: { value: 15 } },
        attributes: {
            type: 'text',
        },
    },
    PROFILE5: {
        name: 'profile-5',
        label: 'Name',
        errorClass: 'error',
        errorMessage: 'Name should be less than 15 characters.',
        className: '',
        validations: { maxLength: { value: 15 } },
        attributes: {
            type: 'text',
        },
    },
};

export const FormPack = ({ render, defaultValues = {} }) => {
    const {
        formState: { errors, isSubmitting },
        register,
        handleSubmit,
    } = useForm(defaultValues);

    return <Fragment>{render(errors, register, handleSubmit, isSubmitting)}</Fragment>;
};

export const FormFields = ({ fields, errors, register }) => {
    return (
        <Fragment>
            {fields.map((field) => {
                return (
                    <div key={field.name} className="cpInput-group">
                        <FloatInputContents>
                            <input
                                className={`floating-input${errors[field.name] ? ` ${field.errorClass}` : ''}${
                                    field.className ? ` ${field.className}` : ''
                                } `}
                                {...register(`${field.name}`, { ...field.validations })}
                                {...field.attributes}
                                placeholder=" "
                            />
                            <label className="floating-label">{field.label}</label>
                        </FloatInputContents>
                        {errors[field.name] && <Notify type="error">{errors[field.name].message || field.errorMessage}</Notify>}
                    </div>
                );
            })}
        </Fragment>
    );
};
