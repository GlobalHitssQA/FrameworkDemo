const { expect } = require('@playwright/test');

class PlanTransitionPage {
  constructor(page) {
    this.page = page;
    
    this.planManagementSection = page.locator('[data-testid="plan-management-section"]');
    this.lineSearchInput = page.locator('[data-testid="line-search-input"]');
    this.lineDetailsPanel = page.locator('[data-testid="line-details-panel"]');
    this.currentPlanLabel = page.locator('[data-testid="current-plan-label"]');
    this.voiceAllowanceValue = page.locator('[data-testid="voice-allowance-value"]');
    this.smsAllowanceValue = page.locator('[data-testid="sms-allowance-value"]');
    this.dataAllowanceValue = page.locator('[data-testid="data-allowance-value"]');
    this.apnStatusIndicator = page.locator('[data-testid="apn-status-indicator"]');
    this.lineSelectionCheckbox = page.locator('[data-testid="line-selection-checkbox"]');
    this.planChangeButton = page.locator('[data-testid="plan-change-button"]');
    this.planChangeDialog = page.locator('[data-testid="plan-change-dialog"]');
    this.targetPlanDropdown = page.locator('[data-testid="target-plan-dropdown"]');
    this.confirmChangeButton = page.locator('[data-testid="confirm-change-button"]');
    this.changeStatusMessage = page.locator('[data-testid="change-status-message"]');
    this.currentRatePlanValue = page.locator('[data-testid="current-rateplan-value"]');
    this.executionDateValue = page.locator('[data-testid="execution-date-value"]');
    this.activationStatusIndicator = page.locator('[data-testid="activation-status-indicator"]');
    this.inPoolPackageSection = page.locator('[data-testid="in-pool-package-section"]');
    this.inPoolStatusIndicator = page.locator('[data-testid="in-pool-status-indicator"]');
    this.inPoolMBValue = page.locator('[data-testid="in-pool-mb-value"]');
    this.inPoolAPNsList = page.locator('[data-testid="in-pool-apns-list"]');
    this.trafficConfigSection = page.locator('[data-testid="traffic-config-section"]');
    this.bulkTrafficIndicator = page.locator('[data-testid="bulk-traffic-indicator"]');
    this.volteStatusIndicator = page.locator('[data-testid="volte-status-indicator"]');
    this.instantLinkSection = page.locator('[data-testid="instant-link-section"]');
    this.instantLinkRatePlan = page.locator('[data-testid="instant-link-rateplan"]');
    this.instantLinkServiceVoLTE = page.locator('[data-testid="instant-link-service-volte"]');
    this.instantLinkProvisionStatus = page.locator('[data-testid="instant-link-provision-status"]');
    this.inPoolAssignmentSection = page.locator('[data-testid="in-pool-assignment-section"]');
    this.automaticAssignmentIndicator = page.locator('[data-testid="automatic-assignment-indicator"]');
  }

  async navigateToPlanManagement() {
    await this.planManagementSection.waitFor({ state: 'visible' });
  }

  async getLinePlanDetails() {
    const planName = await this.currentPlanLabel.textContent();
    const voiceMinutes = parseInt(await this.voiceAllowanceValue.textContent(), 10);
    const smsCount = parseInt(await this.smsAllowanceValue.textContent(), 10);
    const dataGB = parseInt(await this.dataAllowanceValue.textContent(), 10);
    return { planName: planName.trim(), voiceMinutes, smsCount, dataGB };
  }

  async getAPNStatus() {
    const statusText = await this.apnStatusIndicator.textContent();
    return { productiveAPNsEnabled: statusText.includes('Enabled') || statusText.includes('Active') };
  }

  async selectLine() {
    await this.lineSelectionCheckbox.click();
  }

  async openPlanChangeDialog() {
    await this.planChangeButton.click();
    await this.planChangeDialog.waitFor({ state: 'visible' });
  }

  async selectTargetPlan(planName) {
    await this.targetPlanDropdown.click();
    await this.page.locator(`[data-testid="plan-option-${planName.toLowerCase()}"]`).click();
  }

  async confirmPlanChange() {
    await this.confirmChangeButton.click();
    await this.changeStatusMessage.waitFor({ state: 'visible' });
  }

  async getPlanChangeStatus() {
    const statusText = await this.changeStatusMessage.textContent();
    return { processed: statusText.includes('Success') || statusText.includes('Processed') };
  }

  async getCurrentRatePlan() {
    const ratePlan = await this.currentRatePlanValue.textContent();
    return ratePlan.trim();
  }

  async getPlanChangeExecutionDate() {
    const dateText = await this.executionDateValue.textContent();
    return dateText.trim();
  }

  async getPlanActivationStatus() {
    const statusText = await this.activationStatusIndicator.textContent();
    return {
      immediateActivation: statusText.includes('Immediate') || statusText.includes('Active'),
      waitingForBillingCycle: statusText.includes('Pending') || statusText.includes('Billing')
    };
  }

  async getLineAllowances() {
    const voiceText = await this.voiceAllowanceValue.textContent();
    const smsText = await this.smsAllowanceValue.textContent();
    const dataText = await this.dataAllowanceValue.textContent();
    return {
      voiceMinutes: parseInt(voiceText, 10) || 0,
      smsCount: parseInt(smsText, 10) || 0,
      dataGB: parseInt(dataText, 10) || 0
    };
  }

  async getInPoolPackageDetails() {
    const activated = await this.inPoolStatusIndicator.textContent();
    const mbValue = await this.inPoolMBValue.textContent();
    const apnsText = await this.inPoolAPNsList.textContent();
    const apns = apnsText.split(',').map(apn => apn.trim());
    return {
      activated: activated.includes('Active') || activated.includes('Enabled'),
      mbAmount: parseInt(mbValue, 10),
      apns: apns
    };
  }

  async getTrafficConfiguration() {
    const bulkText = await this.bulkTrafficIndicator.textContent();
    const inPoolAPNsText = await this.inPoolAPNsList.textContent();
    return {
      bulkTrafficEnabled: bulkText.includes('Enabled') || bulkText.includes('Active'),
      inPoolAPNs: inPoolAPNsText.split(',').map(apn => apn.trim())
    };
  }

  async getVoLTEStatus() {
    const volteText = await this.volteStatusIndicator.textContent();
    return { enabled: volteText.includes('Enabled') || volteText.includes('Active') };
  }

  async getInstantLinkProvisionStatus() {
    const ratePlan = await this.instantLinkRatePlan.textContent();
    const serviceVoLTE = await this.instantLinkServiceVoLTE.textContent();
    const provisionStatus = await this.instantLinkProvisionStatus.textContent();
    return {
      ratePlan: ratePlan.trim(),
      serviceVoLTE: serviceVoLTE.includes('Enabled') || serviceVoLTE.includes('Active'),
      provisionedCorrectly: provisionStatus.includes('Success') || provisionStatus.includes('Complete')
    };
  }

  async getInPoolAssignmentDetails() {
    const assignmentText = await this.automaticAssignmentIndicator.textContent();
    return {
      automaticAssignment: assignmentText.includes('Automatic') || assignmentText.includes('Auto'),
      manualIntervention: assignmentText.includes('Manual')
    };
  }
}

module.exports = PlanTransitionPage;