import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent {

  showForm = false;
  showSuccess = false;

  supportData = {
    name: '',
    email: '',
    message: ''
  };

  toggleForm() {
    this.showForm = !this.showForm;
    this.showSuccess = false;
  }

  submitForm(form: any) {
    if (form.invalid) {
      return; // ❌ invalid असेल तर submit नाही
    }

    this.showForm = false;
    this.showSuccess = true;
    form.resetForm();

    setTimeout(() => {
      this.showSuccess = false;
    }, 4000);
  }
}
