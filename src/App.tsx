import { Route } from 'react-router-dom';
import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import urls from './urls';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './styles.scss';
import Home from './pages/Home';
import SelectTeamSize from './components/selectWorkers/SelectTeamSize';
import OrderDetails from './components/orderDetails/OrderDetails';
import ConfirmOrderdetails from './components/confirmOrderDetails/ConfirmOrderDetails';
import DowntimeType from './components/donwtimeType/DowntimeType';
import useWebSocket from './store/hooks/useWebSocket';
import { useEffect } from 'react';
import EditOrderdetails from './components/editOrderDetails/EditOrderDetails';
import EditTeamSize from './components/editOrderDetails/EditTeamSize';

setupIonicReact();

const App: React.FC = () => {
  const { sendMessage, isConnected } = useWebSocket();

  const message = {
    action: 'getCurrentProductionState',
    stationId: '1.203.4.245',
  };

  useEffect(() => {
    if (isConnected === true) {
      sendMessage(message);
    }
  }, [isConnected]);

  return (
    <IonApp>
      <IonPage id="main-content">
        <IonRouterOutlet>
          <Route path={urls.root} component={Home} />
          <Route exact path={urls.selectteamsize} component={SelectTeamSize}>
            <SelectTeamSize />
          </Route>
          <Route exact path={urls.orderdetails} component={OrderDetails}>
            <OrderDetails />
          </Route>
          <Route
            exact
            path={urls.confirmorderdetails}
            component={ConfirmOrderdetails}
          >
            <ConfirmOrderdetails />
          </Route>
          <Route exact path={urls.downtimetype}>
            <DowntimeType />
          </Route>
          <Route
            exact
            path={urls.editorderdetails}
            component={EditOrderdetails}
          >
            <EditOrderdetails />
          </Route>
          <Route exact path={urls.editteamsize} component={EditTeamSize}>
            <EditTeamSize />
          </Route>
        </IonRouterOutlet>
      </IonPage>
    </IonApp>
  );
};

export default App;
