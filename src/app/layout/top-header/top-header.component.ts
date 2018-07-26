import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatDialog } from "@angular/material";

import { ChangePasswordDialog } from "./dialogs/change-password.dialog";

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {
  @Output() onChangeNavStatus = new EventEmitter<boolean>();
  showTopMenu: boolean = false;
  userId = window.sessionStorage.getItem('userId');
  userName = window.sessionStorage.getItem('userName');

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  // 切换导航显示、隐藏
  toggle() {
    this.onChangeNavStatus.emit();
  }

  // 打开修改对话框
  changePassord(): void {
    this.dialog.open(ChangePasswordDialog, {
      width: '400px',
      data: {
        userName: this.userName
      }
    }).afterClosed().subscribe(res => {
      if (res === 'success') {
        this.snackBar.open('操作成功', '', {
          duration: 2000
        });
      }
    });
  }
}
