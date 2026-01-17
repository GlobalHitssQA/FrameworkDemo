const { expect } = require('@playwright/test');

class ContractEncryptionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Locators for UI elements
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractCompositionPopup = '[data-testid="contract-composition-popup"]';
    this.searchClientInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractBreakdownList = '[data-testid="contract-breakdown-list"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this.monetaryValueFields = '[data-testid="monetary-value"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    this.loginUsernameInput = '#username';
    this.loginPasswordInput = '#password';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.activeContractIndicator = '[data-testid="active-contract-indicator"]';
    
    // Network request patterns to monitor
    this.contractDataEndpoints = [
      '/api/contract/value',
      '/api/contract/composition',
      '/api/contract/breakdown',
      '/api/client/contract'
    ];
    
    this.capturedRequests = [];
  }

  async setupNetworkInterception() {
    const requests = [];
    
    await this.page.route('**/*', async (route) => {
      const request = route.request();
      const url = request.url();
      
      const requestInfo = {
        url: url,
        protocol: new URL(url).protocol,
        method: request.method(),
        headers: request.headers(),
        isSecure: url.startsWith('https://'),
        containsContractData: this.contractDataEndpoints.some(endpoint => url.includes(endpoint)),
        timestamp: new Date().toISOString()
      };
      
      requests.push(requestInfo);
      await route.continue();
    });
    
    this.capturedRequests = requests;
    return requests;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });
  }

  async performAuthentication() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveContractExists() {
    await this.page.waitForSelector(this.activeContractIndicator, { timeout: 10000 });
    const isVisible = await this.page.isVisible(this.activeContractIndicator);
    expect(isVisible).toBe(true);
  }

  async accessContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { timeout: 10000 });
    await this.page.click(this.contractValueComponent);
  }

  async waitForBackendCalls() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async verifyAllRequestsUseHTTPS(requests) {
    const contractRelatedRequests = requests.filter(req => req.containsContractData);
    
    if (contractRelatedRequests.length === 0) {
      console.warn('No contract-related requests captured. Verifying all requests use HTTPS.');
      return requests.every(req => req.isSecure);
    }
    
    const allSecure = contractRelatedRequests.every(req => {
      const isHttps = req.protocol === 'https:';
      if (!isHttps) {
        console.error(`Insecure request detected: ${req.url}`);
      }
      return isHttps;
    });
    
    return allSecure;
  }

  async checkForUnencryptedTransmissions(requests) {
    const unencryptedContractRequests = requests.filter(req => 
      !req.isSecure && req.containsContractData
    );
    
    if (unencryptedContractRequests.length > 0) {
      console.error('Unencrypted contract data transmissions detected:');
      unencryptedContractRequests.forEach(req => {
        console.error(`  - ${req.method} ${req.url}`);
      });
      return true;
    }
    
    return false;
  }

  async verifyDataEncryption(requests) {
    const secureRequests = requests.filter(req => req.isSecure && req.containsContractData);
    
    const allEncrypted = secureRequests.every(req => {
      const hasSecurityHeaders = 
        req.headers['strict-transport-security'] || 
        req.url.startsWith('https://');
      return hasSecurityHeaders;
    });
    
    return allEncrypted;
  }

  async getContractValueComponentText() {
    await this.page.waitForSelector(this.contractValueComponent);
    return await this.page.textContent(this.contractValueComponent);
  }

  async isContractCompositionPopupVisible() {
    return await this.page.isVisible(this.contractCompositionPopup);
  }

  async closeCompositionPopup() {
    await this.page.click(this.closeBreakdownButton);
  }
}

module.exports = ContractEncryptionPage;