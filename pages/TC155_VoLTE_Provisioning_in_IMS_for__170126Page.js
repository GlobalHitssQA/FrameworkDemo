const { expect } = require('@playwright/test');

class InstantLinkPage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = '[data-testid="instant-link-username"]';
    this.loginPasswordInput = '[data-testid="instant-link-password"]';
    this.loginButton = '[data-testid="instant-link-login-btn"]';
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.imsConnectivityStatus = '[data-testid="ims-connectivity-status"]';
    this.imsInfrastructureStatus = '[data-testid="ims-infrastructure-status"]';
    this.ratePlanDropdown = '[data-testid="rateplan-dropdown"]';
    this.volteEnabledOption = '[data-testid="rateplan-volte-enabled"]';
    this.purgedRatePlanOption = '[data-testid="rateplan-purged"]';
    this.provisioningButton = '[data-testid="execute-provisioning-btn"]';
    this.provisioningStatusMessage = '[data-testid="provisioning-status-message"]';
    this.imsLogsSection = '[data-testid="ims-logs-section"]';
    this.imsLogTimestamp = '[data-testid="ims-log-timestamp"]';
    this.imsLogLineData = '[data-testid="ims-log-line-data"]';
    this.imsLogRequestType = '[data-testid="ims-log-request-type"]';
    this.volteParametersSection = '[data-testid="volte-parameters-section"]';
    this.volteServiceProfileStatus = '[data-testid="volte-service-profile-status"]';
    this.volteCodecsConfig = '[data-testid="volte-codecs-config"]';
    this.volteQoSPriorities = '[data-testid="volte-qos-priorities"]';
    this.volteCallPolicies = '[data-testid="volte-call-policies"]';
    this.initiateCallButton = '[data-testid="initiate-volte-call-btn"]';
    this.callStatusIndicator = '[data-testid="call-status-indicator"]';
    this.callTechnologyType = '[data-testid="call-technology-type"]';
    this.callVoiceQuality = '[data-testid="call-voice-quality"]';
    this.imsCallLogsSection = '[data-testid="ims-call-logs-section"]';
    this.queryParametersButton = '[data-testid="query-volte-parameters-btn"]';
    this.gmLineSelector = '[data-testid="gm-line-selector"]';
  }

  async navigateToInstantLink() {
    await this.page.goto(process.env.INSTANT_LINK_URL || 'https://instantlink.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineIsActive() {
    const statusElement = this.page.locator(this.lineStatusIndicator);
    await statusElement.waitFor({ state: 'visible' });
    const status = await statusElement.textContent();
    return status.toLowerCase().includes('active');
  }

  async checkIMSConnectivity() {
    const connectivityElement = this.page.locator(this.imsConnectivityStatus);
    await connectivityElement.waitFor({ state: 'visible' });
    const status = await connectivityElement.textContent();
    return status.toLowerCase().includes('connected');
  }

  async verifyIMSInfrastructureStatus() {
    const infrastructureElement = this.page.locator(this.imsInfrastructureStatus);
    await infrastructureElement.waitFor({ state: 'visible' });
    const status = await infrastructureElement.textContent();
    return status.toLowerCase().includes('operational') ? 'operational' : 'unavailable';
  }

  async selectRatePlanWithVoLTE() {
    await this.page.locator(this.ratePlanDropdown).click();
    await this.page.locator(this.volteEnabledOption).click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectPurgedRatePlan() {
    await this.page.locator(this.ratePlanDropdown).click();
    await this.page.locator(this.purgedRatePlanOption).click();
    await this.page.waitForLoadState('networkidle');
  }

  async executeProvisioningRequest() {
    await this.page.locator(this.provisioningButton).click();
    await this.page.waitForLoadState('networkidle');
    const statusMessage = await this.page.locator(this.provisioningStatusMessage).textContent();
    return {
      success: statusMessage.toLowerCase().includes('success'),
      volteParametersIncluded: statusMessage.toLowerCase().includes('volte')
    };
  }

  async verifyProvisioningRequestSent() {
    const statusElement = this.page.locator(this.provisioningStatusMessage);
    await statusElement.waitFor({ state: 'visible' });
    const message = await statusElement.textContent();
    return message.toLowerCase().includes('sent') || message.toLowerCase().includes('success');
  }

  async getIMSProvisioningLogs() {
    await this.page.locator(this.imsLogsSection).waitFor({ state: 'visible' });
    const timestamp = await this.page.locator(this.imsLogTimestamp).textContent();
    const lineData = await this.page.locator(this.imsLogLineData).textContent();
    const requestType = await this.page.locator(this.imsLogRequestType).textContent();
    return {
      timestamp: timestamp,
      lineData: lineData,
      requestType: requestType.toUpperCase().replace(/\s+/g, '_')
    };
  }

  async queryVoLTEParametersInIMS() {
    await this.page.locator(this.queryParametersButton).click();
    await this.page.locator(this.volteParametersSection).waitFor({ state: 'visible' });
    const serviceStatus = await this.page.locator(this.volteServiceProfileStatus).textContent();
    const codecs = await this.page.locator(this.volteCodecsConfig).textContent();
    const qosPriorities = await this.page.locator(this.volteQoSPriorities).textContent();
    const callPolicies = await this.page.locator(this.volteCallPolicies).textContent();
    return {
      serviceProfileEnabled: serviceStatus.toLowerCase().includes('enabled'),
      configurationStatus: serviceStatus.toLowerCase().includes('enabled') ? 'configured' : 'disabled',
      codecs: codecs || null,
      qosPriorities: qosPriorities || null,
      callPolicies: callPolicies || null
    };
  }

  async initiateVoLTETestCall() {
    await this.page.locator(this.initiateCallButton).click();
    await this.page.locator(this.callStatusIndicator).waitFor({ state: 'visible' });
    const callStatus = await this.page.locator(this.callStatusIndicator).textContent();
    const technology = await this.page.locator(this.callTechnologyType).textContent();
    const voiceQuality = await this.page.locator(this.callVoiceQuality).textContent();
    return {
      established: callStatus.toLowerCase().includes('established') || callStatus.toLowerCase().includes('connected'),
      technology: technology.toUpperCase(),
      viaIMS: technology.toLowerCase().includes('volte') || technology.toLowerCase().includes('ims'),
      voiceQuality: voiceQuality.toUpperCase()
    };
  }

  async getIMSCallLogs() {
    await this.page.locator(this.imsCallLogsSection).waitFor({ state: 'visible' });
    const logsContent = await this.page.locator(this.imsCallLogsSection).textContent();
    return {
      callRecorded: logsContent.length > 0
    };
  }

  async attemptVoLTECall() {
    try {
      await this.page.locator(this.initiateCallButton).click();
      await this.page.locator(this.callStatusIndicator).waitFor({ state: 'visible', timeout: 5000 });
      const callStatus = await this.page.locator(this.callStatusIndicator).textContent();
      if (callStatus.toLowerCase().includes('failed') || callStatus.toLowerCase().includes('disabled')) {
        return {
          canEstablish: false,
          reason: 'VoLTE_DISABLED'
        };
      }
      return {
        canEstablish: true,
        reason: null
      };
    } catch (error) {
      return {
        canEstablish: false,
        reason: 'VoLTE_DISABLED'
      };
    }
  }
}

module.exports = InstantLinkPage;