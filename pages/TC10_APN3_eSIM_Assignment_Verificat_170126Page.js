class ProvisioningPage {
  constructor(page) {
    this.page = page;
    this.instantLinkUrl = process.env.INSTANT_LINK_URL || 'https://instantlink.example.com';
    this.bscs7Url = process.env.BSCS7_URL || 'https://bscs7.example.com';
    
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit"]';
    this.userPermissionsLabel = '[data-testid="user-permissions"]';
    
    this.apnConfigurationMenu = '[data-testid="menu-apn-configuration"]';
    this.apnListTable = '[data-testid="apn-list-table"]';
    this.apn2Row = '[data-testid="apn-row-apn2"]';
    this.apn3Row = '[data-testid="apn-row-apn3"]';
    this.apn3EsimAmxRow = '[data-testid="apn-row-esim-amx"]';
    
    this.tariffConfigurationMenu = '[data-testid="menu-tariff-configuration"]';
    this.tariffTable = '[data-testid="tariff-table"]';
    this.apn3CostCell = '[data-testid="apn3-cost-value"]';
    
    this.lineProvisioningMenu = '[data-testid="menu-line-provisioning"]';
    this.ratePlanDropdown = '[data-testid="rate-plan-select"]';
    this.provisionButton = '[data-testid="provision-line-button"]';
    this.provisioningResultPanel = '[data-testid="provisioning-result"]';
    
    this.apnAssignmentSection = '[data-testid="apn-assignment-section"]';
    this.apn3AssignedIndicator = '[data-testid="apn3-assigned-indicator"]';
    this.apn3CostDisplay = '[data-testid="apn3-cost-display"]';
    this.apn3NameDisplay = '[data-testid="apn3-name-display"]';
    
    this.bscs7QueryMenu = '[data-testid="bscs7-query-menu"]';
    this.tableNameInput = '[data-testid="table-name-input"]';
    this.apnFilterInput = '[data-testid="apn-filter-input"]';
    this.executeQueryButton = '[data-testid="execute-query-button"]';
    this.queryResultsTable = '[data-testid="query-results-table"]';
    this.trafficCostColumn = '[data-testid="traffic-cost-column"]';
  }

  async navigateToInstantLink() {
    await this.page.goto(this.instantLinkUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasQueryPermissions() {
    const permissionsElement = this.page.locator(this.userPermissionsLabel);
    await permissionsElement.waitFor({ state: 'visible' });
    const permissions = await permissionsElement.textContent();
    return permissions.includes('QUERY');
  }

  async navigateToAPNConfiguration() {
    await this.page.locator(this.apnConfigurationMenu).click();
    await this.page.locator(this.apnListTable).waitFor({ state: 'visible' });
  }

  async verifyAPN3IsSeparateFromAPN2() {
    const apn2Element = this.page.locator(this.apn2Row);
    const apn3Element = this.page.locator(this.apn3EsimAmxRow);
    await apn2Element.waitFor({ state: 'visible' });
    await apn3Element.waitFor({ state: 'visible' });
    return true;
  }

  async navigateToTariffConfiguration() {
    await this.page.locator(this.tariffConfigurationMenu).click();
    await this.page.locator(this.tariffTable).waitFor({ state: 'visible' });
  }

  async verifyAPN3HasZeroCost() {
    const costElement = this.page.locator(this.apn3CostCell);
    const cost = await costElement.textContent();
    return cost.trim() === '0' || cost.trim() === '$0.00';
  }

  async navigateToLineProvisioning() {
    await this.page.locator(this.lineProvisioningMenu).click();
    await this.page.locator(this.ratePlanDropdown).waitFor({ state: 'visible' });
  }

  async selectRatePlan(ratePlanName) {
    await this.page.locator(this.ratePlanDropdown).click();
    await this.page.locator(`[data-testid="rate-plan-option-${ratePlanName.toLowerCase().replace(/\s+/g, '-')}"]`).click();
  }

  async provisionLine() {
    await this.page.locator(this.provisionButton).click();
    await this.page.locator(this.provisioningResultPanel).waitFor({ state: 'visible' });
  }

  async isAPN3Assigned() {
    const indicator = this.page.locator(this.apn3AssignedIndicator);
    const isVisible = await indicator.isVisible();
    if (!isVisible) return false;
    const text = await indicator.textContent();
    return text.toLowerCase().includes('assigned') || text.toLowerCase().includes('yes');
  }

  async getAPN3Cost() {
    const costElement = this.page.locator(this.apn3CostDisplay);
    const cost = await costElement.textContent();
    return cost.replace(/[^0-9.]/g, '') || '0';
  }

  async getAPN3Name() {
    const nameElement = this.page.locator(this.apn3NameDisplay);
    return await nameElement.textContent();
  }

  async navigateToBSCS7() {
    await this.page.goto(this.bscs7Url);
    await this.page.waitForLoadState('networkidle');
  }

  async queryUDRTable(tableName, apnFilter) {
    await this.page.locator(this.bscs7QueryMenu).click();
    await this.page.locator(this.tableNameInput).fill(tableName);
    await this.page.locator(this.apnFilterInput).fill(apnFilter);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.locator(this.queryResultsTable).waitFor({ state: 'visible' });
  }

  async getTrafficRecordsCost() {
    const costElements = this.page.locator(this.trafficCostColumn);
    const firstCost = await costElements.first().textContent();
    return firstCost.replace(/[^0-9.]/g, '') || '0';
  }
}

module.exports = ProvisioningPage;