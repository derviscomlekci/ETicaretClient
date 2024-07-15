import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToasterMessagePosition, ToasterMessageType } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { MessageType } from './services/admin/alertify.service';
import { Router } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public authService:AuthService, private taosterService: CustomToastrService, private router: Router){
    authService.identityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.taosterService.message("Succesfully signed out.","Signed Out",{
      messageType: ToasterMessageType.Warning,
      position:  ToasterMessagePosition.TopRight
    })
  }
}
