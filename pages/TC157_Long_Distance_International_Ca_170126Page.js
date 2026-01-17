class LDIRoutingPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningSystemUrl = '/provisioning';
    this.bscs7TariffUrl = '/bscs7/tariffs';
    this.redLogsUrl = '/red/logs';
    this.invoiceUrl = '/billing/invoice';
    
    this.btnProvisionLine = '[data-testid="btn-provision-line"]';
    this.selectRatePlan = '[data-testid="select-rateplan"]';
    this.optionLifeCycleManufacture = '[data-testid="option-rateplan-manufacture"]';
    this.optionLifeCycleSold = '[data-testid="option-rateplan-sold"]';
    this.optionPurgedRatePlan = '[data-testid="option-rateplan-purged"]';
    this.chkVoiceService = '[data-testid="chk-voice-service"]';
    this.chkLDIService = '[data-testid="chk-ldi-service"]';
    this.btnConfirmProvisioning = '[data-testid="btn-confirm-provisioning"]';
    this.lblProvisioningStatus = '[data-testid="lbl-provisioning-status"]';
    this.lblVoiceCapability = '[data-testid="lbl-voice-capability"]';
    
    this.lblREDSystemStatus = '[data-testid="lbl-red-system-status"]';
    this.btnInitiateCall = '[data-testid="btn-initiate-call"]';
    this.inputInternationalNumber = '[data-testid="input-international-number"]';
    this.btnConnectCall = '[data-testid="btn-connect-call"]';
    this.lblCallStatus = '[data-testid="lbl-call-status"]';
    
    this.tblREDLogs = '[data-testid="tbl-red-logs"]';
    this.lblRoutingStatus = '[data-testid="lbl-routing-status"]';
    this.lblAppliedTariff = '[data-testid="lbl-applied-tariff"]';
    this.lblDestinationCountry = '[data-testid="lbl-destination-country"]';
    
    this.sectionLDITraffic = '[data-testid="section-ldi-traffic"]';
    this.tblLDICallDetails = '[data-testid="tbl-ldi-call-details"]';
    this.lblCallDuration = '[data-testid="lbl-call-duration"]';
    this.lblCallDestination = '[data-testid="lbl-call-destination"]';
    this.lblCallAmount = '[data-testid="lbl-call-amount"]';
    this.lblTariffPerMinute = '[data-testid="lbl-tariff-per-minute"]';
    
    this.selectLineForCall = '[data-testid="select-line-for-call"]';
    this.lblCallBlockedMessage = '[data-testid="lbl-call-blocked-message"]';
    this.lblLineStatus = '[data-testid="lbl-line-status"]';
    
    this.tblBSCS7Tariffs = '[data-testid="tbl-bscs7-tariffs"]';
    this.lblLDITariffStatus = '[data-testid="lbl-ldi-tariff-status"]';
  }

  async navigateToProvisioningSystem() {
    await this.page.goto(this.provisioningSystemUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async provisionGMLineWithVoiceService() {
    await this.page.click(this.btnProvisionLine);
    await this.page.click(this.selectRatePlan);
    await this.page.click(this.optionLifeCycleManufacture);
    await this.page.check(this.chkVoiceService);
    await this.page.check(this.chkLDIService);
    await this.page.click(this.btnConfirmProvisioning);
    await this.page.waitForSelector(this.lblProvisioningStatus);
  }

  async verifyLineProvisionedWithVoiceCapability() {
    const status = await this.page.textContent(this.lblProvisioningStatus);
    const voiceCapability = await this.page.textContent(this.lblVoiceCapability);
    return status.includes('Provisioned') && voiceCapability.includes('Enabled');
  }

  async verifyREDSystemOperational() {
    const systemStatus = await this.page.textContent(this.lblREDSystemStatus);
    return systemStatus.includes('Operational');
  }

  async navigateToBSCS7TariffConfiguration() {
    await this.page.goto(this.bscs7TariffUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLDITariffsConfigured() {
    const tariffStatus = await this.page.textContent(this.lblLDITariffStatus);
    return tariffStatus.includes('Configured');
  }

  async initiateLDICall() {
    await this.page.click(this.btnInitiateCall);
    await this.page.fill(this.inputInternationalNumber, '+1234567890');
    await this.page.click(this.btnConnectCall);
    await this.page.waitForSelector(this.lblCallStatus);
  }

  async verifyCallEstablishedInRED() {
    const callStatus = await this.page.textContent(this.lblCallStatus);
    return callStatus.includes('Connected') || callStatus.includes('Established');
  }

  async navigateToREDLogs() {
    await this.page.goto(this.redLogsUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTariffApplied(expectedTariff) {
    const appliedTariff = await this.page.textContent(this.lblAppliedTariff);
    return appliedTariff.includes(expectedTariff);
  }

  async navigateToMonthlyInvoice() {
    await this.page.goto(this.invoiceUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCallInLDITrafficSection() {
    const sectionVisible = await this.page.isVisible(this.sectionLDITraffic);
    const tableVisible = await this.page.isVisible(this.tblLDICallDetails);
    return sectionVisible && tableVisible;
  }

  async verifyInvoiceCallDetails() {
    const duration = await this.page.textContent(this.lblCallDuration);
    const destination = await this.page.textContent(this.lblCallDestination);
    const amount = await this.page.textContent(this.lblCallAmount);
    const tariff = await this.page.textContent(this.lblTariffPerMinute);
    return duration.length > 0 && destination.length > 0 && amount.includes('0.07') && tariff.includes('0.07');
  }

  async selectPurgedRatePlanLine() {
    await this.page.click(this.selectLineForCall);
    await this.page.click(this.optionPurgedRatePlan);
  }

  async attemptLDICallFromPurgedLine() {
    await this.page.click(this.btnInitiateCall);
    await this.page.fill(this.inputInternationalNumber, '+1234567890');
    await this.page.click(this.btnConnectCall);
  }

  async verifyCallBlockedForPurgedLine() {
    const blockedMessage = await this.page.isVisible(this.lblCallBlockedMessage);
    const lineStatus = await this.page.textContent(this.lblLineStatus);
    return blockedMessage || lineStatus.includes('PURGED') || lineStatus.includes('Blocked');
  }
}

module.exports = LDIRoutingPage;