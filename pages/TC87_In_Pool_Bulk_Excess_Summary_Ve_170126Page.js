const { expect } = require('@playwright/test');

class InPoolSummaryPage {
  constructor(page) {
    this.page = page;
    
    this.invoiceMenuLink = page.locator('[data-testid="invoice-menu-link"]');
    this.trafficDetailSOLDSection = page.locator('[data-testid="traffic-detail-sold-section"]');
    this.inPool10MBSummaryTab = page.locator('[data-testid="in-pool-10mb-summary-tab"]');
    this.summaryConceptsContainer = page.locator('[data-testid="summary-concepts-container"]');
    this.bulkExcessField = page.locator('[data-testid="bulk-excess-field"]');
    this.bulkExcessMBValue = page.locator('[data-testid="bulk-excess-mb-value"]');
    this.bulkExcessAmountValue = page.locator('[data-testid="bulk-excess-amount-value"]');
    this.consumptionConfigSection = page.locator('[data-testid="consumption-config-section"]');
    this.poolSizeInput = page.locator('[data-testid="pool-size-input"]');
    this.consumptionInput = page.locator('[data-testid="consumption-input"]');
    this.saveConfigButton = page.locator('[data-testid="save-config-button"]');
    this.executeBillingButton = page.locator('[data-testid="execute-billing-button"]');
    this.executeShellButton = page.locator('[data-testid="execute-shell-button"]');
    this.processSuccessMessage = page.locator('[data-testid="process-success-message"]');
    this.planField = page.locator('[data-testid="plan-field"]');
    this.inPoolServicesSection = page.locator('[data-testid="in-pool-services-section"]');
    this.inPoolBulkServicesSection = page.locator('[data-testid="in-pool-bulk-services-section"]');
  }

  async configureConsumptionScenario(poolSize, consumption) {
    await this.consumptionConfigSection.waitFor({ state: 'visible' });
    await this.poolSizeInput.fill(poolSize.toString());
    await this.consumptionInput.fill(consumption.toString());
    await this.saveConfigButton.click();
  }

  async executeBillingProcessAndShell() {
    await this.executeBillingButton.click();
    await this.processSuccessMessage.waitFor({ state: 'visible' });
    await this.executeShellButton.click();
    await this.processSuccessMessage.waitFor({ state: 'visible' });
  }

  async navigateToInvoice() {
    await this.invoiceMenuLink.click();
  }

  async accessTrafficDetailSOLDSection() {
    await this.trafficDetailSOLDSection.click();
    await this.trafficDetailSOLDSection.waitFor({ state: 'visible' });
  }

  async accessInPool10MBSummary() {
    await this.inPool10MBSummaryTab.click();
    await this.summaryConceptsContainer.waitFor({ state: 'visible' });
  }

  async isSummaryWithAllConceptsVisible() {
    return await this.summaryConceptsContainer.isVisible();
  }

  async getBulkExcessMBValue() {
    const text = await this.bulkExcessMBValue.textContent();
    return parseInt(text.replace(/[^0-9]/g, ''), 10);
  }

  async getBulkExcessAmount() {
    const text = await this.bulkExcessAmountValue.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async isBulkExcessFieldHiddenOrZero() {
    const isVisible = await this.bulkExcessField.isVisible();
    if (!isVisible) {
      return true;
    }
    const amount = await this.getBulkExcessAmount();
    return amount === 0;
  }
}

module.exports = InPoolSummaryPage;