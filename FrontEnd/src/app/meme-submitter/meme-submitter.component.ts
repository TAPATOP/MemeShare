import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-meme-submitter',
  templateUrl: './meme-submitter.component.html',
  styleUrls: ['./meme-submitter.component.css']
})
export class MemeSubmitterComponent implements OnInit {
  memeSendForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(title: string, image: File) {

  }

}
