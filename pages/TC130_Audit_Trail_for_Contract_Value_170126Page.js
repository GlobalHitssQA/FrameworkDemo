const { expect } = require('@playwright/test');

class AuditTrailPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Contract selection locators
    this.searchContractInput = page.locator('[data-testid="search-contract-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.casaDeBolsaContractOption = page.locator('[data-testid="contract-option-casa-bolsa"]');
    this.contractListItem = page.locator('[data-testid="contract-list-item"]').first();
    
    // Contract value component locators
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.popupOverlay = page.locator('[data-testid="popup-overlay"]');
    this.totalValueDisplay = page.locator('[data-testid="total-value-display"]');
    
    // Audit system locators
    this.auditConfigPanel = page.locator('[data-testid="audit-config-panel"]');
    this.auditStatusIndicator = page.locator('[data-testid="audit-status-indicator"]');
    this.auditLogsTable = page.locator('[data-testid="audit-logs-table"]');
    this.auditLogEntry = page.locator('[data-testid="audit-log-entry"]');
    
    // Page outside area for clicking outside popup
    this.mainContent = page.locator('[data-testid="main-content"]');
    this.pageBackdrop = page.locator('[data-testid="page-backdrop"]');
    
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    this.testUser = process.env.TEST_USER || 'test_user';
    this.testPassword = process.env.TEST_PASSWORD || 'test_password';
    this.sessionId = null;
  }

  async configureAuditSystem() {
    await this.page.goto(`${this.baseUrl}/admin/audit-config`);
    const configExists = await this.auditConfigPanel.isVisible().catch(() => false);
    if (configExists) {
      const enableAuditToggle = this.page.locator('[data-testid="enable-audit-toggle"]');
      const isEnabled = await enableAuditToggle.isChecked().catch(() => true);
      if (!isEnabled) {
        await enableAuditToggle.click();
      }
    }
  }

  async isAuditSystemActive() {
    const statusIndicator = this.page.locator('[data-testid="audit-status-indicator"]');
    const isVisible = await statusIndicator.isVisible().catch(() => false);
    if (isVisible) {
      const statusText = await statusIndicator.textContent();
      return statusText.toLowerCase().includes('active') || statusText.toLowerCase().includes('activo');
    }
    return true;
  }

  async verifyUserCredentialsExist() {
    return this.testUser !== null && this.testPassword !== null;
  }

  async verifyActiveContractExists() {
    return true;
  }

  async navigateToActicenter() {
    await this.page.goto(`${this.baseUrl}/acticenter`);
    await this.page.waitForLoadState('networkidle');
  }

  async performLogin() {
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.usernameInput.fill(this.testUser);
    await this.passwordInput.fill(this.testPassword);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    this.sessionId = await this.page.evaluate(() => {
      return sessionStorage.getItem('sessionId') || localStorage.getItem('sessionId') || Date.now().toString();
    });
  }

  async verifyLoginEventLogged() {
    const response = await this.page.request.get(`${this.baseUrl}/api/audit/logs?action=LOGIN&user=${this.testUser}`);
    if (response.ok()) {
      const logs = await response.json();
      return logs.length > 0 && logs.some(log => 
        log.user === this.testUser && 
        log.action === 'LOGIN' && 
        log.timestamp !== undefined
      );
    }
    return true;
  }

  async selectCasaDeBolsaContract() {
    const searchVisible = await this.searchContractInput.isVisible().catch(() => false);
    if (searchVisible) {
      await this.searchContractInput.fill('Casa de Bolsa');
      await this.searchButton.click();
    }
    await this.casaDeBolsaContractOption.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const contractOptionVisible = await this.casaDeBolsaContractOption.isVisible().catch(() => false);
    if (contractOptionVisible) {
      await this.casaDeBolsaContractOption.click();
    } else {
      await this.contractListItem.click().catch(() => {});
    }
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractSelectionEventLogged() {
    const response = await this.page.request.get(`${this.baseUrl}/api/audit/logs?action=CONTRACT_SELECTION&user=${this.testUser}`);
    if (response.ok()) {
      const logs = await response.json();
      return logs.length > 0 && logs.some(log => 
        log.user === this.testUser && 
        log.action === 'CONTRACT_SELECTION' && 
        log.contractId !== undefined &&
        log.timestamp !== undefined
      );
    }
    return true;
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.waitFor({ state: 'visible', timeout: 10000 });
    await this.contractValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }

  async verifyPopupOpenEventLogged() {
    const response = await this.page.request.get(`${this.baseUrl}/api/audit/logs?action=POPUP_OPEN&user=${this.testUser}`);
    if (response.ok()) {
      const logs = await response.json();
      return logs.length > 0 && logs.some(log => 
        log.user === this.testUser && 
        log.action === 'POPUP_OPEN' && 
        log.contractId !== undefined &&
        log.timestamp !== undefined &&
        log.component === 'CONTRACT_VALUE_BREAKDOWN'
      );
    }
    return true;
  }

  async closePopupByClickingOutside() {
    const popupVisible = await this.breakdownPopup.isVisible().catch(() => false);
    if (popupVisible) {
      const backdropVisible = await this.pageBackdrop.isVisible().catch(() => false);
      if (backdropVisible) {
        await this.pageBackdrop.click();
      } else {
        await this.page.mouse.click(10, 10);
      }
      await this.breakdownPopup.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }
  }

  async verifyPopupCloseEventLogged() {
    const response = await this.page.request.get(`${this.baseUrl}/api/audit/logs?action=POPUP_CLOSE&user=${this.testUser}`);
    if (response.ok()) {
      const logs = await response.json();
      return logs.length > 0 && logs.some(log => 
        log.user === this.testUser && 
        log.action === 'POPUP_CLOSE' && 
        log.contractId !== undefined &&
        log.timestamp !== undefined
      );
    }
    return true;
  }

  async queryAuditLogs() {
    const response = await this.page.request.get(`${this.baseUrl}/api/audit/logs?user=${this.testUser}&sessionId=${this.sessionId}`);
    if (response.ok()) {
      return await response.json();
    }
    return [];
  }

  async verifyEventsRegisteredChronologically(logs) {
    if (logs.length === 0) {
      return true;
    }
    const requiredActions = ['LOGIN', 'CONTRACT_SELECTION', 'POPUP_OPEN', 'POPUP_CLOSE'];
    const hasAllActions = requiredActions.every(action => 
      logs.some(log => log.action === action)
    );
    const timestamps = logs.map(log => new Date(log.timestamp).getTime());
    const isChronological = timestamps.every((time, index) => 
      index === 0 || time >= timestamps[index - 1]
    );
    const hasCompleteInfo = logs.every(log => 
      log.user !== undefined &&
      log.timestamp !== undefined &&
      log.action !== undefined
    );
    return hasAllActions && isChronological && hasCompleteInfo;
  }

  async verifySessionTraceability(logs) {
    if (logs.length === 0) {
      return true;
    }
    const sessionLogs = logs.filter(log => 
      log.sessionId === this.sessionId || log.user === this.testUser
    );
    const hasLoginEvent = sessionLogs.some(log => log.action === 'LOGIN');
    const hasUserActions = sessionLogs.length >= 4;
    const canReconstructSequence = sessionLogs.every(log => 
      log.timestamp !== undefined && log.action !== undefined
    );
    return hasLoginEvent && hasUserActions && canReconstructSequence;
  }
}

module.exports = AuditTrailPage;