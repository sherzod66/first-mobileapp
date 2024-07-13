/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { AuthService } from "./src/services";
import "./src/i18n/i18n.config";

AuthService.setOnAppStartInterceptors();

AppRegistry.registerComponent(appName, () => App);
