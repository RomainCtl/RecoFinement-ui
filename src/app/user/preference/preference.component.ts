import { Component, OnInit } from '@angular/core';
import { PreferenceService } from 'src/app/services/user/preference.service';


@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {

  index: number = 0;
  preferences: string[];
  musics = [
    {
      title: "test1",
      author: "author1"
    },
    {
      title: "test2",
      author: "author2"
    },
    {
      title: "test3",
      author: "author3"
    },
    {
      title: "test4",
      author: "author1"
    },
    {
      title: "test5",
      author: "author2"
    },
    {
      title: "test6",
      author: "author3"
    },
    {
      title: "test7",
      author: "author1"
    },
    {
      title: "test8",
      author: "author2"
    },
    {
      title: "test9",
      author: "author3"
    },
    {
      title: "test10",
      author: "author1"
    },
    {
      title: "test11",
      author: "author2"
    },
    {
      title: "test12",
      author: "author3"
    }
  ]

  constructor(private preferencesService: PreferenceService) { 
    this.preferences = this.preferencesService.getPreferences();
  }

  ngOnInit(): void {
  }

  checkPreference(title: string) {
    console.log(this.preferences);
    if(this.preferences.includes(title)){
      return true;
    }
    return false;
  }

  onSave() {
    this.preferencesService.savePreferences().then(
      //TODO redirection
    )
  }
}
