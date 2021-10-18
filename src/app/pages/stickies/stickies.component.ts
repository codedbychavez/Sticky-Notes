import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StickyService } from 'src/app/services/sticky/sticky.service';
import { Sticky } from 'src/app/models/sticky.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-stickies',
  templateUrl: './stickies.component.html',
  styleUrls: ['./stickies.component.css']
})
export class StickiesComponent implements OnInit {
  @ViewChild('stickyColumns', { static: false })
  stickyColumns!: ElementRef;

  public colorDropdown: boolean;
  private stickyModel!: Sticky;
  public stickyForm!: FormGroup;
  public blankStickyTempId: string;

  public stickies: any = [];

  constructor(private stickyService: StickyService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    ) { 
    this.colorDropdown = false;
    this.blankStickyTempId = 'temp';
    this.stickyModel = new Sticky(0);
  }

  ngOnInit(): void {
    this.initializeStickyForm();
    this.getStickies();
  }

  initializeStickyForm() {
    this.stickyForm = this.formBuilder.group({
      id: this.stickyModel.id,
      title: this.stickyModel.title,
      content: this.stickyModel.content,
      color: this.stickyModel.color,
    })
  }

  getStickies() {
    this.stickyService.getStickies().subscribe(
      (resp) => {
        // console.log(resp);
        this.stickies = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }

saveTitle(sticky:any, event:any) {
  sticky.title = event.target.value;
  const stickyToUpdate = this.stickies.indexOf(sticky);
  this.stickies[stickyToUpdate] = sticky;
  this.saveSticky(sticky, 'update');
}

saveContent(sticky:any, event:any) {
  sticky.content = event.target.value;
  const stickyToUpdate = this.stickies.indexOf(sticky);
  this.stickies[stickyToUpdate] = sticky;
  this.saveSticky(sticky, 'update');
}

saveColor(sticky:any, color:any) {
  sticky.color = color;
  const stickyToUpdate = this.stickies.indexOf(sticky);
  this.stickies[stickyToUpdate] = sticky;
  this.saveSticky(sticky, 'update');
}

  saveSticky(sticky: any, type: string) {
    this.stickyForm.patchValue({
      id: sticky.id,
      title: sticky.title,
      content: sticky.content,
      color: sticky.color,
    })

    const data = this.stickyForm.getRawValue();
    switch (type) {
      case 'new':
        let checkedDataNew = this.doBlankStickyFieldsCheck(data);
        this.stickyService.createSticky(checkedDataNew).subscribe(
          (resp) => {
            const newStickyIndex = this.stickies.indexOf(sticky);
            this.stickies[newStickyIndex] = resp;
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          }
        )
        break;
      
      case 'update':
          const checkedDataUpdate = this.doBlankStickyFieldsCheck(data);
          this.stickyService.updateSticky(checkedDataUpdate).subscribe(
            (resp) => {
              // console.log(resp);
              const newStickyIndex = this.stickies.indexOf(sticky);
              this.stickies[newStickyIndex] = resp;
            },
            (err: HttpErrorResponse) => {
              console.log(err);
            }
          )
          break;

      case 'delete':
          this.stickyService.deleteSticky(data.id).subscribe(
            (resp) => {
              // console.log(resp);
            },
            (err: HttpErrorResponse) => {
              console.log(err);
            }
          )
          break;
    }
  }


  changeStickyColor(color: string, sticky: any) {
    this.saveColor(sticky, color);
  }

  // Update background
  // updateBackground(color: string, i: any) {
  //   const elems: Element[] = Array.from(document.getElementsByClassName('appStickyColor'+i));
  //   elems.forEach((el: Element) => {
  //     (el as HTMLElement).style.backgroundColor = color;
  // })
  // }

  appendBlankSticky() {
    this.blankStickyTempId = 'temp'+ Math.random();
    const blankSticky = new Sticky(this.blankStickyTempId)
    this.stickies.unshift(blankSticky);
    this.saveSticky(blankSticky, 'new');
  }

  spliceSticky(sticky: any) {
    const stickyIndex = this.stickies.indexOf(sticky);
    this.stickies.splice(stickyIndex, 1);
    this.saveSticky(sticky, 'delete');
  }


  doBlankStickyFieldsCheck(data: any) {
      if (!data.title) {
        data.title = 'Edit title';
      }
      if (!data.content) {
        data.content = 'Edit content';
      }
      if (!data.color) {
        data.color = '#fff';
      }
    return data;
  }

}
