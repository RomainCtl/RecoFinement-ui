import { Component, Input, OnInit } from '@angular/core';
import { PreferenceService } from 'src/app/services/user/preference.service';

@Component({
  selector: 'app-card-preference',
  templateUrl: './card-preference.component.html',
  styleUrls: ['./card-preference.component.scss']
})
export class CardPreferenceComponent implements OnInit {

  selected: boolean = false;

  @Input() title: string;
  @Input() author: string;
  @Input() preference: boolean;

  constructor(private preferencesService: PreferenceService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.preferencesService.add(this.title);
    if (this.selected)
      this.selected = false;
    else
      this.selected = true;
  }

}
