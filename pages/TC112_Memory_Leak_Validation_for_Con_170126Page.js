const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators for contract breakdown component
    this.contractTotalValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownTriggerButton = '[data-testid="breakdown-trigger"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.clientSearchInput = '[data-testid="client-search-input"]';
    this.searchLupa = '[data-testid="search-lupa-icon"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.monetaryValueFields = '[data-testid="monetary-value"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Breakdown category items
    this.poderCompraMxn = '[data-testid="poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="pendientes-liquidar"]';
    this.fondos = '[data-testid="fondos"]';
    this.cedesPagares = '[data-testid="cedes-pagares"]';
    this.mercadoDinero = '[data-testid="mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="mercado-capitales"]';
  }

  async navigateToApplication() {
    // URL should be configured in environment variables or config file
    const baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    await this.page.goto(baseUrl);
  }

  async waitForContractComponentToLoad() {
    await this.page.waitForSelector(this.contractTotalValueComponent, { state: 'visible', timeout: 30000 });
  }

  async enablePerformanceMonitoring() {
    // Create CDP session for performance monitoring
    this.cdpSession = await this.page.context().newCDPSession(this.page);
    await this.cdpSession.send('Performance.enable');
  }

  async getCurrentMemoryUsage() {
    const metrics = await this.page.evaluate(() => {
      if (window.performance && window.performance.memory) {
        return window.performance.memory.usedJSHeapSize;
      }
      return null;
    });
    
    if (metrics === null) {
      // Fallback using CDP if performance.memory is not available
      const result = await this.cdpSession.send('Performance.getMetrics');
      const jsHeapMetric = result.metrics.find(m => m.name === 'JSHeapUsedSize');
      return jsHeapMetric ? jsHeapMetric.value : 0;
    }
    
    return metrics;
  }

  async forceGarbageCollection() {
    try {
      await this.cdpSession.send('HeapProfiler.collectGarbage');
    } catch (error) {
      // If CDP garbage collection fails, attempt via evaluate
      await this.page.evaluate(() => {
        if (window.gc) {
          window.gc();
        }
      });
    }
    // Wait for GC to complete
    await this.page.waitForTimeout(500);
  }

  async waitForMemoryStabilization() {
    // Wait for memory to stabilize after GC
    await this.page.waitForTimeout(2000);
  }

  async ensureBreakdownComponentIsClosed() {
    const isPopupVisible = await this.page.isVisible(this.breakdownPopup);
    if (isPopupVisible) {
      await this.closeBreakdownComponent();
      await this.waitForBreakdownPopupToBeHidden();
    }
  }

  async openBreakdownComponent() {
    await this.page.click(this.breakdownTriggerButton);
  }

  async closeBreakdownComponent() {
    await this.page.click(this.breakdownCloseButton);
  }

  async waitForBreakdownPopupToBeVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async waitForBreakdownPopupToBeHidden() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.contractTotalValueComponent);
  }

  async clickSearchLupa() {
    await this.page.click(this.searchLupa);
  }

  async searchClient(searchTerm) {
    await this.page.fill(this.clientSearchInput, searchTerm);
    await this.clickSearchLupa();
  }

  async getBreakdownItemsCount() {
    const items = await this.page.$$(this.breakdownItemsList + ' > *');
    return items.length;
  }

  async isDistributionTooltipVisible() {
    return await this.page.isVisible(this.distributionTooltip);
  }
};

module.exports = ContractBreakdownPage;