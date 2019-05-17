import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemeSubmitterService} from '../../services/meme-submitter.service';
import {MemeSubmitter} from '../meme-submitter.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meme-submitter',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['../meme-submitter.css', './meme-creator.component.css'],
  providers: []
})
export class MemeCreatorComponent implements OnInit, MemeSubmitter {
  memeSendForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private memeSubmitService: MemeSubmitterService,
    private router: Router
    ) {
    this.memeSendForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

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
    this.memeSubmitService.prepareImage(file, memeFileName);
    this.memeSubmitService.create().subscribe(
      () => console.log('Success!'),
      () => console.log('Big oof'),
      () => this.router.navigate([''])
    );
  }
}
