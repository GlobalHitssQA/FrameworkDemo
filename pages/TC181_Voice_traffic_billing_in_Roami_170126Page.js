const { expect } = require('@playwright/test');

class LifeCycleBillingPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.lineConfigurationMenu = '[data-testid="line-configuration-menu"]';
    this.trafficSimulationMenu = '[data-testid="traffic-simulation-menu"]';
    this.udrTableMenu = '[data-testid="udr-table-menu"]';
    this.billingProcessMenu = '[data-testid="billing-process-menu"]';
    this.consolidatedInvoiceMenu = '[data-testid="consolidated-invoice-menu"]';
    
    // Line configuration locators
    this.planSelector = '[data-testid="plan-selector"]';
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.provisioningStatus = '[data-testid="provisioning-status"]';
    this.configureLineButton = '[data-testid="configure-line-button"]';
    this.lineActiveStatus = '[data-testid="line-active-status"]';
    
    // Traffic simulation locators
    this.roamingModeToggle = '[data-testid="roaming-mode-toggle"]';
    this.voiceCallSimulationButton = '[data-testid="voice-call-simulation-button"]';
    this.simulationStatusMessage = '[data-testid="simulation-status-message"]';
    
    // UDR table locators
    this.udrTableContainer = '[data-testid="udr-lt-01-table"]';
    this.trafficRecordRows = '[data-testid="traffic-record-row"]';
    this.roamingTrafficIndicator = '[data-testid="roaming-traffic-indicator"]';
    
    // Billing process locators
    this.executeBillingButton = '[data-testid="execute-billing-button"]';
    this.billingStatusIndicator = '[data-testid="billing-status-indicator"]';
    this.billingCompletedMessage = '[data-testid="billing-completed-message"]';
    
    // Invoice locators
    this.roamingVoiceTrafficSection = '[data-testid="roaming-voice-traffic-section"]';
    this.trafficDetailSection = '[data-testid="traffic-detail-sold-section"]';
    this.appliedRateField = '[data-testid="applied-rate-field"]';
    this.totalAmountField = '[data-testid="total-amount-field"]';
    this.bulkRateIndicator = '[data-testid="bulk-rate-indicator"]';
    this.invoiceLineItems = '[data-testid="invoice-line-item"]';
    
    // Plan specific locators
    this.planOptions = {
      TESTING: '[data-testid="plan-option-testing"]',
      MANUFACTURE: '[data-testid="plan-option-manufacture"]',
      'UNSOLD NOT IN SHOWROOM': '[data-testid="plan-option-unsold-not-in-showroom"]',
      'UNSOLD SHOWROOM': '[data-testid="plan-option-unsold-showroom"]',
      SOLD: '[data-testid="plan-option-sold"]',
      DORMANT: '[data-testid="plan-option-dormant"]'
    };
  }

  async navigateToLineConfiguration() {
    await this.page.click(this.lineConfigurationMenu);
    await this.page.waitForSelector(this.planSelector);
  }

  async configureLineInPlan(planName) {
    await this.page.click(this.planSelector);
    const planOption = this.planOptions[planName];
    await this.page.click(planOption);
    await this.page.click(this.configureLineButton);
    await this.page.waitForSelector(this.lineStatusIndicator);
  }

  async verifyAllLinesActiveAndProvisioned() {
    const statusElements = await this.page.$$(this.lineActiveStatus);
    for (const element of statusElements) {
      const status = await element.textContent();
      if (!status.includes('Active')) {
        return false;
      }
    }
    const provisioningElements = await this.page.$$(this.provisioningStatus);
    for (const element of provisioningElements) {
      const status = await element.textContent();
      if (!status.includes('Provisioned')) {
        return false;
      }
    }
    return true;
  }

  async navigateToTrafficSimulation() {
    await this.page.click(this.trafficSimulationMenu);
    await this.page.waitForSelector(this.roamingModeToggle);
  }

  async simulateRoamingVoiceCalls() {
    await this.page.click(this.roamingModeToggle);
    await this.page.click(this.voiceCallSimulationButton);
    await this.page.waitForSelector(this.simulationStatusMessage);
  }

  async navigateToUDRTable() {
    await this.page.click(this.udrTableMenu);
    await this.page.waitForSelector(this.udrTableContainer);
  }

  async verifyTrafficRegisteredInUDR() {
    const trafficRows = await this.page.$$(this.trafficRecordRows);
    if (trafficRows.length === 0) {
      return false;
    }
    const roamingIndicators = await this.page.$$(this.roamingTrafficIndicator);
    return roamingIndicators.length > 0;
  }

  async navigateToBillingProcess() {
    await this.page.click(this.billingProcessMenu);
    await this.page.waitForSelector(this.executeBillingButton);
  }

  async executeBillingProcess() {
    await this.page.click(this.executeBillingButton);
    await this.page.waitForSelector(this.billingStatusIndicator);
  }

  async verifyBillingProcessCompleted() {
    const completedMessage = await this.page.$(this.billingCompletedMessage);
    return completedMessage !== null;
  }

  async getAppliedRoamingVoiceRate() {
    const rateText = await this.page.textContent(this.appliedRateField);
    const rateMatch = rateText.match(/([\d.]+)/);
    return rateMatch ? parseFloat(rateMatch[1]) : null;
  }

  async navigateToConsolidatedInvoice() {
    await this.page.click(this.consolidatedInvoiceMenu);
    await this.page.waitForSelector(this.roamingVoiceTrafficSection);
  }

  async isRoamingVoiceTrafficSectionVisible() {
    const section = await this.page.$(this.roamingVoiceTrafficSection);
    return section !== null && await section.isVisible();
  }

  async verifyInvoiceAmountCalculatedCorrectly() {
    const bulkRateIndicator = await this.page.$(this.bulkRateIndicator);
    if (!bulkRateIndicator) {
      return false;
    }
    const totalAmount = await this.page.textContent(this.totalAmountField);
    return totalAmount && parseFloat(totalAmount.replace(/[^\d.]/g, '')) > 0;
  }
}

module.exports = LifeCycleBillingPage;