import { Alertable } from "./Alertable";
import { ErrorAlertable } from "./ErrorAlertable";

export interface Notifier extends Alertable, ErrorAlertable {}