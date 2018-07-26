import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NotificationComponent } from "../components/notification/notification.component";

/**
 * 确认信息提示和交互
 *
 * @export
 * @class NotificationService
 */
@Injectable()
export class NotificationService {
  // 默认
  defaultConfig: {} = {
    width: "800px"
  };

  // 构造函数，注入服务
  constructor(private dialog: MatDialog) {}

  // 确认（confirm）
  confirm(config: {}): void {
    this.dialog.open(NotificationComponent, {
      data: {
        isConfirm: true,
        ...config
      }
    }).afterClosed().subscribe((result) => {
      if (result === "success") {
        if (config["ok"] && typeof config["ok"] === "function") {
          config["ok"]();
        }
      }
    });
  }

  // prompt
  prompt(config: {}): void {
    this.dialog.open(NotificationComponent, {
      ...this.defaultConfig,
      data: {
        isConfirm: false,
        ...config
      }
    }).afterClosed().subscribe(result => {
      if (result["isOk"]) {
        if (config["ok"] && typeof config["ok"] === "function") {
          config["ok"](result["value"]);
        }
      }
    });
  }
}
