import {Injectable} from "@angular/core";
import {PROFILES} from "./mock-profiles";

@Injectable()
export class ProfilesProvider {
  private profiles:any;

  constructor() {
    this.profiles = PROFILES;
  }

  getAll() {
    return this.profiles;
  }

  getItem(id) {
    for (var i = 0; i < this.profiles.length; i++) {
      if (this.profiles[i].id === parseInt(id)) {
        return this.profiles[i];
      }
    }
    return null;
  }

  remove(item) {
    this.profiles.splice(this.profiles.indexOf(item), 1);
  }
}
