import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private url = '/config-web/auth'
  loginForm: FormGroup

  // 构造函数
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  // 初始化
  ngOnInit() {
    this.loginForm.setValue({
      userName: '',
      password: ''
    })
  }

  // 登录
  login() {
    this.http.post(this.url, this.loginForm.value).subscribe(data => {
      window.sessionStorage.setItem('token', data['token']);
      window.sessionStorage.setItem('userId', data['userId']);
      window.sessionStorage.setItem('userName', this.loginForm.get('userName').value);
      this.router.navigateByUrl('dashboard');
    })
  }
}
