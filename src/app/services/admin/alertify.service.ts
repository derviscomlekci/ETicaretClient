import { Injectable } from '@angular/core';
declare var alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message: string,options: Partial<AlertifyOptions>){
    alertify.set('notifier','delay',options.Delay)
    alertify.set('notifier','position',options.Position);
    const msg=alertify[options.MessageType](message);
    if(options.DismissOthers)
    msg.dismissOthers()
  }
  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  MessageType: MessageType=MessageType.Message;
  Position: MessagePosition=MessagePosition.BottomCenter;
  Delay:number=3;
  DismissOthers:boolean=false;  
}

export enum MessageType{
  Error="error",
  Message="message",
  Success="success",
  Notify="notify",
  Warning="warning"
}

export enum MessagePosition{
  BottomRigt="bottom-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left",
  TopLeft="top-left",
  TopRight="top-right",
  TopCenter="top-center"
}