const { expect } = require('@playwright/test');

class TrialPackagePage {
  constructor(page) {
    this.page = page;
    
    this.lineManagementMenu = '[data-testid="line-management-menu"]';
    this.gmLineStatusIndicator = '[data-testid="gm-line-status"]';
    this.soldPlanBadge = '[data-testid="sold-plan-badge"]';
    this.bscs7ConfigLink = '[data-testid="bscs7-configuration-link"]';
    this.packageValidityField = '[data-testid="package-validity-days"]';
    this.trialPackageRow = '[data-testid="trial-6gb-package-row"]';
    this.activatePackageButton = '[data-testid="activate-package-btn"]';
    this.packageStatusLabel = '[data-testid="package-status-label"]';
    this.packageValidityLabel = '[data-testid="package-validity-label"]';
    this.expirationDateField = '[data-testid="expiration-date-field"]';
    this.consumedDataField = '[data-testid="consumed-data-mb"]';
    this.remainingDataField = '[data-testid="remaining-data-mb"]';
    this.simulateConsumptionInput = '[data-testid="simulate-consumption-input"]';
    this.simulateConsumptionButton = '[data-testid="simulate-consumption-btn"]';
    this.timeSimulatorInput = '[data-testid="time-simulator-days-input"]';
    this.timeSimulatorButton = '[data-testid="time-simulator-btn"]';
    this.expirationReasonField = '[data-testid="expiration-reason"]';
    this.lastConsumptionPackageField = '[data-testid="last-consumption-package"]';
    this.fallbackTypeField = '[data-testid="fallback-type"]';
    this.activationDateField = '[data-testid="activation-date-field"]';
  }

  async navigateToLineManagement() {
    await this.page.click(this.lineManagementMenu);
    await this.page.waitForSelector(this.gmLineStatusIndicator);
  }

  async verifyActiveGMLineWithSOLDPlan() {
    const statusText = await this.page.textContent(this.gmLineStatusIndicator);
    expect(statusText).toContain('Activa');
    const planBadge = await this.page.isVisible(this.soldPlanBadge);
    expect(planBadge).toBe(true);
  }

  async navigateToBSCS7Configuration() {
    await this.page.click(this.bscs7ConfigLink);
    await this.page.waitForSelector(this.trialPackageRow);
  }

  async verifyTrialPackageValidityConfiguration(expectedDays) {
    await this.page.click(this.trialPackageRow);
    const validityText = await this.page.textContent(this.packageValidityField);
    expect(parseInt(validityText)).toBe(expectedDays);
  }

  async activateTrialPackage() {
    await this.page.click(this.trialPackageRow);
    await this.page.click(this.activatePackageButton);
    await this.page.waitForSelector(this.activationDateField);
    const activationDate = await this.page.textContent(this.activationDateField);
    return activationDate;
  }

  async getPackageStatus() {
    const statusText = await this.page.textContent(this.packageStatusLabel);
    const validityText = await this.page.textContent(this.packageValidityLabel);
    let expirationReason = null;
    if (await this.page.isVisible(this.expirationReasonField)) {
      expirationReason = await this.page.textContent(this.expirationReasonField);
    }
    return {
      isActive: statusText.toLowerCase().includes('activo'),
      validityDays: parseInt(validityText) || 0,
      expirationReason: expirationReason
    };
  }

  async getExpirationDate() {
    return await this.page.textContent(this.expirationDateField);
  }

  async simulateDataConsumption(megabytes) {
    await this.page.fill(this.simulateConsumptionInput, megabytes.toString());
    await this.page.click(this.simulateConsumptionButton);
    await this.page.waitForTimeout(1000);
  }

  async getConsumptionInfo() {
    const consumedText = await this.page.textContent(this.consumedDataField);
    const remainingText = await this.page.textContent(this.remainingDataField);
    return {
      consumedMB: parseInt(consumedText) || 0,
      remainingMB: parseInt(remainingText) || 0
    };
  }

  async simulateTimePassing(days) {
    await this.page.fill(this.timeSimulatorInput, days.toString());
    await this.page.click(this.timeSimulatorButton);
    await this.page.waitForTimeout(1000);
  }

  async attemptDataConsumption(megabytes) {
    await this.page.fill(this.simulateConsumptionInput, megabytes.toString());
    await this.page.click(this.simulateConsumptionButton);
    await this.page.waitForTimeout(1000);
  }

  async getLastConsumptionResult() {
    const packageUsed = await this.page.textContent(this.lastConsumptionPackageField);
    const fallbackType = await this.page.textContent(this.fallbackTypeField);
    return {
      packageUsed: packageUsed,
      fallbackType: fallbackType
    };
  }
}

module.exports = TrialPackagePage;