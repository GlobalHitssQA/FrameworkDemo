const { expect } = require('@playwright/test');

class ContractLoggingPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators for contract component
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.contractBreakdownTrigger = '[data-testid="contract-value-clickable"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.refreshButton = '[data-testid="refresh-contract-data"]';
    this.clientSearchInput = '[data-testid="client-search-input"]';
    this.searchMagnifier = '[data-testid="search-magnifier-icon"]';
    
    // Breakdown items locators
    this.purchasingPowerMXN = '[data-testid="breakdown-purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="breakdown-cash-mxn"]';
    this.cashUSD = '[data-testid="breakdown-cash-usd"]';
    this.pendingSettlement = '[data-testid="breakdown-pending-settlement"]';
    this.fundsItem = '[data-testid="breakdown-funds"]';
    this.cedesAndNotes = '[data-testid="breakdown-cedes-notes"]';
    this.moneyMarket = '[data-testid="breakdown-money-market"]';
    this.capitalMarket = '[data-testid="breakdown-capital-market"]';
    
    // Authentication locators
    this.userProfileIndicator = '[data-testid="user-profile-authenticated"]';
    this.dashboardContainer = '[data-testid="acticenter-dashboard"]';
    
    // Log storage
    this.capturedConsoleLogs = [];
    this.capturedNetworkLogs = [];
    
    // Sensitive data patterns
    this.sensitivePatterns = {
      monetaryValues: /\$[\d,]+\.\d{2}|\b\d{1,3}(,\d{3})+\.\d{2}\b|MXN\s*[\d,]+|USD\s*[\d,]+/gi,
      contractNumbers: /\b[A-Z]{2,4}[-]?\d{8,12}\b|\bcontrato?[:\s]*\d{6,}\b/gi,
      accountNumbers: /\b\d{10,18}\b/g,
      balances: /saldo[:\s]*[\d,\.]+|balance[:\s]*[\d,\.]+/gi,
      financialAmounts: /monto[:\s]*[\d,\.]+|amount[:\s]*[\d,\.]+|valor[:\s]*[\d,\.]+/gi
    };
  }

  async configureVerboseLogging() {
    await this.page.evaluate(() => {
      if (window.localStorage) {
        window.localStorage.setItem('LOG_LEVEL', 'DEBUG');
        window.localStorage.setItem('VERBOSE_LOGGING', 'true');
      }
      window.__originalConsoleLog = console.log;
      window.__originalConsoleDebug = console.debug;
      window.__originalConsoleInfo = console.info;
      window.__originalConsoleWarn = console.warn;
      window.__originalConsoleError = console.error;
      window.__capturedLogs = [];
      
      const captureLog = (level, args) => {
        window.__capturedLogs.push({
          level,
          message: Array.from(args).map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' '),
          timestamp: new Date().toISOString()
        });
      };
      
      console.log = function(...args) { captureLog('log', args); window.__originalConsoleLog.apply(console, args); };
      console.debug = function(...args) { captureLog('debug', args); window.__originalConsoleDebug.apply(console, args); };
      console.info = function(...args) { captureLog('info', args); window.__originalConsoleInfo.apply(console, args); };
      console.warn = function(...args) { captureLog('warn', args); window.__originalConsoleWarn.apply(console, args); };
      console.error = function(...args) { captureLog('error', args); window.__originalConsoleError.apply(console, args); };
    });
  }

  async initializeLogCapture() {
    this.capturedConsoleLogs = [];
    this.capturedNetworkLogs = [];
    
    this.page.on('console', msg => {
      this.capturedConsoleLogs.push({
        type: msg.type(),
        text: msg.text(),
        timestamp: new Date().toISOString()
      });
    });
    
    this.page.on('request', request => {
      this.capturedNetworkLogs.push({
        type: 'request',
        url: request.url(),
        method: request.method(),
        postData: request.postData(),
        timestamp: new Date().toISOString()
      });
    });
    
    this.page.on('response', async response => {
      try {
        const body = await response.text().catch(() => '');
        this.capturedNetworkLogs.push({
          type: 'response',
          url: response.url(),
          status: response.status(),
          body: body.substring(0, 5000),
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        // Ignore response body capture errors
      }
    });
    
    return this.capturedConsoleLogs;
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });
  }

  async verifyUserIsAuthenticated() {
    const isAuthenticated = await this.page.locator(this.userProfileIndicator).isVisible({ timeout: 10000 }).catch(() => false)
      || await this.page.locator(this.dashboardContainer).isVisible({ timeout: 5000 }).catch(() => false);
    
    if (!isAuthenticated) {
      throw new Error('User is not authenticated in Acticenter');
    }
  }

  async accessContractValueComponent() {
    await this.page.locator(this.contractValueComponent).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator(this.contractValueComponent).scrollIntoViewIfNeeded();
  }

  async waitForComponentToLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator(this.contractValueComponent).waitFor({ state: 'visible' });
  }

  async clickContractValueToExpandBreakdown() {
    await this.page.locator(this.contractBreakdownTrigger).click();
  }

  async waitForBreakdownPopupToAppear() {
    await this.page.locator(this.breakdownPopup).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.breakdownItemsList).waitFor({ state: 'visible' });
  }

  async performRefreshOperation() {
    const refreshExists = await this.page.locator(this.refreshButton).isVisible().catch(() => false);
    if (refreshExists) {
      await this.page.locator(this.refreshButton).click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async interactWithBreakdownItems() {
    const breakdownItems = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.pendingSettlement,
      this.fundsItem,
      this.cedesAndNotes,
      this.moneyMarket,
      this.capitalMarket
    ];
    
    for (const item of breakdownItems) {
      const isVisible = await this.page.locator(item).isVisible().catch(() => false);
      if (isVisible) {
        await this.page.locator(item).hover();
        await this.page.waitForTimeout(300);
      }
    }
  }

  async closeBreakdownPopup() {
    const closeButtonVisible = await this.page.locator(this.breakdownCloseButton).isVisible().catch(() => false);
    if (closeButtonVisible) {
      await this.page.locator(this.breakdownCloseButton).click();
      await this.page.locator(this.breakdownPopup).waitFor({ state: 'hidden', timeout: 5000 });
    }
  }

  async collectFrontendLogs() {
    const browserLogs = await this.page.evaluate(() => {
      return window.__capturedLogs || [];
    });
    
    return [...this.capturedConsoleLogs, ...browserLogs];
  }

  async fetchBackendLogs() {
    return this.capturedNetworkLogs.filter(log => 
      log.type === 'response' && 
      (log.url.includes('/api/') || log.url.includes('/log') || log.url.includes('/audit'))
    );
  }

  async getAllCapturedLogs() {
    const frontendLogs = await this.collectFrontendLogs();
    const backendLogs = await this.fetchBackendLogs();
    return { frontendLogs, backendLogs, networkLogs: this.capturedNetworkLogs };
  }

  async checkLogsForSensitiveMonetaryData(logs) {
    const logText = JSON.stringify(logs);
    
    const monetaryMatch = logText.match(this.sensitivePatterns.monetaryValues);
    const balanceMatch = logText.match(this.sensitivePatterns.balances);
    const amountMatch = logText.match(this.sensitivePatterns.financialAmounts);
    
    if (monetaryMatch || balanceMatch || amountMatch) {
      console.warn('SECURITY ALERT: Sensitive monetary data found in logs', {
        monetaryValues: monetaryMatch,
        balances: balanceMatch,
        amounts: amountMatch
      });
      return true;
    }
    return false;
  }

  async checkLogsForCompleteContractNumbers(logs) {
    const logText = JSON.stringify(logs);
    
    const contractMatch = logText.match(this.sensitivePatterns.contractNumbers);
    const accountMatch = logText.match(this.sensitivePatterns.accountNumbers);
    
    if (contractMatch || accountMatch) {
      console.warn('SECURITY ALERT: Complete contract/account numbers found in logs', {
        contractNumbers: contractMatch,
        accountNumbers: accountMatch
      });
      return true;
    }
    return false;
  }

  async checkLogsForUnmaskedIdentifiers(allLogs) {
    const logText = JSON.stringify(allLogs);
    
    const maskedPattern = /\*{4,}\d{4}|[X]{4,}\d{4}|\d{4}\*{4,}/g;
    const fullIdentifierPattern = /\b\d{12,}\b/g;
    
    const fullIdentifiers = logText.match(fullIdentifierPattern) || [];
    const maskedIdentifiers = logText.match(maskedPattern) || [];
    
    const unmaskedCount = fullIdentifiers.length;
    const maskedCount = maskedIdentifiers.length;
    
    if (unmaskedCount > 0 && maskedCount === 0) {
      console.warn('SECURITY ALERT: Unmasked identifiers found without masking', {
        unmaskedIdentifiers: fullIdentifiers.slice(0, 10)
      });
      return true;
    }
    return false;
  }

  async generateSecurityAuditReport() {
    const allLogs = await this.getAllCapturedLogs();
    
    const report = {
      timestamp: new Date().toISOString(),
      testCase: 'TC-179 Sensitive Data Logging Verification',
      totalFrontendLogs: allLogs.frontendLogs.length,
      totalBackendLogs: allLogs.backendLogs.length,
      totalNetworkRequests: allLogs.networkLogs.length,
      sensitiveDataChecks: {
        monetaryDataExposed: await this.checkLogsForSensitiveMonetaryData(allLogs.frontendLogs),
        contractNumbersExposed: await this.checkLogsForCompleteContractNumbers(allLogs.backendLogs),
        unmaskedIdentifiersFound: await this.checkLogsForUnmaskedIdentifiers(allLogs)
      },
      status: 'COMPLETED'
    };
    
    console.log('Security Audit Report:', JSON.stringify(report, null, 2));
    return report;
  }
}

module.exports = ContractLoggingPage;