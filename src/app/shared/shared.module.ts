import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  declarations: [CustomCurrencyPipe, SidenavComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    SidebarModule,
    CalendarModule,
    KeyFilterModule,
    DropdownModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    CustomCurrencyPipe,
    DropdownModule,
    CalendarModule,
    SidebarModule,
    KeyFilterModule,
    SidenavComponent,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
