import { Injectable } from "@angular/core";
declare let alertify: any;

@Injectable({
  providedIn: "root"
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  success(meessage: string) {
    alertify.success(meessage);
  }

  error(meessage: string) {
    alertify.error(meessage);
  }

  warning(meessage: string) {
    alertify.warning(meessage);
  }

  message(meessage: string) {
    alertify.message(meessage);
  }
}
