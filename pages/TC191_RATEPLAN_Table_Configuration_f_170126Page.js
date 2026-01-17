const { expect } = require('@playwright/test');

class RateplanPage {
  constructor(page) {
    this.page = page;
    
    this.databaseLoginButton = '[data-testid="database-login-btn"]';
    this.databaseConnectionStatus = '[data-testid="connection-status"]';
    this.tableNavigator = '[data-testid="table-navigator"]';
    this.rateplanTableOption = '[data-testid="table-syssadm-rateplan"]';
    this.queryExecuteButton = '[data-testid="execute-query-btn"]';
    this.queryInput = '[data-testid="query-input"]';
    this.resultsTable = '[data-testid="results-table"]';
    this.resultsTableRows = '[data-testid="results-table"] tbody tr';
    this.planNameColumn = '[data-testid="column-plan-name"]';
    this.tmcodeColumn = '[data-testid="column-tmcode"]';
    this.planDescriptionColumn = '[data-testid="column-description"]';
    this.planStatusColumn = '[data-testid="column-status"]';
    this.freeUnitsColumn = '[data-testid="column-free-units"]';
    this.inPoolConfigColumn = '[data-testid="column-in-pool"]';
    this.bulkRateVozColumn = '[data-testid="column-rate-voz"]';
    this.bulkRateSmsColumn = '[data-testid="column-rate-sms"]';
    this.bulkRateDatosColumn = '[data-testid="column-rate-datos"]';
    this.planAttributesPanel = '[data-testid="plan-attributes-panel"]';
    this.searchPlanInput = '[data-testid="search-plan-input"]';
    this.searchButton = '[data-testid="search-btn"]';
  }

  async navigateToDatabaseSystem() {
    await this.page.goto('/bscs7/database');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDatabaseAccess() {
    await this.page.click(this.databaseLoginButton);
    await this.page.waitForSelector(this.databaseConnectionStatus);
    const status = await this.page.textContent(this.databaseConnectionStatus);
    return status.includes('Connected');
  }

  async openRateplanTable() {
    await this.page.click(this.tableNavigator);
    await this.page.click(this.rateplanTableOption);
    await this.page.waitForSelector(this.resultsTable);
  }

  async executeRateplanQuery() {
    await this.page.fill(this.queryInput, 'SELECT * FROM SYSSADM.RATEPLAN');
    await this.page.click(this.queryExecuteButton);
    await this.page.waitForSelector(this.resultsTableRows);
  }

  async isRateplanTableVisible() {
    return await this.page.isVisible(this.resultsTable);
  }

  async tableHasRecords() {
    const rows = await this.page.$$(this.resultsTableRows);
    return rows.length > 0;
  }

  async verifyPlanExists(planName) {
    await this.page.fill(this.searchPlanInput, planName);
    await this.page.click(this.searchButton);
    await this.page.waitForTimeout(500);
    const planRow = await this.page.$(`[data-testid="plan-row-${planName.toLowerCase().replace(/\s+/g, '-')}"]`);
    return planRow !== null;
  }

  async verifyUniqueTmcodes() {
    const tmcodes = await this.page.$$eval(this.tmcodeColumn, elements => 
      elements.map(el => el.textContent)
    );
    const uniqueTmcodes = new Set(tmcodes);
    return tmcodes.length === uniqueTmcodes.size;
  }

  async getPlanAttributes(planName) {
    const planRowSelector = `[data-testid="plan-row-${planName.toLowerCase().replace(/\s+/g, '-')}"]`;
    await this.page.click(planRowSelector);
    await this.page.waitForSelector(this.planAttributesPanel);
    
    const attributes = {
      hasPreproductiveAPNs: false,
      minutes: '',
      sms: '',
      data: '',
      inPoolMode: false,
      hasFreeUnits: false,
      hasServices: false
    };
    
    const description = await this.page.textContent(`${this.planAttributesPanel} [data-testid="attr-description"]`);
    const freeUnitsText = await this.page.textContent(`${this.planAttributesPanel} [data-testid="attr-free-units"]`);
    const servicesText = await this.page.textContent(`${this.planAttributesPanel} [data-testid="attr-services"]`);
    
    if (planName === 'TESTING') {
      attributes.hasPreproductiveAPNs = description.includes('preproductiv');
    }
    
    if (freeUnitsText && freeUnitsText !== 'None') {
      attributes.hasFreeUnits = true;
      const minutesMatch = freeUnitsText.match(/(\d+)\s*min/i);
      const smsMatch = freeUnitsText.match(/(\d+)\s*SMS/i);
      const dataMatch = freeUnitsText.match(/(\d+(?:MB|GB))/i);
      
      if (minutesMatch) attributes.minutes = minutesMatch[1];
      if (smsMatch) attributes.sms = smsMatch[1];
      if (dataMatch) attributes.data = dataMatch[1];
    }
    
    const inPoolIndicator = await this.page.$(`${this.planAttributesPanel} [data-testid="attr-in-pool-active"]`);
    attributes.inPoolMode = inPoolIndicator !== null;
    
    attributes.hasServices = servicesText && servicesText !== 'None' && servicesText !== 'Inactive';
    
    return attributes;
  }

  async verifyFreeUnitsConfiguration(planName) {
    const attributes = await this.getPlanAttributes(planName);
    return attributes.hasFreeUnits;
  }

  async verifyInPoolConfiguration(planName) {
    const attributes = await this.getPlanAttributes(planName);
    return attributes.inPoolMode;
  }

  async getBulkRates(planName) {
    const planRowSelector = `[data-testid="plan-row-${planName.toLowerCase().replace(/\s+/g, '-')}"]`;
    await this.page.click(planRowSelector);
    await this.page.waitForSelector(this.planAttributesPanel);
    
    const vozRate = await this.page.textContent(`${this.planAttributesPanel} [data-testid="rate-voz"]`);
    const smsRate = await this.page.textContent(`${this.planAttributesPanel} [data-testid="rate-sms"]`);
    const datosRate = await this.page.textContent(`${this.planAttributesPanel} [data-testid="rate-datos"]`);
    
    return {
      voz: vozRate.replace(/[^\d.]/g, ''),
      sms: smsRate.replace(/[^\d.]/g, ''),
      datos: datosRate.replace(/[^\d.]/g, '')
    };
  }

  async verifyPlanHasActiveServices(planName) {
    const attributes = await this.getPlanAttributes(planName);
    return attributes.hasServices;
  }
}

module.exports = RateplanPage;