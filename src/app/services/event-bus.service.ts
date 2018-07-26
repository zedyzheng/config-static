import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

/**
 * 事件总线，组件之间可以通过这个服务进行通讯
 */
@Injectable()
export class EventBusService {
  constructor() {}

  // topbar用点击事件-切换显示nav部
  public topToggleBtn: Subject<boolean> = new Subject<boolean>();
}
