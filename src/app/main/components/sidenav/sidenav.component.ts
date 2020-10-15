import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public service: AuthService) {
    // document.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   // console.log(e.target);
    // });
    // var acc = document.querySelectorAll(".sidemenu");

    // // console.log(acc)
    // for (var i = 0; i < acc.length; i++) {
    //   let ele: HTMLElement  =  acc[i] as HTMLElement;
    //   console.log('')
    //   ele.click = (function (index) {
    //     console.log('ccc')
    //     return function () {
    //       acc[index].classList.toggle("active");
    //       acc[index].nextElementSibling.classList.toggle("show");
    //     }
    //   })(i);
    // };
  }
 

  ngOnInit(): void {
  }

  toggleSubMenu() {
    // const sidemenus = document.querySelector('.sidemenu');
    // sidemenus.classList.toggle('show')
    // console.log(sidemenus.classList);
    // const submenu = sidemenus.nextElementSibling;
    // // console.log(submenu);
    // const isActive = sidemenus.classList.contains('sidenav_menu_links-submenu--active')
    // submenu.classList.toggle('sidenav_submenu_links--show', true);
  }
}
