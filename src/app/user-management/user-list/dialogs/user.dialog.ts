import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";

@Component({
  selector: 'user-dialog',
  templateUrl: './user.dialog.html',
  styleUrls: ['./user.dialog.scss']
})
export class UserDialog implements OnInit {
  private url: string = 'config-web/user/role';
  title: string = '新增';
  formGroup: FormGroup;
  roles = [];

  // 构造函数
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserDialog>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.title = "修改权限";
      this.formGroup = this.formBuilder.group({
        // 角色
        roles: ['', Validators.required],
        // 应用
        accessAppId: [this.data.accessAppId || '', Validators.required]
      })
    }
    else {
      this.formGroup = this.formBuilder.group({
        // Name
        userName: ['', Validators.required],
        // 角色
        roles: ["", Validators.required],
        // 密码
        password: ['', Validators.required],
        //应用
        accessAppId: ['config,user', Validators.required],
      })
    }
  }

  // 初始化
  ngOnInit() {
    // 请求权限列表
    this.http.post("config-web/role/all", {}).subscribe((data: [{}]) => {
      let tempArr = [];
      if (data && data.length > 1) {
        this.roles = data;
      }
      else {
        this.roles = [{id: 0, name: "没有数据"}];
      }

      // 设置权限
      if (this.data) {
        tempArr = this.data.roles.map(item => {
          return item.id;
        });
      }
      else {
        tempArr.push(this.roles[0]["id"]);
      }
      this.formGroup.get("roles").setValue(tempArr);
    })
  }

  // 保存
  saveDetail() {
    let params = {...this.formGroup.value};
    params.roles = params.roles.join(",");

    // 修改权限的场合
    if (this.data) {
      this.http.post("config-web/user/" + this.data.id, params).subscribe(data => {
        this.dialogRef.close('success');
      });
    }
    // 添加
    else {
      this.http.put(this.url, params).subscribe(res => {
        this.dialogRef.close('success');
      });
    }
  }
}
