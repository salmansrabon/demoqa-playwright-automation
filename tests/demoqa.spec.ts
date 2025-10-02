import { test, expect } from "@playwright/test";
import { generateRandomNumber } from "../utils/utils";
import { faker } from '@faker-js/faker';
import path from "path";

test("Create new user", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");
  await page.getByRole("textbox", { name: "Full Name" }).fill(faker.person.fullName());
  await page.getByPlaceholder("name@example.com").fill(`salmansrabon+${generateRandomNumber(1000,9999)}@gmail.com`)
  await page.getByRole("button", { name: "Submit" }).click();
  //await page.pause();
});

test("button click", async ({ page }) => {
  await page.goto("https://demoqa.com/buttons");
  await page.getByRole("button", { name: "Double Click Me" }).dblclick();
  await page
    .getByRole("button", { name: "Right Click Me" })
    .click({ button: "right" });
  await expect(page.getByText("double click").nth(1)).toContainText(
    "You have done a double click"
  );
});

test("Manual scroll", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");
  //await page.getByRole("button",{name:"Submit"}).scrollIntoViewIfNeeded();
  //await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // Scroll to x=0, y=500
  await page.evaluate(() => {
    window.scrollTo(0, 500);
  });

  //await page.pause();
});

test("Handle alert", async ({ page }) => {
  await page.goto("https://demoqa.com/alerts");
  page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message());
    await dialog.accept(); // or dialog.dismiss() or dialog.accept('text') for prompts
  });

  await page.getByRole("button", { name: "Click me" }).first().click();
  //await page.getByRole("button", { name: "Click me" }).nth(0).click();
  //await page.waitForTimeout(5000);
  //await page.pause();
});

test("Handle new page", async ({ page, context }) => {
  await page.goto("https://demoqa.com/browser-windows");
  const pagePromise = context.waitForEvent("page");
  await page.getByRole("button", { name: "New Tab" }).click();
  const newPage = await pagePromise;
  console.log(await newPage.getByText("This is a sample page").textContent());
  await expect(newPage.getByText("This is a sample page")).toContainText(
    "This is a sample page"
  );
  await newPage.close();
  //await page.pause();
});
test("Handle popup window", async ({ page, context }) => {
  await page.goto("https://demoqa.com/browser-windows");
  const popupPromise = page.waitForEvent("popup");
  await page.getByText("New Window").first().click();
  const popupPage = await popupPromise;
  console.log(await popupPage.getByText("This is a sample page").textContent());
  await expect(popupPage.getByText("This is a sample page")).toContainText(
    "This is a sample page"
  );
  await popupPage.close();
  //await page.pause();
});
test("Select dynamic dropdown", async ({ page }) => {
  await page.goto("https://demoqa.com/select-menu");
  await page.locator("#withOptGroup").click();
  //await page.locator("#react-select-2-input").press("ArrowDown");
  await page.locator("#react-select-2-input").press("Enter");
  //await page.pause();
});
test("Select static dropdown", async ({ page }) => {
  await page.goto("https://demoqa.com/select-menu");
  //await page.locator('#oldSelectMenu').selectOption({label:"Blue"});
  await page
    .getByRole("combobox", { exact: true })
    .selectOption({ label: "Blue" });
  //await page.pause();
});

test("Upload photo", async ({ page }) => {
  await page.goto("https://demoqa.com/upload-download");

  // Absolute path of the file
  const filePath = path.join(process.cwd(), "resources", "photo.png");

  // Upload using setInputFiles
  await page
    .getByRole("button", { name: "Select a file" })
    .setInputFiles(filePath);

  // Assertion: check uploaded file name is shown
  await expect(page.locator("#uploadedFilePath")).toContainText("photo.png");
  //await page.pause();
});

test("Scrap table data", async ({ page }) => {
  await page.goto("https://demoqa.com/webtables");
  const tableTexts = await page.locator(".rt-tbody .rt-td").allInnerTexts();
  console.log(tableTexts);
  //await page.pause();
});
