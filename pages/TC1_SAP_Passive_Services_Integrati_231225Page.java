package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class SAPIntegrationPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Environment Configuration Locators
    private By environmentConfigMenu = By.id("envConfigMenu");
    private By environmentStatusIndicator = By.xpath("//div[@class='env-status' and @data-status='ready']");
    
    // API Status Locators
    private By apiStatusPanel = By.id("apiStatusPanel");
    private By valuationAPIStatus = By.xpath("//span[@data-api='valuationAPI'][@data-status='operational']");
    private By microservicesStatusPanel = By.id("microservicesStatus");
    private By serviceStatusIndicator = By.xpath("//div[@class='service-status'][@data-state='active']");
    
    // Contract Management Locators
    private By contractManagementLink = By.id("contractManagement");
    private By contractTypeFilter = By.id("contractTypeFilter");
    private By bankingTypeFilter = By.id("bankingTypeFilter");
    private By contractSearchBtn = By.id("searchContract");
    private By contractResultsTable = By.xpath("//table[@id='contractResults']//tr[@data-contract-type]");
    
    // Valuation API Locators
    private By valuationAPILink = By.id("valuationAPILink");
    private By contractTypeSelect = By.id("contractType");
    private By bankingTypeSelect = By.id("bankingType");
    private By executeAPIButton = By.id("executeValuationAPI");
    private By apiResponseField = By.id("apiResponse");
    private By contractValueField = By.xpath("//span[@class='contract-value']");
    
    // Microservices Locators
    private By microservicesPanelLink = By.id("microservicesPanel");
    private By microserviceRangeStartInput = By.id("microserviceRangeStart");
    private By microserviceRangeEndInput = By.id("microserviceRangeEnd");
    private By executeMicroservicesBtn = By.id("executeMicroservices");
    private By microservicesResponseField = By.id("microservicesResponse");
    private By microservicesSuccessIndicator = By.xpath("//div[@class='integration-status'][@data-status='success']");
    
    // SAP Prenotes Locators
    private By sapPrenotesLink = By.id("sapPrenotesLink");
    private By executePrenotesBtn = By.id("executePrenotesService");
    private By prenotesResponseField = By.id("prenotesResponse");
    private By prenotesConsistencyCheck = By.xpath("//span[@class='consistency-check'][@data-valid='true']");
    
    // Clearing Chamber Locators
    private By clearingChamberLink = By.id("clearingChamberLink");
    private By executeClearingBtn = By.id("executeClearingOperation");
    private By clearingResponseField = By.id("clearingResponse");
    private By reconciliationStatusField = By.xpath("//div[@class='reconciliation-status'][@data-status='completed']");
    
    // Advisor Module Locators
    private By advisorModuleLink = By.id("advisorModuleLink");
    private By accountTypeSelect = By.id("accountTypeSelect");
    private By executeCurrentCashBtn = By.id("executeCurrentCash");
    private By currentCashResponseField = By.id("currentCashResponse");
    private By mexdolarProcessingIndicator = By.xpath("//span[@class='processing-status'][@data-account='Mexdolar'][@data-status='success']");
    
    // Cash Comparison Locators
    private By cashComparisonLink = By.id("cashComparisonLink");
    private By compareBlockedTransitBtn = By.id("compareBlockedTransit");
    private By cashComparisonResponseField = By.id("cashComparisonResponse");
    private By cashDifferenceRecordField = By.xpath("//div[@class='cash-difference-record'][@data-recorded='true']");
    
    // Funds Services Locators
    private By fundsServicesLink = By.id("fundsServicesLink");
    private By executeFundsQueryBtn = By.id("executeFundsQuery");
    private By fundsServicesResponseField = By.id("fundsServicesResponse");
    private By fundsStructureValidationField = By.xpath("//div[@class='structure-validation'][@data-valid='true']");
    
    // Lumina Integration Locators
    private By luminaIntegrationLink = By.id("luminaIntegrationLink");
    private By executeLuminaOperationsBtn = By.id("executeLuminaOperations");
    private By luminaResponseField = By.id("luminaResponse");
    private By luminaOperationsStatusField = By.xpath("//div[@class='lumina-operations-status'][@data-status='reflected']");
    
    // Acticenter Locators
    private By acticenterLink = By.id("acticenterLink");
    private By contractSearchInput = By.id("contractSearchInput");
    private By searchContractBtn = By.id("searchContractBtn");
    private By contractValueComponent = By.xpath("//div[@class='contract-value-component']");
    private By displayedContractValue = By.xpath("//span[@class='total-contract-value'][@data-person-type='NaturalPerson'][@data-banking='PrivateBanking']");
    
    public SAPIntegrationPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }
    
    public void navigateToEnvironmentConfig() {
        wait.until(ExpectedConditions.elementToBeClickable(environmentConfigMenu)).click();
    }
    
    public void verifyEnvironmentConfiguration() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(environmentStatusIndicator));
    }
    
    public void checkAPIStatus(String apiName) {
        wait.until(ExpectedConditions.elementToBeClickable(apiStatusPanel)).click();
        if ("valuationAPI".equals(apiName)) {
            wait.until(ExpectedConditions.visibilityOfElementLocated(valuationAPIStatus));
        }
    }
    
    public void checkMicroservicesStatus(String rangeStart, String rangeEnd) {
        wait.until(ExpectedConditions.elementToBeClickable(microservicesStatusPanel)).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(serviceStatusIndicator));
    }
    
    public void checkServiceStatus(String serviceName) {
        By serviceLocator = By.xpath("//span[@data-service='" + serviceName + "'][@data-status='active']");
        wait.until(ExpectedConditions.visibilityOfElementLocated(serviceLocator));
    }
    
    public void navigateToContractManagement() {
        wait.until(ExpectedConditions.elementToBeClickable(contractManagementLink)).click();
    }
    
    public void verifyContractExists(String contractType, String bankingType) {
        driver.findElement(contractTypeFilter).sendKeys(contractType);
        driver.findElement(bankingTypeFilter).sendKeys(bankingType);
        driver.findElement(contractSearchBtn).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractResultsTable));
    }
    
    public void navigateToValuationAPI() {
        wait.until(ExpectedConditions.elementToBeClickable(valuationAPILink)).click();
    }
    
    public void selectContractType(String contractType) {
        driver.findElement(contractTypeSelect).sendKeys(contractType);
    }
    
    public void selectBankingType(String bankingType) {
        driver.findElement(bankingTypeSelect).sendKeys(bankingType);
    }
    
    public String executeValuationAPI() {
        driver.findElement(executeAPIButton).click();
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(apiResponseField));
        return responseElement.getText();
    }
    
    public boolean validateValuationResponse(String response) {
        return response != null && !response.isEmpty() && driver.findElement(contractValueField).isDisplayed();
    }
    
    public void navigateToMicroservicesPanel() {
        wait.until(ExpectedConditions.elementToBeClickable(microservicesPanelLink)).click();
    }
    
    public String executeMicroservicesRange(String rangeStart, String rangeEnd) {
        driver.findElement(microserviceRangeStartInput).sendKeys(rangeStart);
        driver.findElement(microserviceRangeEndInput).sendKeys(rangeEnd);
        driver.findElement(executeMicroservicesBtn).click();
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(microservicesResponseField));
        return responseElement.getText();
    }
    
    public boolean validateMicroservicesIntegration(String response) {
        return response != null && !response.isEmpty() && driver.findElement(microservicesSuccessIndicator).isDisplayed();
    }
    
    public void navigateToSAPPrenotes() {
        wait.until(ExpectedConditions.elementToBeClickable(sapPrenotesLink)).click();
    }
    
    public String executePrenotesService() {
        driver.findElement(executePrenotesBtn).click();
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(prenotesResponseField));
        return responseElement.getText();
    }
    
    public boolean validatePrenotesConsistency(String response) {
        return response != null && !response.isEmpty() && driver.findElement(prenotesConsistencyCheck).isDisplayed();
    }
    
    public void navigateToClearingChamber() {
        wait.until(ExpectedConditions.elementToBeClickable(clearingChamberLink)).click();
    }
    
    public String executeClearingOperation() {
        driver.findElement(executeClearingBtn).click();
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(clearingResponseField));
        return responseElement.getText();
    }
    
    public boolean validateReconciliation(String response) {
        return response != null && !response.isEmpty() && driver.findElement(reconciliationStatusField).isDisplayed();
    }
    
    public void navigateToAdvisorModule() {
        wait.until(ExpectedConditions.elementToBeClickable(advisorModuleLink)).click();
    }
    
    public void selectAccountType(String accountType) {
        driver.findElement(accountTypeSelect).sendKeys(accountType);
    }
    
    public String executeCurrentCashValidation() {
        driver.findElement(executeCurrentCashBtn).click();
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(currentCashResponseField));
        return responseElement.getText();
    }
    
    public boolean validateMexdolarProcessing(String response) {
        return response != null && !response.isEmpty() && driver.findElement(mexdolarProcessingIndicator).isDisplayed();
    }
    
    public void navigateToCashComparison() {
        wait.until(ExpectedConditions.elementToBeClickable(cashComparisonLink)).click();
    }
    
    public String executeBlockedVsTransitComparison() {
        driver.findElement(compareBlockedTransitBtn).click();
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(cashComparisonResponseField));
        return responseElement.getText();
    }
    
    public boolean validateCashDifferenceRecording(String response) {
        return response != null && !response.isEmpty() && driver.findElement(cashDifferenceRecordField).isDisplayed();
    }
    
    public void navigateToFundsServices() {
        wait.until(ExpectedConditions.elementToBeClickable(fundsServicesLink)).click();
    }
    
    public String executeFundsServicesQuery() {
        driver.findElement(executeFundsQueryBtn).click();
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(fundsServicesResponseField));
        return responseElement.getText();
    }
    
    public boolean validateFundsStructure(String response) {
        return response != null && !response.isEmpty() && driver.findElement(fundsStructureValidationField).isDisplayed();
    }
    
    public void navigateToLuminaIntegration() {
        wait.until(ExpectedConditions.elementToBeClickable(luminaIntegrationLink)).click();
    }
    
    public String executeLuminaOperations() {
        driver.findElement(executeLuminaOperationsBtn).click();
        WebElement responseElement = wait.until(ExpectedConditions.visibilityOfElementLocated(luminaResponseField));
        return responseElement.getText();
    }
    
    public boolean validateLuminaOperations(String response) {
        return response != null && !response.isEmpty() && driver.findElement(luminaOperationsStatusField).isDisplayed();
    }
    
    public void navigateToActicenter() {
        wait.until(ExpectedConditions.elementToBeClickable(acticenterLink)).click();
    }
    
    public void searchContract(String contractType, String bankingType) {
        String searchQuery = contractType + " " + bankingType;
        driver.findElement(contractSearchInput).sendKeys(searchQuery);
        driver.findElement(searchContractBtn).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent));
    }
    
    public boolean validateContractValueDisplay() {
        return driver.findElement(displayedContractValue).isDisplayed();
    }
}