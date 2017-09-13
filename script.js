function Session(data, handlers) {
  this.period = data.period;
  this.onStart = handlers.start;
  this.onTick = handlers.tick;
  this.onSwap = handlers.swap;
}

Session.prototype = {
  swap() {
    this.onSwap();
  },
  tick() {
    if (this.timeLeft === 0) {
      this.swap();
      this.timeLeft = this.period;
    } else {
      this.timeLeft--;
    }
    this.onTick();
  },
  start() {
    this.timeLeft = this.period;
    this.onStart();
    setInterval(() => this.tick(), 1000);
  }
};

const handlers = {
  start() {
    displayTime(this.timeLeft);
  },
  tick() {
    displayTime(this.timeLeft);
  },
  swap() {
    playGong();
  }
};

function playGong() {
  var gong = document.getElementById("gong");
  gong.currentTime = 0;
  gong.play();
  console.log("Gong played!");
}

function padClockDigits(digits) {
  return String(digits).padStart(2, "0");
}

function displayTime(time) {
  if (time >= 3600) {
    return "Error";
  }
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  var string = padClockDigits(minutes) + ":" + padClockDigits(seconds);
  console.log(string);
  document.getElementById("timer").innerText = string;
}

var session = new Session(
  {
    driver: "Student A",
    navigator: "Student B",
    time: 1200,
    period: 600
  },
  handlers
);

session.start();
