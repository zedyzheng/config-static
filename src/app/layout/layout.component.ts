import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isOpen: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  // 切换leftNav显示状态
  onChangeNavStatus() {
    this.isOpen = !this.isOpen;
  }
}
