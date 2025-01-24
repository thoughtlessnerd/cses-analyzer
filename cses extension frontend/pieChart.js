var values = [0];
var barColors = ["#FA0F62", "#0FE80C"];

const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

function makePieChart(yValues) {
  let sum = 0;
  for (let i = 0; i < yValues.length; i++) {
    sum += yValues[i];
  }
  let currAngle = 0;
  ctx.lineWidth = 10;
  for (let i = 0; i < yValues.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = barColors[i];
    ctx.ellipse(
      canvas.width / 2,
      canvas.height / 2,
      50,
      50,
      0,
      currAngle,
      ((Math.PI * 2 * yValues[i]) / sum) + currAngle
    );
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.closePath();
    ctx.fill();
    currAngle += (Math.PI * 2 * yValues[i]) / sum;
  }
}

// makePieChart(values);

setTimeout(() => {
  chrome.storage.sync.get(["countSolved", "countAll"], function (result) {
    console.log(result);
    solvedCount = result.countSolved;
    solvedCountElement = document.querySelector(".solvedProblemCount");
    solvedCountElement.innerHTML = `You have solved a total of ${solvedCount} out of ${result.countAll} problems.`;
    values = [solvedCount, result.countAll - solvedCount];
    makePieChart(values);
  });
}, 2000);
