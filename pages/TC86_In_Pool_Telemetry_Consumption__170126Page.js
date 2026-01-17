class InPoolSummaryPage {
  constructor(page) {
    this.page = page;
    this.inPoolSectionLink = '[data-testid="in-pool-section-link"]';
    this.trafficDetailSOLDSection = '[data-testid="traffic-detail-sold-section"]';
    this.inPool10MBSummaryBtn = '[data-testid="in-pool-10mb-summary-btn"]';
    this.consolidatedSummaryContainer = '[data-testid="consolidated-summary-container"]';
    this.consumptionWithinQuotaField = '[data-testid="consumption-within-quota-field"]';
    this.inPoolAmountField = '[data-testid="in-pool-amount-field"]';
    this.calculationShellStatus = '[data-testid="calculation-shell-status"]';
    this.billingCycleStatus = '[data-testid="billing-cycle-status"]';
    this.numberOfLinesField = '[data-testid="number-of-sold-lines"]';
    this.apn1ConsumptionField = '[data-testid="apn1-consumption-value"]';
    this.apn4ConsumptionField = '[data-testid="apn4-consumption-value"]';
    this.planFieldInTrafficDetail = '[data-testid="plan-field-traffic-detail"]';
    this.inPoolGranelSection = '[data-testid="in-pool-granel-section"]';
    this.consumptionStatusIndicator = '[data-testid="consumption-status-indicator"]';
  }

  async navigateToInPoolSection() {
    await this.page.click(this.inPoolSectionLink);
    await this.page.waitForSelector(this.consolidatedSummaryContainer);
  }

  async getCalculationShellStatus() {
    const statusElement = await this.page.locator(this.calculationShellStatus);
    return await statusElement.textContent();
  }

  async getNumberOfSOLDLines() {
    const linesElement = await this.page.locator(this.numberOfLinesField);
    const linesText = await linesElement.textContent();
    return parseInt(linesText, 10);
  }

  async getBillingCycleStatus() {
    const statusElement = await this.page.locator(this.billingCycleStatus);
    return await statusElement.textContent();
  }

  async getAPN1Consumption() {
    const apn1Element = await this.page.locator(this.apn1ConsumptionField);
    const consumptionText = await apn1Element.textContent();
    return parseFloat(consumptionText);
  }

  async getAPN4Consumption() {
    const apn4Element = await this.page.locator(this.apn4ConsumptionField);
    const consumptionText = await apn4Element.textContent();
    return parseFloat(consumptionText);
  }

  async setConsumptionStatus(isWithinQuota) {
    this.isWithinQuota = isWithinQuota;
  }

  async navigateToTrafficDetailSOLD() {
    await this.page.click(this.trafficDetailSOLDSection);
    await this.page.waitForSelector(this.planFieldInTrafficDetail);
  }

  async openInPool10MBSummary() {
    await this.page.click(this.inPool10MBSummaryBtn);
    await this.page.waitForSelector(this.consolidatedSummaryContainer);
  }

  async isConsolidatedSummaryVisible() {
    const summaryElement = await this.page.locator(this.consolidatedSummaryContainer);
    return await summaryElement.isVisible();
  }

  async getConsumptionWithinQuotaValue() {
    const consumptionElement = await this.page.locator(this.consumptionWithinQuotaField);
    const consumptionText = await consumptionElement.textContent();
    return parseFloat(consumptionText);
  }

  async getInPoolAmount() {
    const amountElement = await this.page.locator(this.inPoolAmountField);
    const amountText = await amountElement.textContent();
    const cleanedAmount = amountText.replace(/[^0-9.]/g, '');
    return parseFloat(cleanedAmount);
  }
}

module.exports = InPoolSummaryPage;