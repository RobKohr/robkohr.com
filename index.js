import fs from "fs";
import { marked } from "marked";

marked.use({
  gfm: true,
  headerIds: false,
  mangle: false
});

console.log("starting app");
/* read file from blog.md in a synchronous way */

var data = fs.readFileSync("blog.md", "utf8");
/* split data by ## */
var articlesFull = data.split("\n## ");

var tagPages = {};

var articles = articlesFull.map(function (article) {
  var lines = article.split("\n");
  var title = lines[0].trim();
  var content = lines.slice(1).join("\n").trim();
  /* 
        content contains variables that start with @date= or @tags=
        Those lines should be removed from the content and added to the article object
        */
  var variables = {};

  content = content.replace(/@(\w+)=(.*)/g, function (match, key, value) {
    if (key === "tags") {
      value = value.split(",").map(function (tagLabel) {
        tagLabel = tagLabel.trim();
        let tagLink = `<a href="tags/${tagLabel}">${tagLabel}</a>`;
        return {
          label: tagLabel,
          link: tagLink,
        };
      });
    }
    variables[key] = value;
    return "";
  });

  const html = marked.parse(content);
  /*
        convert markdown content to html
    */
  /* if variable publishDate is in the future, then skip this article */
  if (variables.publishDate && new Date(variables.publishDate) > new Date()) {
    return null;
  }

  /* if variable tags is set, then add this article to the tag page */
  if (variables.tags) {
    variables.tags.forEach(function (tag) {
      if (!tagPages[tag.label]) {
        tagPages[tag.label] = [];
      }
      tagPages[tag.label].push({
        title,
        content,
        variables,
        html,
      });
    });
  }

  return {
    title,
    content,
    variables,
    html,
  };
});

let output = `
    <html>
        <head>
            <title>RobKohr's Blog</title>
            <link rel="stylesheet" href="neat.css">
        </head>
        <body>
        <p></p>
        <h1>RobKohr's Blog</h1>
`;

const toKebab = function (str) {
    return str.trim().toLowerCase().replace(/[^a-z0-9]/g, "-").trim();
}

function addArticleToOutput(article, output) {
  const kabab = toKebab(article.title);
  if (article === null || !article.title || !article.content) {
    return output;
  }
  let tags = article.variables?.tags?.reduce(function (output, tag, index, array) {
    return output + tag.link + (index < array.length - 1 ? ", " : "");
  }, "");
  return (
    output +
    `
    <h2><a href="articles/${kabab}">${article.title}</a></h2>
    <div id="date">${`@date=${article.variables.date}`}</div>
    <div id="tags">${tags ? `@tags: ${tags}` : ""}</div>
    <article>
        ${article.html}
    </article>
    `
  );
}

articles.forEach(function (article) {
  if (article === null) {
    return;
  }
  output = addArticleToOutput(article, output);

  const articleStartHtml = `
        <html>
            <head>
                <title>RobKohr's Blog - ${article.title}</title>
                <link rel="stylesheet" href="../neat.css">
                <base href="../">
            </head>
            <body>
            <a href="./index.html">Home</a>
            `;
  const articleEndHtml = `
            </body>
          </html>
          `;
  const articleHtml = articleStartHtml + addArticleToOutput(article, '') + articleEndHtml;
  const filename = `${toKebab(article.title)}`
  if(filename){
    fs.writeFileSync(`blog/articles/${filename}`, articleHtml);
  }  
});
output += `
        </body>
    </html>
`;
fs.writeFileSync("blog/index.html", output);
 
Object.keys(tagPages).forEach(function (tag) {
  let output = `
        <html>
            <head>
                <title>RobKohr's Blog - ${tag}</title>
                <link rel="stylesheet" href="../neat.css">
                <base href="../">
            </head>
            <body>
            <a href="./index.html">Home</a>
            <h2>Tag: ${tag}</h2>
    `;
  tagPages[tag].forEach(function (article) {
    output = addArticleToOutput(article, output);
  });
  output += `
            </body>
        </html>
    `;
  fs.writeFileSync(`blog/tags/${tag}`, output);
});

// console.log(JSON.stringify(articles, null, 4));

/* copy neat.css to blog folder */
fs.copyFileSync("./neat.css", "blog/neat.css");

console.log("done");
