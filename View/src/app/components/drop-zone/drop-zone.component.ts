import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { AlgorithmService } from '../../services/algorithm.service';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent {

  @Input() zoneLabel: string;
  @Input() fileType: string;

  public files: any[] = [];

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog,
              private algService: AlgorithmService){}

  onFileChange(pFileList: File[]){
    this.files = Object.keys(pFileList).map(key => pFileList[key]);
    this.updateFile(this.files[0]);
    this._snackBar.open("Successfully upload!", 'Close', {
      duration: 2000,
    });
  }

  deleteFile(f){
    debugger;
    this.files = this.files.filter(function(w){ return w.name != f.name });
    this._snackBar.open("Successfully delete!", 'Close', {
      duration: 2000,
    });
  }

  openConfirmDialog(pIndex): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      panelClass: 'modal-xs'
    });
    dialogRef.componentInstance.fName = this.files[pIndex].name;
    dialogRef.componentInstance.fIndex = pIndex;


    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteFromArray(result);
      }
    });
  }

  deleteFromArray(index) {
    console.log(this.files);
    this.files.splice(index, 1);
    this.updateFile(null);
  }

  updateFile(file: File) {
    if(this.fileType === 'Train') {
      this.algService.updateFileTrain(file);
    } else {
      this.algService.updateFileTest(file)
    }
  }

}
