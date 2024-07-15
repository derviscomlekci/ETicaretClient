import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToasterMessagePosition, ToasterMessageType } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated, AuthService } from '../../services/common/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const jwtHelper: JwtHelperService=inject(JwtHelperService);
  const router: Router=inject(Router);
  const toasterService: CustomToastrService=inject(CustomToastrService);
  const spinner: NgxSpinnerService=inject(NgxSpinnerService);

  spinner.show(SpinnerType.BallSpinClockwise);


  // const token: string=localStorage.getItem("accessToken");
  
  // //const decodeToken=jwtHelper.decodeToken(token);
  // //const expirationDate: Date=jwtHelper.getTokenExpirationDate(token);
  // let expired: boolean;
  // try{
  //   expired=jwtHelper.isTokenExpired(token);

  // }
  // catch{
  //   expired=true;
  // }

  debugger;

  if(!_isAuthenticated){
    router.navigate(["login"],{queryParams:{returnUrl: state.url}});
    toasterService.message("You should login.", "Unauthorized Access",{
      messageType: ToasterMessageType.Warning,
      position: ToasterMessagePosition.TopRight
    })
  }

  debugger

  spinner.hide(SpinnerType.BallSpinClockwise);
  return true;
};
