const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const Send = require("../helpers/Email_Utils");

module.exports = async function Start() {
  let driver = await new webdriver.Builder()
    .forBrowser("firefox")
    .setFirefoxOptions()
    .build();

  try {
    await driver.get(process.env.GREYTHR_ATTENDANCE_LINK);
    await driver.wait(until.elementLocated(By.id("username")), 30000);
    await driver
      .findElement({ id: "username" })
      .sendKeys(process.env.GREYTHR_ID);
    await driver
      .findElement({ id: "password" })
      .sendKeys(process.env.GREYTHR_PWD, Key.ENTER);
    await driver.wait(until.titleIs("Mark Attendance"), 30000);
    await driver.wait(until.elementLocated(By.className("empSignOut")), 30000);

    if (process.env.ACTION != undefined) {
      if (process.env.ACTION.trim() == "SIGN IN") await doSignIn(driver);
      if (process.env.ACTION.trim() == "SIGN OUT") await doSignOut(driver);
    } else {
      console.log(" ACTION value is undefined");
      process.exit(1);
    }

    await driver.wait(until.titleIs("greytHR IDP"), 30000);
  } catch (error) {
    console.log("Error occured ", error);
    if (
      process.env.ACTION != undefined &&
      process.env.ACTION.trim() == "SIGN IN"
    )
      Send.Mail("Sign IN Failed", error.toString());
    else Send.Mail("Sign OUT Failed", error.toString());
  } finally {
    await driver.quit();
  }
};

function doSignIn(driver) {
  //driver.findElement(By.className("btn btn-large btn-success signIn")).click();
  Send.Mail("Sign IN Success", null);
}

function doSignOut(driver) {
  //driver.findElement(By.className("btn btn-large btn-success signOut")).click();
  Send.Mail("Sign OUT Success", null);
}
