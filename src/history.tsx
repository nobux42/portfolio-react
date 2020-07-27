import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history'

ReactGA.initialize('UA-107600889-2');
const history = createBrowserHistory();
history.listen(({ pathname }) => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
});

export default history;