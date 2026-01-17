const { expect } = require('@playwright/test');

class DatabasePage {
  constructor(page) {
    this.page = page;
    this.databaseConnectionBtn = page.locator('[data-testid="database-connection-btn"]');
    this.databaseSelector = page.locator('[data-testid="database-selector"]');
    this.queryInput = page.locator('[data-testid="query-input"]');
    this.executeQueryBtn = page.locator('[data-testid="execute-query-btn"]');
    this.resultsTable = page.locator('[data-testid="results-table"]');
    this.tableHeaders = page.locator('[data-testid="results-table"] th');
    this.tableRows = page.locator('[data-testid="results-table"] tbody tr');
    this.connectionStatus = page.locator('[data-testid="connection-status"]');
    this.planFilterInput = page.locator('[data-testid="plan-filter-input"]');
    this.applyFilterBtn = page.locator('[data-testid="apply-filter-btn"]');
  }

  async navigateToDatabaseConsole() {
    await this.page.goto('/database-console');
    await this.page.waitForLoadState('networkidle');
  }

  async connectToDatabase(databaseName) {
    await this.databaseConnectionBtn.click();
    await this.databaseSelector.selectOption({ label: databaseName });
    await this.page.locator('[data-testid="connect-btn"]').click();
    await expect(this.connectionStatus).toHaveText('Connected');
  }

  async executeQuery(query) {
    await this.queryInput.fill(query);
    await this.executeQueryBtn.click();
    await this.resultsTable.waitFor({ state: 'visible' });
  }

  async getTableColumns() {
    const headers = await this.tableHeaders.allTextContents();
    return headers;
  }

  async getServicesByPlan(planName) {
    await this.planFilterInput.fill(planName);
    await this.applyFilterBtn.click();
    await this.page.waitForTimeout(500);
    const rows = await this.tableRows.count();
    const services = [];
    for (let i = 0; i < rows; i++) {
      const row = this.tableRows.nth(i);
      const cells = await row.locator('td').allTextContents();
      services.push({
        ccoprco: cells[0],
        coser: cells[1],
        spcode: cells[2],
        version: cells[3],
        estado: cells[4],
        fechaInVig: cells[5],
        cargoFijo: cells[6],
        usuario: cells[7]
      });
    }
    return services;
  }

  async getActiveServicesByPlan(planName) {
    const allServices = await this.getServicesByPlan(planName);
    return allServices.filter(service => service.estado === 'ACTIVO');
  }

  async validateServiceExists(services, serviceType, quantity) {
    return services.some(service => 
      service.coser.includes(serviceType) && 
      parseInt(service.spcode) === quantity
    );
  }

  async planHasFreeUnits(services) {
    return services.some(service => 
      parseInt(service.cargoFijo) > 0 || 
      service.spcode.includes('FREE')
    );
  }

  async validateInPoolService(services, capacityMB, apnList) {
    return services.some(service => {
      const isInPool = service.coser.includes('IN_POOL');
      const hasCorrectCapacity = service.spcode.includes(capacityMB.toString());
      const hasValidApn = apnList.some(apn => service.coser.includes(apn));
      return isInPool && hasCorrectCapacity && hasValidApn;
    });
  }
};

module.exports = DatabasePage;