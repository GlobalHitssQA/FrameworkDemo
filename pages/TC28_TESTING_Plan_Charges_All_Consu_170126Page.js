class TestingPlanPage {
  constructor(page) {
    this.page = page;
    this.provisioningSectionLink = '[data-testid="provisioning-section-link"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.testingPlanOption = '[data-testid="plan-option-testing"]';
    this.provisionLineButton = '[data-testid="provision-line-button"]';
    this.lineStatusLabel = '[data-testid="line-plan-status"]';
    this.includedAllowancesIndicator = '[data-testid="included-allowances-indicator"]';
    this.apnListContainer = '[data-testid="apn-list-container"]';
    this.apnItem = '[data-testid="apn-item"]';
    this.consumptionSimulatorLink = '[data-testid="consumption-simulator-link"]';
    this.smsQuantityInput = '[data-testid="sms-quantity-input"]';
    this.voiceMinutesInput = '[data-testid="voice-minutes-input"]';
    this.dataMegabytesInput = '[data-testid="data-megabytes-input"]';
    this.simulateConsumptionButton = '[data-testid="simulate-consumption-button"]';
    this.consumptionDetailLink = '[data-testid="consumption-detail-link"]';
    this.chargeTypeLabel = '[data-testid="charge-type-label"]';
    this.includedAppliedValue = '[data-testid="included-applied-value"]';
    this.bulkRateIndicator = '[data-testid="bulk-rate-indicator"]';
    this.invoiceSectionLink = '[data-testid="invoice-section-link"]';
    this.smsChargesRow = '[data-testid="sms-charges-row"]';
    this.voiceChargesRow = '[data-testid="voice-charges-row"]';
    this.dataChargesRow = '[data-testid="data-charges-row"]';
    this.chargeQuantity = '[data-testid="charge-quantity"]';
    this.chargeUnitRate = '[data-testid="charge-unit-rate"]';
    this.chargeTotal = '[data-testid="charge-total"]';
    this.invoiceTotalValue = '[data-testid="invoice-total-value"]';
    this.discountsAppliedValue = '[data-testid="discounts-applied-value"]';
  }

  async navigateToProvisioningSection() {
    await this.page.click(this.provisioningSectionLink);
    await this.page.waitForSelector(this.planSelector);
  }

  async selectTestingPlan() {
    await this.page.click(this.planSelector);
    await this.page.click(this.testingPlanOption);
  }

  async provisionLineWithoutIncludedAllowances() {
    await this.page.click(this.provisionLineButton);
    await this.page.waitForSelector(this.lineStatusLabel);
  }

  async getLinePlanStatus() {
    return await this.page.textContent(this.lineStatusLabel);
  }

  async hasIncludedAllowances() {
    const indicator = await this.page.textContent(this.includedAllowancesIndicator);
    return indicator !== 'Sin incluidos' && indicator !== '0';
  }

  async getEnabledAPNs() {
    const apnElements = await this.page.$$(this.apnItem);
    const apnList = [];
    for (const element of apnElements) {
      const apnName = await element.textContent();
      apnList.push(apnName.trim());
    }
    return apnList;
  }

  async navigateToConsumptionSimulator() {
    await this.page.click(this.consumptionSimulatorLink);
    await this.page.waitForSelector(this.smsQuantityInput);
  }

  async simulateSmsConsumption(quantity) {
    await this.page.fill(this.smsQuantityInput, quantity.toString());
    await this.page.click(this.simulateConsumptionButton);
  }

  async simulateVoiceConsumption(minutes) {
    await this.page.fill(this.voiceMinutesInput, minutes.toString());
    await this.page.click(this.simulateConsumptionButton);
  }

  async simulateDataConsumption(megabytes) {
    await this.page.fill(this.dataMegabytesInput, megabytes.toString());
    await this.page.click(this.simulateConsumptionButton);
  }

  async navigateToConsumptionDetail() {
    await this.page.click(this.consumptionDetailLink);
    await this.page.waitForSelector(this.chargeTypeLabel);
  }

  async getConsumptionChargeType() {
    return await this.page.textContent(this.chargeTypeLabel);
  }

  async getIncludedAllowancesApplied() {
    return await this.page.textContent(this.includedAppliedValue);
  }

  async isAllTrafficBulkRate() {
    const indicators = await this.page.$$(this.bulkRateIndicator);
    for (const indicator of indicators) {
      const value = await indicator.textContent();
      if (value !== 'GRANEL') {
        return false;
      }
    }
    return true;
  }

  async navigateToInvoiceSection() {
    await this.page.click(this.invoiceSectionLink);
    await this.page.waitForSelector(this.invoiceTotalValue);
  }

  async getSmsChargeDetails() {
    const row = await this.page.$(this.smsChargesRow);
    const quantity = parseFloat(await row.$eval(this.chargeQuantity, el => el.textContent));
    const unitRate = parseFloat(await row.$eval(this.chargeUnitRate, el => el.textContent));
    const total = parseFloat(await row.$eval(this.chargeTotal, el => el.textContent));
    return { quantity, unitRate, total };
  }

  async getVoiceChargeDetails() {
    const row = await this.page.$(this.voiceChargesRow);
    const quantity = parseFloat(await row.$eval(this.chargeQuantity, el => el.textContent));
    const unitRate = parseFloat(await row.$eval(this.chargeUnitRate, el => el.textContent));
    const total = parseFloat(await row.$eval(this.chargeTotal, el => el.textContent));
    return { quantity, unitRate, total };
  }

  async getDataChargeDetails() {
    const row = await this.page.$(this.dataChargesRow);
    const quantity = parseFloat(await row.$eval(this.chargeQuantity, el => el.textContent));
    const unitRate = parseFloat(await row.$eval(this.chargeUnitRate, el => el.textContent));
    const total = parseFloat(await row.$eval(this.chargeTotal, el => el.textContent));
    return { quantity, unitRate, total };
  }

  async getInvoiceTotal() {
    const totalText = await this.page.textContent(this.invoiceTotalValue);
    return parseFloat(totalText.replace(/[^0-9.]/g, ''));
  }

  async getDiscountsApplied() {
    const discountText = await this.page.textContent(this.discountsAppliedValue);
    return parseFloat(discountText.replace(/[^0-9.]/g, '')) || 0;
  }
}

module.exports = TestingPlanPage;