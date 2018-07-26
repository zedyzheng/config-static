import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";

@Component({
  selector: 'change-password-dialog',
  templateUrl: './change-password.dialog.html',
  styleUrls: ['./change-password.dialog.scss']
})
export class ChangePasswordDialog implements OnInit {
  private url: string = "config-web/auth/password";
  title: string = '修改密码';
  formGroup: FormGroup;

  private confirmPassword = () => {
    return (control: AbstractControl): {[key: string]: any} => {
      let password = '';

      // formgroup存在的场合
      if (control.parent) {
        password = control.parent.get('newPassword').value;
        return password !== control.value ? {'confirmPassword': {value: control.value}} : null;
      }

      return null;
    };
  };

  // 构造函数
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      userName: this.data.userName,
      // oldPassword
      oldPassword: ['', Validators.required],
      // newPassword
      newPassword: ['', Validators.required],
      // confirmPassword
      confirmPassword: ['', this.confirmPassword()]
    })
  }

  // 初始化
  ngOnInit() {
  }

  // 保存
  changePassword() {
    // 添加
    this.http.post(this.url, this.formGroup.value).subscribe(res => {
      this.dialogRef.close('success');
    });
  }
}
