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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      console.log(file);
      this.memeSubmitService.uploadImage(file, 'random title really').subscribe(
        (res) => {

        },
        (err) => {

        });
    });

    reader.readAsDataURL(file);
  }

  // @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
  //   const file = event && event.item(0);
  //   console.log(file.name);
  //   const fileName = 'random.jpg';
  //
  //   this.memeSubmitService.uploadImage(file, fileName).subscribe(
  //     () => console.log('Success!'),
  //     () => console.log('Big oof')
  //   );
  // }

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
    // if (fileHolder === null || fileHolder.length !== 1) {
    //   console.log('You need to upload a file');
    //   return;
    // }
    //
    // if (title === null || title === '') {
    //   console.log('You need to give a title');
    //   return;
    // }
    const file: File = fileHolder[0];
    const memeFileName = title + '.' + file.name.split('.').pop();
    console.log(file);
    console.log('this should be title: ', memeFileName);
    this.memeSubmitService.uploadImage(file, memeFileName).subscribe(
      () => console.log('Success!'),
      () => console.log('Big oof')
    );
    // if (this.memeSendForm.invalid) {
    //   alert('Try again'); // TODO: yeah
    //   return;
    // }
    // const str: string = file as unknown as string; // for some reason file.name is undefined so I had to resort to this
    // const memeFileName = title + '.' + str.split('.').pop();
    // console.log('Meme name in the system: ' + memeFileName);
    // this.memeSubmitService.uploadImage(this.imageInput.files[0], memeFileName).subscribe(
    //   () => console.log('Success!'),
    //   () => console.log('Big oof')
    // );
    // console.log(event.target.files);
    // this.memeSubmitService.uploadImage(event.target.files[0] as File, 'random title');
  }
}
