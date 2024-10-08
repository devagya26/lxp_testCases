export async function convert() {
  const csvtojson = require("csvtojson");
  const fs = require("fs");
  const csvFile = "/Users/apple/Desktop/PlaywrightAutomation/res_testCase";

  csvtojson()
    .fromFile(csvFile)
    .then((json) => {
      console.log(json);

      fs.writeFileSync(
        "res_testCase.json",
        JSON.stringify(json),
        "utf-8",
        (err) => {
          if (err) console.log(err);
        }
      );
    });
}
