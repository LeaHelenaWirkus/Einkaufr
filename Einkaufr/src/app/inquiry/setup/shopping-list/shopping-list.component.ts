import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) {
  }

  public addItemForm: FormGroup = this.fb.group({
    newItem: ['']
  });

  public items: string[] = [];

  ngOnInit(): void {
    this.items = [
      "Dummy Produkt #1",
      "Dummy Produkt #2"
    ]
  }

  addItem() {
    const value = this.addItemForm.controls.newItem.value;
    this.items.push(value);
    // clear input for next item
    this.addItemForm.controls.newItem.setValue('');
  }
}
