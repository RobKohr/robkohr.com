import fs from "fs";
import { marked } from "marked";

const darkMode = false; // set true to re-enable dark mode

/* Get html content from analytics.html */
var headerExtras = `
${fs.readFileSync("analytics.html", "utf8")}
<link rel="alternate" type="application/rss+xml" title="RobKohr's Blog" href="./rss.xml" />
<link rel="shortcut icon" type="image/ico" href="./favicon.ico">
<link rel="stylesheet" href="./libs/highlight/styles/${darkMode ? "dark" : "default"}.min.css">
<script src="./libs/highlight/highlight.min.js"></script>
<script src="./image-lazy-loader.js"></script>
`;

const toptalBadge = `
<div style="float:right;margin:1em;zoom:0.4;">
<div id=r><style>@import"https://use.typekit.net/kmj5qkr.css";:root{--h:polygon(50% 0,100% 24%,100% 76%,50% 100%,0 76%,0 24%)}.h{display:inline-block;background:#25a9ef;padding:6px;clip-path:var(--h)}.a{width:200px;padding:24px 0 40px;display:flex;flex-direction:column;align-items:center;gap:8px;color:#204ecf;text-align:center;background:radial-gradient(circle at 20% -10%,#00c3ff -80%,#fff 30%),radial-gradient(circle at -20% 20%,#00c3ff -80%,#fff 30%),radial-gradient(circle at 70% 100%,#00c3ff -80%,#fff 30%),radial-gradient(circle at 120% 80%,#00c3ff -80%,#fff 30%);background-blend-mode:multiply;clip-path:var(--h);box-shadow:0 28px 50px rgba(6,30,96,.35)}#r{font-family:proxima-nova,Arial,sans-serif}.b{margin:0;font-size:19px;font-weight:700;line-height:1}.c{width:120px;height:1px;background:#25a9ef}.d{font-size:16px;margin-bottom:-6px}.f{display:inline-flex;align-items:center;justify-content:center;padding:4px 20px;border-radius:6px;background:#296bff;color:#fff;font-size:16px;font-weight:500;text-decoration-thickness:.5px;text-underline-offset:2px}</style><div class=h><div class=a><svg width=64 viewBox="0 0 60 17" xmlns="http://www.w3.org/2000/svg"><path d="m20.85 6.38 6.06-.89 2.72-5.49 2.71 5.49 6.06.89-4.39 4.28 1.04 6.03-5.42-2.85-5.43 2.85 1.04-6.03zm33.06 7.17 1.85-.27.82-1.67.83 1.67 1.84.27-1.33 1.31.31 1.83-1.65-.87-1.66.87.32-1.83zm-3.38-3.01-3.61-.52-1.61-3.26-1.62 3.26-3.6.52 2.6 2.55-.61 3.59 3.23-1.69 3.21 1.69-.61-3.59zm-45.19 3.01-1.85-.27-.82-1.67-.83 1.67-1.84.27 1.33 1.31-.31 1.83 1.65-.87 1.65.87-.31-1.83zm3.38-3.01 3.61-.52 1.61-3.26 1.61 3.26 3.61.52-2.6 2.55.61 3.59-3.23-1.69-3.22 1.69.62-3.59z" fill="#00c3ff"/></svg><h3 class=b>TOP 3% TALENT</h3><div class=c></div><span class=d>Vetted by</span><svg style="width:100px;" viewBox="0 0 108 30" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.11 0L14.82 6.7C14.87 6.75 14.91 6.8 14.97 6.85L20.82 12.7L11.31 22.16L15.66 26.52L12.75 29.41L6.09 22.75C6.01 22.68 5.93 22.6 5.85 22.52L0 16.68L9.48 7.25L5.16 2.94L8.11 0ZM12.36 10.5C12.27 10.48 12.18 10.48 12.1 10.5C12.01 10.53 11.94 10.57 11.78 10.72L6.37 16.11C6.21 16.27 6.17 16.34 6.15 16.42C6.12 16.51 6.12 16.6 6.15 16.68C6.17 16.77 6.22 16.85 6.37 17L8.09 18.72C8.24 18.87 8.31 18.91 8.4 18.94C8.49 18.96 8.57 18.96 8.66 18.94C8.75 18.91 8.82 18.87 8.97 18.72L14.38 13.33C14.54 13.18 14.58 13.1 14.61 13.02C14.63 12.93 14.63 12.85 14.61 12.76C14.59 12.67 14.54 12.6 14.39 12.45L12.67 10.73C12.52 10.57 12.44 10.53 12.36 10.5Z" fill="#204ecf"/><path fill-rule="evenodd" clip-rule="evenodd" d="M62.65 7.76C64.76 7.76 66.56 8.58 67.99 10.16C69.45 11.69 70.18 13.8 70.17 16.42C70.17 18.98 69.42 21.22 67.93 22.8C66.46 24.37 64.59 25.17 62.35 25.17C60.42 25.16 58.67 24.47 57.51 23.28L57.35 23.11L57.34 29.86L53.52 29.85V29.57L53.56 7.96L57.36 7.96L57.35 10.6C58.6 9.19 60.61 7.76 62.65 7.76ZM87.1 7.82C89.28 7.82 90.78 8.31 91.94 9.26C93.05 10.18 93.64 11.82 93.69 13.55L93.69 13.81L93.67 24.95H89.8L89.8 24.49C89.8 24.01 89.8 23.52 89.8 23.02C88.68 24.57 87.12 25.32 85.04 25.32C83.39 25.32 81.99 24.82 80.97 23.9C79.94 22.95 79.39 21.66 79.39 20.16C79.41 17.33 81.41 15.37 84.91 14.76L85.18 14.71L89.82 13.98V13.61C89.82 12.83 89.59 11.89 89.13 11.5C88.66 11.1 88.09 10.77 87.1 10.77C84.37 10.77 83.81 12.78 83.78 13.79L83.78 13.88L80.36 13.92C80.36 12.43 81.05 10.5 82.44 9.29C83.56 8.32 85.19 7.87 86.77 7.82L87.07 7.82H87.1ZM72.12 3.46L75.93 3.46L75.92 8.02L79.45 8.02L79.45 11.2L75.91 11.19L75.9 19.73C75.9 20.67 76.09 21.29 76.5 21.58C76.93 21.88 77.8 21.6 77.8 21.6L78.14 24.92C78.14 24.92 76.94 25.23 76.18 25.23C75.19 25.23 74.34 24.98 73.69 24.48C72.63 23.68 72.09 22.28 72.09 20.31L72.11 11.19L68.92 8L72.12 8.01L72.12 3.46ZM49.66 10.26C50.76 11.39 52.07 13.4 52.06 16.52C52.05 19.63 50.74 21.63 49.65 22.76C48.15 24.3 46.11 25.18 44.06 25.18C43.98 25.18 43.9 25.18 43.81 25.17C41.62 25.16 39.68 24.38 38.06 22.84C36.43 21.29 35.6 19.16 35.6 16.48C35.6 13.8 36.44 11.66 38.07 10.12C39.69 8.59 41.62 7.82 43.82 7.82C45.99 7.75 48.11 8.65 49.66 10.26ZM40.85 3.22V6.99L33.49 7L33.51 24.97L29.54 24.96V24.62L29.57 6.99H22.06L22.07 3.22H40.85ZM95.53 3.47L98.95 3.48V3.57L98.92 24.95L95.5 24.94V24.84L95.53 3.47ZM89.82 17.05L86.01 17.69C84.15 18.01 83.29 18.73 83.28 19.99C83.27 21.14 84.09 21.91 85.37 21.98L85.53 21.98H85.55C87.99 21.98 89.72 20.08 89.81 17.31L89.82 17.09V17.05ZM43.8 11.21C42.52 11.21 41.41 11.7 40.51 12.68C39.63 13.64 39.18 14.92 39.18 16.49C39.18 18.07 39.63 19.35 40.51 20.31C41.4 21.29 42.51 21.78 43.79 21.79C45.09 21.79 46.21 21.3 47.1 20.32C48 19.34 48.45 18.06 48.46 16.51C48.47 14.95 48.01 13.67 47.11 12.69C46.21 11.71 45.1 11.21 43.8 11.21ZM61.74 11.33H61.72C60.44 11.33 59.38 11.79 58.48 12.76C57.58 13.7 57.13 14.92 57.12 16.39C57.12 17.88 57.57 19.22 58.47 20.2C59.39 21.14 60.45 21.61 61.72 21.61C63.01 21.61 64.1 21.13 64.97 20.2C65.88 19.23 66.32 17.9 66.33 16.41C66.33 14.93 65.87 13.71 64.99 12.78C64.12 11.82 63.03 11.33 61.74 11.33Z" fill="#262d3d"/></svg><a target="_blank" class=f href=https://www.toptal.com/developers/resume/robert-kohr#XpOe0W>Hire me</a></div></div></div>
</div>
`

/* 
A function that will take a string like this:
![[Yeast starter.jpg]]
and replace it with this:
<img src="Yeast starter.jpg" alt="Yeast starter" />
*/

function replaceImageLinks(text) {
  const out = text.replace(/!\[\[(.+)\]\]/g, '<img data-src="images/$1" alt="$1" style="max-width: 100%;max-height:40vh;" />');
  /* find all image paths, remove the syntax around them, and put the file names in an array */
  const matches = text.match(/!\[\[(.+)\]\]/g)?.map(function (match) {
    return match.replace(/!\[\[(.+)\]\]/, "$1");
  });
  /* check to see which of the matched filenames are not in the images/ directory */
  const missingImages = matches?.filter(function (match) {
    /* url decode the filename */
    match = decodeURIComponent(match);
    match = match.replace("&#39;", "'");
    return !fs.existsSync(`images/${match}`);
  });
  /* if there are missing images, then print them out */
  if (missingImages?.length) {
    /* url decode all of the matches */
    missingImages.forEach(function (match, index, array) {
      array[index] = decodeURIComponent(match);
    });

    console.log("missing images:", missingImages.join(", "));
  }
  return out;
}

/* 
remove link tags from any youtube urls and replace them with an iframe 
Also allow for query parameters to be passed to the youtube url
*/
function convertYoutubeUrlsIntoHtml(text) {
  return text.replace(
    /<a href="https:\/\/www.youtube.com\/watch\?v=(\w+)">(.+)<\/a>/g,
    '<div><iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
}

function htmlUpdaters(text) {
  return replaceImageLinks(text);
}

marked.use({
  gfm: true,
  headerIds: false,
  mangle: false,
});

console.log("starting app");
/* read file from blog.md in a synchronous way */

var data = fs.readFileSync("blog.md", "utf8");
/* split data by ## */
var articlesFull = data.split("\n## ");

var tagPages = {};

var articles = articlesFull.map(function (articleOrig) {
  const article = {};
  var lines = articleOrig.split("\n");
  article.title = lines[0].trim();
  article.content = lines.slice(1).join("\n").trim();
  /* 
        content contains variables that start with @date= or @tags=
        Those lines should be removed from the content and added to the article object
        */
  article.variables = {};
  const tagLabels = [];
  article.content = article.content.replace(/@(\w+)=(.*)/g, function (match, key, value) {
    value = value.trim();
    if (key === "tags") {
      value = value
        .split(",")
        .map(function (tagLabel) {
          tagLabel = tagLabel.trim();
          tagLabels.push(tagLabel);
          if (tagLabel === "") {
            return "";
          }
          let tagLink = `<a href="tags/${tagLabel}">${tagLabel}</a>`;
          return {
            label: tagLabel,
            link: tagLink,
          };
        })
        .filter(function (tag) {
          return tag !== "";
        });
    }
    article.variables[key] = value;
    return "";
  });

  article.html = htmlUpdaters(marked.parse(article.content));
  const htmlHasAtLeastOneImageTag = article.html.match(/<img.+>/g);
  const contentWithoutVariables = article.content.replace(/@(\w+)=(.*)/g, "");
  const contentWithoutImages = contentWithoutVariables.replace(/!\[\[(.+)\]\]/g, "");
  const contentWithoutATags = contentWithoutImages.replace(/<a href="(.+)">(.+)<\/a>/g, "");
  const wordCount = article.content.split(" ").length;
  const imageCount = article.html.match(/<img.+>/g)?.length || 0;
  const imageCountLabel = imageCount > 0 ? `, ${imageCount} images` : "";
  const summaryLength = 300;
  const hasReadMore = contentWithoutATags.length > summaryLength;
  
  article.summary = htmlUpdaters(
    marked.parse(contentWithoutATags.substring(0, 300) + "...") +
      ` <p><a class="nowrap" href="${articleUrl(article)}">READ MORE (${wordCount} words, ${Math.round(
        wordCount / 130
      )} minutes${imageCountLabel})</a></p> `
  ).replace(/<img.+>/g, "");
  
  if (!hasReadMore) {
    article.summary = article.html;
  }
  
  // Extract icon image from article HTML, but only if summary doesn't already contain images
  // Check the final summary HTML that will be displayed
  const summaryHasImages = article.summary.match(/<img.+>/g);
  let icon = "";
  if (!summaryHasImages) {
    let matches = article.html.match(/<img data-src="(.+)" alt="(.+)" style="[^"]*max-width:\s*100%[^"]*" \/>/);
    icon = matches?.length ? matches[0] : "";
    if (icon) {
      icon = `<a href="${articleUrl(article)}">${icon.replace("img", 'img class="icon"')}</a>`;
      article.iconUrl = matches[1];
    }
  }
  article.icon = icon;

  /*
        convert markdown content to html
    */
  /* if variable publishDate is in the future, then skip this article */
  if (article.variables.publishDate && new Date(article.variables.publishDate) > new Date()) {
    return null;
  }
  if (tagLabels.includes("politics")) {
    return null;
  }

  if ((!article.variables.tags || article.variables.tags.length === 0) && article.variables.date) {
    article.variables.tags = [{ label: "untagged", link: `<a href="tags/untagged">untagged</a>` }];
  }

  /* if variable tags is set, then add this article to the tag page */
  if (article.variables.tags) {
    article.variables.tags.forEach(function (tag) {
      if (!tagPages[tag.label]) {
        tagPages[tag.label] = [];
      }
      tagPages[tag.label].push(article);
    });
  }

  return article;
});

/* go through articles if title is not unique, then add date to title */
var titles = {};
articles.forEach(function (article) {
  if (!article) {
    return;
  }
  if (titles[article.title.toLowerCase()]) {
    article.title = article.title + " " + article.variables.date;
  }
  titles[article.title.toLocaleLowerCase()] = true;
});

let output = `
<!DOCTYPE html>
  <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        
            <title>RobKohr's Blog</title>
            <base href="./">
${headerExtras}
            <link rel="stylesheet" href="neat.css">
        </head>
        <body>
        ${toptalBadge}
        <p></p>
        <img src="headshot.png" alt="Rob Kohr" style="max-width: 105px;float:left;margin:2em;border-radius:1em;" />
        <h1>RobKohr's Blog</h1>
        <p><i>
        My father says almost the whole world's asleep. Everybody you know, everybody you see, everybody you talk to. He says only a few people are awake. And they live in a state of constant total amazement.
        </i><br/>
        -Joe Vs. The Volcano
        
        </p>
`;

function toKebab(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .trim();
}

function articleUrl(article) {
  return `articles/${toKebab(article.title)}`;
}

function addArticleToOutput(article, output, full) {
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
    <div class="variables">
    <div class="date">${article.variables.date ? `@date=${article.variables.date}` : ""}</div>
    <div class="tags">${tags ? `@tags=${tags}` : ""}</div>
    </div>
    <article>
        ${full ? article.html : article.icon + article.summary}
    </article>
    `
  );
}

articles.forEach(function (article) {
  if (article === null) {
    return;
  }
  if (!article.variables.page) {
    output = addArticleToOutput(article, output);
  }
  const filename = `${toKebab(article.title)}`;

  //description content for meta tag needs to be less than 200 characters and no html and now double quotes and new lines should be removed
  const description = article.content
    .replace(/<[^>]+>/g, "")
    .replace(/\n/g, "")
    .substring(0, 200)
    .replace(/"/g, "");

  const articleStartHtml = `
<!DOCTYPE html>
  <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />            
        <base href="../">  
                <title>${article.title} - RobKohr's Blog</title>
${headerExtras}
                <link rel="canonical" href="https://robkohr.com/articles/${filename}" />
                <link rel="stylesheet" href="./neat.css">
${article.icon ? '<meta property="og:image" content="https://robkohr.com/' + article.iconUrl + '" />' : ""}
                <meta property="og:description" content="${description}" />
            </head>
            <body>
            <a href="./index.html">&larr; Home</a>
            `;
  const articleEndHtml = `
            </body>
          </html>
          `;
  const articleHtml = articleStartHtml + addArticleToOutput(article, "", true) + articleEndHtml;
  if (filename) {
    fs.writeFileSync(`articles/${filename}`, articleHtml);
  }
});
output += `
        </body>
    </html>
`;
fs.writeFileSync("index.html", output);

Object.keys(tagPages).forEach(function (tag) {
  let output = `
        <html>
            <head>
                <base href="../">
                <title>${tag} - RobKohr's Blog</title>
${headerExtras}
                <link rel="stylesheet" href="./neat.css">
            </head>
            <body>
            <a href="./index.html">&larr; Home</a>
            <h2>Tag: ${tag}</h2>
    `;
  tagPages[tag].forEach(function (article) {
    output = addArticleToOutput(article, output);
  });
  output += `
            </body>
        </html>
    `;
  if (tag === "") {
  }
  fs.writeFileSync(`tags/${tag}`, output);
});

/* Create an index page that lists all the tags and the count of articles under each tag */
output = `
    <html>
        <head>
            <base href="../">
            <title>Tags - RobKohr's Blog</title>
${headerExtras}
            <link rel="stylesheet" href="./neat.css">
        </head>
        <body>
        <a href="./index.html">&larr; Home</a>
        <h2>Tags</h2>
`;

const tagsSortedByArticleCountDesc = Object.keys(tagPages).sort(function (a, b) {
  return tagPages[b].length - tagPages[a].length;
});

tagsSortedByArticleCountDesc.forEach(function (tag) {
  output += `<a href="tags/${tag}">${tag}</a> (${tagPages[tag].length})<br/>`;
});
output += `
        </body>
    </html>
`;
fs.writeFileSync(`tags/index.html`, output);

/* create a date string, but set the time to midnight */
const date = new Date();
const basicDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toUTCString();

/* create an rss feed of the last 50 articles */
output = `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
            <atom:link href="https://robkohr.com/rss.xml" rel="self" type="application/rss+xml" />
            <title>RobKohr's Blog</title>
            <link>https://robkohr.com</link>
            <description>RobKohr's Blog</description>
            <language>en-us</language>
            <lastBuildDate>${basicDate}</lastBuildDate>
            <pubDate>${basicDate}</pubDate>
            <ttl>1800</ttl>
`.trim();
articles
  .filter(function (article) {
    return article !== null;
  })
  .filter(function (article) {
    //remove articles that have no date
    return article.variables.date;
  })
  .sort(function (a, b) {
    return new Date(b.variables.date) - new Date(a.variables.date);
  })
  .slice(0, 50)
  .forEach(function (article) {
    /* create a utc string date from article.variables.date, correcting issue where month is off by one */
    const date = new Date(article.variables.date);
    date.setMonth(date.getMonth() - 1);
    const dateString = date.toUTCString();
    /* encode htm entities in title */
    function encodeHtmlEntities(str) {
      return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    const link = `https://robkohr.com/articles/${toKebab(article.title)}`;

    output += `
            <item>
                <guid>${link}</guid>
                <title>${encodeHtmlEntities(article.title)}</title>
                <link>${link}</link>
                <description>${encodeHtmlEntities(article.title)}</description>
                <pubDate>${dateString}</pubDate>
            </item>
    `;
  });
output += `
        </channel>
    </rss>
`;
fs.writeFileSync(`rss.xml`, output);

// copy file from articles/now.html to now/index.html and create the directory for it if needed
if (!fs.existsSync("now")) {
  fs.mkdirSync("now");
}
fs.copyFileSync("articles/now", "now/index.html");

console.log("done");
