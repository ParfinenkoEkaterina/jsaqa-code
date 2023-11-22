let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1", {
      timeout: 60000,
    });
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    await page.waitForSelector("a", {
      timeout: 60000,
    });
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 60000);
});


//Задание 2

describe("New Github tests", () => {
  test("Click pricing", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  }, 60000);

  test("Click sponsors", async () => {
    await page.goto("https://github.com/sponsors");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("GitHub Sponsors · GitHub");
  }, 60000);

  test("The page contains Introduction to GitHub", async () => {
    await page.goto("https://skills.github.com");
    await page.waitForSelector("h1");
    const btnSelector = (ss = ".btn.btn-primary.btn-large");
    const title = await page.$eval(btnSelector, (link) => link.textContent);
    expect(title).toContain("Introduction to GitHub");
  }, 60000);
});

