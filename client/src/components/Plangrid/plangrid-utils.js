export const groupFeatures = (plans, features) => {
    let sortedPlans = plans.sort((a, b) => a.order - b.order);

    /* find all related feature by description */
    let featureOrderedByDesc = sortedPlans
        .map((plan) => {
            return features.filter((feature) => feature.planId === plan.id);
        })
        .flat();

    /* find unique feature description */
    const uniqueDescription = [...new Set(features.map((feature) => feature.description))];

    /* merge all feature with same decription */
    const groupedFeatures = [];
    uniqueDescription.forEach((desc) => {
        let featureValues = [];
        featureOrderedByDesc.forEach((feature) => {
            if (desc === feature.description) {
                featureValues.push({
                    plan: plans.find((plan) => plan.id === feature.planId).name,
                    shortName: feature.shortName,
                    feat: feature.feature,
                });
            }
        });
        groupedFeatures.push({ name: desc, features: featureValues });
    });

    return groupedFeatures;
};

export const groupPlansByFieldName = (plans, fieldName) => {
    if (!plans.length) return;
    const keys = Object.getOwnPropertyNames(...plans).filter((key) => Object.getOwnPropertyNames(fieldName).find((el) => key === el));

    const grouping = keys.map((key) => {
        const values = [];
        plans.forEach((plan) => {
            for (const prop in plan) {
                if (prop === key) {
                    values.push(plan[prop]);
                }
            }
        });
        return {
            fieldDescription: fieldName[key],
            fieldValues: values,
        };
    });

    return grouping;
};
