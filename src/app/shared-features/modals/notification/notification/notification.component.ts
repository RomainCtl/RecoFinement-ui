import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/app-view/services/notification/toast.service';

declare var $: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  title = '';
  error = '';
  id = '';

  constructor(
    public notificationService: ToastService
  ) { }

  ngOnInit(): void {
  }

  isTemplate(toast): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
