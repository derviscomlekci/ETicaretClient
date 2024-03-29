import { ProductService } from './../../services/common/models/product.service';
import { HttpClientService } from './../../services/common/http-client.service';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { delay } from 'rxjs';

declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef,private _renderer:Renderer2,private productService:ProductService,private spinner:NgxSpinnerService) 
  { 
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../assets/delete-button.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Output() callback:EventEmitter<any>=new EventEmitter();

  @HostListener("click")
  async onclick(){
    this.spinner.show(SpinnerType.BallSpinClockwise);
    const td:HTMLTableCellElement=this.element.nativeElement;
    await this.productService.delete(this.id)
    $(td.parentElement).fadeOut(500,()=>{
      this.callback.emit();
    });
    this.spinner.hide(SpinnerType.BallSpinClockwise);

  }

}
