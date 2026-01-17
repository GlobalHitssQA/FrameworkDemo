class SMSPlanPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningSection = '[data-testid="provisioning-section"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.planOptionUnsoldShowroom = '[data-testid="plan-option-unsold-showroom"]';
    this.provisionLineButton = '[data-testid="provision-line-button"]';
    this.planDetailsContainer = '[data-testid="plan-details-container"]';
    this.includedSMSField = '[data-testid="included-sms-value"]';
    this.includedVoiceField = '[data-testid="included-voice-value"]';
    this.includedDataField = '[data-testid="included-data-value"]';
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    
    this.smsSimulationSection = '[data-testid="sms-simulation-section"]';
    this.smsCountInput = '[data-testid="sms-count-input"]';
    this.sendSMSButton = '[data-testid="send-sms-button"]';
    this.consumedSMSDisplay = '[data-testid="consumed-sms-display"]';
    this.smsConfirmationMessage = '[data-testid="sms-confirmation-message"]';
    
    this.balanceSection = '[data-testid="balance-consultation-section"]';
    this.refreshBalanceButton = '[data-testid="refresh-balance-button"]';
    this.remainingSMSBalance = '[data-testid="remaining-sms-balance"]';
    this.totalIncludedSMS = '[data-testid="total-included-sms"]';
    this.balanceProgressBar = '[data-testid="sms-balance-progress"]';
    
    this.invoiceSection = '[data-testid="invoice-section"]';
    this.invoiceServicesInPool = '[data-testid="services-in-pool-section"]';
    this.invoiceTrafficDetail = '[data-testid="traffic-detail-section"]';
    this.smsChargesField = '[data-testid="sms-charges-amount"]';
    this.smsConsumedWithinIncluded = '[data-testid="sms-consumed-included"]';
    this.smsAdditionalCharges = '[data-testid="sms-additional-charges"]';
    this.invoicePlanField = '[data-testid="invoice-plan-name"]';
    
    this.navigationMenu = '[data-testid="main-navigation"]';
    this.provisioningMenuLink = '[data-testid="nav-provisioning"]';
    this.smsSimulationMenuLink = '[data-testid="nav-sms-simulation"]';
    this.balanceMenuLink = '[data-testid="nav-balance"]';
    this.invoiceMenuLink = '[data-testid="nav-invoice"]';
  }

  async navigateToProvisioning() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.provisioningMenuLink);
    await this.page.waitForSelector(this.provisioningSection);
  }

  async selectPlan(planName) {
    await this.page.click(this.planSelector);
    if (planName === 'UNSOLD - SHOWROOM') {
      await this.page.click(this.planOptionUnsoldShowroom);
    }
    await this.page.waitForSelector(this.planDetailsContainer);
  }

  async provisionLine() {
    await this.page.click(this.provisionLineButton);
    await this.page.waitForSelector(this.lineStatusIndicator);
  }

  async getPlanDetails() {
    const includedSMS = await this.page.textContent(this.includedSMSField);
    const includedVoice = await this.page.textContent(this.includedVoiceField);
    const includedData = await this.page.textContent(this.includedDataField);
    return {
      includedSMS: parseInt(includedSMS, 10),
      includedVoice: parseInt(includedVoice, 10),
      includedData: includedData
    };
  }

  async navigateToSMSSimulation() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.smsSimulationMenuLink);
    await this.page.waitForSelector(this.smsSimulationSection);
  }

  async simulateSMSSending(count) {
    await this.page.fill(this.smsCountInput, count.toString());
    await this.page.click(this.sendSMSButton);
    await this.page.waitForSelector(this.smsConfirmationMessage);
  }

  async getConsumedSMSCount() {
    const consumed = await this.page.textContent(this.consumedSMSDisplay);
    return parseInt(consumed, 10);
  }

  async navigateToBalanceConsultation() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.balanceMenuLink);
    await this.page.waitForSelector(this.balanceSection);
  }

  async refreshBalance() {
    await this.page.click(this.refreshBalanceButton);
    await this.page.waitForSelector(this.remainingSMSBalance);
  }

  async getRemainingSMSBalance() {
    const remaining = await this.page.textContent(this.remainingSMSBalance);
    return parseInt(remaining, 10);
  }

  async getTotalIncludedSMS() {
    const total = await this.page.textContent(this.totalIncludedSMS);
    return parseInt(total, 10);
  }

  async navigateToInvoice() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.invoiceMenuLink);
    await this.page.waitForSelector(this.invoiceSection);
  }

  async getSMSChargesFromInvoice() {
    const charges = await this.page.textContent(this.smsChargesField);
    return parseFloat(charges.replace(/[^0-9.-]/g, ''));
  }

  async getInvoiceSMSDetails() {
    const consumedWithinIncluded = await this.page.textContent(this.smsConsumedWithinIncluded);
    const additionalCharges = await this.page.textContent(this.smsAdditionalCharges);
    return {
      consumedWithinIncluded: parseInt(consumedWithinIncluded, 10),
      additionalCharges: parseFloat(additionalCharges.replace(/[^0-9.-]/g, ''))
    };
  }
}

module.exports = SMSPlanPage;