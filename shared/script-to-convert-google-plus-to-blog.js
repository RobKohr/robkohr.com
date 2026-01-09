/* create an array of all html files in googlePlus directory */
var fs = require("fs");
var path = require("path");
var htmlFiles = [];
var htmlFiles = fs.readdirSync("./googlePlus").filter(function (file) {
  return path.extname(file) === ".html";
});
/* reverse the order of htmlFiles */
htmlFiles.reverse();

function htmlToText(html) {
  html = html
    .replace(/<span itemprop="text">/g, "")
    .replace(/<\/span>/g, "")
    .replace(/&#39;/g, "'")
    .replace(/<br>/g, "\n")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
  /* convert i and b tags to markdown */
  html = html.replace(/<i>/g, "*").replace(/<\/i>/g, "*").replace(/<b>/g, "**").replace(/<\/b>/g, "**");
  return html.trim();
}

let output = "start";
console.log("a");
/* for each of the html files in the array, read the file and extract the text */
htmlFiles.forEach(function (file) {
  /* read the file  sync */
  var html = fs.readFileSync("./googlePlus/" + file, "utf8");

  /* for any div with the attribute class="video-placeholder" get the title attribute */
  var videoTitle = html.match(/<div class="video-placeholder" title="([\s\S]*?)">/);
  if (videoTitle && videoTitle.length > 0) {
    videoTitle = `\n\n ${videoTitle[1]}\n\n`;
  }
  /* find any youtube urls in the html */
  var youtube = html.match(/https:\/\/www.youtube.com\/watch\?v=([\s\S]*?)"/);
  if (youtube && youtube.length > 0) {
    youtube = `\n\n ${youtube[0]}\n\n`;
  }

  /* find any href attribute values */
  /* filter out any that contain plus.google.com */
  var hrefs = html
    .match(/href="([\s\S]*?)"/g)
    .filter(function (href) {
      return href.indexOf("plus.google.com") === -1;
    })
    .join("\n\n");
  /* strip out the href=" and " */
  hrefs = hrefs.replace(/href="/g, "").replace(/"/g, "");

  /* convert hrefs to array */
  hrefs = hrefs.split("\n\n");
  
  /* if the url starts with ../Photos then change it to googlePlus/Photos and wrap it so it is like ![[href]] */
  if (hrefs && hrefs.length > 0 && hrefs.map) {

    hrefs = hrefs.map(function (href) {
      if (href.indexOf("../Photos") === 0) {
        href = `![[googlePlus${href.replace("../", "")}]]`;
      }
      return href;
    });
  }
  hrefs = hrefs.join("\n\n");

  /* find the text inside of h3 tags */
  var h3 = html.match(/<h3>([\s\S]*?)<\/h3>/);
  if (h3 && h3.length > 0) {
    h3 = `\n\### ${h3[1]}\\n`;
  }

  // console.log(h3, '---', linkEmbed)
  /* get date from <span itemprop="dateCreated"> tag */
  var date = html.match(/<span itemprop="dateCreated">([\s\S]*?)<\/span>/)[1];
  /* set the date to the first 10 characters of the date string */
  date = date.substring(0, 10);
  var title = htmlToText(html.match(/<title>([\s\S]*?)<\/title>/)[1]);

  /* get the content from the tag with the class main-content */
  var mainContent = html.match(/<div class="main-content">([\s\S]*?)<\/div>/)[1];
  mainContent = htmlToText(mainContent) + videoTitle + youtube;
  if (mainContent.length > 0) {
    output =
      output +
      `
## ${title}
@date=${date}
@tags=
${mainContent}
${h3}
${hrefs}



`;
  }
});
/* remove all "null" strings from the output string */
output = output.replace(/null/g, "");

/* overwrite output.md with the output string */
fs.writeFileSync("./output.md", output);

//console.log(htmlFiles);
