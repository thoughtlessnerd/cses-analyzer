class CSES {
  constructor() {}
  async computeRating() {
    // await this.getRatings();
    // console.log(this.ratings);
    let problems = document.querySelectorAll("[href*='/problemset/task/']");
    console.log(problems);

    for (let i = 0; i < problems.length; i++) {
      // let rating = await this.findRating(problems[i]); // this would come from API
      let rating = Math.floor(Math.random() * 2000) + 800;
      const para = document.createElement("rating" + i);
      const node = document.createTextNode(`(${rating})`);
      para.appendChild(node);
      para.className = "rating";
      para.style.color = await this.getRatingColor(rating);
      para.style.display = "block";
      problems[i].parentElement.appendChild(para);
      // icon, name, count, status, rating
      problems[i].parentElement.style.display = "grid";
      problems[i].parentElement.style.gridTemplateColumns =
        "1fr 10fr 3fr 1fr 1fr";
      problems[i].parentElement.style.gridTemplateRows = "1fr";
      // problems[i].parentElement.style.alignItems = "center";
      // problems[i].parentElement.style.justifyContent = "center";
    }
  }

  async findRating(problemTag) {
    for (let i = 0; i < this.ratings.length; i++) {
      if (
        this.ratings[i].problem[
          problemTag.parentElement.parentElement.previousElementSibling
            .innerText
        ] !== undefined
      ) {
        if (
          this.ratings[i].problem[
            problemTag.parentElement.parentElement.previousElementSibling
              .innerText
          ][problemTag.innerText] !== undefined
        )
          return this.ratings[i].problem[
            problemTag.parentElement.parentElement.previousElementSibling
              .innerText
          ][problemTag.innerText];
      }
    }
    return "Not Found";
  }

  async getRatingColor(rating) {
    if (rating < 1200) return "grey";
    if (rating < 1400) return "green";
    if (rating < 1600) return "cyan";
    if (rating < 1900) return "blue";
    if (rating < 2100) return "purple";
    if (rating < 2400) return "orange";
    return "red";
  }

  async getRatings() {
    const url =
      "https://cses-extensiona-code-daily.1955-1616.repl.co/api/v1/problem/all";
    const res = await fetch(url).then((result) => result.json());
    console.log(res);
    this.ratings = res.getAllProblem;
  }
}

setTimeout(() => {
  const cses = new CSES();
  cses.computeRating();
}, 1000);
