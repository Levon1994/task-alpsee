import { DARK_MODE } from 'configs/types';

export default (darkMode) => (
    {
        type: DARK_MODE,
        payload: darkMode
    }
);
