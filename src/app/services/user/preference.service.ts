import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  preferences: string[];

  constructor() {
    this.preferences =  ["test1", "test4"];
  }

  add(title: string) {
    if(this.preferences.includes(title)) {
      this.remove(title);
    } else {
      this.preferences.push(title);
    }
  }

  remove(title: string) {
    this.preferences.forEach( (item, index) => {
      if(item === title) this.preferences.splice(index,1);
    });
  }

  getPreferences(): string[] {
    console.log(this.preferences);
    return this.preferences;
  }

  savePreferences() {
    return new Promise((resolve, reject) => {
      //TODO send to database...
    
    });
  }
  
}
