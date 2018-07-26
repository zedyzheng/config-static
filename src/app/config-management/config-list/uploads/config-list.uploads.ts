import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";

@Component({
  selector: 'config-list-uploads',
  templateUrl: './config-list.uploads.html',
  styleUrls: ['./config-list.uploads.scss']
})
export class ConfigListUploads implements OnInit {
  private url: string = 'config-web/serviceconfig/space/';
  title: string = '上传';
  appId: string;
  name: string;
  id: number = 0;
  configFile;

  // 构造函数
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ConfigListUploads>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  // 初始化
  ngOnInit() {
    this.appId = this.data.appNamespaceId;
    this.name = this.data.name;
  }

  changeFile(event) {
    if (event) {
      this.configFile = event.target.files[0]
    }
  }
  // 保存
  saveDetail() {
    let request = new FormData();
    request.append('configFile', this.configFile);
    let _url = this.url + this.appId;
    this.http.post(_url, request).subscribe(res => {
      this.dialogRef.close('success');
    });
  }
}
