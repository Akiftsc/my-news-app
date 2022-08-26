const axios = require("axios");
const json = require("jsonfile");
const file = "./data.json";
const apikey = "4c8916c2e45d475d865244285f8d50b6";
const url =
  "https://newsapi.org/v2/top-headlines?" +
  "country=tr&" +
  "apiKey=4c8916c2e45d475d865244285f8d50b6";
let currentdata;
json.readFile(file, (err, data) => {
  data ? (currentdata = data) : console.error(err);
});

const getNews = () => {
  axios.get(url).then((response) => {
    /* let data = Object.assign(currentdata, response.data); */
    let data = response.data;
    data.articles.forEach((data) => {
      //* ISO8601 to Date
      data.publishedAt = new Date(data.publishedAt).toLocaleString();
      //* Give an Id
      data._id = Math.floor(Math.random() * (500000 - 300000) + 300000);
      /* //* For Images
    data.urlToImage = data.urlToImage.replace(/^"(.*)"$/, "$1"); */
    });
    console.log(data);

    json.writeFile(file, data);
  });
};

setInterval(getNews, 1000 * 60 * 30);
