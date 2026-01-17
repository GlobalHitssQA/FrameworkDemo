const { expect } = require('@playwright/test');

class RedElementsPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningPanelBtn = page.locator('[data-testid="provisioning-panel-btn"]');
    this.gmLineInput = page.locator('[data-testid="gm-line-input"]');
    this.rateplanSelector = page.locator('[data-testid="rateplan-selector"]');
    this.apnCheckboxes = page.locator('[data-testid^="apn-checkbox-"]');
    this.provisionBtn = page.locator('[data-testid="provision-line-btn"]');
    this.provisionedAPNList = page.locator('[data-testid="provisioned-apn-list"]');
    this.apnSelector = page.locator('[data-testid="apn-selector"]');
    this.establishSessionBtn = page.locator('[data-testid="establish-session-btn"]');
    this.sessionStatusIndicator = page.locator('[data-testid="session-status"]');
    this.telemetryTrafficIndicator = page.locator('[data-testid="telemetry-traffic-status"]');
    this.pcrfConsoleLink = page.locator('[data-testid="pcrf-console-link"]');
    this.pcrfPoliciesTable = page.locator('[data-testid="pcrf-policies-table"]');
    this.policyTypeColumn = page.locator('[data-testid="policy-type-column"]');
    this.multiAPNTrafficBtn = page.locator('[data-testid="multi-apn-traffic-btn"]');
    this.concurrentSessionsPanel = page.locator('[data-testid="concurrent-sessions-panel"]');
    this.testingRateplanOption = page.locator('[data-testid="testing-rateplan-option"]');
    this.sessionBlockedMessage = page.locator('[data-testid="session-blocked-message"]');
    this.sessionAllowedMessage = page.locator('[data-testid="session-allowed-message"]');
    this.hlrStatusIndicator = page.locator('[data-testid="hlr-hss-status"]');
    this.pcrfStatusIndicator = page.locator('[data-testid="pcrf-status"]');
    this.ggsnPgwStatusIndicator = page.locator('[data-testid="ggsn-pgw-status"]');
  }

  async navigateToProvisioningPanel() {
    await this.provisioningPanelBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionGMLineWithAPNs(apnCount) {
    await this.gmLineInput.fill('GM_TEST_LINE_001');
    await this.rateplanSelector.selectOption('PRODUCTIVE');
    for (let i = 1; i <= apnCount; i++) {
      const apnCheckbox = this.page.locator(`[data-testid="apn-checkbox-${i}"]`);
      await apnCheckbox.check();
    }
    await this.provisionBtn.click();
    await this.page.waitForSelector('[data-testid="provision-success-message"]');
  }

  async getProvisionedAPNCount() {
    const apnItems = this.provisionedAPNList.locator('[data-testid^="provisioned-apn-item-"]');
    return await apnItems.count();
  }

  async selectAPN(apnName) {
    await this.apnSelector.selectOption(apnName);
  }

  async establishDataSession() {
    await this.establishSessionBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async waitForSessionEstablishment() {
    await this.page.waitForSelector('[data-testid="session-status"][data-status="active"]', { timeout: 10000 });
  }

  async getSessionStatus() {
    return await this.sessionStatusIndicator.getAttribute('data-status');
  }

  async verifyTelemetryTrafficFlow() {
    const status = await this.telemetryTrafficIndicator.textContent();
    return status === 'flowing';
  }

  async verifyAllAPNSessionsActive() {
    const sessions = this.page.locator('[data-testid^="apn-session-"][data-status="active"]');
    const count = await sessions.count();
    return count === 7;
  }

  async navigateToPCRFConsole() {
    await this.pcrfConsoleLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async loadPoliciesForAllAPNs() {
    await this.page.waitForSelector('[data-testid="pcrf-policies-table"]');
  }

  async verifyDifferentiatedPolicies() {
    const policyRows = this.pcrfPoliciesTable.locator('tr[data-testid^="policy-row-"]');
    const count = await policyRows.count();
    return count >= 7;
  }

  async getPolicyTypesForAPNs() {
    const policyTypes = await this.policyTypeColumn.allTextContents();
    return policyTypes;
  }

  async initiateMultiAPNTraffic(apnList) {
    for (const apn of apnList) {
      const apnCheckbox = this.page.locator(`[data-testid="multi-traffic-apn-${apn}"]`);
      await apnCheckbox.check();
    }
    await this.multiAPNTrafficBtn.click();
  }

  async verifyConcurrentSessions() {
    const activeSessions = this.concurrentSessionsPanel.locator('[data-status="active"]');
    const count = await activeSessions.count();
    return count >= 4;
  }

  async verifyPoliciesAppliedToSessions() {
    const policiesApplied = this.concurrentSessionsPanel.locator('[data-policy-applied="true"]');
    const count = await policiesApplied.count();
    return count >= 4;
  }

  async switchToTestingRateplan() {
    await this.rateplanSelector.selectOption('TESTING');
    await this.page.waitForTimeout(1000);
  }

  async attemptSessionWithProductiveAPNs(apnList) {
    this.productiveAPNResults = [];
    for (const apn of apnList) {
      await this.selectAPN(apn);
      await this.establishSessionBtn.click();
      const blocked = await this.sessionBlockedMessage.isVisible();
      this.productiveAPNResults.push({ apn, blocked });
    }
  }

  async attemptSessionWithPreProductiveAPNs(apnList) {
    this.preProductiveAPNResults = [];
    for (const apn of apnList) {
      await this.selectAPN(apn);
      await this.establishSessionBtn.click();
      const allowed = await this.sessionAllowedMessage.isVisible();
      this.preProductiveAPNResults.push({ apn, allowed });
    }
  }

  async verifyProductiveAPNsBlocked() {
    return this.productiveAPNResults.every(result => result.blocked === true);
  }

  async verifyPreProductiveAPNsAllowed() {
    return this.preProductiveAPNResults.every(result => result.allowed === true);
  }
}

module.exports = RedElementsPage;