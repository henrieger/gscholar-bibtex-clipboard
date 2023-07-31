// ==UserScript==
// @name          gscholar-bibtex-clipboard
// @description   add a bibtex link in Google Scholar to Clipboard
// @homepage      https://www.monperrus.net/martin/direct-bibtex-in-google-scholar
// @namespace     https://www.monperrus.net/martin/
// @author        Henrique Rieger <henriquerieger2001@gmail.com>
// @author        Martin Monperrus <martin.monperrus@gnieh.org>
// @author        Nicolas Harrand <harrand@kth.se>
// @license       MIT
// @version       0.3
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
    // for each result of google scholar
    $(".gs_r").each(
        function (index, result) {
            // getting the paper title
            var text = $(result).find('.gs_rt').text();


            // where to add the data: add the end of the menu which is under each entry
            var whereList = $(result).find('.gs_fl')
            var where = $(whereList.get(whereList.length - 1));

            // we create a DIV object to contain the bibtex data
            var container = $('<pre/>');
            where.after(container);

            // adding a link to trigger the bibtex download
            var noteLink = $('<a href="javascript:void(0)">BibTeX</a>');
            noteLink.click(function() {
               var elem = $(result).find('a.gs_nph').get(0); // .contains('Cite')

                // find the IDs needed for the request
                var aid = $(result).attr('data-aid');
                var uid = aid.split(":")[0];
          		console.log("aid: " + aid);
          		console.log("uid: " + uid);

                // we build the URL
                var url = "https://scholar.googleusercontent.com/citations?view_op=export_citations&user="+uid+"&s="+aid+"&citsig=AEDxBGwAAAAAZMmHBcak4P03P-YkW_ov0CNAkg8&hl=pt-BR&cit_fmt=0";
          		console.log("url: " + url);

                // calling the URL with the BibTeX content
                GM_xmlhttpRequest({
                    method:     'GET',
                    url:        url,
                    onload:     function (responseDetails) {
                        container.text("Copied BibTeX to clipboard!\n");
                        GM_setClipboard(responseDetails.responseText.replace(/\n/g, " "));
                    }
                });
            });

            // append button to menu
            where.append(noteLink);
        });
}


main();
