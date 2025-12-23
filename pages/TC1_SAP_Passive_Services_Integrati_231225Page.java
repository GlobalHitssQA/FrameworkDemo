package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class SAPIntegrationPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators
    private By environmentStatusIndicator = By.id("env-status-indicator");
    private By sapPassiveServiceStatus = By.xpath("//div[@id='sap-passive-status']//span[@class='status']");
    private By valuationAPIStatus = By.xpath("//div[@id='valuation-api-status']//span[@class='status']");
    private By agasMicroservicesStatus = By.id("agas-microservices-status");
    private By prenotesServiceStatus = By.xpath("//div[@id='prenotes-service']//span[@class='active']");
    private By clearingHouseStatus = By.id("clearing-house-status");
    private By advisorModuleStatus = By.xpath("//div[@id='advisor-module']//span[@class='available']");
    private By testContractSelector = By.id("test-contract-selector");
    private By luminaIntegrationStatus = By.xpath("//div[@id='lumina-integration']//span[@class='connected']");
    private By configureEnvironmentBtn = By.id("configure-environment-btn");
    private By configurationCompleteFlag = By.xpath("//div[@id='config-status' and @data-complete='true']");
    private By valuationAPIEndpoint = By.id("valuation-api-endpoint");
    private By clientTypeDropdown = By.id("client-type");
    private By bankingTypeDropdown = By.id("banking-type");
    private By invokeValuationBtn = By.id("invoke-valuation-btn");
    private By valuationResponsePanel = By.id("valuation-response-panel");
    private By executeAGASBtn = By.id("execute-agas-microservices-btn");
    private By agasResponsePanel = By.id("agas-response-panel");
    private By agasIntegrationStatus = By.xpath("//div[@id='agas-integration-status'][@data-status='success']");
    private By sendPrenotesBtn = By.id("send-prenotes-btn");
    private By prenotesResponsePanel = By.id("prenotes-response-panel");
    private By prenotesValidationFlag = By.xpath("//div[@id='prenotes-validation'][@data-consistent='true']");
    private By performClearingTestBtn = By.id("perform-clearing-test-btn");
    private By clearingResponsePanel = By.id("clearing-response-panel");
    private By reconciliationStatus = By.xpath("//div[@id='reconciliation-status'][@data-result='success']");
    private By currentCashModuleInput = By.id("current-cash-account-input");
    private By validateCurrentCashBtn = By.id("validate-current-cash-btn");
    private By currentCashResponsePanel = By.id("current-cash-response-panel");
    private By mexdolarProcessingStatus = By.xpath("//div[@id='mexdolar-processing'][@data-status='processed']");
    private By compareCashBtn = By.id("compare-cash-btn");
    private By cashComparisonPanel = By.id("cash-comparison-panel");
    private By cashDifferenceRecorded = By.xpath("//div[@id='cash-difference'][@data-recorded='true']");
    private By getFundsServicesBtn = By.id("get-funds-services-btn");
    private By fundsResponsePanel = By.id("funds-response-panel");
    private By fundsStructureValidation = By.xpath("//div[@id='funds-structure'][@data-valid='true']");
    private By testLuminaBtn = By.id("test-lumina-integration-btn");
    private By luminaResponsePanel = By.id("lumina-response-panel");
    private By luminaOperationsStatus = By.xpath("//div[@id='lumina-operations'][@data-reflected='true']");
    private By acticenterLink = By.id("acticenter-link");
    private By contractValueComponent = By.xpath("//div[@id='contract-value-component']//span[@class='total-value']");
    private By contractValueValidation = By.xpath("//div[@id='contract-value-validation'][@data-correct='true']");

    public SAPIntegrationPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    public void navigateToTestEnvironment() {
        driver.get("https://test-environment.sap-integration.internal/dashboard");
        wait.until(ExpectedConditions.presenceOfElementLocated(environmentStatusIndicator));
    }

    public boolean isEnvironmentReady() {
        WebElement statusElement = wait.until(ExpectedConditions.presenceOfElementLocated(environmentStatusIndicator));
        return statusElement.getAttribute("data-ready").equals("true");
    }

    public boolean verifySAPPassiveServices() {
        WebElement status = driver.findElement(sapPassiveServiceStatus);
        return status.getText().equals("ACTIVE");
    }

    public boolean verifyValuationAPIStatus() {
        WebElement status = driver.findElement(valuationAPIStatus);
        return status.getText().equals("OPERATIONAL");
    }

    public boolean verifyAGASMicroservices() {
        WebElement status = driver.findElement(agasMicroservicesStatus);
        return status.getAttribute("data-implemented").equals("true");
    }

    public boolean verifySAPPrenotesService() {
        return driver.findElement(prenotesServiceStatus).isDisplayed();
    }

    public boolean verifyClearingHouse() {
        WebElement status = driver.findElement(clearingHouseStatus);
        return status.getAttribute("data-functional").equals("true");
    }

    public boolean verifyAdvisorModule() {
        return driver.findElement(advisorModuleStatus).isDisplayed();
    }

    public boolean verifyTestContract() {
        WebElement selector = driver.findElement(testContractSelector);
        return selector.getAttribute("data-contract-loaded").equals("true");
    }

    public boolean verifyLuminaIntegration() {
        return driver.findElement(luminaIntegrationStatus).isDisplayed();
    }

    public void configureTestEnvironment() {
        WebElement configBtn = wait.until(ExpectedConditions.elementToBeClickable(configureEnvironmentBtn));
        configBtn.click();
    }

    public boolean isConfigurationComplete() {
        wait.until(ExpectedConditions.presenceOfElementLocated(configurationCompleteFlag));
        return driver.findElement(configurationCompleteFlag).isDisplayed();
    }

    public String invokeValuationAPI(String clientType, String bankingType) {
        wait.until(ExpectedConditions.elementToBeClickable(clientTypeDropdown)).click();
        driver.findElement(By.xpath("//option[@value='" + clientType + "']")).click();
        driver.findElement(bankingTypeDropdown).click();
        driver.findElement(By.xpath("//option[@value='" + bankingType + "']")).click();
        driver.findElement(invokeValuationBtn).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(valuationResponsePanel));
        return driver.findElement(valuationResponsePanel).getText();
    }

    public boolean validateValuationResponse(String response) {
        return response != null && response.contains("totalContractValue") && response.contains("status");
    }

    public String executeAGASMicroservices() {
        WebElement executeBtn = wait.until(ExpectedConditions.elementToBeClickable(executeAGASBtn));
        executeBtn.click();
        wait.until(ExpectedConditions.presenceOfElementLocated(agasResponsePanel));
        return driver.findElement(agasResponsePanel).getText();
    }

    public boolean validateMicroservicesIntegration(String response) {
        wait.until(ExpectedConditions.presenceOfElementLocated(agasIntegrationStatus));
        return driver.findElement(agasIntegrationStatus).isDisplayed() && response.contains("AGAS-21435");
    }

    public String sendPrenotesRequest() {
        driver.findElement(sendPrenotesBtn).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(prenotesResponsePanel));
        return driver.findElement(prenotesResponsePanel).getText();
    }

    public boolean validatePrenotesData(String response) {
        wait.until(ExpectedConditions.presenceOfElementLocated(prenotesValidationFlag));
        return driver.findElement(prenotesValidationFlag).isDisplayed();
    }

    public String performClearingHouseTest() {
        driver.findElement(performClearingTestBtn).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(clearingResponsePanel));
        return driver.findElement(clearingResponsePanel).getText();
    }

    public boolean validateReconciliation(String response) {
        wait.until(ExpectedConditions.presenceOfElementLocated(reconciliationStatus));
        return driver.findElement(reconciliationStatus).isDisplayed();
    }

    public String validateCurrentCashModule(String accountType) {
        driver.findElement(currentCashModuleInput).sendKeys(accountType);
        driver.findElement(validateCurrentCashBtn).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(currentCashResponsePanel));
        return driver.findElement(currentCashResponsePanel).getText();
    }

    public boolean validateMexdolarProcessing(String response) {
        wait.until(ExpectedConditions.presenceOfElementLocated(mexdolarProcessingStatus));
        return driver.findElement(mexdolarProcessingStatus).isDisplayed();
    }

    public String compareCashStatus() {
        driver.findElement(compareCashBtn).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(cashComparisonPanel));
        return driver.findElement(cashComparisonPanel).getText();
    }

    public boolean validateCashDifference(String response) {
        wait.until(ExpectedConditions.presenceOfElementLocated(cashDifferenceRecorded));
        return driver.findElement(cashDifferenceRecorded).isDisplayed();
    }

    public String getFundsServicesResponse() {
        driver.findElement(getFundsServicesBtn).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(fundsResponsePanel));
        return driver.findElement(fundsResponsePanel).getText();
    }

    public boolean validateFundsStructure(String response) {
        wait.until(ExpectedConditions.presenceOfElementLocated(fundsStructureValidation));
        return driver.findElement(fundsStructureValidation).isDisplayed();
    }

    public String testLuminaIntegration() {
        driver.findElement(testLuminaBtn).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(luminaResponsePanel));
        return driver.findElement(luminaResponsePanel).getText();
    }

    public boolean validateLuminaOperations(String response) {
        wait.until(ExpectedConditions.presenceOfElementLocated(luminaOperationsStatus));
        return driver.findElement(luminaOperationsStatus).isDisplayed();
    }

    public void navigateToActicenter() {
        driver.findElement(acticenterLink).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(contractValueComponent));
    }

    public String getContractValueDisplay() {
        WebElement valueElement = driver.findElement(contractValueComponent);
        return valueElement.getText();
    }

    public boolean validateContractValueDisplay(String displayValue) {
        wait.until(ExpectedConditions.presenceOfElementLocated(contractValueValidation));
        return driver.findElement(contractValueValidation).isDisplayed() && displayValue != null && !displayValue.isEmpty();
    }
}