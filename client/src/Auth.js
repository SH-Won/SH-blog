import Loading from './components/Loading';
import { auth } from './utills/api';
import { changeRoute } from './utills/router';

import { removeItem, setItem } from './utills/storage';
export default function (page, option, prevRoute = null, admin = null) {
    // option ( true = need login , false = not to need)
    async function Authentication(arg) {
        const loading = new Loading({
            $target: arg.$target,
            initialState: true,
        });

        loading.render();

        const result = await auth();

        loading.setState(false);

        if (!result.user.isAuth) {
            removeItem('loginSuccess');
            if (option) {
                changeRoute('/login', { detail: { route: prevRoute } });
            } else {
                return new page({
                    ...arg,
                    user: result.user,
                });
            }
        } else {
            const { token, refreshToken } = result;
            setItem('authorization', token);
            setItem('refreshToken', refreshToken);
            setItem('loginSuccess', true);
            return new page({
                ...arg,
                user: result.user,
            });
        }
    }

    return Authentication;
}
