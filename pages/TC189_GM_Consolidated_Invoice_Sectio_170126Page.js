const { expect } = require('@playwright/test');

class GMInvoicePage {
  constructor(page) {
    this.page = page;
    
    this.billingCycleIndicator = page.locator('[data-testid="billing-cycle-status"]');
    this.inPoolShellStatus = page.locator('[data-testid="in-pool-shell-status"]');
    this.consolidatedInvoiceLink = page.locator('[data-testid="consolidated-invoice-link"]');
    this.invoiceContainer = page.locator('[data-testid="gm-invoice-container"]');
    
    this.receiptSummarySection = page.locator('[data-testid="receipt-summary-section"]');
    this.summaryServiciosInPool = page.locator('[data-testid="summary-servicios-in-pool"]');
    this.summaryServiciosInPoolGranel = page.locator('[data-testid="summary-servicios-in-pool-granel"]');
    this.summaryServiciosAdicionales = page.locator('[data-testid="summary-servicios-adicionales"]');
    this.summaryTraficoLocal = page.locator('[data-testid="summary-trafico-local"]');
    this.summaryLDI = page.locator('[data-testid="summary-ldi"]');
    this.summaryRoaming = page.locator('[data-testid="summary-roaming"]');
    this.summaryCargosMes = page.locator('[data-testid="summary-cargos-mes"]');
    this.summaryIGV = page.locator('[data-testid="summary-igv"]');
    this.summaryTotal = page.locator('[data-testid="summary-total"]');
    
    this.serviciosAdicionalesSection = page.locator('[data-testid="servicios-adicionales-section"]');
    this.nonSoldConsumptionDetails = page.locator('[data-testid="non-sold-consumption-details"]');
    
    this.detalleTraficoSection = page.locator('[data-testid="detalle-trafico-section"]');
    this.planColumnHeader = page.locator('[data-testid="detalle-trafico-plan-column"]');
    this.planColumnValues = page.locator('[data-testid="detalle-trafico-table"] [data-testid="plan-value"]');
    
    this.detalleTraficoSOLDSection = page.locator('[data-testid="detalle-trafico-sold-section"]');
    this.inPoolConsumption = page.locator('[data-testid="in-pool-consumption"]');
    this.bolsaAsignada = page.locator('[data-testid="bolsa-asignada"]');
    this.excedenteConsumo = page.locator('[data-testid="excedente-consumo"]');
    
    this.ldiSection = page.locator('[data-testid="ldi-section"]');
    this.ldiTrafficDetails = page.locator('[data-testid="ldi-traffic-details"]');
    
    this.roamingSection = page.locator('[data-testid="roaming-section"]');
    this.roamingTrafficDetails = page.locator('[data-testid="roaming-traffic-details"]');
  }

  async verifyBillingCycleCompleted() {
    await expect(this.billingCycleIndicator).toBeVisible();
    const status = await this.billingCycleIndicator.textContent();
    return status.includes('Completado') || status.includes('Completed');
  }

  async verifyInPoolShellExecuted() {
    await expect(this.inPoolShellStatus).toBeVisible();
    const status = await this.inPoolShellStatus.textContent();
    return status.includes('Ejecutado') || status.includes('Executed');
  }

  async navigateToConsolidatedInvoice() {
    await this.consolidatedInvoiceLink.click();
  }

  async waitForInvoiceToLoad() {
    await this.invoiceContainer.waitFor({ state: 'visible', timeout: 30000 });
  }

  async isReceiptSummarySectionVisible() {
    return await this.receiptSummarySection.isVisible();
  }

  async isServiciosInPoolItemVisible() {
    return await this.summaryServiciosInPool.isVisible();
  }

  async isServiciosInPoolGranelItemVisible() {
    return await this.summaryServiciosInPoolGranel.isVisible();
  }

  async isServiciosAdicionalesItemVisible() {
    return await this.summaryServiciosAdicionales.isVisible();
  }

  async isTraficoLocalItemVisible() {
    return await this.summaryTraficoLocal.isVisible();
  }

  async isLDIItemVisible() {
    return await this.summaryLDI.isVisible();
  }

  async isRoamingItemVisible() {
    return await this.summaryRoaming.isVisible();
  }

  async isCargosMesItemVisible() {
    return await this.summaryCargosMes.isVisible();
  }

  async isIGVItemVisible() {
    return await this.summaryIGV.isVisible();
  }

  async isTotalItemVisible() {
    return await this.summaryTotal.isVisible();
  }

  async isServiciosAdicionalesSectionVisible() {
    return await this.serviciosAdicionalesSection.isVisible();
  }

  async hasNonSoldPlanConsumptionDetails() {
    return await this.nonSoldConsumptionDetails.isVisible();
  }

  async isDetalleTraficoSectionVisible() {
    return await this.detalleTraficoSection.isVisible();
  }

  async hasPlanColumnInDetalleTrafico() {
    const headerVisible = await this.planColumnHeader.isVisible();
    if (!headerVisible) return false;
    const valuesCount = await this.planColumnValues.count();
    return valuesCount > 0;
  }

  async isDetalleTraficoSOLDSectionVisible() {
    return await this.detalleTraficoSOLDSection.isVisible();
  }

  async hasInPoolTelemetryConsumption() {
    const consumptionVisible = await this.inPoolConsumption.isVisible();
    const bolsaVisible = await this.bolsaAsignada.isVisible();
    return consumptionVisible && bolsaVisible;
  }

  async isLDISectionVisible() {
    return await this.ldiSection.isVisible();
  }

  async hasLDITrafficDetails() {
    return await this.ldiTrafficDetails.isVisible();
  }

  async isRoamingSectionVisible() {
    return await this.roamingSection.isVisible();
  }

  async hasRoamingTrafficDetails() {
    return await this.roamingTrafficDetails.isVisible();
  }

  async getReceiptSummaryItemAmount(itemLocator) {
    const amountElement = itemLocator.locator('[data-testid="amount"]');
    return await amountElement.textContent();
  }

  async getPlanValuesFromDetalleTrafico() {
    const values = [];
    const count = await this.planColumnValues.count();
    for (let i = 0; i < count; i++) {
      values.push(await this.planColumnValues.nth(i).textContent());
    }
    return values;
  }
}

module.exports = GMInvoicePage;