var buster = require("buster");
var request = require("request");

buster.testRunner.timeout = 5000;

function indexOfCompanyResult(html, company) {
  return html.indexOf("/" + company.id + ".tell");
}

buster.assertions.add("inResult", {
  assert: function (html, company) {
    return indexOfCompanyResult(html, company) >= 0;
  },
  assertMessage: "\n  Expected ${1} to be present in the first result page.\n  Reason: ${2}\n  URL: ${3}"
});

buster.assertions.add("beforeInResult", {
  assert: function (html, better, worse) {
    var worseNotPresent = indexOfCompanyResult(html, worse) < 0;
    var betterBeforeWorse = indexOfCompanyResult(html, worse) > indexOfCompanyResult(html, better);
    return worseNotPresent || betterBeforeWorse;
  },
  assertMessage: "\n  Expected ${1} to be before ${2} in the result page.\n  Reason: ${2}\n  URL: ${3}"
});

var testCases = {};

function stripAwayBanners(html) {
  return html.substring(html.indexOf("resultList"));
}

function addTestCase(info) {
  var testName = "'" + info.search + "' should have '" + info.better.name + "' before '" + info.worse.name + "'";
  var url = "http://oppdrag.finn.no/bedrifter/resultat.html?q=" + info.search.replace(/ /g, "%20");

  testCases[testName] = function (done) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var html = stripAwayBanners(body);

        assert.inResult(html, info.better, info.reason, url);
        assert.beforeInResult(html, info.better, info.worse, info.reason, url);
        done();
      } else {
        throw new Error("\n  Failed to communicate with server.\n  Response: " + buster.format.ascii(response) + "\n  Error: " + buster.format.ascii(error));
      }
    });
  };
}

var cases = require("./cases");

cases.forEach(addTestCase);

buster.testCase('Company Search', testCases);
