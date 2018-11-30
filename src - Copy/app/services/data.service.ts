import { Injectable } from '@angular/core';
import { UserData } from '../models/UserData';

@Injectable()

export class DataService {

  dataArray: UserData[] = [
    { id: 1, name: "Oliver L.", progress: 15, color: "aqua", date: new Date('2018-12-18T18:30:00.000Z') },
    { id: 2, name: "Violet I.", progress: 80, color: "orange", date: new Date('2018-11-19T18:30:00.000Z') },
    { id: 3, name: "Cora O.", progress: 18, color: "purple", date: new Date('2018-11-18T18:30:00.000Z') },
    { id: 4, name: "Amelia V.", progress: 50, color: "teal", date: new Date('2018-10-10T18:30:00.000Z') },
    { id: 5, name: "Charlotte C.", progress: 97, color: "red", date: new Date('2018-11-18T18:30:00.000Z') },
    { id: 6, name: "Arthur T.", progress: 53, color: "aqua", date: new Date('2018-12-17T18:30:00.000Z') },
    { id: 7, name: "Isabella C.", progress: 27, color: "navy", date: new Date('2018-09-18T18:30:00.000Z') },
    { id: 8, name: "Amelia I.", progress: 68, color: "olive", date: new Date('2018-08-18T18:30:00.000Z') },
    { id: 9, name: "Theodore V.", progress: 31, color: "fuchsia", date: new Date('2018-11-05T18:30:00.000Z') },
    { id: 10, name: "Theodore A.", progress: 82, color: "teal", date: new Date('2018-08-23T18:30:00.000Z') },
    { id: 11, name: "Thomas C.", progress: 20, color: "yellow", date: new Date('2018-09-18T18:30:00.000Z') },
    // { id: 12, name: "Jack E.", progress: 59, color: "maroon" },
    // { id: 13, name: "Cora M.", progress: 70, color: "teal" },
    // { id: 14, name: "Mia M.", progress: 35, color: "aqua" },
    // { id: 15, name: "Theodore T.", progress: 50, color: "yellow" },
    // { id: 16, name: "Isabella M.", progress: 29, color: "black" },
    // { id: 17, name: "Isabella A.", progress: 70, color: "yellow" },
    // { id: 18, name: "Violet A.", progress: 92, color: "orange" },
    // { id: 19, name: "Isabella M.", progress: 55, color: "black" },
    // { id: 20, name: "Oliver A.", progress: 92, color: "red" },
    // { id: 21, name: "Theodore T.", progress: 64, color: "red" }

  ];

  constructor() { }

}
