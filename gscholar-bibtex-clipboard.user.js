// ==UserScript==
// @name          gscholar-bibtex-clipboard
// @description   add a bibtex link in Google Scholar to Clipboard
// @homepage      https://www.monperrus.net/martin/direct-bibtex-in-google-scholar
// @namespace     https://www.monperrus.net/martin/
// @author        Henrique Rieger <henriquerieger2001@gmail.com>
// @author        Martin Monperrus <martin.monperrus@gnieh.org>
// @author        Nicolas Harrand <harrand@kth.se>
// @license       MIT
// @version       0.4
// @match         https://scholar.google.com/*
// @match         https://scholar.google.fr/*
// @match         https://scholar.google.se/*
// @match         https://scholar.google.de/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @grant         GM_xmlhttpRequest
// @grant         GM_setClipboard
// ==/UserScript==

// Based on the script by Martin Monperrus and Nicolas Harrand available at:
// https://github.com/monperrus/misc/raw/master/direct-bibtex-in-google-scholar.user.js

var $ = window.jQuery;

function main() {
  const url = new URL(window.location.href);
  const isFavsPage = url.searchParams.has("scilib");
  const authuser = url.searchParams.get("authuser");

  // For each result of Google Scholar
  $(".gs_r").each((index, result) => {
    // Getting the paper title
    const text = $(result).find(".gs_rt").text();

    // Where to add the data: add it at the end of the menu which is under each entry
    const whereList = $(result).find(".gs_fl");
    const where = $(whereList.get(whereList.length - 1));

    // Create a DIV element to contain the BibTeX data
    const container = $("<pre/>");
    where.after(container);

    // Create the code block for BibTeX
    const codeContainer = $(
      '<div style="background-color: #EEEEEE; border-radius: 5px; padding: 0 10px 0 10px; border-color: darkgray; border-style: solid; border-width:1px;"/>',
    );
    const code = $(
      '<pre style="white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;"/>',
    );
    codeContainer.append(code);
    // Adding a link to trigger the BibTeX download
    const noteLink = $('<a href="javascript:void(0)">BibTeX</a>');
    noteLink.click(() => {
      const elem = $(result).find("a.gs_nph").get(0);

      // Find the IDs needed for the request
      const articleId = $(result).attr("data-aid");
      const citationId = $(result).attr("data-cid");

      // Build the URL based on the current context
      let url;
      if (isFavsPage) {
        url = "https://scholar.google.com/scholar?scila=" + citationId +
          "&output=cite";
      } else {
        url = "https://scholar.google.com/scholar?q=info:" + articleId +
          ":scholar.google.com/&output=cite";
      }

      // Add user param to URL if needed
      if (authuser != null) {
        url += "&authuser=" + authuser;
      }

      $.ajax({ "url": url })
        .done((data) => {
          // The final URL, hosted on googleusercontent.com
          // So there is a need for a cross-domain call
          const citationUrl = $(data).find(".gs_citi").attr("href");

          // Calling the URL with the BibTeX content
          GM_xmlhttpRequest({
            method: "GET",
            url: citationUrl,
            onload: function (responseDetails) {
              const bibtex = responseDetails.responseText;
              code.text(bibtex);
              container.after(codeContainer);
              container.text("-- Copied BibTeX to clipboard! --\n");
              GM_setClipboard(bibtex.replace(/\n/g, " "));
            },
          });
        });
    });

    // Append the button to the menu
    where.append(noteLink);
  });
}

main();
