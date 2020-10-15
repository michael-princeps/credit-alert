import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [CustomCurrencyPipe],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    SidebarModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    CustomCurrencyPipe,
    DropdownModule,
    CalendarModule,
    SidebarModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
