import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemeSubmitterService} from '../services/meme-submitter.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-meme-submitter',
  templateUrl: './meme-submitter.component.html',
  styleUrls: ['./meme-submitter.component.css'],
  providers: []
})
export class MemeSubmitterComponent implements OnInit {
  memeSendForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private memeSubmitService: MemeSubmitterService
    ) {
    this.memeSendForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: [null, Validators.required]
    }); }

  ngOnInit() {
  }

  onSubmit(fileHolder, title: string) {
    if (this.memeSendForm.invalid) {
      if (this.memeSendForm.controls.title.errors) {
        alert('There\'s something wrong with the title'); // TODO: not like this...
      }
      if (this.memeSendForm.controls.image.errors) {
        alert('There\'s something wrong with the image');
      }
      return;
    }
    const file: File = fileHolder[0];
    const memeFileName = title + '.' + file.name.split('.').pop();
    console.log(file);
    console.log('this should be title: ', memeFileName);
    this.memeSubmitService.prepareImage(file, memeFileName);
    this.memeSubmitService.upload().subscribe(
      () => console.log('Success!'),
      () => console.log('Big oof')
    );
  }
}
