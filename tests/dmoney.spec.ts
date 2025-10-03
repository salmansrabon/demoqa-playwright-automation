import { test, expect, Page } from "@playwright/test";

test.describe.serial("User Login", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("User login with empty creds", async () => {
    await page.goto("https://dmoneyportal.roadtocareer.net/login");
    await page.getByRole("button", { name: "LOGIN" }).click();
    await expect(page.getByText("Password cannot be empty")).toContainText(
      "Email/Phone Number and Password cannot be empty"
    );
  });
  test("User login with correct creds", async () => {
    await page
      .getByRole("textbox", { name: "Email or Phone Number" })
      .fill("01686606909");
    await page.getByRole("textbox", { name: "Password" }).fill("1234");
    await page.getByRole("button", { name: "LOGIN" }).click();
    await page.pause();
  });
});
