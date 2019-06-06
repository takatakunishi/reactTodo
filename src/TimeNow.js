import React from 'react';
import { get } from 'https';








// function clock() {
//     getNow();
// }

// let timerId = setInterval(clock(), 500); //0.5秒毎にclock()を実行

class TimeNow extends React.Component {
  constructor() {
    super();
    // this.GetNow = this.GetNow.bind(this);
  }

  // clock() {
  //   let timerId = setInterval(this.GetNow(), 500);
  //   this.GetNow();
  // }


  // GetNow() {

  //   let now = new Date();
  //   let year = now.getFullYear();
  //   let mon = now.getMonth() + 1; //１を足すこと
  //   let day = now.getDate();
  //   let hour = now.getHours();
  //   let min = now.getMinutes();
  //   let sec = now.getSeconds();
  //   let s = year + "年" + mon + "月" + day + "日" + hour + "時" + min + "分" + sec + "秒";
  //   return (
  //     <div style={{ color: 'red' }}>
  //       {s}
  //     </div>
  //   );
  // }


  render() {
    return (
      <div>
        this is TimeNow
        {/* {this.GetNow()} */}
      </div>
    );
  }
}

export default TimeNow;