import { history } from '../../../history';

export const shouldLogout = () => {
    localStorage.clear();
    history.push('/sso');
    return (dispatch) => {
        dispatch({
            type: 'SHOULD_LOGOUT',
            payload: true,
        });
    };
};
