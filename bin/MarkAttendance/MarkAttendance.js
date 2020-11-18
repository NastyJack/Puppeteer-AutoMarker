const { Builder, By, Key, until } = require("selenium-webdriver");
//const firefox = require("selenium-webdriver/firefox");
const chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");
const Send = require("../../helpers/Email_Utils");

const width = 640;
const height = 480;

module.exports = async function SeleniumScript(action) {
  let driver = await new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options().headless().windowSize({ width, height })
    )
    .build();

  try {
    await driver.get(process.env.GREYTHR_ATTENDANCE_LINK);

    await console.log("\n> Starting script, opening URL...");

    await driver.wait(until.elementLocated(By.id("username")), 30000);
    await driver
      .findElement({ id: "username" })
      .sendKeys(process.env.GREYTHR_ID);
    await driver
      .findElement({ id: "password" })
      .sendKeys(process.env.GREYTHR_PWD, Key.ENTER);

    await console.log("> Logged In, processing...");

    await driver.wait(until.titleIs("Mark Attendance"), 30000);
    await driver.sleep(2000);
    if (action == "SIGN IN") {
      await doSignIn(driver);
      await closeScript(driver);
      return "script success";
    }
    if (action == "SIGN OUT") {
      await doSignOut(driver);
      await closeScript(driver);
      return "script success";
    }
  } catch (error) {
    console.log("Error occured ", error);
    if (action != undefined && action == "SIGN IN")
      Send.Mail("Sign IN Failed", error.toString());
    else Send.Mail("Sign OUT Failed", error.toString());
    return error;
  } finally {
    await driver.quit();
  }
};

async function closeScript(driver) {
  await console.log("\n> Finished Operation, Exiting...");
  await driver.findElement(By.className("empSignOut")).click();
  await driver.wait(until.titleIs("greytHR IDP"), 30000);
  await console.log("\n> Script Finished.");
}

function doSignIn(driver) {
  // driver.findElement(By.className("btn btn-large btn-success signIn")).click();
  Send.Mail("Sign IN Success", null);
  console.log("Sign IN Success, mail sent");
}

function doSignOut(driver) {
  // driver.findElement(By.className("btn btn-large btn-success signOut")).click();
  Send.Mail("Sign OUT Success", null);
  console.log("Sign OUT Success, mail sent");
}
