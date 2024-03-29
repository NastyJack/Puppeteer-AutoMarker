const puppeteer = require("puppeteer");

module.exports = async function AutoMarker(action) {
  let isSuccess = false,
    text = null,
    //Try checking this if something is broken
    buttonToClick = `document.querySelector("body > app > ng-component > div > div > div.container-fluid.app-container.px-0 > div > ghr-home > div.page.page-home.ng-star-inserted > div > gt-home-dashboard > div > div:nth-child(2) > gt-component-loader > gt-attendance-info > div > div > div.btn-container.mt-3x.flex.flex-row-reverse.justify-between.ng-star-inserted > gt-button:nth-child(1)")`
    buttonText = `document.querySelector("body > app > ng-component > div > div > div.container-fluid.app-container.px-0 > div > ghr-home > div.page.page-home.ng-star-inserted > div > gt-home-dashboard > div > div:nth-child(2) > gt-component-loader > gt-attendance-info > div > div > div.btn-container.mt-3x.flex.flex-row-reverse.justify-between.ng-star-inserted > gt-button:nth-child(1)").shadowRoot.querySelector("button")`
  console.log("Inside Puppy Script");
  const browser = await puppeteer.launch({
    //Uncomment for debugging
    // headless: false,
    //slowMo: 500,

    //Required for operation
    headless: true,
    defaultViewport: null,
    args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto(process.env.GREYTHR_ATTENDANCE_LINK);
  await page.waitForSelector('input#username')
  console.log("\n > Logging In...");
  await page.type("input#username", process.env.GREYTHR_ID);
  await page.type("input#password", process.env.GREYTHR_PWD);
  await page.keyboard.press("Enter");
  await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 });
  console.log("\n > Waiting for button to load...");
  await page.waitForFunction("window.location.pathname.includes('/ess/home')");
  await page.waitForTimeout(3500);

  if (action == "SIGN IN") {
    text = (await page.evaluateHandle(buttonText)).asElement();
    text = await GetProperty(text, `innerHTML`);
    const doSignIn = (await page.evaluateHandle(buttonToClick)).asElement();
    if (text === "Sign In" && doSignIn) {
      await doSignIn.click();
      isSuccess = true;
      console.log("\n > Signing IN...");
    } else {
      throw "ERROR 'Sign In' Button not found";
    }
  } else if (action == "SIGN OUT") {
    text = (await page.evaluateHandle(buttonText)).asElement();
    text = await GetProperty(text, `innerHTML`);

    const doSignOut = (await page.evaluateHandle(buttonToClick)).asElement();
    if (text === "Sign Out" && doSignOut) {
      await doSignOut.click();
      isSuccess = true;
      console.log("\n > Signing OUT...");
    } else {
      throw "ERROR 'Sign Out' Button not found";
    }
  }

  await page.waitForTimeout(3500);
  await page.click("a[title='Logout']");
  await page.waitForNavigation(0);
  await browser.close();
  console.log(" > Finished Script");
  if (isSuccess) return "script success";
  else throw "Script faliure occured";
};

GetProperty = async (element = ElementHandle, property = string) => {
  return await (await element.getProperty(property)).jsonValue();
};
