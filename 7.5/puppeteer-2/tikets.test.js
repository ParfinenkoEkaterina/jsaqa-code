const { clickElement, getText } = require("./lib/commands.js");
const { confirmBooking, getFreeRandomChair, selectDate,
   selectHall } = require("./lib/util.js");

afterEach(() => {
  page.close();
});
beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

let page;
let severalChairs = 3; 
let dayAfterToday = 2;  
let hallNumber = 1; 
let dayAfterAllWeek = 6; // седьмой день, доступный для бронирования

describe("Tikets tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru"); 
  });

  test("should book one chair'", async () => {
    await selectDate(page, dayAfterToday);
    await selectHall (page, hallNumber); 
    let freeChair = await getFreeRandomChair(page);
    await clickElement(page, freeChair);
    let actual = await confirmBooking(page); 
    expect(actual).toContain("ticket__info-qr");
  });

  test("book for the seventh day available for booking", async () => {
    await selectDate(page, dayAfterAllWeek);
    await selectHall (page, hallNumber); 
    let freeChair = await getFreeRandomChair(page);
    await clickElement(page, freeChair);
    let actual = await confirmBooking(page); 
   expect(actual).toContain("ticket__info-qr");
  });

  test("should book several chairs'", async () => {
    await selectDate(page, dayAfterToday);
    await selectHall (page, hallNumber);
    for (let i = 0; i < severalChairs; i++) { 
      let freeChair = await getFreeRandomChair(page);
      await clickElement(page, freeChair);
    }
    let actual = await confirmBooking(page);
    expect(actual).toContain("ticket__info-qr");
    let chairs = (await getText(page, "p:nth-child(2) > span")).split(", "); 
    expect(chairs.length).toEqual(3);
  });

  test("shouldn't book one chair twice'", async () => {
    await selectDate(page, dayAfterToday);
    await selectHall (page, hallNumber);
    let freeChair = await getFreeRandomChair(page); 
    await clickElement(page, freeChair);
    let actual = await confirmBooking(page); 
    expect(actual).toContain("ticket__info-qr");
    await page.goto("http://qamid.tmweb.ru"); 
    await selectDate(page, dayAfterToday);
    await selectHall (page, hallNumber);
    await clickElement(page, freeChair); 
    let className = await page.$eval(freeChair, (el) => el.classList[2]);
    expect(className).toContain("buying-scheme__chair_taken");
  });
});