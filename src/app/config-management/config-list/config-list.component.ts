import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar, MatDialog } from "@angular/material";

import { ToolsService } from "../../services/tools.service";
import { ConfigListDialog } from "./dialogs/config-list.dialog";
import { ApplicationSelectDialog } from "../application-list/dialogs/application-select.dialog";
import { ConfigListUploads } from "./uploads/config-list.uploads";

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.scss']
})
export class ConfigListComponent implements OnInit {
  private url = 'config-web/serviceconfig/';
  private namespaceUrl = 'config-web/namespace/';
  // table列定义
  displayedColumns = ['id', 'key', 'value', 'comment', 'lastModifiedDate', 'handle'];
  // tables数据源声明
  dataSource;
  totalRecords = 0;
  // 环境空间
  namespaces = [];
  namespaceModel;
  disabledNamespace = true;
  // 查询按钮控制
  disabledQuery: boolean = true;
  // 查询参数初始化
  params = {
    appId: '',
    appNamespaceId: 0,
    name: ''
  };

  // 注入服务
  constructor(
    private http: HttpClient,
    private tools: ToolsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  // 初始化，查询列表
  ngOnInit() {
    this.queryList(0);
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

        // 根据所选择的应用id检索环境空间
        this.http.post('config-web/namespace/pages', {pageIndex: 1, pageSize: 100, appId: res}).subscribe(data => {
          this.namespaces = data['content'];
          this.disabledNamespace = false;
          this.disabledQuery = true;
        })
      }
    });
  }

  // 选择命名空间，设置检索按钮
  namespaceChange() {
    this.params['appId'] = this.namespaceModel['appId'];
    this.params['appNamespaceId'] = this.namespaceModel['id'];
    this.params['name'] = this.namespaceModel['name'];

    if (this.namespaceModel['status'] === 0) {
      this.params['statusStr'] = '未同步';
    }
    else if (this.namespaceModel['status'] === 1) {
      this.params['statusStr'] = '已同步';
    }
    else if (this.namespaceModel['status'] === 2) {
      this.params['statusStr'] = '有修改';
    }
    this.disabledQuery = false;
  }

  // 查询列表
  queryList(pageIndex) {
    let params = {
      pageIndex: pageIndex + 1,
      pageSize: 20,
      ...this.params
    };

    // 如果命名空间没有选择
    if (!params['appNamespaceId']) {
      this.totalRecords = 0;
      this.dataSource = [];
      return false;
    }

    // 清除无效参数
    let obj = this.tools.clearNullInObj(params);
    this.http.post("config-web/serviceconfig/pages", obj).subscribe(data => {
      this.totalRecords = data['totalElements'];
      this.dataSource = data['content'];
    });
  }

  // 新增、编辑
  showDetail(id) {
    // 编辑的场合
    if (id) {
      this.http.get(this.url + id).subscribe(data => {
        let params = {...data, ...this.params};
        this.openDialog(params);
      });
    }
    // 新增的场合
    else {
      this.openDialog(this.params);
    }
  }

  // 上传
  showUpload(){
    this.dialog.open(ConfigListUploads, {
      width: '400px',
      data: this.params
    }).afterClosed().subscribe(res => {
      if (res === 'success') {
        this.queryList(0);
        this.snackBar.open('操作成功', '', {
          duration: 1000
        });
      }
    });
  }

  // 下载
  download() {
    this.http.get(this.url + "download/" + this.params.appNamespaceId, {responseType: "text", observe: 'response'}).subscribe(res => {
      this.tools.download(res.headers.get("content-disposition").split("filename")[1].substr(1), res.body);
    });
  }

  // 删除
  delete(id) {
    if (window.confirm('确定要删除吗？')) {
      this.http.delete(this.url + id).subscribe(data => {
        this.queryList(0);
        this.snackBar.open('操作成功', '', { duration: 1000 });
      })
    }
  }

  // 同步
  syncConfig(){
    if (window.confirm('确定要同步吗？')) {
      this.http.get(this.namespaceUrl + 'syncConfig/' + this.params.appNamespaceId).subscribe(data => {
        this.queryList(0);
        this.snackBar.open('操作成功', '', { duration: 1000 });
      })
    }
  }

  // 打开对话框，并设置参数
  private openDialog(data: object): void {
    this.dialog.open(ConfigListDialog, {
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
