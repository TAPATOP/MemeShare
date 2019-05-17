import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemeSubmitterService} from '../../services/meme-submitter.service';
import {MemeSubmitter} from '../meme-submitter.interface';

@Component({
  selector: 'app-meme-updater',
  templateUrl: './meme-editor.component.html',
  styleUrls: ['./meme-editor.component.css']
})
export class MemeEditorComponent implements OnInit, MemeSubmitter {
  memeSendForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private memeSubmitService: MemeSubmitterService
  ) {
    this.memeSendForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit() {
  }

  onSubmit(fileHolder, title: string) {
  }

}
