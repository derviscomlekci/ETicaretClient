import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl:string) { }

  private Url(requestParameter: Partial<RequestParameters>):string{
    
    //eğer ekstra bir base url geldiyse onu kulan gelmediyse hazır olanı çek
    return `${requestParameter.baseUrl?requestParameter:this.baseUrl}/${requestParameter.controller}${requestParameter.action?`/${requestParameter.action}`:""}`;
  }

  get<T>(requestParameter: Partial<RequestParameters>,id?:string):Observable<T>{
    let url:string="";

    if(requestParameter.fullEndPoints)
      url=requestParameter.fullEndPoints;
    else
      url=`${this.Url(requestParameter)}${id?`/${id}`:""}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`;

    return this.httpClient.get<T>(url,{headers:requestParameter.headers})//genericden dönen tip  Observable olduğu için belirttik
  }
  post<T>(requestParameter: Partial<RequestParameters>,body: Partial<T>):Observable<T>{
    let url:string="";

    if(requestParameter.fullEndPoints)
      url=requestParameter.fullEndPoints;
    else
      url=`${this.Url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`;


    return this.httpClient.post<T>(url,body,{headers:requestParameter.headers});

  }
  put<T>(requestParameter: Partial<RequestParameters>,body: Partial<T>):Observable<T>{
    let url:string="";

    if(requestParameter.fullEndPoints)
      url=requestParameter.fullEndPoints;
    else
      url=`${this.Url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`;

    return this.httpClient.put<T>(url,body,{headers:requestParameter.headers});
  }
  delete<T>(requestParameter: Partial<RequestParameters>,id:string){
    let url:string="";

    if(requestParameter.fullEndPoints)
      url=requestParameter.fullEndPoints;
    else
      url=`${this.Url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`;

    return  this.httpClient.delete<T>(url,{headers:requestParameter.headers});
  }

}
export class RequestParameters{
  controller?: string;
  action?: string;
  queryString?:string;

  headers?: HttpHeaders;//header gerekirse diye
  baseUrl?: string;//base urlimiz değişirse diye
  fullEndPoints?: string;// başka bir serrvise isterk atarsak diye
}
