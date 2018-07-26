import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  // menu定义
  menus = [
    {
      name: '配置管理',
      isOpen: false,
      icon: 'fa-gear',
      route: 'config-management',
      children: [
        { name: '应用列表', icon:'fa-pencil', route:'application-list', isSelected: false },
        { name: '环境空间', icon:'fa-lemon-o', route:'namespace', isSelected: false },
        { name: '配置列表', icon:'fa-cog', route:'config-list', isSelected: false },
        { name: '操作日志', icon:'fa-book', route:'handle-log', isSelected: false }
      ]
    },
    {
      name: '用户管理',
      isOpen: false,
      icon: 'fa-user' ,
      route: 'user-management',
      children: [
        { name: '用户列表', icon:'fa-user-o', route:'user-list', isSelected: false },
        { name: '角色列表', icon:'fa-vcard', route:'role-list', isSelected: false }
      ]
    },
  ];

  // 构造函数，注入服务
  constructor(private router: Router) { }

  // 初始化
  ngOnInit() {
    // 解析当前路径
    let arr = this.router.url.split('/');

    // 路径解析后不到具体业务模块，返回
    if (arr.length < 2) {
      return;
    }

    // 遍历menu第一级
    for (let i = 0; i < this.menus.length; i++) {
      let menu = this.menus[i];

      // 打开第一级
      if (menu.route === arr[1]) {
        // 选中第一级
        menu.isOpen = true;

        // 存在第二级的场合
        if (arr[2]) {
          // 遍历第二级
          for (let j = 0; j < menu.children.length; j++) {
            let item = menu.children[j];

            // 选中第二级
            if (item.route === arr[2]) {
              item.isSelected = true;
              break;
            }
          }
        }

        break;
      }
    }
  }

  // 选择一级菜单，打开或者折叠二级菜单
  public toggleMenuItem(event, menu): void {
    menu.isOpen = !menu.isOpen;

    // 折叠状态下只能打开一个二级菜单层
    this.menus.map(item => {
      if (item.name !== menu.name) {
        item.isOpen = false;
      }
    });
  }

  // 选择二级菜单
  public toggleSelectedStatus(event, item, parent): void {
    // 已选中的场合，直接返回
    if (item.isSelected) {
      return;
    }

    // 设置为已选中
    item.isSelected = true;

    // 将其余所有的二级菜单设置为未选中
    this.menus.map(menu => {
      menu.children.map(child => {
        if (child.name !== item.name) {
          child.isSelected = false;
        }
      })
    });
  }
}
