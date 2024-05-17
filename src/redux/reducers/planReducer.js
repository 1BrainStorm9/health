const initialState = {
    currentPlanId: null,
};

const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PLAN_ID':
            return {
                ...state,
                currentPlanId: action.payload,
            };
        default:
            return state;
    }
};

export default planReducer;