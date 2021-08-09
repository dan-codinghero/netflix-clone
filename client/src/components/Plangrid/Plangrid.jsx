import React, { Fragment, useRef } from 'react';
// import { Link, useHistory, useLocation } from 'react-router-dom';
// import Button from '../ui/button/button';
import Divider from '../UI/Divider/Divider';
import './Plangrid.css';
import { groupPlansByFieldName } from './plangrid-utils';
// import { plans } from '../../api/plans.api';
import useIntersectionObserver from '../../hooks/use-intersection-observer';
// import { ROUTES } from '../../constants/routes';

const initObserver = { threshold: [1] };

const Plangrid = (props) => {
    const { selectedPlan, handlePlanSelected, items, gridRowTitle } = props;
    const gridRef = useRef();

    const entry = useIntersectionObserver(gridRef, initObserver);

    const isSticky = !entry?.isIntersecting && entry?.intersectionRect?.top === 0;

    return (
        <Fragment>
            <div className="plan-grid" ref={gridRef}>
                <div className={`plans-row${isSticky ? ' sticky ' : ''}`}>
                    <div className="plans">
                        {items.map((plan) => {
                            return (
                                <div key={plan._id} className="plans__selector" onClick={() => handlePlanSelected(plan._id)}>
                                    <div className={`plans__title${plan._id === selectedPlan ? ' active-plan' : ''}`}>{plan.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {items.length &&
                    groupPlansByFieldName(items, gridRowTitle).map((feature, index, arr) => {
                        return (
                            <Fragment key={index}>
                                <div className="features">
                                    <div className="feature-description">
                                        <div>{feature.fieldDescription}</div>
                                    </div>
                                    <div className="feature-item">
                                        {feature.fieldValues.map((fieldValue, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`${items.findIndex((plan) => plan._id === selectedPlan) === i ? 'active-plan' : ''}`}
                                                >
                                                    {feature.fieldDescription === gridRowTitle.supportedDevices ? '✔' : fieldValue}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {index < arr.length - 1 ? <Divider size="xs" theme="light" /> : null}
                            </Fragment>
                        );
                    })}
            </div>
        </Fragment>
    );
};

export default Plangrid;
