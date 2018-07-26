import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatPaginator, MatSnackBar, MatDialog, MatCheckbox } from "@angular/material";
import { DataSource } from "@angular/cdk/collections";

import { ToolsService } from "../../services/tools.service";
import { NamespaceDialog } from "./dialogs/namespace.dialog";
import { ApplicationSelectDialog } from "../application-list/dialogs/application-select.dialog";

@Component({
  selector: 'app-namespace',
  templateUrl: './namespace.component.html',
  styleUrls: ['./namespace.component.scss']
})
export class NamespaceComponent implements OnInit {
  private url = 'config-web/namespace/';
  checkAll = false;
  // table列定义
  displayedColumns = ['check', 'id', 'appId', 'status', 'name', 'comment', 'syncDate', 'lastModifiedDate', 'handle'];
  // tables数据源声明
  dataSource;
  totalRecords = 0;
  recordList;
  // 查询新增控制
  disabledQuery: boolean =  true;
  // 同步按钮控制
  disabledBatchSync: boolean = true;
  // 查询用参数
  params = {
    appId: ''
  };

  // 注入服务
  constructor(
    private http: HttpClient,
    private tools: ToolsService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  // 初始化，查询列表
  ngOnInit() {
    this.queryList(0);
  }

  // 全选
  onCheckAll(checked) {
    this.dataSource.forEach(item => {
      item.checked = checked;
    });

    this.disabledBatchSync = !checked;
  }

  // 选中设置批量同步按钮
  onCheck(checked) {
    if (checked) {
      this.disabledBatchSync = !checked;
    }
    else {
      this.disabledBatchSync = true;
      for (let item of this.dataSource) {
        if (item.checked) {
          this.disabledBatchSync = false;
          break;
        }
      }
    }
  }

  // 选择所属应用
  selectApp() {
    this.dialog.open(ApplicationSelectDialog, {
      width: '800px',
      height: '600px'
    }).afterClosed().subscribe(res => {
      if (res) {
        // 搜索栏中设置应用id
        this.params['appId'] = res;
        this.disabledQuery = false;
      }
      else if (!this.params['appId']) {
        this.disabledQuery = true;
      }
    });
  }

  // 查询
  queryList(pageIndex) {
    let params = {
      pageIndex: pageIndex + 1,
      pageSize: 20,
      ...this.params
    };

    // 去除无效参数
    let obj = this.tools.clearNullInObj(params);
    this.http.post("config-web/namespace/pages", obj).subscribe(data => {
      this.totalRecords = data['totalElements'];
      data['content'].map(item => {
        if (item.status === 0) {
          item.statusStr = '未同步';
        }
        else if (item.status === 1) {
          item.statusStr = '已同步';
        }
        else if (item.status === 2) {
          item.statusStr = '有修改';
        }
      });
      this.recordList = data['content'];

      this.recordList.forEach(item => item.checked = false);
      this.dataSource = data['content'];
    });
  }

  // 新增、编辑
  showDetail(id) {
    // 编辑的场合
    if (id) {
      this.http.get(this.url + id).subscribe(data => {
        this.openDialog(data);
      });
    }
    // 新增的场合
    else {
      this.openDialog(this.params);
    }
  }

  // 批量同步
  batchSyncList() {
    if (window.confirm('确定要同步吗？')) {
      let ids = this.dataSource.filter(item => item.checked).map(item => {
        return item.id;
      }).join(',');

      this.http.get(this.url + 'syncConfig/multi/' + ids).subscribe(data => {
        this.queryList(0);
        this.snackBar.open('操作成功', '', { duration: 1000 });
      });
    }
  }

  // 同步
  syncConfig(id) {
    if (window.confirm('确定要同步吗？')) {
      this.http.get(this.url + 'syncConfig/' + id).subscribe(data => {
        this.queryList(0);
        this.snackBar.open('操作成功', '', { duration: 1000 });
      });
    }
  }

  // 打开对话框，并设置参数
  private openDialog(data: object | null): void {
    this.dialog.open(NamespaceDialog, {
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
