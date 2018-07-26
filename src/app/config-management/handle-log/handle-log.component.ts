import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatPaginator, MatSnackBar, MatDialog } from "@angular/material";

import { ToolsService } from "../../services/tools.service";
import { HandleLogDialog } from "./dialogs/handle-log.dialog";

@Component({
  selector: 'app-handle-log',
  templateUrl: './handle-log.component.html',
  styleUrls: ['./handle-log.component.scss']
})
export class HandleLogComponent implements OnInit {
  private url = 'config-web/logs/';
  // 获取页面分页组件
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // table列定义
  displayedColumns = ['id', 'entityName', 'operatorName', 'description', 'lastModifiedDate'];
  // tables数据源声明
  dataSource;
  totalRecords = 0;
  // 查询用参数
  params: {
    entityName: '',
    description: ''
  };

  // 注入服务
  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tools: ToolsService
  ) { }

  // 初始化，查询列表
  ngOnInit() {

  }

  queryList(pageIndex) {
    let params = {
      pageIndex: pageIndex + 1,
      pageSize: 20
    };
    return this.http.post("config-web/logs/pages", params).subscribe(data => {
      this.totalRecords = data['totalElements'];
      this.dataSource = data['content'];
    });
  }

  // 查看详情
  showDetail(id) {
    // 编辑的场合
    if (id) {
      this.http.get(this.url + id).subscribe(data => {
        this.openDialog(data);
      });
    }
  }

  // 打开对话框，并设置参数
  private openDialog(data: object | null): void {
    this.dialog.open(HandleLogDialog, {
      width: '400px',
      data: data
    }).afterClosed().subscribe(res => {
      if (res === 'success') {
        this.queryList(0);
        this.snackBar.open('操作成功', '', {
          duration: 1000
        });
      }
    });
  }
}
