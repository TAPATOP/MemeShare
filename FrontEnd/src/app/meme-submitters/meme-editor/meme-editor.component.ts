import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemeSubmitterService} from '../../services/meme-submitter.service';
import {MemeSubmitter} from '../meme-submitter.interface';

@Component({
  selector: 'app-meme-updater',
  templateUrl: './meme-editor.component.html',
  styleUrls: ['../meme-submitter.css', './meme-editor.component.css']
})
export class MemeEditorComponent implements OnInit, MemeSubmitter {
  memeSendForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private memeSubmitService: MemeSubmitterService
  ) {
    this.memeSendForm = this.formBuilder.group({
      title: [memeSubmitService.getTitle(), Validators.required],
      image: [null]
    });
  }

  ngOnInit() {
  }

  onSubmit(fileHolder, title: string) {
    if (this.memeSendForm.invalid) {
      if (this.memeSendForm.controls.title.errors) {
        alert('There\'s something wrong with the title'); // TODO: not like this...
      }
      return;
    }

    let newTitle = title;
    if (fileHolder && fileHolder.length > 0) {
      this.memeSubmitService.setFile(fileHolder[0]);
      const file: File = fileHolder[0];
      newTitle = title + '.' + file.name.split('.').pop();
    }
    this.memeSubmitService.setTitle(newTitle);
    this.memeSubmitService.edit().subscribe(
      () => console.log('Success!'),
      () => console.log('Big oof')
    );
  }
}
