import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  csvRecords: any[] = [];
  header = false;
  selectedChart = "";
  table = [];
  response = {};
  SERVER_URL = 'http://localhost:8080/detect';
  graphLabels$ = new BehaviorSubject<string[]>([]);

  private algorithm$ = new BehaviorSubject<string>('');
  private fileTest$ = new BehaviorSubject<File>(null);
  private fileTrain$ = new BehaviorSubject<File>(null);
  private transformed1: string;
  private transformed2: string;

  constructor(private ngxCsvParser: NgxCsvParser, private httpClient: HttpClient) {

  }

  postFile(file1: File, file2: File): void {
    const formData: FormData = new FormData();
    formData.append('train_data', file1, file1.name);
    formData.append('test_data', file2, file2.name);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const params = {'model_type': this.algorithm$.getValue()};
    this.httpClient.post<any>(this.SERVER_URL, formData, {headers, params}).subscribe(data => {
      this.response = data;
    });
  }

  updateAlgorithm(alg: string) {
    this.algorithm$.next(alg);
  }

  updateFileTest(f: File) {
    this.fileTest$.next(f);
  }

  updateFileTrain(f: File) {
    this.fileTrain$.next(f);
  }

  onUpload() {
    const f1: File = this.fileTest$.getValue();
    const f2: File = this.fileTrain$.getValue();
    // Parse the file you want to select for the operation along with the configuration
    combineLatest(
      this.ngxCsvParser.parse(f1, {header: this.header, delimiter: ','}),
      this.ngxCsvParser.parse(f2, {header: this.header, delimiter: ','}))
      .subscribe(([result1, result2]: any) => {
        this.table = result1;
        this.graphLabels$.next(result1[0]);
        // from here
        console.log(this.algorithm$.getValue());
        console.log('Transformed Result1', JSON.stringify(this.transformResult(result1)));
        console.log('Transformed Result2', JSON.stringify(this.transformResult(result2)));
        this.transformed1 = JSON.stringify(this.transformResult(result1));
        this.transformed2 = JSON.stringify(this.transformResult(result2));
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
    this.postFile(f1, f2);
  }

  private transformResult(result: Array<any>): Array<any> {
    const transformedResult = new Array<any>();
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        let rowResult: Array<any>;
        if (i === 0) {
          rowResult = new Array<any>();
          transformedResult.push(rowResult);
        }
        transformedResult[j].push(result[i][j]);
      }
    }
    return transformedResult;
  }


}
