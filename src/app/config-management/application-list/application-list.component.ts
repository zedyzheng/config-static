import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar, MatDialog } from "@angular/material";

import { Observable, BehaviorSubject } from "rxjs";

import { ToolsService } from "../../services/tools.service";
import { ApplicationListDialog } from "./dialogs/application-list.dialog";

@Component({
  selector: 'application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {
  private itemUrl: string = "config-web/app";
  dataSource = [];
  totalRecords: number = 0;
  displayedColumns = ['id', 'appId', 'appName', 'orgName', 'ownerName', 'handle'];

  // 查询用参数
  public params = {
    name: ''
  };

  // 构造函数，注入参数
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private tools: ToolsService,
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
    }
    // 清除无效参数
    let obj = this.tools.clearNullInObj(params);
    this.http.post("config-web/app/pages", obj).subscribe(res => {
      this.totalRecords = res['totalElements'];
      this.dataSource = res['content'];
    });
  }

  // 新增、编辑
  showDetail(id) {
    // 编辑的场合
    if (id) {
      this.http.get(this.itemUrl + '/' + id).subscribe(data => {
        this.openDialog(data);
      });
    }
    // 新增的场合
    else {
      this.openDialog(null);
    }
  }

  // 打开对话框，并设置参数
  private openDialog(data: object | null): void {
    this.dialog.open(ApplicationListDialog, {
      width: '400px',
      data: data
    }).afterClosed().subscribe(res => {
      if (res === 'success') {
        this.queryList(0);
        this.snackBar.open('操作成功', 'Ok', {
          duration: 500
        });
      }
    });
  }
}
