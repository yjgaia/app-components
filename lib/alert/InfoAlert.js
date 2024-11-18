import AppCompConfig from "../AppCompConfig.js";
import Alert from "./Alert.js";
export default class InfoAlert extends Alert {
    constructor(message) {
        super(".inco", {
            icon: new AppCompConfig.InfoIcon(),
            message,
        });
    }
}
//# sourceMappingURL=InfoAlert.js.map