const { expect } = require('@playwright/test');

class BillingPage {
  constructor(page) {
    this.page = page;
    
    this.corporateAccountSelector = '[data-testid="corporate-account-gm"]';
    this.linesTableSelector = '[data-testid="lines-table"]';
    this.planColumnSelector = '[data-testid="plan-column"]';
    this.consumptionFormSelector = '[data-testid="consumption-form"]';
    this.inPoolShellButtonSelector = '[data-testid="btn-execute-inpool-shell"]';
    this.billingProcessButtonSelector = '[data-testid="btn-execute-billing"]';
    this.cutoffDayInputSelector = '[data-testid="input-cutoff-day"]';
    this.consolidatedInvoiceSelector = '[data-testid="consolidated-invoice"]';
    this.servicesInPoolSectionSelector = '[data-testid="section-services-inpool"]';
    this.servicesInPoolBulkSectionSelector = '[data-testid="section-services-inpool-bulk"]';
    this.additionalServicesSectionSelector = '[data-testid="section-additional-services"]';
    this.trafficDetailSectionSelector = '[data-testid="section-traffic-detail"]';
    this.ldiSectionSelector = '[data-testid="section-ldi"]';
    this.roamingSectionSelector = '[data-testid="section-roaming"]';
    this.invoiceSubtotalSelector = '[data-testid="invoice-subtotal"]';
    this.invoiceIGVSelector = '[data-testid="invoice-igv"]';
    this.invoiceTotalSelector = '[data-testid="invoice-total"]';
    this.occServicesInPoolSelector = '[data-testid="occ-services-inpool"]';
    this.occServicesInPoolBulkSelector = '[data-testid="occ-services-inpool-bulk"]';
    this.bscs7StatusSelector = '[data-testid="bscs7-status"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto('/billing');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyGMCorporateAccountExists() {
    await this.page.waitForSelector(this.corporateAccountSelector);
    const isVisible = await this.page.isVisible(this.corporateAccountSelector);
    return isVisible;
  }

  async verifyLinesDistributedAcrossPlans(plans) {
    await this.page.waitForSelector(this.linesTableSelector);
    for (const plan of plans) {
      const planSelector = `[data-testid="plan-row-${plan.toLowerCase().replace(/\s+/g, '-')}"]`;
      const planExists = await this.page.isVisible(planSelector);
      if (!planExists) {
        throw new Error(`Plan ${plan} not found in lines table`);
      }
    }
    return true;
  }

  async generateVariedConsumption() {
    await this.page.click('[data-testid="btn-generate-consumption"]');
    await this.page.waitForSelector(this.consumptionFormSelector);
    await this.page.check('[data-testid="chk-pool-data"]');
    await this.page.check('[data-testid="chk-bulk-data"]');
    await this.page.check('[data-testid="chk-packages"]');
    await this.page.check('[data-testid="chk-inpool"]');
    await this.page.check('[data-testid="chk-additional-services"]');
    await this.page.click('[data-testid="btn-submit-consumption"]');
    await this.page.waitForSelector('[data-testid="consumption-success"]');
  }

  async verifyConsumptionRegisteredInBSCS7() {
    await this.page.waitForSelector(this.bscs7StatusSelector);
    const statusText = await this.page.textContent(this.bscs7StatusSelector);
    return statusText.includes('Registered');
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.inPoolShellButtonSelector);
    await this.page.waitForSelector('[data-testid="shell-execution-progress"]');
    await this.page.waitForSelector('[data-testid="shell-execution-complete"]', { timeout: 60000 });
  }

  async verifyOCCsGenerated() {
    const inPoolOCC = await this.page.isVisible(this.occServicesInPoolSelector);
    const bulkOCC = await this.page.isVisible(this.occServicesInPoolBulkSelector);
    return inPoolOCC && bulkOCC;
  }

  async executeBillingProcess(cutoffDay) {
    await this.page.fill(this.cutoffDayInputSelector, cutoffDay.toString());
    await this.page.click(this.billingProcessButtonSelector);
    await this.page.waitForSelector('[data-testid="billing-process-complete"]', { timeout: 120000 });
  }

  async verifyConsolidatedInvoiceGenerated() {
    await this.page.waitForSelector(this.consolidatedInvoiceSelector);
    return await this.page.isVisible(this.consolidatedInvoiceSelector);
  }

  async verifyServicesInPoolSection() {
    const isVisible = await this.page.isVisible(this.servicesInPoolSectionSelector);
    if (isVisible) {
      const amount = await this.page.textContent(`${this.servicesInPoolSectionSelector} [data-testid="amount"]`);
      return amount && parseFloat(amount.replace(/[^0-9.-]/g, '')) >= 0;
    }
    return false;
  }

  async verifyServicesInPoolBulkSection() {
    const isVisible = await this.page.isVisible(this.servicesInPoolBulkSectionSelector);
    if (isVisible) {
      const amount = await this.page.textContent(`${this.servicesInPoolBulkSectionSelector} [data-testid="amount"]`);
      return amount && parseFloat(amount.replace(/[^0-9.-]/g, '')) >= 0;
    }
    return false;
  }

  async verifyAdditionalServicesSection() {
    return await this.page.isVisible(this.additionalServicesSectionSelector);
  }

  async verifyTrafficDetailSection() {
    const trafficVisible = await this.page.isVisible(this.trafficDetailSectionSelector);
    const ldiVisible = await this.page.isVisible(this.ldiSectionSelector);
    const roamingVisible = await this.page.isVisible(this.roamingSectionSelector);
    return trafficVisible && ldiVisible && roamingVisible;
  }

  async verifyInvoiceTotalWithIGV(igvPercentage) {
    const subtotalText = await this.page.textContent(this.invoiceSubtotalSelector);
    const igvText = await this.page.textContent(this.invoiceIGVSelector);
    const totalText = await this.page.textContent(this.invoiceTotalSelector);
    
    const subtotal = parseFloat(subtotalText.replace(/[^0-9.-]/g, ''));
    const igv = parseFloat(igvText.replace(/[^0-9.-]/g, ''));
    const total = parseFloat(totalText.replace(/[^0-9.-]/g, ''));
    
    const expectedIGV = subtotal * (igvPercentage / 100);
    const expectedTotal = subtotal + expectedIGV;
    
    const igvMatches = Math.abs(igv - expectedIGV) < 0.01;
    const totalMatches = Math.abs(total - expectedTotal) < 0.01;
    
    return igvMatches && totalMatches;
  }
}

module.exports = BillingPage;