const puppeteer = require("puppeteer");

module.exports = async function AutoMarker(action) {
  let isSuccess = false;
  console.log("Inside Puppy Script");
  const browser = await puppeteer.launch({
    //headless: false,
    //  slowMo: 500,
    headless: true,
    defaultViewport: null,
    args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto(process.env.GREYTHR_ATTENDANCE_LINK);
  await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 });
  console.log("\n > Logging In...");
  await page.type("input#username", process.env.GREYTHR_ID);
  await page.type("input#password", process.env.GREYTHR_PWD);
  await page.keyboard.press("Enter");
  await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 });

  if (action == "SIGN IN") {
    console.log("\n > Waiting for button to load...");
    await page.waitForXPath("//button[contains(., 'Sign In')]");
    console.log("\n > Signing IN...");
    const [doSignIn] = await page.$x("//button[contains(., 'Sign In')]");
    if (doSignIn) {
      await doSignIn.click();
      isSuccess = true;
    } else {
      throw "ERROR 'Sign In' Button not found";
    }
  } else if (action == "SIGN OUT") {
    console.log("\n > Waiting for button to load...");
    await page.waitForXPath("//button[contains(., 'Sign Out')]");
    console.log("\n > Signing OUT...");
    const [doSignOut] = await page.$x("//button[contains(., 'Sign Out')]");

    if (doSignOut) {
      await doSignOut.click();
      isSuccess = true;
    } else {
      throw "ERROR 'Sign Out' Button not found";
    }
  }

  await page.click("a[title='Logout']");
  await page.waitForNavigation(0);
  await browser.close();
  console.log(" > Finished Script");
  if (isSuccess) return "script success";
  else throw "Script faliure occured";
};
