class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    
    // Contract search locators
    this.contractSearchLupa = '[data-testid="contract-search-lupa"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Value and composition component locators
    this.valueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Breakdown items locators
    this.breakdownItemPoderCompra = '[data-testid="breakdown-poder-compra-mxn"]';
    this.breakdownItemEfectivoMXN = '[data-testid="breakdown-efectivo-mxn"]';
    this.breakdownItemEfectivoUSD = '[data-testid="breakdown-efectivo-usd"]';
    this.breakdownItemPendientes = '[data-testid="breakdown-pendientes-liquidar"]';
    this.breakdownItemFondos = '[data-testid="breakdown-fondos"]';
    this.breakdownItemCedes = '[data-testid="breakdown-cedes-pagares"]';
    this.breakdownItemMercadoDinero = '[data-testid="breakdown-mercado-dinero"]';
    this.breakdownItemMercadoCapitales = '[data-testid="breakdown-mercado-capitales"]';
    
    // Distribution tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async authenticateUser() {
    const testUser = {
      id: 'test-user-001',
      username: 'testuser@acticenter.com',
      password: 'TestPassword123'
    };
    
    await this.page.fill(this.usernameInput, testUser.username);
    await this.page.fill(this.passwordInput, testUser.password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible' });
    
    return testUser;
  }

  async isUserLoggedIn() {
    return await this.page.isVisible(this.userProfileIndicator);
  }

  async selectFirstAvailableContract() {
    await this.page.click(this.contractSearchLupa);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    
    const firstContract = this.page.locator(this.contractListItem).first();
    const contractId = await firstContract.getAttribute('data-contract-id');
    const contractNumber = await firstContract.textContent();
    
    await firstContract.click();
    
    return {
      id: contractId,
      number: contractNumber
    };
  }

  async waitForValueComponentToLoad() {
    await this.page.waitForSelector(this.valueComponent, { state: 'visible', timeout: 10000 });
  }

  async isValueComponentVisible() {
    return await this.page.isVisible(this.valueComponent);
  }

  async clickValueComponentToShowBreakdown() {
    await this.page.click(this.valueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalValueDisplay);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getBreakdownValues() {
    return {
      poderCompraMXN: await this.page.textContent(this.breakdownItemPoderCompra),
      efectivoMXN: await this.page.textContent(this.breakdownItemEfectivoMXN),
      efectivoUSD: await this.page.textContent(this.breakdownItemEfectivoUSD),
      pendientesLiquidar: await this.page.textContent(this.breakdownItemPendientes),
      fondos: await this.page.textContent(this.breakdownItemFondos),
      cedesPagares: await this.page.textContent(this.breakdownItemCedes),
      mercadoDinero: await this.page.textContent(this.breakdownItemMercadoDinero),
      mercadoCapitales: await this.page.textContent(this.breakdownItemMercadoCapitales)
    };
  }
}

class AuditSystemPage {
  constructor(page) {
    this.page = page;
    
    // Audit system locators
    this.auditMenuLink = '[data-testid="audit-menu-link"]';
    this.auditLogsContainer = '[data-testid="audit-logs-container"]';
    this.auditLogEntry = '[data-testid="audit-log-entry"]';
    this.auditStatusIndicator = '[data-testid="audit-status-indicator"]';
    
    // Audit filters
    this.auditFilterUser = '[data-testid="audit-filter-user"]';
    this.auditFilterContract = '[data-testid="audit-filter-contract"]';
    this.auditFilterAction = '[data-testid="audit-filter-action"]';
    this.auditFilterDateFrom = '[data-testid="audit-filter-date-from"]';
    this.auditFilterDateTo = '[data-testid="audit-filter-date-to"]';
    this.auditFilterApplyButton = '[data-testid="audit-filter-apply"]';
    
    // Audit log entry details
    this.auditEntryUserId = '[data-testid="audit-entry-user-id"]';
    this.auditEntryContractId = '[data-testid="audit-entry-contract-id"]';
    this.auditEntryAction = '[data-testid="audit-entry-action"]';
    this.auditEntryTimestamp = '[data-testid="audit-entry-timestamp"]';
    this.auditEntryDate = '[data-testid="audit-entry-date"]';
  }

  async verifyAuditSystemStatus() {
    await this.page.click(this.auditMenuLink);
    await this.page.waitForSelector(this.auditStatusIndicator, { state: 'visible' });
    const statusText = await this.page.textContent(this.auditStatusIndicator);
    return statusText.toLowerCase().includes('operational') || statusText.toLowerCase().includes('activo');
  }

  async navigateToAuditLogs() {
    await this.page.click(this.auditMenuLink);
    await this.page.waitForSelector(this.auditLogsContainer, { state: 'visible' });
  }

  async findAuditRecordForQuery({ user, contract, timestamp, action }) {
    await this.page.fill(this.auditFilterUser, user.id);
    await this.page.fill(this.auditFilterContract, contract.id);
    await this.page.selectOption(this.auditFilterAction, action);
    
    const dateString = timestamp.toISOString().split('T')[0];
    await this.page.fill(this.auditFilterDateFrom, dateString);
    await this.page.fill(this.auditFilterDateTo, dateString);
    
    await this.page.click(this.auditFilterApplyButton);
    await this.page.waitForSelector(this.auditLogEntry, { state: 'visible', timeout: 5000 });
    
    const logEntries = this.page.locator(this.auditLogEntry);
    const count = await logEntries.count();
    
    if (count === 0) {
      return null;
    }
    
    const firstEntry = logEntries.first();
    
    return {
      userId: await firstEntry.locator(this.auditEntryUserId).textContent(),
      contractId: await firstEntry.locator(this.auditEntryContractId).textContent(),
      action: await firstEntry.locator(this.auditEntryAction).textContent(),
      timestamp: await firstEntry.locator(this.auditEntryTimestamp).textContent(),
      date: await firstEntry.locator(this.auditEntryDate).textContent()
    };
  }
}

module.exports = { ContractValuePage, AuditSystemPage };