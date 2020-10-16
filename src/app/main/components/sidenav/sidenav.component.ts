import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  constructor(public service: AuthService) {
    // const acc = document.getElementsByClassName('accordion');
    // let i;

    // for (i = 0; i < acc.length; i++) {
    //   acc[i].addEventListener('click', function() {
    //     console.log('click')
    //     this.classList.toggle('active');
    //     const panel = this.nextElementSibling;
    //     if (panel.style.display === 'block') {
    //       panel.style.display = 'none';
    //     } else {
    //       panel.style.display = 'block';
    //     }
    //   });
    // }
  }


  ngOnInit(): void {
    // const acc = document.getElementsByClassName('accordion');
    // let i;

    // for (i = 0; i < acc.length; i++) {
    //   acc[i].addEventListener('click', function() {
    //     console.log('click')
    //     this.classList.toggle('active');
    //     const panel = this.nextElementSibling;
    //     if (panel.style.display === 'block') {
    //       panel.style.display = 'none';
    //     } else {
    //       panel.style.display = 'block';
    //     }
    //   });
    // }
  }

  ngAfterViewInit() {
    const accordions = document.getElementsByClassName('accordion');
    let i;

    for (i = 0; i < accordions.length; i++) {
      const submenu = accordions[i] as HTMLElement;
      submenu.onclick = () => {
        submenu.classList.toggle('accordion-open');
        submenu.nextElementSibling.classList.toggle('submenu-show');
      };
    }
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
