import { FileUploadDialogComponent, FileUploadDialogState } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessagePosition, MessageType } from '../../admin/alertify.service';
import { CustomToastrService, ToasterMessagePosition, ToasterMessageType } from '../../ui/custom-toastr.service';
import { tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from '../dialog.service';
import { SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {


  constructor(private httpClientService:HttpClientService, 
    private alertifyService:AlertifyService,
    private customToasterService:CustomToastrService,
    private dialog:MatDialog,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;
   const fileData:FormData=new FormData();
   for(const file of files){
    (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
      fileData.append(_file.name,_file,_file.name)
    });
    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUploadDialogState.Yes,
      afterClosed:()=>{
        this.spinner.show(SpinnerType.Fire)
        this.httpClientService.post({
          controller:this.options.controller,
          action:this.options.action,
          queryString:this.options.querySting,
          headers:new HttpHeaders({"responseType": "blob"}),
        },fileData).subscribe(data=>{
    
          const message: string="Dosyalar başarıyla yüklenmiştir.";
          this.spinner.hide(SpinnerType.Fire)
    
            if(this.options.isAdminPage){
                this.alertifyService.message(message,{
                    DismissOthers:true,
                    MessageType:MessageType.Success,
                    Position:MessagePosition.TopRight
                })
            }
            else{
              this.customToasterService.message(message,"Başarılı.",{
                messageType:ToasterMessageType.Success,
                position:ToasterMessagePosition.TopRight
            })
            }
        
            
        },(errorResponse:HttpErrorResponse)=>{
          const message: string="Dosyalar yüklenirken beklenmeyen bir hata ile karşılaşılmıştır.";
          this.spinner.hide(SpinnerType.Fire);
    
          if(this.options.isAdminPage){
              this.alertifyService.message(message,{
                  DismissOthers:true,
                  MessageType:MessageType.Error,
                  Position:MessagePosition.TopRight
              })
          }
          else{
            this.customToasterService.message(message,"Başarısız.",{
              messageType:ToasterMessageType.Error,
              position:ToasterMessagePosition.TopRight
          })
          }
          
        }
        
        );
      }

    });
    
   }
  }

  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '250px',
      data: FileUploadDialogState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==FileUploadDialogState.Yes){
        afterClosed();
      }
    });
  }
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  querySting?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?:boolean=false;
}
