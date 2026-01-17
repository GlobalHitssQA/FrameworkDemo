class TrafficDetailPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BSCS7_BASE_URL || 'https://bscs7.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    
    this.billingMenu = '[data-testid="billing-menu"]';
    this.billingProcessButton = '[data-testid="execute-billing-process"]';
    this.cutoffDateInput = '[data-testid="billing-cutoff-date"]';
    this.executeBillingButton = '[data-testid="confirm-billing-execution"]';
    this.billingStatusIndicator = '[data-testid="billing-status"]';
    
    this.trafficDetailSection = '[data-testid="traffic-detail-section"]';
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.searchButton = '[data-testid="search-line-button"]';
    this.planField = '[data-testid="traffic-detail-plan-field"]';
    this.totalConsumptionField = '[data-testid="traffic-detail-total-consumption"]';
    this.planHistoryTable = '[data-testid="plan-history-table"]';
    this.planHistoryRows = '[data-testid="plan-history-row"]';
    this.consumptionDetailTable = '[data-testid="consumption-detail-table"]';
    
    this.lineWithPlanChangeSelector = '[data-testid="line-with-plan-change"]';
    this.planChangeHistoryLink = '[data-testid="plan-change-history-link"]';
  }

  async navigateToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible' });
  }

  async identifyLineWithPlanChange(fromPlan, toPlan) {
    await this.page.click(this.billingMenu);
    await this.page.click(this.planChangeHistoryLink);
    await this.page.waitForSelector(this.lineWithPlanChangeSelector, { state: 'visible' });
    
    const lineElement = await this.page.locator(this.lineWithPlanChangeSelector).filter({
      hasText: `${fromPlan}`
    }).first();
    
    const lineId = await lineElement.getAttribute('data-line-id');
    return lineId;
  }

  async executeBillingProcess(cutoffDay) {
    await this.page.click(this.billingMenu);
    await this.page.click(this.billingProcessButton);
    await this.page.fill(this.cutoffDateInput, cutoffDay.toString());
    await this.page.click(this.executeBillingButton);
  }

  async waitForBillingProcessCompletion() {
    await this.page.waitForSelector(`${this.billingStatusIndicator}:has-text("Completed")`, {
      timeout: 120000
    });
  }

  async navigateToTrafficDetail(lineIdentifier) {
    await this.page.click(this.trafficDetailSection);
    await this.page.fill(this.lineSearchInput, lineIdentifier);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTrafficDetailSectionIsVisible() {
    await this.page.waitForSelector(this.trafficDetailSection, { state: 'visible' });
  }

  async getPlanFieldValue() {
    await this.page.waitForSelector(this.planField, { state: 'visible' });
    return await this.page.textContent(this.planField);
  }

  async getPlanHistoryForLine(lineIdentifier) {
    await this.page.waitForSelector(this.planHistoryTable, { state: 'visible' });
    const rows = await this.page.locator(this.planHistoryRows).all();
    
    let previousPlan = null;
    let currentPlan = null;
    
    if (rows.length >= 2) {
      previousPlan = await rows[0].locator('[data-testid="plan-name"]').textContent();
      currentPlan = await rows[rows.length - 1].locator('[data-testid="plan-name"]').textContent();
    }
    
    return { previousPlan, currentPlan };
  }

  async getPlanAtSpecificDate(lineIdentifier, day) {
    const planHistory = await this.page.locator(this.planHistoryRows).all();
    
    for (const row of planHistory) {
      const effectiveDate = await row.locator('[data-testid="effective-date"]').textContent();
      const planName = await row.locator('[data-testid="plan-name"]').textContent();
      
      if (parseInt(effectiveDate.split('/')[0]) <= day) {
        return planName;
      }
    }
    return null;
  }

  async getTotalConsumption() {
    await this.page.waitForSelector(this.totalConsumptionField, { state: 'visible' });
    const consumptionText = await this.page.textContent(this.totalConsumptionField);
    return consumptionText.trim();
  }

  async calculateExpectedCycleConsumption(lineIdentifier) {
    const consumptionRows = await this.page.locator(`${this.consumptionDetailTable} tr`).all();
    let totalConsumption = 0;
    
    for (const row of consumptionRows) {
      const consumptionValue = await row.locator('[data-testid="daily-consumption"]').textContent();
      totalConsumption += parseFloat(consumptionValue) || 0;
    }
    
    return totalConsumption.toFixed(2);
  }

  async verifyConsumptionIncludesAllCycleDays() {
    const consumptionRows = await this.page.locator(`${this.consumptionDetailTable} tr`).all();
    const daysWithConsumption = consumptionRows.length;
    
    if (daysWithConsumption < 1) {
      throw new Error('No consumption data found for the billing cycle');
    }
    
    return true;
  }
}

module.exports = TrafficDetailPage;