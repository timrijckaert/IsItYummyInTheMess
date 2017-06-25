import {lazy} from '../util/lazy';
import {NetworkService} from '../service/network/NetworkService';

const networkService = lazy(() => new NetworkService());

export {networkService};