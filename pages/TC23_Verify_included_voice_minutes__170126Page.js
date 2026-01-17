class UnsoldShowroomPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.provisioningMenuBtn = page.locator('[data-testid="menu-provisioning"]');
    this.consumptionSimulatorBtn = page.locator('[data-testid="menu-consumption-simulator"]');
    this.balanceSectionBtn = page.locator('[data-testid="menu-balance"]');
    this.invoiceSectionBtn = page.locator('[data-testid="menu-invoice"]');
    
    // Provisioning locators
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.unsoldShowroomOption = page.locator('[data-testid="plan-option-unsold-showroom"]');
    this.lineNumberInput = page.locator('[data-testid="input-line-number"]');
    this.provisionBtn = page.locator('[data-testid="btn-provision-line"]');
    this.lineStatusIndicator = page.locator('[data-testid="line-status-indicator"]');
    this.activePlanLabel = page.locator('[data-testid="active-plan-label"]');
    
    // Plan details locators
    this.includedVoiceMinutes = page.locator('[data-testid="included-voice-minutes"]');
    this.includedSms = page.locator('[data-testid="included-sms"]');
    this.includedDataGb = page.locator('[data-testid="included-data-gb"]');
    
    // Consumption simulator locators
    this.voiceMinutesInput = page.locator('[data-testid="input-voice-minutes-consumption"]');
    this.consumptionTypeSelector = page.locator('[data-testid="consumption-type-selector"]');
    this.localVoiceOption = page.locator('[data-testid="consumption-type-local-voice"]');
    this.simulateConsumptionBtn = page.locator('[data-testid="btn-simulate-consumption"]');
    this.confirmConsumptionBtn = page.locator('[data-testid="btn-confirm-consumption"]');
    this.consumptionSuccessMessage = page.locator('[data-testid="consumption-success-message"]');
    
    // Consumption record locators
    this.consumedMinutesDisplay = page.locator('[data-testid="consumed-minutes-display"]');
    this.deductedFromIncludedIndicator = page.locator('[data-testid="deducted-from-included"]');
    
    // Balance section locators
    this.remainingVoiceMinutesDisplay = page.locator('[data-testid="remaining-voice-minutes"]');
    this.remainingSmsDisplay = page.locator('[data-testid="remaining-sms"]');
    this.remainingDataDisplay = page.locator('[data-testid="remaining-data"]');
    
    // Invoice section locators
    this.invoiceDetailTable = page.locator('[data-testid="invoice-detail-table"]');
    this.voiceChargesRow = page.locator('[data-testid="invoice-voice-charges"]');
    this.voiceChargesAmount = page.locator('[data-testid="voice-charges-amount"]');
    this.includedConsumptionSection = page.locator('[data-testid="included-consumption-section"]');
    this.noChargeIndicator = page.locator('[data-testid="no-charge-indicator"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineInUnsoldShowroomPlan() {
    await this.planSelector.click();
    await this.unsoldShowroomOption.click();
    await this.provisionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isLineActiveInPlan() {
    const status = await this.lineStatusIndicator.textContent();
    const plan = await this.activePlanLabel.textContent();
    return status.toLowerCase().includes('activ') && plan.includes('UNSOLD') && plan.includes('SHOWROOM');
  }

  async getPlanIncludedBenefits() {
    const voiceMinutes = parseInt(await this.includedVoiceMinutes.textContent(), 10);
    const sms = parseInt(await this.includedSms.textContent(), 10);
    const dataGB = parseInt(await this.includedDataGb.textContent(), 10);
    return { voiceMinutes, sms, dataGB };
  }

  async navigateToConsumptionSimulator() {
    await this.consumptionSimulatorBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async simulateVoiceConsumption(minutes) {
    await this.consumptionTypeSelector.click();
    await this.localVoiceOption.click();
    await this.voiceMinutesInput.fill(String(minutes));
    await this.simulateConsumptionBtn.click();
  }

  async confirmConsumptionRegistration() {
    await this.confirmConsumptionBtn.click();
    await this.consumptionSuccessMessage.waitFor({ state: 'visible' });
  }

  async getVoiceConsumptionRecord() {
    const consumedMinutes = parseInt(await this.consumedMinutesDisplay.textContent(), 10);
    const deductedFromIncluded = await this.deductedFromIncludedIndicator.isVisible();
    return { consumedMinutes, deductedFromIncluded };
  }

  async navigateToBalanceSection() {
    await this.balanceSectionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRemainingVoiceMinutes() {
    const text = await this.remainingVoiceMinutesDisplay.textContent();
    return parseInt(text, 10);
  }

  async navigateToInvoiceSection() {
    await this.invoiceSectionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getVoiceChargesFromInvoice() {
    const isVisible = await this.voiceChargesAmount.isVisible();
    if (!isVisible) return 0;
    const text = await this.voiceChargesAmount.textContent();
    const amount = parseFloat(text.replace(/[^0-9.]/g, ''));
    return isNaN(amount) ? 0 : amount;
  }

  async isIncludedConsumptionDisplayedCorrectly() {
    const sectionVisible = await this.includedConsumptionSection.isVisible();
    const noChargeVisible = await this.noChargeIndicator.isVisible();
    return sectionVisible && noChargeVisible;
  }
}

module.exports = UnsoldShowroomPage;