import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";

@Component({
  selector: 'config-list-dialog',
  templateUrl: './config-list.dialog.html',
  styleUrls: ['./config-list.dialog.scss']
})
export class ConfigListDialog implements OnInit {
  private url: string = 'config-web/serviceconfig';
  title: string = '新增';
  formGroup: FormGroup;
  appId: string;
  name: string;
  id: number = 0;

  // 构造函数
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfigListDialog>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      // namespace
      appNamespaceId: [this.data['appNamespaceId']],
      // KEY
      itemKey: ['', Validators.required],
      // VALUE
      itemValue: ['', Validators.required],
      // 备注
      comment: ['']
    })
  }

  // 初始化
  ngOnInit() {
    this.appId = this.data.appId;
    this.name = this.data.name;

    // 编辑的场合，初始化页面数据
    if (this.data.id) {
      this.title = '编辑';
      this.id = this.data.id;
      this.formGroup.setValue({
        appNamespaceId: this.data.appNamespaceId,
        itemKey: this.data.itemKey,
        itemValue: this.data.itemValue,
        comment: this.data.comment
      });

      this.formGroup.get('itemKey').reset({value: this.data.itemKey, disabled: true});
    }
  }

  // 保存
  saveDetail() {
    // 编辑的场合
    if (this.id) {
      this.http.post(this.url + '/' + this.id, this.formGroup.value).subscribe(res => {
        this.dialogRef.close('success');
      });
    }
    // 新增的场合
    else {
      // 添加
      this.http.put(this.url, this.formGroup.value).subscribe(res => {
        this.dialogRef.close('success');
      });
    }
  }
}
