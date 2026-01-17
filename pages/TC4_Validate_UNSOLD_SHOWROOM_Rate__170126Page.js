const { expect } = require('@playwright/test');

class BSCS7RatePlanPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="bscs7-username-input"]';
    this.passwordInput = '[data-testid="bscs7-password-input"]';
    this.loginButton = '[data-testid="bscs7-login-button"]';
    this.ratePlanMenu = '[data-testid="menu-rate-plan"]';
    this.ratePlanConfigOption = '[data-testid="option-rate-plan-config"]';
    this.ratePlanSearchInput = '[data-testid="rate-plan-search-input"]';
    this.ratePlanSearchButton = '[data-testid="rate-plan-search-button"]';
    this.ratePlanResultRow = '[data-testid="rate-plan-result-row"]';
    this.ratePlanNameCell = '[data-testid="rate-plan-name-cell"]';
    this.ratePlanHomologationCell = '[data-testid="rate-plan-homologation-cell"]';
    this.freeUnitsTab = '[data-testid="tab-free-units"]';
    this.fuPackTable = '[data-testid="table-fu-pack"]';
    this.fupVersionTable = '[data-testid="table-fup-version"]';
    this.fupElementTable = '[data-testid="table-fup-element"]';
    this.voiceMinutesCell = '[data-testid="free-units-voice-minutes"]';
    this.smsCountCell = '[data-testid="free-units-sms-count"]';
    this.dataGBCell = '[data-testid="free-units-data-gb"]';
    this.renewalTypeCell = '[data-testid="free-units-renewal-type"]';
    this.splitBillingTab = '[data-testid="tab-split-billing"]';
    this.splitBillingTable = '[data-testid="table-split-billing"]';
    this.apnRow = '[data-testid="apn-row"]';
    this.apnNameCell = '[data-testid="apn-name-cell"]';
    this.apnDescriptionCell = '[data-testid="apn-description-cell"]';
    this.apnCostCell = '[data-testid="apn-cost-cell"]';
    this.ratePlanTableTab = '[data-testid="tab-sysadm-rateplan"]';
    this.overageRatesTable = '[data-testid="table-overage-rates"]';
    this.voiceOverageRateCell = '[data-testid="overage-rate-voice"]';
    this.smsOverageRateCell = '[data-testid="overage-rate-sms"]';
    this.dataOverageRateCell = '[data-testid="overage-rate-data"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.system.local');
  }

  async loginWithQueryPermissions() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USER || 'query_user');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'query_pass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToRatePlanConfiguration() {
    await this.page.click(this.ratePlanMenu);
    await this.page.click(this.ratePlanConfigOption);
    await this.page.waitForLoadState('networkidle');
  }

  async searchRatePlan(ratePlanName) {
    await this.page.fill(this.ratePlanSearchInput, ratePlanName);
    await this.page.click(this.ratePlanSearchButton);
    await this.page.waitForSelector(this.ratePlanResultRow);
  }

  async isRatePlanDisplayed(ratePlanName) {
    const nameCell = await this.page.textContent(this.ratePlanNameCell);
    return nameCell.includes(ratePlanName);
  }

  async getRatePlanHomologation() {
    return await this.page.textContent(this.ratePlanHomologationCell);
  }

  async getFreeUnitsConfiguration() {
    await this.page.click(this.freeUnitsTab);
    await this.page.waitForSelector(this.fuPackTable);
    
    const voiceMinutes = parseInt(await this.page.textContent(this.voiceMinutesCell), 10);
    const smsCount = parseInt(await this.page.textContent(this.smsCountCell), 10);
    const dataGB = parseInt(await this.page.textContent(this.dataGBCell), 10);
    const renewalType = await this.page.textContent(this.renewalTypeCell);
    
    return {
      voiceMinutes,
      smsCount,
      dataGB,
      renewalType: renewalType.trim().toLowerCase()
    };
  }

  async navigateToSplitBillingConfiguration() {
    await this.page.click(this.splitBillingTab);
    await this.page.waitForSelector(this.splitBillingTable);
  }

  async getAssociatedAPNs() {
    const apnRows = await this.page.$$(this.apnRow);
    const apnNames = [];
    
    for (const row of apnRows) {
      const nameCell = await row.$(this.apnNameCell.replace('[data-testid="apn-row"] ', ''));
      if (nameCell) {
        const name = await nameCell.textContent();
        apnNames.push(name.trim());
      }
    }
    
    return apnNames;
  }

  async getAPNCost(apnCode, apnDescription) {
    const apnRows = await this.page.$$(this.apnRow);
    
    for (const row of apnRows) {
      const nameText = await row.$eval('[data-testid="apn-name-cell"]', el => el.textContent);
      const descText = await row.$eval('[data-testid="apn-description-cell"]', el => el.textContent);
      
      if (nameText.includes(apnCode) && descText.includes(apnDescription)) {
        const costText = await row.$eval('[data-testid="apn-cost-cell"]', el => el.textContent);
        return parseFloat(costText.replace(/[^0-9.]/g, ''));
      }
    }
    
    return null;
  }

  async navigateToRatePlanTable() {
    await this.page.click(this.ratePlanTableTab);
    await this.page.waitForSelector(this.overageRatesTable);
  }

  async getOverageRates() {
    const voiceText = await this.page.textContent(this.voiceOverageRateCell);
    const smsText = await this.page.textContent(this.smsOverageRateCell);
    const dataText = await this.page.textContent(this.dataOverageRateCell);
    
    return {
      voicePerMinute: parseFloat(voiceText.replace(/[^0-9.]/g, '')),
      smsPerMessage: parseFloat(smsText.replace(/[^0-9.]/g, '')),
      dataPerMB: parseFloat(dataText.replace(/[^0-9.]/g, ''))
    };
  }
}

module.exports = BSCS7RatePlanPage;