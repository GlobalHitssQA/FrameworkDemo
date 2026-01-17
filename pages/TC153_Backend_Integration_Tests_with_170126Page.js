const { expect } = require('@playwright/test');

class IntegrationTestPage {
  constructor(page) {
    this.page = page;
    this.apiContext = null;
    this.testResults = {};
    
    this.selectors = {
      serviceStatusIndicator: '[data-testid="service-status-indicator"]',
      sapConnectionStatus: '[data-testid="sap-connection-status"]',
      luminaConnectionStatus: '[data-testid="lumina-connection-status"]',
      testResultsPanel: '[data-testid="test-results-panel"]',
      contractDataGrid: '[data-testid="contract-data-grid"]',
      purchasingPowerValue: '[data-testid="purchasing-power-value"]',
      cashBalanceValue: '[data-testid="cash-balance-value"]',
      usdBalanceValue: '[data-testid="usd-balance-value"]',
      errorMessageContainer: '[data-testid="error-message-container"]',
      responseTimeMetrics: '[data-testid="response-time-metrics"]'
    };
    
    this.endpoints = {
      sapContracts: '/api/sap/contracts',
      currentCash: '/api/casadebolsa/currentcash',
      cuentaEje: '/api/banco/cuentaeje',
      mexdolar: '/api/mexdolar/accounts',
      healthCheck: '/api/health'
    };
    
    this.slaThresholds = {
      maxResponseTimeMs: 3000,
      timeoutMs: 10000
    };
  }

  async verifyBackendServicesAvailable() {
    const response = await this.page.request.get(this.endpoints.healthCheck);
    this.testResults.backendAvailable = response.ok();
    return this.testResults.backendAvailable;
  }

  async verifySAPTestDataConfigured() {
    const response = await this.page.request.get(`${this.endpoints.sapContracts}/test-data-status`);
    this.testResults.sapTestDataConfigured = response.ok();
    return this.testResults.sapTestDataConfigured;
  }

  async verifyServiceCredentialsConfigured() {
    const response = await this.page.request.get('/api/auth/credentials-status');
    this.testResults.credentialsConfigured = response.ok();
    return this.testResults.credentialsConfigured;
  }

  async executeSAPContractIntegrationTests() {
    const startTime = Date.now();
    try {
      const response = await this.page.request.get(this.endpoints.sapContracts);
      const responseTime = Date.now() - startTime;
      const data = await response.json();
      
      this.testResults.sapContractTests = {
        success: response.ok(),
        contractsRetrieved: data.contracts ? data.contracts.length : 0,
        responseTime: responseTime,
        statusCode: response.status()
      };
    } catch (error) {
      this.testResults.sapContractTests = {
        success: false,
        contractsRetrieved: 0,
        error: error.message
      };
    }
  }

  async getContractDataTestResult() {
    return this.testResults.sapContractTests || { success: false, contractsRetrieved: 0 };
  }

  async executePurchasingPowerServiceTests() {
    const startTime = Date.now();
    try {
      const response = await this.page.request.get(this.endpoints.currentCash);
      const responseTime = Date.now() - startTime;
      const data = await response.json();
      
      this.testResults.purchasingPowerTests = {
        success: response.ok(),
        dataValid: this.validatePurchasingPowerData(data),
        responseTime: responseTime,
        statusCode: response.status()
      };
    } catch (error) {
      this.testResults.purchasingPowerTests = {
        success: false,
        dataValid: false,
        error: error.message
      };
    }
  }

  validatePurchasingPowerData(data) {
    return data && 
           typeof data.purchasingPower !== 'undefined' && 
           typeof data.currency !== 'undefined';
  }

  async getCurrentCashServiceTestResult() {
    return this.testResults.purchasingPowerTests || { success: false, dataValid: false };
  }

  async executeBankCashServiceTests() {
    const startTime = Date.now();
    try {
      const response = await this.page.request.get(this.endpoints.cuentaEje);
      const responseTime = Date.now() - startTime;
      const data = await response.json();
      
      this.testResults.bankCashTests = {
        success: response.ok(),
        balanceValid: this.validateBalanceData(data),
        responseTime: responseTime,
        statusCode: response.status()
      };
    } catch (error) {
      this.testResults.bankCashTests = {
        success: false,
        balanceValid: false,
        error: error.message
      };
    }
  }

  validateBalanceData(data) {
    return data && 
           typeof data.balance !== 'undefined' && 
           !isNaN(parseFloat(data.balance));
  }

  async getCuentaEjeServiceTestResult() {
    return this.testResults.bankCashTests || { success: false, balanceValid: false };
  }

  async executeMexdolarAccountsTests() {
    const startTime = Date.now();
    try {
      const response = await this.page.request.get(this.endpoints.mexdolar);
      const responseTime = Date.now() - startTime;
      const data = await response.json();
      
      this.testResults.mexdolarTests = {
        success: response.ok(),
        usdBalanceValid: this.validateUSDBalanceData(data),
        responseTime: responseTime,
        statusCode: response.status()
      };
    } catch (error) {
      this.testResults.mexdolarTests = {
        success: false,
        usdBalanceValid: false,
        error: error.message
      };
    }
  }

  validateUSDBalanceData(data) {
    return data && 
           typeof data.usdBalance !== 'undefined' && 
           data.currency === 'USD';
  }

  async getMexdolarAccountsTestResult() {
    return this.testResults.mexdolarTests || { success: false, usdBalanceValid: false };
  }

  async executeErrorHandlingTests() {
    const results = {
      handles500Errors: false,
      handlesTimeouts: false
    };
    
    try {
      const error500Response = await this.page.request.get('/api/test/simulate-500');
      results.handles500Errors = error500Response.status() === 500;
    } catch (error) {
      results.handles500Errors = true;
    }
    
    try {
      const timeoutPromise = this.page.request.get('/api/test/simulate-timeout', {
        timeout: this.slaThresholds.timeoutMs
      });
      
      const timeoutResult = await Promise.race([
        timeoutPromise,
        new Promise((resolve) => setTimeout(() => resolve({ timedOut: true }), this.slaThresholds.timeoutMs))
      ]);
      
      results.handlesTimeouts = timeoutResult.timedOut === true || !timeoutResult.ok();
    } catch (error) {
      results.handlesTimeouts = true;
    }
    
    this.testResults.errorHandlingTests = results;
  }

  async getErrorHandlingTestResult() {
    return this.testResults.errorHandlingTests || { handles500Errors: false, handlesTimeouts: false };
  }

  async executeResponseTimeTests() {
    const endpoints = [
      this.endpoints.sapContracts,
      this.endpoints.currentCash,
      this.endpoints.cuentaEje,
      this.endpoints.mexdolar
    ];
    
    const responseTimes = [];
    
    for (const endpoint of endpoints) {
      const startTime = Date.now();
      try {
        await this.page.request.get(endpoint);
        responseTimes.push(Date.now() - startTime);
      } catch (error) {
        responseTimes.push(this.slaThresholds.maxResponseTimeMs + 1);
      }
    }
    
    const allWithinSLA = responseTimes.every(time => time <= this.slaThresholds.maxResponseTimeMs);
    const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    
    this.testResults.responseTimeTests = {
      withinSLA: allWithinSLA,
      averageResponseTimeMs: averageResponseTime,
      maxResponseTimeMs: Math.max(...responseTimes),
      individualTimes: responseTimes
    };
  }

  async getResponseTimeTestResult() {
    return this.testResults.responseTimeTests || { withinSLA: false };
  }
}

module.exports = IntegrationTestPage;