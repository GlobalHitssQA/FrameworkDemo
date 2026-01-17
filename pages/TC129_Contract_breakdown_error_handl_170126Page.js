const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Contract Value Component
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupCloseButton = '[data-testid="breakdown-popup-close"]';
    
    // Locators - Error Messages
    this.errorMessageContainer = '[data-testid="error-message-container"]';
    this.errorMessageText = '[data-testid="error-message-text"]';
    this.errorDismissButton = '[data-testid="error-dismiss-button"]';
    this.retryButton = '[data-testid="retry-button"]';
    
    // Locators - Loading States
    this.loadingIndicator = '[data-testid="loading-indicator"]';
    
    // Technical patterns to detect in error messages
    this.technicalPatterns = [
      /stack\s*trace/i,
      /exception/i,
      /error\s*code:\s*\d{3,}/i,
      /null\s*pointer/i,
      /undefined/i,
      /at\s+\w+\s*\(/i,
      /\.(js|ts|java|py):\d+/i,
      /HTTP\s*\d{3}/i,
      /500|502|503|504/,
      /internal\s*server\s*error/i
    ];
    
    // Spanish action keywords
    this.spanishActionKeywords = [
      'intente',
      'intentar',
      'nuevamente',
      'reintentar',
      'actualice',
      'actualizar',
      'contacte',
      'contactar',
      'espere',
      'esperar',
      'vuelva',
      'volver'
    ];
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 30000 });
  }

  async setupErrorSimulationEnvironment() {
    await this.page.evaluate(() => {
      window.__errorSimulation = {
        enabled: true,
        errorType: null
      };
    });
  }

  async simulateBackendServiceError() {
    await this.page.route('**/api/contract/breakdown**', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await this.page.evaluate(() => {
      window.__errorSimulation.errorType = 'backend_error';
    });
  }

  async simulateTimeoutError() {
    await this.page.route('**/api/contract/breakdown**', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 60000));
      route.abort('timedout');
    });
    
    await this.page.evaluate(() => {
      window.__errorSimulation.errorType = 'timeout';
    });
  }

  async isServiceErrorDetected() {
    const errorSimulation = await this.page.evaluate(() => window.__errorSimulation);
    return errorSimulation && errorSimulation.errorType !== null;
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForTimeout(1000);
  }

  async isErrorMessageVisible() {
    try {
      await this.page.waitForSelector(this.errorMessageContainer, { state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorMessageContent() {
    const errorElement = await this.page.waitForSelector(this.errorMessageText, { state: 'visible', timeout: 5000 });
    return await errorElement.textContent();
  }

  messageContainsTechnicalDetails(message) {
    return this.technicalPatterns.some(pattern => pattern.test(message));
  }

  isMessageInSpanish(message) {
    const spanishIndicators = [
      'no se pudo',
      'por favor',
      'intente',
      'error',
      'carga',
      'información',
      'desglose',
      'tiempo',
      'esperado',
      'nuevamente'
    ];
    const lowerMessage = message.toLowerCase();
    return spanishIndicators.some(indicator => lowerMessage.includes(indicator));
  }

  messageSuggestsAction(message) {
    const lowerMessage = message.toLowerCase();
    return this.spanishActionKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  isTimeoutRelatedMessage(message) {
    const timeoutIndicators = [
      'tiempo',
      'tomando más',
      'tardando',
      'demora',
      'espera',
      'carga'
    ];
    const lowerMessage = message.toLowerCase();
    return timeoutIndicators.some(indicator => lowerMessage.includes(indicator));
  }

  async dismissErrorMessage() {
    const dismissButton = await this.page.$(this.errorDismissButton);
    if (dismissButton) {
      await dismissButton.click();
    } else {
      const closeButton = await this.page.$(this.breakdownPopupCloseButton);
      if (closeButton) {
        await closeButton.click();
      }
    }
    await this.page.waitForTimeout(500);
  }

  async canRetryBreakdownOperation() {
    const totalValueComponent = await this.page.$(this.totalContractValueComponent);
    if (!totalValueComponent) {
      return false;
    }
    const isEnabled = await totalValueComponent.isEnabled();
    const isVisible = await totalValueComponent.isVisible();
    return isEnabled && isVisible;
  }

  async isBreakdownPopupVisible() {
    try {
      await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async closeBreakdownPopup() {
    const closeButton = await this.page.$(this.breakdownPopupCloseButton);
    if (closeButton) {
      await closeButton.click();
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    }
  }
}

module.exports = ContractBreakdownPage;