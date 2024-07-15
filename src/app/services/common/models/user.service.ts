import { Observable, catchError, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToasterMessagePosition, ToasterMessageType } from '../../ui/custom-toastr.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { MessagePosition } from '../../admin/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toasterService: CustomToastrService) { }

   async create(user: User): Promise<Create_User>{
    const observable: Observable<Create_User |User>= this.httpClientService.post<Create_User | User>({
      controller:"users"
    },user);

    return await firstValueFrom(observable) as Create_User;
  }


  async login(usernameOrEmail: string, password: string, callbackFunction?:()=>void): Promise<any>{
    const observable: Observable<any | TokenResponse>= this.httpClientService.post<any | TokenResponse>({
      controller:"users",
      action:"login"
    },{usernameOrEmail,password})

    const tokenResponse: TokenResponse= await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){

      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      
      this.toasterService.message("Login process successfully.","Login", {
        messageType:ToasterMessageType.Success,
        position: ToasterMessagePosition.TopRight
      })
    }

    callbackFunction();
  }

  async googleLogin(user: SocialUser, callbackFunction?: () => void): Promise<any> {
    console.log('Sending user data:', user);
  
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: "users",
      action: "google-login",
    }, user);
  
    try {
      const response = await firstValueFrom(observable.pipe(
        catchError(err => {
          console.error('Error during Google login:', err);
          throw err;
        })
      ));
  
      console.log('Response from server:', response);
  
      if ('token' in response) {
        const tokenResponse = response as TokenResponse;
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        this.toasterService.message("Login with Google was successful.", "Login Google", {
          messageType: ToasterMessageType.Success,
          position: ToasterMessagePosition.TopRight
        });
        if (callbackFunction) {
          callbackFunction();
        }
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Failed to login with Google:', error);
    }
  }
}
 