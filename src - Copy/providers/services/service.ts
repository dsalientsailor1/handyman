import {Injectable} from "@angular/core";
import {SERVICES} from "./mock-services";

@Injectable()
export class ServiceProvider {
  private services:any;

  constructor() {
    this.services = SERVICES;
  }

  getAll() {
    return this.services;
  }

  getItem(id) {
    for (var i = 0; i < this.services.length; i++) {
      if (this.services[i].id === parseInt(id)) {
        return this.services[i];
      }
    }
    return null;
  }

  remove(item) {
    this.services.splice(this.services.indexOf(item), 1);
  }
}
