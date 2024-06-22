import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Images } from '../../../contracts/list_product_images';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product,succesCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void){
    this.httpClientService.post({
      controller:"products"
    },product
    ).subscribe(result=>{
      succesCallBack();
    },(errorResponse:HttpErrorResponse)=>{
      const _error:Array<{key:string,value:Array<string>}>=errorResponse.error;
      let message="";
      _error.forEach((v,index)=>{
        v.value.forEach((_v,_index)=>{
          message+=`${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async read(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number;products:List_Product[]}>{
    const promiseData: Promise<{totalCount:number;products:List_Product[]}> = this.httpClientService.get<{totalCount:number;products:List_Product[]}>({
      controller:"products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();



    promiseData
    .then(x=>successCallBack())//basarili durum gelirse
    .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))//fail yani hata olursa

  return await promiseData;
  }

  async delete(id:string)
  {
   const deleteObservable: Observable<any>= this.httpClientService.delete<any>({controller:"products"},id);

    await firstValueFrom(deleteObservable);

  }

  async readImages(id: string,successCallBack?:()=>void):Promise<List_Product_Images[]>{
  const getObservable:Observable<List_Product_Images[]> =  this.httpClientService.get<List_Product_Images[]>({
      action:"getproductimages",
      controller:"products",
    },id);

    const images:List_Product_Images[]=await firstValueFrom(getObservable);

    successCallBack();

    return images;
  }

  async deleteImage(id: string,imageId:string,successCallBack?:()=>void){
    const deleteObservable=this.httpClientService.delete({
      action:"deleteproductimage",
      controller:"products",
      queryString:`imageId=${imageId}`
    },id)

    await firstValueFrom(deleteObservable);
    successCallBack();
  }
  
}
