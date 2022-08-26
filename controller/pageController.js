import fs from "fs";
import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch (exception) {
      callback(exception);
    }
  });
}

const getIndexPage = async (req, res) => {
  readJSONFile("./data/data.json", function (err, json) {
    if (err) {
      throw err;
    }
    res.render("index", { json });
  });
};

const getPostPage = async (req, res) => {
  let id = req.params.uid;
  readJSONFile("./data/data.json", function (err, json) {
    if (err) {
      throw err;
    }
    let data;
    let fullcontent;
    json.articles.forEach((arc) => {
      if (arc._id === parseInt(id)) {
        data = arc;
      }
    });
    console.log(data.url);
    axios.get(data.url).then(function (r2) {
      let dom = new JSDOM(r2.data, {
        url: data.url,
      });

      // now pass the DOM document into readability to parse
      let article = new Readability(dom.window.document).parse();
      res.render("post", { data, article });
    });
  });
};

export { getIndexPage, getPostPage };
