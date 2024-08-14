import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { enableScreens } from "react-native-screens";
import store from "./src/store/configureStore";
import Root from "./src/navigation/Root";
import React from "react";
import "./ignoreWarnings";
enableScreens();

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
