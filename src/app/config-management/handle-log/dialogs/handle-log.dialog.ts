import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'handle-log-dialog',
  templateUrl: './handle-log.dialog.html',
  styleUrls: ['./handle-log.dialog.scss']
})
export class HandleLogDialog implements OnInit {
  title: string = '详情';
  entityName: string = '';
  operatorName: string = '';
  description: string = '';
  createBy: String = '';

  // 构造函数
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  // 初始化
  ngOnInit() {
    // 编辑的场合，初始化页面数据
    if (this.data) {
      this.title = '编辑';
      this.entityName = this.data.entityName;
      this.operatorName = this.data.operatorName;
      this.description = this.data.description;
      this.createBy = this.data.createBy;
    }
  }
}
