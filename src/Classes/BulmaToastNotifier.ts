import { toast } from "bulma-toast";
import { Notifier } from "../Types/Notifier";

export class BulmaToastNotifier implements Notifier{
  alertError(message: string): void {
    toast({
      message, 
      type: 'is-danger', 
      position: 'top-center', 
      dismissible: true
    })
  }

  alert(message: string): void {
    toast({
      message, 
      type: 'is-link', 
      position: 'top-center', 
      dismissible: true, 
    })
  }
}