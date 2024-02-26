import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }
  message(message:string,title:string,options:Partial<ToastrOptions>){
    this.toastr[options.messageType](message,title,{positionClass:options.position});
  }
}
export class ToastrOptions{
  messageType:ToasterMessageType;
  position:ToasterMessagePosition;
}

export enum ToasterMessageType{
  Error="error",
  Success="success",
  Info="info",
  Warning="warning"
}

export enum ToasterMessagePosition{
  BottomRigt="toast-bottom-right",
  BottomCenter="toast-bottom-center",
  BottomLeft="toast-bottom-left",
  BottomFullWidth="toast-bottom-full-width",
  TopLeft="toast-top-left",
  TopRight="toast-top-right",
  TopCenter="toast-top-center",
  TopFullWidth="toast-top-full-width"
}
