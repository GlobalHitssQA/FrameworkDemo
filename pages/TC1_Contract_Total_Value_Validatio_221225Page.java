package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class ContractValuePage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By fundsOperationMenu = By.xpath("//a[@id='funds-operation-menu']");
    private By contractValueComponent = By.id("contract-total-value");
    private By contractTotalValueLabel = By.xpath("//span[@class='contract-total-amount']");
    private By mxnPurchasingPower = By.id("mxn-purchasing-power");
    private By mxnCash = By.id("mxn-cash");
    private By usdCash = By.id("usd-cash");
    private By pendingSettlements = By.id("pending-settlements");
    private By debtFunds = By.id("debt-funds");
    private By hedgeFunds = By.id("hedge-funds");
    private By equityFunds = By.id("equity-funds");
    private By cashInTransit = By.id("cash-in-transit");
    private By cdsAndNotes = By.id("cds-promissory-notes");
    private By moneyMarket = By.id("money-market");
    private By capitalMarket = By.id("capital-market");
    private By allComponentValues = By.xpath("//div[@class='contract-component-value']");
    
    public ContractValuePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToFundsOperationFlow() {
        wait.until(ExpectedConditions.elementToBeClickable(fundsOperationMenu));
        driver.findElement(fundsOperationMenu).click();
    }
    
    public boolean isContractValueDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent));
            return driver.findElement(contractValueComponent).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getContractTotalValue() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractTotalValueLabel));
        return driver.findElement(contractTotalValueLabel).getText().trim();
    }
    
    public double calculateTotalFromComponents() {
        double total = 0.0;
        total += getComponentValue(mxnPurchasingPower);
        total += getComponentValue(mxnCash);
        total += getComponentValue(usdCash);
        total += getComponentValue(pendingSettlements);
        total += getComponentValue(debtFunds);
        total += getComponentValue(hedgeFunds);
        total += getComponentValue(equityFunds);
        total += getComponentValue(cashInTransit);
        total += getComponentValue(cdsAndNotes);
        total += getComponentValue(moneyMarket);
        total += getComponentValue(capitalMarket);
        return total;
    }
    
    private double getComponentValue(By locator) {
        try {
            WebElement element = driver.findElement(locator);
            if (element.isDisplayed()) {
                String valueText = element.getText();
                return parseContractValue(valueText);
            }
        } catch (Exception e) {
            // Component not applicable for this contract type
        }
        return 0.0;
    }
    
    public double parseContractValue(String valueText) {
        String cleanValue = valueText.replaceAll("[^0-9.]", "");
        return Double.parseDouble(cleanValue);
    }
}