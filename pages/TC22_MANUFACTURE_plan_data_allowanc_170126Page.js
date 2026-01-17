class ManufacturePlanPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningMenuLink = page.locator('[data-testid="menu-provisioning"]');
    this.planSelectorDropdown = page.locator('[data-testid="plan-selector"]');
    this.manufacturePlanOption = page.locator('[data-testid="plan-option-manufacture"]');
    this.lineNumberInput = page.locator('[data-testid="input-line-number"]');
    this.provisionButton = page.locator('[data-testid="btn-provision-line"]');
    this.lineStatusIndicator = page.locator('[data-testid="line-status-indicator"]');
    this.apnConfigurationSection = page.locator('[data-testid="section-apn-configuration"]');
    this.apnStatusList = page.locator('[data-testid="apn-status-list"]');
    this.dataConsumptionInput = page.locator('[data-testid="input-data-consumption"]');
    this.registerConsumptionButton = page.locator('[data-testid="btn-register-consumption"]');
    this.consumptionConfirmationMessage = page.locator('[data-testid="msg-consumption-confirmed"]');
    this.balanceMenuLink = page.locator('[data-testid="menu-balance"]');
    this.queryBalanceButton = page.locator('[data-testid="btn-query-balance"]');
    this.remainingDataDisplay = page.locator('[data-testid="display-remaining-data"]');
    this.invoiceMenuLink = page.locator('[data-testid="menu-invoice"]');
    this.invoiceDetailSection = page.locator('[data-testid="section-invoice-detail"]');
    this.dataChargesRow = page.locator('[data-testid="row-data-charges"]');
    this.includedServicesSection = page.locator('[data-testid="section-included-services"]');
    this.inPoolServicesSection = page.locator('[data-testid="section-in-pool-services"]');
    this.trafficDetailSection = page.locator('[data-testid="section-traffic-detail-sold"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningMenuLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithManufacturePlan(voiceMinutes, smsCount, dataMB) {
    await this.planSelectorDropdown.click();
    await this.manufacturePlanOption.click();
    await this.provisionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineIsActive() {
    await this.lineStatusIndicator.waitFor({ state: 'visible' });
    const statusText = await this.lineStatusIndicator.textContent();
    return statusText.toLowerCase().includes('active') || statusText.toLowerCase().includes('activ');
  }

  async verifyAPNsConfiguration() {
    await this.apnConfigurationSection.waitFor({ state: 'visible' });
    const apnItems = await this.apnStatusList.locator('[data-testid^="apn-item-"]').count();
    return apnItems > 0;
  }

  async registerDataConsumption(consumedMB) {
    await this.dataConsumptionInput.fill(consumedMB.toString());
    await this.registerConsumptionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyConsumptionRegistered(consumedMB) {
    await this.consumptionConfirmationMessage.waitFor({ state: 'visible' });
    const messageText = await this.consumptionConfirmationMessage.textContent();
    return messageText.includes(consumedMB.toString());
  }

  async navigateToBalanceSection() {
    await this.balanceMenuLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async queryDataBalance() {
    await this.queryBalanceButton.click();
    await this.remainingDataDisplay.waitFor({ state: 'visible' });
  }

  async getRemainingDataBalance() {
    const balanceText = await this.remainingDataDisplay.textContent();
    const numericValue = parseInt(balanceText.replace(/[^0-9]/g, ''), 10);
    return numericValue;
  }

  async navigateToInvoiceSection() {
    await this.invoiceMenuLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async checkDataChargesInInvoice(consumedMB) {
    await this.invoiceDetailSection.waitFor({ state: 'visible' });
    const chargesVisible = await this.dataChargesRow.isVisible();
    if (!chargesVisible) {
      return false;
    }
    const chargesText = await this.dataChargesRow.textContent();
    const hasCharge = chargesText.includes('$') && !chargesText.includes('$0');
    return hasCharge;
  }
}

module.exports = ManufacturePlanPage;