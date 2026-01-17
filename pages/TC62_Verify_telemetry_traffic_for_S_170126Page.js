const { expect } = require('@playwright/test');

class DatabaseQueryPage {
  constructor(page) {
    this.page = page;
    
    this.databaseQuerySystemUrl = '/database/query-system';
    this.loginButton = '[data-testid="db-login-button"]';
    this.queryInputField = '[data-testid="query-input-field"]';
    this.executeQueryButton = '[data-testid="execute-query-button"]';
    this.queryResultsTable = '[data-testid="query-results-table"]';
    this.queryResultsRows = '[data-testid="query-results-table"] tbody tr';
    this.connectionStatusIndicator = '[data-testid="connection-status"]';
    this.shellExecuteButton = '[data-testid="shell-execute-button"]';
    this.shellInputField = '[data-testid="shell-input-field"]';
    this.shellOutputArea = '[data-testid="shell-output-area"]';
    this.tableSelector = '[data-testid="table-selector"]';
    this.filterInputAPN = '[data-testid="filter-apn-input"]';
    this.filterInputPlan = '[data-testid="filter-plan-input"]';
    this.applyFilterButton = '[data-testid="apply-filter-button"]';
    this.costColumnCells = '[data-testid="query-results-table"] td[data-column="cost"]';
    this.lineIdentifierCells = '[data-testid="query-results-table"] td[data-column="line_id"]';
    this.tempTableSelector = '[data-testid="temp-table-selector"]';
    this.trafficGeneratorButton = '[data-testid="traffic-generator-button"]';
    this.trafficStatusIndicator = '[data-testid="traffic-status-indicator"]';
  }

  async navigateToDatabaseQuerySystem() {
    await this.page.goto(this.databaseQuerySystemUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDatabaseAccess() {
    const statusElement = await this.page.locator(this.connectionStatusIndicator);
    await statusElement.waitFor({ state: 'visible', timeout: 10000 });
    const statusText = await statusElement.textContent();
    return statusText.includes('Connected') || statusText.includes('Conectado');
  }

  async verifyPreconditions() {
    const query = `SELECT COUNT(*) as count FROM LINES WHERE plan = 'SOLD' AND package = 'In Pool 10MB' AND status = 'ACTIVE' AND (apn IN ('APN1', 'APN4'))`;
    await this.page.locator(this.queryInputField).fill(query);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.waitForSelector(this.queryResultsTable);
    const resultRows = await this.page.locator(this.queryResultsRows).count();
    return resultRows > 0;
  }

  async identifySOLDLinesWithInPoolAndTelemetryAPNs(apn1, apn2) {
    const query = `SELECT line_id, plan, package, apn, status FROM LINES WHERE plan = 'SOLD' AND package = 'In Pool 10MB' AND status = 'ACTIVE' AND apn IN ('${apn1}', '${apn2}')`;
    await this.page.locator(this.queryInputField).fill(query);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.waitForSelector(this.queryResultsTable);
    const rows = await this.page.locator(this.queryResultsRows).all();
    const lines = [];
    for (const row of rows) {
      const cells = await row.locator('td').all();
      if (cells.length >= 4) {
        lines.push({
          lineId: await cells[0].textContent(),
          plan: await cells[1].textContent(),
          package: await cells[2].textContent(),
          apn: await cells[3].textContent()
        });
      }
    }
    return lines;
  }

  async validateIdentifiedLines(lines) {
    return lines.every(line => 
      line.plan === 'SOLD' && 
      line.package === 'In Pool 10MB' && 
      ['APN1', 'APN4'].includes(line.apn.trim())
    );
  }

  async generateTelemetryTraffic(lines, apns) {
    await this.page.locator(this.trafficGeneratorButton).click();
    for (const line of lines) {
      for (const apn of apns) {
        const trafficCommand = `GENERATE_TRAFFIC line_id=${line.lineId} apn=${apn} type=telemetry`;
        await this.page.locator(this.shellInputField).fill(trafficCommand);
        await this.page.locator(this.shellExecuteButton).click();
        await this.page.waitForTimeout(1000);
      }
    }
  }

  async verifyTrafficCaptured(lines) {
    const lineIds = lines.map(l => l.lineId).join("', '");
    const query = `SELECT COUNT(*) as captured FROM TRAFFIC_CAPTURE WHERE line_id IN ('${lineIds}') AND capture_status = 'CAPTURED'`;
    await this.page.locator(this.queryInputField).fill(query);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.waitForSelector(this.queryResultsTable);
    const resultText = await this.page.locator(this.queryResultsRows).first().textContent();
    const capturedCount = parseInt(resultText.match(/\d+/)?.[0] || '0');
    return capturedCount > 0;
  }

  async queryUDRLT01Table(lines, apns) {
    const lineIds = lines.map(l => l.lineId).join("', '");
    const apnList = apns.join("', '");
    const query = `SELECT * FROM UDR_LT_01 WHERE line_id IN ('${lineIds}') AND apn IN ('${apnList}') AND plan = 'SOLD'`;
    await this.page.locator(this.queryInputField).fill(query);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.waitForSelector(this.queryResultsTable);
    const rows = await this.page.locator(this.queryResultsRows).all();
    const records = [];
    for (const row of rows) {
      const cells = await row.locator('td').all();
      if (cells.length >= 5) {
        records.push({
          lineId: await cells[0].textContent(),
          apn: await cells[1].textContent(),
          plan: await cells[2].textContent(),
          trafficType: await cells[3].textContent(),
          cost: parseFloat(await cells[4].textContent())
        });
      }
    }
    return records;
  }

  async verifyRecordIdentificationFields(records) {
    return records.every(record => 
      record.lineId && 
      record.apn && 
      record.plan === 'SOLD' && 
      record.trafficType
    );
  }

  async verifyCostFieldInRecords(records) {
    return records.map(record => ({
      lineId: record.lineId,
      apn: record.apn,
      cost: record.cost
    }));
  }

  async executeInPoolCalculationShell() {
    const shellCommand = 'EXECUTE_SHELL InPoolCalculation --source=UDR_LT_01 --target=TEMP_INPOOL_CALC';
    await this.page.locator(this.shellInputField).fill(shellCommand);
    await this.page.locator(this.shellExecuteButton).click();
    await this.page.waitForSelector(this.shellOutputArea);
    const outputText = await this.page.locator(this.shellOutputArea).textContent();
    return {
      success: outputText.includes('SUCCESS') || outputText.includes('COMPLETED'),
      recordsCopied: parseInt(outputText.match(/Records copied: (\d+)/)?.[1] || '0'),
      output: outputText
    };
  }

  async verifyShellCopiedRecordsToTempTable(shellResults) {
    if (!shellResults.success) return false;
    const query = `SELECT COUNT(*) as count FROM TEMP_INPOOL_CALC WHERE cost = 0`;
    await this.page.locator(this.queryInputField).fill(query);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.waitForSelector(this.queryResultsTable);
    const resultText = await this.page.locator(this.queryResultsRows).first().textContent();
    const copiedCount = parseInt(resultText.match(/\d+/)?.[0] || '0');
    return copiedCount > 0 && copiedCount === shellResults.recordsCopied;
  }

  async verifyUDRLT01Unmodified(originalRecords) {
    const lineIds = originalRecords.map(r => r.lineId).join("', '");
    const query = `SELECT line_id, cost FROM UDR_LT_01 WHERE line_id IN ('${lineIds}')`;
    await this.page.locator(this.queryInputField).fill(query);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.waitForSelector(this.queryResultsTable);
    const rows = await this.page.locator(this.queryResultsRows).all();
    const currentRecords = [];
    for (const row of rows) {
      const cells = await row.locator('td').all();
      if (cells.length >= 2) {
        currentRecords.push({
          lineId: await cells[0].textContent(),
          cost: parseFloat(await cells[1].textContent())
        });
      }
    }
    return originalRecords.every(original => {
      const current = currentRecords.find(c => c.lineId === original.lineId);
      return current && current.cost === original.cost;
    });
  }
}

module.exports = DatabaseQueryPage;