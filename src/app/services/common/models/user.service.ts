import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToasterMessagePosition, ToasterMessageType } from '../../ui/custom-toastr.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';

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
}
 