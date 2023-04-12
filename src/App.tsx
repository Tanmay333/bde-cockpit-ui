import { Route } from "react-router-dom";
import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import urls from "./urls";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./styles.scss";
import Home from "./pages/Home";
import SelectWorkers from "./components/orderInfoCard/SelectWorkers";
import OrderDetails from "./components/orderInfoCard/OrderDetails";

setupIonicReact();

const App = () => {
  return (
    <IonApp>
      <IonPage id="main-content">
        <IonRouterOutlet>
          <Route path={urls.root} component={Home} />
          <Route exact path={urls.selectworkers} component={SelectWorkers}>
            <SelectWorkers />
          </Route>
          <Route exact path={urls.orderdetails} component={OrderDetails}>
            <OrderDetails />
          </Route>
        </IonRouterOutlet>
      </IonPage>
    </IonApp>
  );
};

export default App;
