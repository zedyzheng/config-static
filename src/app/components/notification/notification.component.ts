import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit {
  // confirm or prompt
  isConfirm: boolean = true;
  // 标题
  title: string = "";
  // 内容
  content: string = "";
  // 输入的内容
  result: string = "";

  // 注入服务，获取传递配置参数
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialog: MatDialogRef<NotificationComponent>
  ) { }

  // 初始化
  ngOnInit() {
    this.isConfirm = this.data["isConfirm"];
    this.title = this.data["title"] || "确认";
    this.content = this.data["content"] || "";
  }

  // 确认
  ok(value): void {
    if (this.isConfirm) {
      this.dialog.close(value);
    }
    else {
      this.dialog.close({isOk: true, value: this.result});
    }
  }
}
