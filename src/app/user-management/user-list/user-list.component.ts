import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar, MatDialog } from "@angular/material";

import { ToolsService } from "../../services/tools.service";
import { NotificationService } from "../../services/notification.service";
import { UserDialog } from "./dialogs/user.dialog";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  private resetUrl: string = "config-web/user/password/reset";
  private url: string = "config-web/user/";
  dataSource;
  totalRecords = 0;
  // 列定义
  displayedColumns = ["id", "userName", "roleName","accessAppId", "handle"];
  // 数据绑定定义
  columnsDef = [
    {field: "id", header: "ID"},
    {field: "userName", header: "用户名"},
    {field: "roleName", header: "角色"},
    {field: "accessAppId", header: "应用"}
  ];

  // 查询用参数
  params = {
    userName: ""
  };

  // 构造函数，注入参数
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private tools: ToolsService,
    private notification: NotificationService
  ) { }

  // 初始化
  ngOnInit() {
    // 初始化dataSource
    this.queryList(0);
  }

  // 查询列表数据
  queryList(pageIndex) {
    // 参数设置
    let params = {
      pageIndex: pageIndex + 1,
      pageSize: 20,
      ...this.params
    };

    // 清除无效参数
    let obj = this.tools.clearNullInObj(params);

    // 查询
    this.http.post("config-web/user/pages", obj).subscribe(data => {
      this.totalRecords = data["totalElements"];
      data["content"].forEach(record => {
        record["roleName"] = record.roles.map(role => {
          return role.name;
        }).join(",");
      });
      return data["content"];
    });
  }

  // 新增用户
  showDetail() {
    this.dialog.open(UserDialog, {
      width: "400px"
    }).afterClosed().subscribe(res => {
      if (res === "success") {
        this.queryList(0);
        this.snackBar.open("操作成功", "", {
          duration: 2000
        });
      }
    });
  }

  // 设置用户权限
  setRole(userId) {
    this.http.get(this.url + userId).subscribe(data => {
      this.dialog.open(UserDialog, {
        width: "400px",
        data: data
      }).afterClosed().subscribe(res => {
        if (res === "success") {
          this.queryList(0);
          this.snackBar.open("操作成功", "", {
            duration: 2000
          });
        }
      });
    })
  }

  // 修改密码
  resetPassword(userId) {
    this.notification.prompt({
      title: "修改密码",
      content: "请输入新密码",
      ok: (password) => {
        if (!password) {
          this.snackBar.open("新密码不能为空", "", {
            duration: 2000
          })
        }
        else {
          this.http.post(this.resetUrl, {userId: userId, newPassword: password}).subscribe(data => {
            this.queryList(0);
            this.snackBar.open("操作成功", "", {duration: 2000});
          })
        }
      }
    })
  }

  // 删除用户
  delete(userId) {
    this.notification.confirm({
      content: "确认删除此用户吗？",
      ok: () => {
        this.http.delete(this.url + userId).subscribe(data => {
          this.queryList(0);
          this.snackBar.open("操作成功", "", {duration: 2000});
        })
      }
    });
  }
}
