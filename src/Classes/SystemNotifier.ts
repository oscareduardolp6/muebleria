import { Notifier } from "../Types/Notifier";

export class SystemNotifier implements Notifier{
  alert(message: string): void {
    alert(message)
  }
  alertError(message: string): void {
    alert(message)
  }
}