import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatDialogRef } from "@angular/material";

import { ToolsService } from "../../../services/tools.service";

@Component({
  selector: 'application-select',
  templateUrl: './application-select.dialog.html',
  styleUrls: ['./application-select.dialog.scss']
})
export class ApplicationSelectDialog implements OnInit {
  private itemUrl: string = "config-web/app";
  dataSource;
  totalRecords = 0;
  displayedColumns = ['id', 'appId', 'appName'];

  // 查询用参数
  public params = {
    name: ''
  };

  // 构造函数，注入参数
  constructor(
    private http: HttpClient,
    private tools: ToolsService,
    public dialogRef: MatDialogRef<ApplicationSelectDialog>
  ) { }

  // 初始化
  ngOnInit() {
    this.queryList(0);
  }

  // 查询列表数据
  queryList(pageIndex) {
    let params = {
      pageIndex: pageIndex + 1,
      pageSize: 20,
      ...this.params
    };

    // 清除无效参数
    let obj = this.tools.clearNullInObj(params);
    this.http.post("config-web/app/pages", obj).subscribe(data => {
      this.totalRecords = data['totalElements'];
      this.dataSource = data['content'];
    });
  }

  // 选择行
  rowClick(data) {
    this.dialogRef.close(data.appId);
  }
}
