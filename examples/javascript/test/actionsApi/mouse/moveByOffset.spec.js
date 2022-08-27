const {By} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require('assert');

suite(function(env) {
  describe('Mouse move by offset', function() {
    let driver;

    before(async function() {
      driver = await env.builder().build();
    });

    after(async () => await driver.quit());

    it('From element', async function() {
      await driver.get('https://www.selenium.dev/selenium/web/mouse_interaction.html');
      const mouseTracker = driver.findElement(By.id("mouse-tracker"));
      const actions = driver.actions({async: true});
      await actions.move({x:8, y:0, origin: mouseTracker}).perform();

      await driver.sleep(500);
      let result = await driver.findElement(By.id('relative-location')).getText();
      result = result.split(', ');
      assert.deepStrictEqual((Math.abs(result[0] -100 -8)<2), true)
    });

    it('From viewport origin', async function() {
      await driver.get('https://www.selenium.dev/selenium/web/mouse_interaction.html');
      const actions = driver.actions({async: true});
      await actions.move({x:8, y:0}).perform();

      let result = await driver.findElement(By.id('absolute-location')).getText();
      result = result.split(', ');
      assert.deepStrictEqual((Math.abs(result[0] -8)<2), true)
    });
  });
});