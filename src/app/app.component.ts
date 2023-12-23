import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'elazig-surec-yonetim-app';
  isExpanded = false;
  isShowing = false;
  showSubmenu: boolean = false;
  userYetki:string="";
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private authService:AuthService ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const isLoginRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'login';
      this.isExpanded = !isLoginRoute;
      this.isShowing = !isLoginRoute;
    });
    this.authService.whenAuth.subscribe((res:string)=>{
      console.log("tetiklendi",res)
      this.userYetki=res;
    })
  }
  ngOnInit(){
    this.userYetki=this.authService.getUserYetkiType();
    console.log(this.userYetki);
  }
  isNotLoginPage(): boolean {
    return this.activatedRoute.firstChild?.snapshot.routeConfig?.path !== 'login';
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  logout() {
    this.authService.logOut()
  }
}
