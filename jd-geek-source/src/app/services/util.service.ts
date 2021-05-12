import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  saveItem_Local(saveKey: string, productSku: string): void {
    localStorage.setItem(saveKey, productSku);
  }

  getItems_Local(saveKey: string): string {
    return localStorage.getItem(saveKey);
  }

  saveItem_Session(saveKey: string, productSku: string): void {
    sessionStorage.setItem(saveKey, productSku);
  }

  getItems_Session(saveKey: string): string {
    return sessionStorage.getItem(saveKey);
  }
}
