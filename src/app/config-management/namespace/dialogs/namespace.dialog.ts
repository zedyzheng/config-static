import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";

@Component({
  selector: 'namespace-dialog',
  templateUrl: './namespace.dialog.html',
  styleUrls: ['./namespace.dialog.scss']
})
export class NamespaceDialog implements OnInit {
  private url: string = 'config-web/namespace';
  title: string = '新增';
  formGroup: FormGroup;
  id: number = 0;

  // 构造函数
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NamespaceDialog>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      // appId
      appId: {value: this.data.appId, disabled: true},
      // Name
      name: ['', Validators.required],
      // 密码
      password: ['', Validators.required],
      // 备注
      comment: [''],
    })
  }

  // 初始化
  ngOnInit() {
    // 编辑的场合，初始化页面数据
    if (this.data.id) {
      this.title = '编辑';
      this.id = this.data.id;
      this.formGroup.setValue({
        appId: this.data.appId,
        name: this.data.name,
        password: this.data.password,
        comment: this.data.comment
      });
    }
  }

  // 保存
  saveDetail() {
    let params = {...this.formGroup.value, appId: this.data.appId};

    // 编辑的场合
    if (this.id) {
      this.http.post(this.url + '/' + this.id, params).subscribe(res => {
        this.dialogRef.close('success');
      });
    }
    // 新增的场合
    else {
      // 添加
      this.http.put(this.url, params).subscribe(res => {
        this.dialogRef.close('success');
      });
    }
  }
}
