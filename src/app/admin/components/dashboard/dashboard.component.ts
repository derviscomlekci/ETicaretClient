import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessagePosition, MessageType } from '../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(private alert: AlertifyService,spinner:NgxSpinnerService){
    super(spinner)
  }

  ngOnInit(): void {
    
  this.showSpinnerDummy(SpinnerType.Fire)

  }
  m(){

    this.alert.message("Merhaba",{
      MessageType:MessageType.Warning,
      Delay:5,
      Position:MessagePosition.TopLeft
    })
  }
  dismiss(){
    this.alert.dismiss()
  }

}
