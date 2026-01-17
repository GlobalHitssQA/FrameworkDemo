const { expect } = require('@playwright/test');

class InstantLinkPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    this.adminDashboard = '[data-testid="admin-dashboard"]';
    
    // Navigation locators
    this.networkStatusMenu = '[data-testid="menu-network-status"]';
    this.ratePlanConfigMenu = '[data-testid="menu-rateplan-config"]';
    this.lineSearchMenu = '[data-testid="menu-line-search"]';
    this.logsMenu = '[data-testid="menu-logs"]';
    
    // Network status locators
    this.hlrHssConnectionStatus = '[data-testid="hlr-hss-connection-status"]';
    this.imsConnectionStatus = '[data-testid="ims-connection-status"]';
    this.pcrfConnectionStatus = '[data-testid="pcrf-connection-status"]';
    
    // RatePlan configuration locators
    this.lifeCycleSyncStatus = '[data-testid="lifecycle-sync-status"]';
    this.ratePlanListTable = '[data-testid="rateplan-list-table"]';
    
    // Line search locators
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.gmLifeCycleFilter = '[data-testid="filter-gm-lifecycle"]';
    this.searchButton = '[data-testid="search-btn"]';
    this.searchResultsTable = '[data-testid="search-results-table"]';
    this.firstResultRow = '[data-testid="search-result-row"]:first-child';
    
    // Line detail locators
    this.lineNumberDisplay = '[data-testid="line-number-display"]';
    this.currentPlanDisplay = '[data-testid="current-plan-display"]';
    this.provisioningStatusDisplay = '[data-testid="provisioning-status-display"]';
    
    // Plan change locators
    this.planChangeButton = '[data-testid="plan-change-btn"]';
    this.ratePlanDropdown = '[data-testid="rateplan-dropdown"]';
    this.ratePlanOption = (planName) => `[data-testid="rateplan-option-${planName.toLowerCase()}"]`;
    this.confirmChangeButton = '[data-testid="confirm-change-btn"]';
    this.provisioningLoader = '[data-testid="provisioning-loader"]';
    this.provisioningCompleteStatus = '[data-testid="provisioning-status-complete"]';
    
    // Logs section locators
    this.transactionSearchInput = '[data-testid="transaction-search-input"]';
    this.transactionSearchButton = '[data-testid="transaction-search-btn"]';
    this.logDetailsPanel = '[data-testid="log-details-panel"]';
    this.hlrHssLogStatus = '[data-testid="log-hlr-hss-status"]';
    this.imsLogStatus = '[data-testid="log-ims-status"]';
    this.pcrfLogStatus = '[data-testid="log-pcrf-status"]';
    this.apnsConfigStatus = '[data-testid="apns-config-status"]';
    this.volteServiceStatus = '[data-testid="volte-service-status"]';
    this.splitBillingStatus = '[data-testid="split-billing-status"]';
    
    // Transaction ID display
    this.transactionIdDisplay = '[data-testid="transaction-id-display"]';
  }

  async navigateToLogin() {
    await this.page.goto('/instant-link/login');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithAdminCredentials() {
    await this.page.fill(this.usernameInput, process.env.ADMIN_USERNAME || 'admin');
    await this.page.fill(this.passwordInput, process.env.ADMIN_PASSWORD || 'admin123');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyAdminDashboardIsDisplayed() {
    await expect(this.page.locator(this.adminDashboard)).toBeVisible();
  }

  async navigateToNetworkStatus() {
    await this.page.click(this.networkStatusMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyNetworkElementsConnectionActive() {
    const hlrStatus = await this.page.textContent(this.hlrHssConnectionStatus);
    const imsStatus = await this.page.textContent(this.imsConnectionStatus);
    const pcrfStatus = await this.page.textContent(this.pcrfConnectionStatus);
    
    expect(hlrStatus).toContain('ACTIVE');
    expect(imsStatus).toContain('ACTIVE');
    expect(pcrfStatus).toContain('ACTIVE');
  }

  async navigateToRatePlanConfiguration() {
    await this.page.click(this.ratePlanConfigMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLifeCycleRatePlansAreSynchronized() {
    const syncStatus = await this.page.textContent(this.lifeCycleSyncStatus);
    expect(syncStatus).toContain('SYNCHRONIZED');
    await expect(this.page.locator(this.ratePlanListTable)).toBeVisible();
  }

  async navigateToLineSearch() {
    await this.page.click(this.lineSearchMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchGMLineWithLifeCycle() {
    await this.page.click(this.gmLifeCycleFilter);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchResultsTable);
  }

  async selectFirstGMLineFromResults() {
    await this.page.click(this.firstResultRow);
    await this.page.waitForLoadState('networkidle');
  }

  async getLineProvisioningInfo() {
    return {
      lineNumber: await this.page.textContent(this.lineNumberDisplay),
      currentPlan: await this.page.textContent(this.currentPlanDisplay),
      provisioningStatus: await this.page.textContent(this.provisioningStatusDisplay)
    };
  }

  async clickPlanChangeAction() {
    await this.page.click(this.planChangeButton);
    await this.page.waitForSelector(this.ratePlanDropdown);
  }

  async selectRatePlan(planName) {
    await this.page.click(this.ratePlanDropdown);
    await this.page.click(this.ratePlanOption(planName));
  }

  async confirmRatePlanChange() {
    await this.page.click(this.confirmChangeButton);
    await this.page.waitForSelector(this.transactionIdDisplay);
    return await this.page.textContent(this.transactionIdDisplay);
  }

  async waitForProvisioningComplete() {
    await this.page.waitForSelector(this.provisioningLoader, { state: 'hidden', timeout: 60000 });
    await this.page.waitForSelector(this.provisioningCompleteStatus);
  }

  async getProvisioningStatus() {
    return await this.page.textContent(this.provisioningCompleteStatus);
  }

  async navigateToLogsSection() {
    await this.page.click(this.logsMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchTransactionInLogs(transactionId) {
    await this.page.fill(this.transactionSearchInput, transactionId);
    await this.page.click(this.transactionSearchButton);
    await this.page.waitForSelector(this.logDetailsPanel);
  }

  async getTransactionLogDetails() {
    return {
      hlrHssStatus: await this.page.textContent(this.hlrHssLogStatus),
      imsStatus: await this.page.textContent(this.imsLogStatus),
      pcrfStatus: await this.page.textContent(this.pcrfLogStatus)
    };
  }

  async getServiceConfiguration() {
    const apnsText = await this.page.textContent(this.apnsConfigStatus);
    const volteText = await this.page.textContent(this.volteServiceStatus);
    
    return {
      apnsConfigured: apnsText.includes('CONFIGURED'),
      volteEnabled: volteText.includes('ENABLED')
    };
  }

  async getSplitBillingConfiguration() {
    const billingText = await this.page.textContent(this.splitBillingStatus);
    return {
      isConfigured: billingText.includes('CONFIGURED')
    };
  }
}

class SiacUnicoPage {
  constructor(page) {
    this.page = page;
    
    // SIAC Unico locators
    this.transactionSearchInput = '[data-testid="siac-transaction-search"]';
    this.searchButton = '[data-testid="siac-search-btn"]';
    this.transactionResultRow = '[data-testid="siac-transaction-row"]';
    this.transactionDateColumn = '[data-testid="siac-transaction-date"]';
    this.transactionTimeColumn = '[data-testid="siac-transaction-time"]';
    this.transactionActionColumn = '[data-testid="siac-transaction-action"]';
    this.transactionRatePlanColumn = '[data-testid="siac-transaction-rateplan"]';
  }

  async navigateToSiacUnico() {
    await this.page.goto('/siac-unico/transactions');
    await this.page.waitForLoadState('networkidle');
  }

  async searchTransaction(transactionId) {
    await this.page.fill(this.transactionSearchInput, transactionId);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.transactionResultRow);
  }

  async verifyTransactionExists() {
    return await this.page.isVisible(this.transactionResultRow);
  }

  async getTransactionDetails() {
    return {
      date: await this.page.textContent(this.transactionDateColumn),
      time: await this.page.textContent(this.transactionTimeColumn),
      actionType: await this.page.textContent(this.transactionActionColumn),
      ratePlan: await this.page.textContent(this.transactionRatePlanColumn)
    };
  }
}

module.exports = { InstantLinkPage, SiacUnicoPage };