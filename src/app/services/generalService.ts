import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
@Injectable({ providedIn: "root" })
export class generalService {
  constructor() {}
  messageToNotification: string;
}
