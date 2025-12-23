package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class MexdolarContractPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators
    private By contractHeader = By.id("contract-header");
    private By readOnlyIndicator = By.xpath("//span[@class='read-only-badge']");
    private By usdCashField = By.id("usd-cash-balance");
    private By valuationBreakdown = By.id("valuation-breakdown");
    private By buySellComponent = By.id("buy-sell-component");
    private By buySellButton = By.xpath("//button[@id='buy-sell-btn']");
    private By buyOption = By.id("buy-option");
    private By sellOption = By.id("sell-option");
    private By operationModal = By.className("operation-modal");
    private By usdCashLabel = By.xpath("//label[contains(text(),'Efectivo USD')]");
    private By mxnConversionField = By.id("mxn-conversion");
    private By valuationItems = By.className("valuation-item");
    private By operationItems = By.xpath("//div[@class='operation-items']");
    private By clearingHouseStatus = By.id("clearing-house-status");
    private By settlementProcessStatus = By.id("settlement-process-status");
    private By contractType = By.id("contract-type");

    public MexdolarContractPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void verifyContractLoaded() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractHeader));
        WebElement header = driver.findElement(contractHeader);
        if (!header.isDisplayed()) {
            throw new AssertionError("Mexdolar contract did not load");
        }
    }

    public void verifyReadOnlyMode() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(readOnlyIndicator));
        WebElement readOnly = driver.findElement(readOnlyIndicator);
        if (!readOnly.isDisplayed() || !readOnly.getText().contains("Solo Consulta")) {
            throw new AssertionError("Contract is not in read-only mode");
        }
    }

    public void validateUSDCashField() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usdCashField));
        WebElement usdCash = driver.findElement(usdCashField);
        usdCash.isDisplayed();
    }

    public void verifyBalanceWithoutConversion() {
        WebElement usdCash = driver.findElement(usdCashField);
        String balance = usdCash.getText();
        if (!balance.contains("USD") || balance.contains("MXN")) {
            throw new AssertionError("Balance shows conversion when it should not");
        }
    }

    public void verifyUSDCashInValuationBreakdown() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(valuationBreakdown));
        WebElement label = driver.findElement(usdCashLabel);
        if (!label.isDisplayed()) {
            throw new AssertionError("USD Cash label not found in valuation breakdown");
        }
        if (driver.findElements(mxnConversionField).size() > 0) {
            throw new AssertionError("MXN conversion should not be present");
        }
    }

    public void attemptToAccessBuySellComponent() {
        wait.until(ExpectedConditions.presenceOfElementLocated(buySellComponent));
        try {
            WebElement buySellBtn = driver.findElement(buySellButton);
            buySellBtn.click();
        } catch (Exception e) {
            // Expected to fail if disabled
        }
    }

    public void verifyBuySellComponentDisabled() {
        WebElement buySellBtn = driver.findElement(buySellButton);
        if (buySellBtn.isEnabled()) {
            throw new AssertionError("Buy-sell component should be disabled");
        }
        String disabledAttr = buySellBtn.getAttribute("disabled");
        if (disabledAttr == null || !disabledAttr.equals("true")) {
            throw new AssertionError("Buy-sell button is not properly disabled");
        }
    }

    public void verifyNoBuySellOptionsDisplayed() {
        if (driver.findElements(operationModal).size() > 0) {
            throw new AssertionError("Operation modal should not be displayed");
        }
        if (driver.findElements(buyOption).size() > 0 || driver.findElements(sellOption).size() > 0) {
            throw new AssertionError("Buy or sell options should not be visible");
        }
    }

    public void verifyComponentRemainsDisabled() {
        WebElement buySellBtn = driver.findElement(buySellButton);
        if (buySellBtn.isEnabled()) {
            throw new AssertionError("Component should remain disabled");
        }
    }

    public void consultValuationBreakdown() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(valuationBreakdown));
        WebElement breakdown = driver.findElement(valuationBreakdown);
        breakdown.click();
    }

    public void verifyValuationWithoutOperationItems() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(valuationItems));
        if (driver.findElements(operationItems).size() > 0) {
            throw new AssertionError("Operation items should not be present in valuation");
        }
        WebElement usdLabel = driver.findElement(usdCashLabel);
        if (!usdLabel.isDisplayed()) {
            throw new AssertionError("USD Cash should be displayed in valuation");
        }
    }

    public void verifyNoClearingHouseProcesses() {
        if (driver.findElements(clearingHouseStatus).size() > 0) {
            WebElement status = driver.findElement(clearingHouseStatus);
            String statusText = status.getText();
            if (statusText.contains("active") || statusText.contains("processing")) {
                throw new AssertionError("Clearing house should not execute processes");
            }
        }
    }

    public void verifyNoSettlementProcesses() {
        if (driver.findElements(settlementProcessStatus).size() > 0) {
            WebElement status = driver.findElement(settlementProcessStatus);
            String statusText = status.getText();
            if (statusText.contains("active") || statusText.contains("pending")) {
                throw new AssertionError("Settlement processes should not be generated");
            }
        }
    }
}