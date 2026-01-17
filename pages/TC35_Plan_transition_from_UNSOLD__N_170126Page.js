const { expect } = require('@playwright/test');

class PlanTransitionPage {
  constructor(page) {
    this.page = page;
    
    // BSCS7 Navigation and Search Locators
    this.bscs7Url = process.env.BSCS7_URL || 'https://bscs7.example.com';
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    
    // Plan Information Locators
    this.currentPlanLabel = '[data-testid="current-plan-label"]';
    this.planStatusLabel = '[data-testid="plan-status"]';
    this.activationDateLabel = '[data-testid="activation-date"]';
    
    // Included Services Locators
    this.voiceMinutesValue = '[data-testid="included-voice-minutes"]';
    this.smsCountValue = '[data-testid="included-sms-count"]';
    this.dataMBValue = '[data-testid="included-data-mb"]';
    this.dataGBValue = '[data-testid="included-data-gb"]';
    
    // APN and VoLTE Locators
    this.apnListContainer = '[data-testid="apn-list-container"]';
    this.apnItem = '[data-testid="apn-item"]';
    this.volteStatusIndicator = '[data-testid="volte-status"]';
    this.productiveApnsStatus = '[data-testid="productive-apns-status"]';
    
    // Plan Change Modal Locators
    this.changePlanButton = '[data-testid="change-plan-button"]';
    this.planChangeModal = '[data-testid="plan-change-modal"]';
    this.newPlanDropdown = '[data-testid="new-plan-dropdown"]';
    this.planOptionPrefix = '[data-testid="plan-option-';
    this.confirmChangeButton = '[data-testid="confirm-plan-change"]';
    this.confirmationMessage = '[data-testid="confirmation-message"]';
    
    // BSCS7 RATEPLAN Locators
    this.ratePlanValueBSCS7 = '[data-testid="bscs7-rateplan-value"]';
    
    // INSTANT LINK Locators
    this.instantLinkNavButton = '[data-testid="nav-instant-link"]';
    this.provisionedRatePlanValue = '[data-testid="provisioned-rateplan"]';
    this.serviceVolteStatus = '[data-testid="service-volte-status"]';
    this.apnAttributesNetworkStatus = '[data-testid="apn-attributes-network-status"]';
  }

  async navigateToBSCS7() {
    await this.page.goto(this.bscs7Url);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLine(lineNumber = process.env.TEST_LINE_NUMBER) {
    await this.page.fill(this.lineSearchInput, lineNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentPlan() {
    await this.page.waitForSelector(this.currentPlanLabel);
    return await this.page.textContent(this.currentPlanLabel);
  }

  async getIncludedServices() {
    const voiceMinutes = await this.page.textContent(this.voiceMinutesValue);
    const smsCount = await this.page.textContent(this.smsCountValue);
    let dataMB = null;
    let dataGB = null;
    
    if (await this.page.isVisible(this.dataMBValue)) {
      dataMB = await this.page.textContent(this.dataMBValue);
    }
    if (await this.page.isVisible(this.dataGBValue)) {
      dataGB = await this.page.textContent(this.dataGBValue);
    }
    
    return {
      voiceMinutes: parseInt(voiceMinutes, 10),
      smsCount: parseInt(smsCount, 10),
      dataMB: dataMB ? parseInt(dataMB, 10) : null,
      dataGB: dataGB ? parseInt(dataGB, 10) : null
    };
  }

  async areProductiveAPNsEnabled() {
    const status = await this.page.textContent(this.productiveApnsStatus);
    return status.toLowerCase().includes('enabled') || status.toLowerCase().includes('active');
  }

  async openChangePlanModal() {
    await this.page.click(this.changePlanButton);
    await this.page.waitForSelector(this.planChangeModal);
  }

  async selectNewPlan(planName) {
    await this.page.click(this.newPlanDropdown);
    const planSelector = `${this.planOptionPrefix}${planName.replace(/\s+/g, '-').toLowerCase()}"]`;
    await this.page.click(planSelector);
  }

  async confirmPlanChange() {
    await this.page.click(this.confirmChangeButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getConfirmationMessage() {
    await this.page.waitForSelector(this.confirmationMessage);
    return await this.page.textContent(this.confirmationMessage);
  }

  async getRatePlanInBSCS7() {
    await this.page.waitForSelector(this.ratePlanValueBSCS7);
    return await this.page.textContent(this.ratePlanValueBSCS7);
  }

  async getPlanActivationDate() {
    const dateText = await this.page.textContent(this.activationDateLabel);
    return dateText.trim();
  }

  async getPlanStatus() {
    return await this.page.textContent(this.planStatusLabel);
  }

  async getActiveAPNs() {
    const apnElements = await this.page.$$(this.apnItem);
    const apnList = [];
    for (const element of apnElements) {
      const apnName = await element.textContent();
      apnList.push(apnName.trim());
    }
    return apnList;
  }

  async isVoLTEEnabled() {
    const status = await this.page.textContent(this.volteStatusIndicator);
    return status.toLowerCase().includes('enabled') || status.toLowerCase().includes('active');
  }

  async navigateToInstantLink() {
    await this.page.click(this.instantLinkNavButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getProvisionedRatePlan() {
    await this.page.waitForSelector(this.provisionedRatePlanValue);
    return await this.page.textContent(this.provisionedRatePlanValue);
  }

  async isServiceVolteProvisioned() {
    const status = await this.page.textContent(this.serviceVolteStatus);
    return status.toLowerCase().includes('provisioned') || status.toLowerCase().includes('active');
  }

  async areAPNAttributesSentToNetwork() {
    const status = await this.page.textContent(this.apnAttributesNetworkStatus);
    return status.toLowerCase().includes('sent') || status.toLowerCase().includes('success');
  }
}

module.exports = PlanTransitionPage;