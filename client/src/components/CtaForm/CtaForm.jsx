import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './CtaForm.css';

import { FormFields, FormPack } from '../FormPack/Form';
import { VscChevronRight } from 'react-icons/vsc';
import Spinner from '../UI/Spinner/Spinner';

const CtaForm = (props) => {
    const { btnText = 'Submit', btnClasses = '', handleSubmission, showLoader = false, fields } = props;

    // create utitity function to handle
    const { defaultValue, name } = fields[0];

    const defaultValues = defaultValue ? { [name]: defaultValue } : {};

    return (
        <Fragment>
            <FormPack
                defaultValues={defaultValues}
                render={(errors, register, handleSubmit, isSubmitting) => {
                    return (
                        <form onSubmit={handleSubmit(handleSubmission)} style={{ textAlign: 'left' }}>
                            <div className="cta-form__section">
                                <div className="cta-form__field">
                                    <FormFields fields={fields} register={register} errors={errors} />
                                </div>

                                <div className="cta-form__button">
                                    <button className={`button button--brand ${btnClasses}`}>
                                        {showLoader && isSubmitting ? (
                                            <Spinner />
                                        ) : (
                                            <Fragment>
                                                <span>{btnText}</span>
                                                <span>
                                                    <VscChevronRight />
                                                </span>
                                            </Fragment>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    );
                }}
            />
        </Fragment>
    );
};

CtaForm.propTypes = {
    // title: PropTypes.string.isRequired,
    // disclaimer: PropTypes.string,
    btnText: PropTypes.string.isRequired,
};

export default CtaForm;
