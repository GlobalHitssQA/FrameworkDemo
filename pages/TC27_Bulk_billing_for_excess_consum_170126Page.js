const { expect } = require('@playwright/test');

class BillingPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.provisioningMenuLink = page.locator('[data-testid="menu-provisioning"]');
    this.consumptionSimulatorLink = page.locator('[data-testid="menu-consumption-simulator"]');
    this.invoiceMenuLink = page.locator('[data-testid="menu-invoice"]');
    
    // Provisioning locators
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.unsoldShowroomOption = page.locator('[data-testid="plan-option-unsold-showroom"]');
    this.voiceMinutesInput = page.locator('[data-testid="input-voice-minutes"]');
    this.smsInput = page.locator('[data-testid="input-sms-count"]');
    this.dataGBInput = page.locator('[data-testid="input-data-gb"]');
    this.provisionButton = page.locator('[data-testid="btn-provision-line"]');
    this.lineStatusIndicator = page.locator('[data-testid="line-status"]');
    
    // Allowances display locators
    this.allowancesSection = page.locator('[data-testid="section-allowances"]');
    this.allowanceVoice = page.locator('[data-testid="allowance-voice-minutes"]');
    this.allowanceSMS = page.locator('[data-testid="allowance-sms"]');
    this.allowanceData = page.locator('[data-testid="allowance-data-gb"]');
    
    // Consumption simulator locators
    this.voiceConsumptionInput = page.locator('[data-testid="input-simulate-voice"]');
    this.dataConsumptionInput = page.locator('[data-testid="input-simulate-data"]');
    this.simulateButton = page.locator('[data-testid="btn-simulate-consumption"]');
    
    // Consumption details locators
    this.voiceIncludedDisplay = page.locator('[data-testid="voice-included-consumed"]');
    this.voiceExcessDisplay = page.locator('[data-testid="voice-excess-consumed"]');
    this.dataIncludedDisplay = page.locator('[data-testid="data-included-consumed"]');
    this.dataExcessDisplay = page.locator('[data-testid="data-excess-consumed"]');
    
    // Invoice section locators
    this.invoiceContainer = page.locator('[data-testid="invoice-container"]');
    this.inPoolGranelSection = page.locator('[data-testid="section-servicios-in-pool-granel"]');
    this.trafficDetailSection = page.locator('[data-testid="section-detalle-trafico"]');
    this.planFieldInDetail = page.locator('[data-testid="field-plan-detalle-trafico"]');
    
    // Bulk charges locators
    this.voiceBulkMinutes = page.locator('[data-testid="bulk-voice-minutes"]');
    this.voiceBulkRate = page.locator('[data-testid="bulk-voice-rate"]');
    this.voiceBulkTotal = page.locator('[data-testid="bulk-voice-total"]');
    this.dataBulkMB = page.locator('[data-testid="bulk-data-mb"]');
    this.dataBulkRate = page.locator('[data-testid="bulk-data-rate"]');
    this.dataBulkTotal = page.locator('[data-testid="bulk-data-total"]');
  }

  async navigateToProvisioning() {
    await this.provisioningMenuLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithPlan(planName, voiceMinutes, smsCount, dataGB) {
    await this.planSelector.click();
    if (planName === 'UNSOLD - SHOWROOM') {
      await this.unsoldShowroomOption.click();
    }
    await this.voiceMinutesInput.fill(voiceMinutes.toString());
    await this.smsInput.fill(smsCount.toString());
    await this.dataGBInput.fill(dataGB.toString());
    await this.provisionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineIsActive() {
    const status = await this.lineStatusIndicator.textContent();
    return status.toLowerCase().includes('activ');
  }

  async getAllowancesAssigned() {
    await this.allowancesSection.waitFor({ state: 'visible' });
    const voiceMinutes = parseInt(await this.allowanceVoice.textContent(), 10);
    const sms = parseInt(await this.allowanceSMS.textContent(), 10);
    const dataGB = parseInt(await this.allowanceData.textContent(), 10);
    return { voiceMinutes, sms, dataGB };
  }

  async navigateToConsumptionSimulator() {
    await this.consumptionSimulatorLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async simulateVoiceConsumption(minutes) {
    await this.voiceConsumptionInput.fill(minutes.toString());
    await this.simulateButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async simulateDataConsumption(dataGB) {
    const dataMB = dataGB * 1024;
    await this.dataConsumptionInput.fill(dataMB.toString());
    await this.simulateButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getVoiceConsumptionDetails() {
    const includedMinutes = parseInt(await this.voiceIncludedDisplay.textContent(), 10);
    const excessMinutes = parseInt(await this.voiceExcessDisplay.textContent(), 10);
    return { includedMinutes, excessMinutes };
  }

  async getDataConsumptionDetails() {
    const includedGB = parseInt(await this.dataIncludedDisplay.textContent(), 10);
    const excessMB = parseInt(await this.dataExcessDisplay.textContent(), 10);
    return { includedGB, excessMB };
  }

  async navigateToInvoice() {
    await this.invoiceMenuLink.click();
  }

  async waitForInvoiceToLoad() {
    await this.invoiceContainer.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async getVoiceBulkCharges() {
    await this.inPoolGranelSection.waitFor({ state: 'visible' });
    const minutes = parseInt(await this.voiceBulkMinutes.textContent(), 10);
    const rateText = await this.voiceBulkRate.textContent();
    const ratePerMinute = parseFloat(rateText.replace(/[^0-9.]/g, ''));
    const totalText = await this.voiceBulkTotal.textContent();
    const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));
    return { minutes, ratePerMinute, total };
  }

  async getDataBulkCharges() {
    const megabytes = parseInt(await this.dataBulkMB.textContent(), 10);
    const rateText = await this.dataBulkRate.textContent();
    const ratePerMB = parseFloat(rateText.replace(/[^0-9.]/g, ''));
    const totalText = await this.dataBulkTotal.textContent();
    const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));
    return { megabytes, ratePerMB, total };
  }
}

module.exports = BillingPage;