import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {AlgorithmService} from "../../services/algorithm.service";


// import {SelectALGComponent} from "../select-alg/select-alg.component";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  highcharts: typeof Highcharts = Highcharts;
  data = [];
  options: Highcharts.Options = {
    series: []
  };
  selectedIdx = -1;
  updateFlag: true;

   /* example = [{"start": 11, "end": 13, "description": "A~B"},
    {"start": 11, "end": 120, "description": "B~F"},
    {"start": 10, "end": 40, "description": "C~D"},
    {"start": 5, "end": 77, "description": "D~E"},
    {"start": 1, "end": 9, "description": "E~F"},
    {"start": 2, "end": 2, "description": "F~A"},
    {"start": 100, "end": 109, "description": "G~B"},
        {"start": 50, "end": 200, "description": "H~C"}
  ]; */
  /* example = [{"start": 11, "end": 13, "description": "aileron~slats"},
      {"start": 11, "end": 120, "description": "elevator~rudder"},
      {"start": 10, "end": 40, "description": "rudder~flaps"},
      {"start": 5, "end": 77, "description": "flaps~elevator"},
      {"start": 1, "end": 9, "description": "slats~rudder"},
      {"start": 2, "end": 2, "description": "speedbrake~aileron"},
      {"start": 11, "end": 120, "description": "throttle~rudder"},
      {"start": 10, "end": 40, "description": "throttle~flaps"},
      {"start": 5, "end": 77, "description": "engine-pump~elevator"},
      {"start": 1, "end": 9, "description": "engine-pump~rudder"},
      {"start": 2, "end": 2, "description": "electric-pump~aileron"},
      {"start": 11, "end": 120, "description": "electric-pump~rudder"},
      {"start": 10, "end": 40, "description": "external-power~flaps"},
      {"start": 5, "end": 77, "description": "APU-generator~elevator"},
      {"start": 1, "end": 9, "description": "latitude-deg~rudder"},
      {"start": 2, "end": 2, "description": "longitude-deg~aileron"},
      {"start": 2, "end": 2, "description": "altitude-ft~aileron"},
      {"start": 11, "end": 120, "description": "roll-deg~rudder"},
      {"start": 10, "end": 40, "description": "pitch-deg~flaps"},
      {"start": 5, "end": 77, "description": "heading-deg~elevator"},
      {"start": 1, "end": 9, "description": "side-slip-deg~rudder"},
      {"start": 2, "end": 2, "description": "airspeed-kt~aileron"},
      {"start": 5, "end": 77, "description": "glideslope~elevator"},
      {"start": 1, "end": 9, "description": "vertical-speed-fps~rudder"},
      {"start": 2, "end": 2, "description": "airspeed-indicator_indicated-speed-kt~aileron"},
      {"start": 2, "end": 2, "description": "altimeter_indicated-altitude-ft~aileron"},
      {"start": 11, "end": 120, "description": "altimeter_pressure-alt-ft~rudder"},
      {"start": 10, "end": 40, "description": "attitude-indicator_indicated-pitch-deg~flaps"},
      {"start": 5, "end": 77, "description": "attitude-indicator_indicated-roll-deg~elevator"},
      {"start": 1, "end": 9, "description": "attitude-indicator_internal-pitch-deg~rudder"},
      {"start": 2, "end": 2, "description": "attitude-indicator_internal-roll-deg~aileron"},
      {"start": 1, "end": 9, "description": "encoder_indicated-altitude-ft~rudder"},
      {"start": 2, "end": 2, "description": "encoder_pressure-alt-ft~aileron"},
      {"start": 2, "end": 2, "description": "gps_indicated-altitude-ft~aileron"},
      {"start": 11, "end": 120, "description": "gps_indicated-ground-speed-kt~rudder"},
      {"start": 10, "end": 40, "description": "gps_indicated-vertical-speed~flaps"},
      {"start": 5, "end": 77, "description": "indicated-heading-deg~elevator"},
      {"start": 1, "end": 9, "description": "magnetic-compass_indicated-heading-deg~rudder"},
      {"start": 2, "end": 2, "description": "slip-skid-ball_indicated-slip-skid~aileron"},
      {"start": 300, "end": 500, "description": "turn-indicator_indicated-turn-rate~attitude-indicator_internal-pitch-deg"},
      {"start": 2, "end": 2, "description": "vertical-speed-indicator_indicated-speed-fpm~aileron"},
      {"start": 5, "end": 77, "description": "engine_rpm~elevator"}
    ]; */
  parsed: any;
  matchedChart: any;
  matchedChartIdx = -1;
  startIdx: number;
  endIdx: number;

  constructor(private algService: AlgorithmService) {
  }

  ngOnInit(): void {

    this.data = [
      {
        name: this.algService.selectedChart,
        data: this.getCol(this.algService.table, this.selectedIdx)
      },
      {
        name: this.matchedChart,
        data: this.getCol(this.algService.table, this.matchedChartIdx)
      },
      {
        name: "Anomaly",
        data: [[this.startIdx, 0], [this.endIdx, 0]]
      }
    ];
    this.options = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Anomaly Graph'
      },
      yAxis: {
        title: {
          text: 'value'
        }
      },
      series: this.data
    };
  }

  rsplit(st, sep, maxsplit) {
    var split = st.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
  }

  displayChart(): void {
      let parsed = [];
      for (let i = 0; i < Object.keys(this.algService.response).length; i++) {
        parsed = this.rsplit(this.algService.response[i]['description'], "~", 1);
        if (parsed[0] == this.algService.selectedChart) {
          this.matchedChart = parsed[1];
          this.startIdx = this.algService.response[i]["start"];
          this.endIdx = this.algService.response[i]["end"];
        }
      }
      this.matchedChartIdx = this.getIdxChart(this.algService.table, this.matchedChart);
      this.selectedIdx = this.getIdxChart(this.algService.table, this.algService.selectedChart);
      this.ngOnInit();
    }


  getIdxChart(matrix, chart) {
    let i = 0;
    for (i = 0; i < matrix.length; i++) {
      if (matrix[0][i] == chart) {
        return i;
      }
    }
  }

  getCol(matrix, col) {
    var column = [];
    for (var i = 1; i < matrix.length; i++) {
      column.push(parseInt(matrix[i][col]));
    }
    return column;
  }
}
