import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";

@Component({
  selector: 'application-list-dialog',
  templateUrl: './application-list.dialog.html',
  styleUrls: ['./application-list.dialog.scss']
})
export class ApplicationListDialog implements OnInit {
  private url: string = "config-web/app";
  title: string = '新增';
  formGroup: FormGroup;
  id: number = 0;

  // 构造函数
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ApplicationListDialog>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      // appId
      appId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\.]*[a-z\.]$/)
      ]),
      // Name
      name: ['', Validators.required],
      // 部门
      orgName: ['', Validators.required],
      // 所属人
      ownerName: ['']
    })
  }

  // 初始化
  ngOnInit() {
    // 编辑的场合，初始化页面数据
    if (this.data) {
      // title
      this.title = '编辑';
      // id保存
      this.id = this.data.id;

      // 值设置
      this.formGroup.patchValue({
        //appId: this.data.appId,
        name: this.data.name,
        orgName: this.data.orgName,
        ownerName: this.data.ownerName
      });

      // appId设置并补课更改
       this.formGroup.get('appId').reset({value: this.data.appId, disabled: true});
    }
  }

  // 保存
  saveDetail() {
    // 编辑的场合
    if (this.id) {
      this.http.post(this.url + '/' + this.id, {...this.formGroup.value, appId: this.data.appId}).subscribe(res => {
        if (res && res['error']) {
          this.snackBar.open(res['error'].message || '操作失败', 'Undo', {
            duration: 500
          });
        }
        else {
          this.dialogRef.close('success');
        }
      });
    }
    // 新增的场合
    else {
      // 添加
      this.http.put(this.url, this.formGroup.value).subscribe(res => {
        if (res && res['error']) {
          this.snackBar.open(res['error'].message || '操作失败', 'Ok');
        }
        else {
          this.dialogRef.close('success');
        }
      });
    }
  }
}
