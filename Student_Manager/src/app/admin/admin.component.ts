import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  token: string = ''; 
  users:any;// ✅ Use lowercase 'string'

  ngOnInit(): void {
    this.token = localStorage.getItem("token") || ''; // ✅ Fallback if null
   // console.log(this.token);
    this.fetchdata() ; // ✅ Log the actual token
  }

  async fetchdata() {
    try {
      const response = await axios.get("http://localhost:5000/fetchdata", {
        params: {
          token: this.token, // ✅ Correct param format
        }
      });
      console.log("Fetched Data:", response.data); 
      this.users=response.data// ✅ Handle response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
