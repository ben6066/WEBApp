import {Component, OnInit} from '@angular/core';
import {AlgorithmService} from '../../services/algorithm.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-select-alg',
  templateUrl: './select-alg.component.html',
  styleUrls: ['./select-alg.component.css']
})
export class SelectALGComponent implements OnInit {
  algorithm: string;
  graph: string;

  graphLabels$: Observable<string[]>;

  constructor(private algService: AlgorithmService) {
  }

  ngOnInit(): void {
    this.graphLabels$ = this.algService.graphLabels$.asObservable();
  }

  onChangeofAlgOptions(newAlg) {
    this.algService.updateAlgorithm(newAlg);
  }

  onChangeofGraphOptions(newGraph) {
    this.algService.selectedChart = newGraph;
  }

  onSubmit() {
    this.algService.onUpload();
  }

}
