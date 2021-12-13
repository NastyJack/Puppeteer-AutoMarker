const puppeteer = require("puppeteer");

module.exports = async function AutoMarker(action) {
  let isSuccess = false,
    text = null,
    buttonToClick = `document.querySelector("body > app > ng-component > div > div > div > ghr-home > div > div.page.page-home > div > gt-home-dashboard > div > div:nth-child(2) > gt-component-loader > gt-attendance-info > div > div > div.btn-container.mt-3x.flex.flex-row-reverse.justify-between.ng-star-inserted > gt-button:nth-child(1)").shadowRoot.querySelector("button")`,
    buttonText = `document.querySelector("body > app > ng-component > div > div > div > ghr-home > div > div.page.page-home > div > gt-home-dashboard > div > div:nth-child(2) > gt-component-loader > gt-attendance-info > div > div > div.btn-container.mt-3x.flex.flex-row-reverse.justify-between.ng-star-inserted > gt-button:nth-child(1)").shadowRoot.querySelector("button > span")`;
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
    text = (await page.evaluateHandle(buttonText)).asElement();
    text = await GetProperty(text, `innerHTML`);
    // console.log("button text element ==", text);
    const doSignIn = (await page.evaluateHandle(buttonToClick)).asElement();
    if (text === "Sign In" && doSignIn) {
      await doSignIn.click();
      isSuccess = true;
      console.log("\n > Signing IN...");
    } else {
      throw "ERROR 'Sign In' Button not found";
    }
  } else if (action == "SIGN OUT") {
    console.log("\n > Waiting for button to load...");
    text = (await page.evaluateHandle(buttonText)).asElement();
    text = await GetProperty(text, `innerHTML`);
    // console.log("button text element ==", text);
    const doSignOut = (await page.evaluateHandle(buttonToClick)).asElement();
    if (text === "Sign Out" && doSignOut) {
      await doSignOut.click();
      isSuccess = true;
      console.log("\n > Signing OUT...");
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

GetProperty = async (element = ElementHandle, property = string) => {
  return await (await element.getProperty(property)).jsonValue();
};
