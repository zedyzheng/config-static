import { Injectable } from "@angular/core";

@Injectable()
export class ToolsService {
  // 清空对象中空值
  public clearNullInObj(obj: any): object {
    let newObj:any = {...obj};
    for (let key in newObj) {
      if (!newObj[key] && newObj[key] !== 0) delete newObj[key];
    }
    return newObj;
  }

  // 下载
  public download(fileName: string, fileData: string) {
    const file = new Blob([fileData]);
    let link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(file);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  // 时间格式化
  public timeFormat(date: Date, format: string) {
    const year = date.getFullYear().toString();
    const month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const m = date.getMilliseconds().toString();

    return format.replace(/YY/, year).replace(/MM/, month).replace(/DD/, day).replace(/HH/, hour).replace(/mm/, minute).replace(/ss/, m);
  }
}
