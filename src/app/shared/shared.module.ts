import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [CustomCurrencyPipe],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    SidebarModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    CustomCurrencyPipe,
    SidebarModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
