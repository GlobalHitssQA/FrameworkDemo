const { expect } = require('@playwright/test');

class InvoiceTrafficDetailPage {
  constructor(page) {
    this.page = page;
    
    // Navigation and authentication locators
    this.billingSystemLink = page.locator('[data-testid="billing-system-link"]');
    this.loginForm = page.locator('[data-testid="login-form"]');
    
    // Invoice generation locators
    this.clientSelector = page.locator('[data-testid="client-selector"]');
    this.clientOption = (clientName) => page.locator(`[data-testid="client-option-${clientName.toLowerCase().replace(/\s+/g, '-')}"]`);
    this.generateInvoiceButton = page.locator('[data-testid="generate-invoice-button"]');
    this.invoiceProcessingIndicator = page.locator('[data-testid="invoice-processing-indicator"]');
    this.invoiceProcessingComplete = page.locator('[data-testid="invoice-processing-complete"]');
    
    // RatePlan and configuration verification locators
    this.activeLinesSOLDIndicator = page.locator('[data-testid="active-lines-sold-rateplan"]');
    this.inPoolCalculationStatus = page.locator('[data-testid="inpool-calculation-status"]');
    this.billingCycleStatus = page.locator('[data-testid="billing-cycle-status"]');
    
    // Traffic Detail SOLD section locators
    this.trafficDetailSOLDSection = page.locator('[data-testid="traffic-detail-sold-section"]');
    this.trafficDetailSOLDHeader = page.locator('[data-testid="traffic-detail-sold-header"]');
    this.trafficDetailTelemetryData = page.locator('[data-testid="traffic-detail-telemetry-data"]');
    
    // Summary section locators
    this.summaryArea = page.locator('[data-testid="traffic-detail-summary-area"]');
    this.inPool10MBConcept = page.locator('[data-testid="inpool-10mb-consolidated-concept"]');
    this.inPool10MBLabel = page.locator('[data-testid="inpool-10mb-label"]');
    this.inPool10MBTotal = page.locator('[data-testid="inpool-10mb-total"]');
    
    // Summary detail locators
    this.assignedBagField = page.locator('[data-testid="assigned-bag-value"]');
    this.assignedBagCalculation = page.locator('[data-testid="assigned-bag-calculation"]');
    this.consumptionWithinBag = page.locator('[data-testid="consumption-within-bag"]');
    this.bulkExcessField = page.locator('[data-testid="bulk-excess-value"]');
    this.bulkExcessSection = page.locator('[data-testid="bulk-excess-section"]');
    
    // Alternative CSS selectors for fallback
    this.trafficDetailSOLDSectionCSS = page.locator('#detalle-trafico-sold');
    this.summaryAreaCSS = page.locator('.traffic-detail-summary');
    this.inPoolConceptCSS = page.locator('.inpool-10mb-consolidated');
  }

  async navigateToBillingSystem() {
    await this.billingSystemLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLinesInSOLDRatePlan() {
    await this.activeLinesSOLDIndicator.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.activeLinesSOLDIndicator.textContent();
    return text && text.includes('SOLD');
  }

  async verifyInPoolCalculationShellExecuted() {
    await this.inPoolCalculationStatus.waitFor({ state: 'visible', timeout: 10000 });
    const status = await this.inPoolCalculationStatus.textContent();
    return status && (status.includes('Ejecutada') || status.includes('Completed'));
  }

  async verifyBillingCycleClosed() {
    await this.billingCycleStatus.waitFor({ state: 'visible', timeout: 10000 });
    const status = await this.billingCycleStatus.textContent();
    return status && (status.includes('Cerrado') || status.includes('Closed'));
  }

  async generateConsolidatedInvoice(clientName) {
    await this.clientSelector.click();
    await this.clientOption(clientName).click();
    await this.generateInvoiceButton.click();
  }

  async waitForInvoiceProcessing() {
    await this.invoiceProcessingIndicator.waitFor({ state: 'visible', timeout: 5000 });
    await this.invoiceProcessingComplete.waitFor({ state: 'visible', timeout: 60000 });
    return await this.invoiceProcessingComplete.isVisible();
  }

  async navigateToTrafficDetailSOLDSection() {
    await this.trafficDetailSOLDSection.scrollIntoViewIfNeeded();
    await this.trafficDetailSOLDHeader.click();
    await this.trafficDetailTelemetryData.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isTrafficDetailSectionVisible() {
    return await this.trafficDetailTelemetryData.isVisible();
  }

  async scrollToEndOfTrafficDetailSection() {
    await this.trafficDetailSOLDSection.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await this.summaryArea.scrollIntoViewIfNeeded();
  }

  async isSummaryAreaVisible() {
    return await this.summaryArea.isVisible();
  }

  async isInPool10MBConceptDisplayed() {
    const conceptVisible = await this.inPool10MBConcept.isVisible();
    if (conceptVisible) {
      const labelText = await this.inPool10MBLabel.textContent();
      return labelText && labelText.includes('In Pool 10 MB');
    }
    return false;
  }

  async isAssignedBagDisplayed() {
    const bagVisible = await this.assignedBagField.isVisible();
    if (bagVisible) {
      const calculationText = await this.assignedBagCalculation.textContent();
      return calculationText && calculationText.includes('10 MB');
    }
    return false;
  }

  async isConsumptionWithinBagDisplayed() {
    return await this.consumptionWithinBag.isVisible();
  }

  async isBulkExcessDisplayed() {
    const excessVisible = await this.bulkExcessSection.isVisible();
    if (excessVisible) {
      const excessValue = await this.bulkExcessField.textContent();
      return excessValue !== null;
    }
    return true;
  }

  async getInPool10MBTotalValue() {
    return await this.inPool10MBTotal.textContent();
  }

  async getAssignedBagValue() {
    return await this.assignedBagField.textContent();
  }

  async getConsumptionValue() {
    return await this.consumptionWithinBag.textContent();
  }

  async getBulkExcessValue() {
    return await this.bulkExcessField.textContent();
  }
};

module.exports = InvoiceTrafficDetailPage;