const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");
const Send = require("../../helpers/Email_Utils");

const width = 640;
const height = 480;

module.exports = async function SeleniumScript(action) {
  let driver = await new webdriver.Builder()
    .forBrowser("chrome")
    // Uncomment this to enable browser headless mode. The processing of script will be done in background without visuals
    //.setChromeOptions(new chrome.Options().headless().windowSize({ width, height }))
    .build();

  try {
    await driver.get(process.env.GREYTHR_ATTENDANCE_LINK);
    await console.log("\n> Starting script, opening URL...");

    await driver.wait(until.elementLocated(By.id("username")), 3000);
    await driver
      .findElement({ id: "username" })
      .sendKeys(process.env.GREYTHR_ID);
    await driver
      .findElement({ id: "password" })
      .sendKeys(process.env.GREYTHR_PWD, Key.ENTER);
    await console.log("\n> Logged In, processing...");

    await driver.wait(until.titleIs("Mark Attendance"), 3000);
    await driver.sleep(); //wait for page load to finish
    if (action == "SIGN IN") {
      console.log("\n> Signing IN...");
      //Uncomment this to allow clicking of Sign-In button for attendance.
      // await driver.findElement(By.className("btn btn-large btn-success signIn")).click();
      Send.Mail("Sign IN Success", null);
      await closeScript(driver);
      return "script success";
    } else if (action == "SIGN OUT") {
      console.log("\n> Signing OUT...");
      //Uncomment this to allow clicking of Sign-Out button for attendance.
      // await driver.findElement(By.className("btn btn-large btn-success signOut")).click();
      Send.Mail("Sign OUT Success", null);
      await closeScript(driver);
      return "script success";
    } else console.log("\n> Nothing was changed.");
  } catch (error) {
    console.log("Error occured ", error);
    if (action != undefined && action == "SIGN IN")
      Send.Mail("Sign IN Failed", error.toString());
    else Send.Mail("Sign OUT Failed", error.toString());
    return error; //throw error at controller which is then caught by catch()
  } finally {
    await driver.quit();
  }
};

async function closeScript(driver) {
  await console.log("\n> Finished Operation, Exiting...");
  await driver.sleep(); //wait for page load to finish
  await driver.findElement(By.className("empSignOut")).click();
  await driver.wait(until.titleIs("greytHR IDP"), 3000);
  await console.log("\n> Script Finished.\n ");
}
