package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class ContractCompositionPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By brokerageContractSelector = By.xpath("//select[@id='contractType']/option[@value='BROKERAGE_HOUSE']");
    private By bankWithMexdolarSelector = By.xpath("//select[@id='contractType']/option[@value='BANK_CORPORATE_WITH_MEXDOLAR']");
    private By bankWithoutMexdolarSelector = By.xpath("//select[@id='contractType']/option[@value='BANK_WITHOUT_MEXDOLAR']");
    private By zeroBalanceSelector = By.xpath("//select[@id='contractType']/option[@value='ZERO_USD_BALANCE']");
    private By contractDropdown = By.id("contractType");
    private By breakdownButton = By.id("btnExpandBreakdown");
    private By breakdownPopup = By.id("compositionBreakdownPopup");
    private By usdCashItem = By.xpath("//div[@class='breakdown-item' and contains(.,'Efectivo USD')]");
    private By usdCashAmount = By.xpath("//div[@class='breakdown-item' and contains(.,'Efectivo USD')]//span[@class='amount']");
    private By usdCashLabel = By.xpath("//div[@class='breakdown-item']//label[contains(text(),'Efectivo USD')]");
    private By breakdownItems = By.xpath("//div[@class='breakdown-item']");
    private By brokerageSpecificItems = By.xpath("//div[@class='breakdown-item' and (@data-contract-type='BROKERAGE')]");
    private By sapSourceIndicator = By.xpath("//div[@class='breakdown-item' and contains(.,'Efectivo USD')]//span[@data-source='SAP']");
    private By exchangeRateIndicator = By.xpath("//div[@class='breakdown-item' and contains(.,'Efectivo USD')]//span[contains(@class,'exchange-rate')]");
    private By closePopupButton = By.xpath("//button[@id='closeBreakdownPopup']");
    
    public ContractCompositionPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void selectContractByType(String contractType) {
        wait.until(ExpectedConditions.elementToBeClickable(contractDropdown));
        driver.findElement(contractDropdown).click();
        
        By selector;
        switch(contractType) {
            case "BROKERAGE_HOUSE":
                selector = brokerageContractSelector;
                break;
            case "BANK_CORPORATE_WITH_MEXDOLAR":
                selector = bankWithMexdolarSelector;
                break;
            case "BANK_WITHOUT_MEXDOLAR":
                selector = bankWithoutMexdolarSelector;
                break;
            case "ZERO_USD_BALANCE":
                selector = zeroBalanceSelector;
                break;
            default:
                throw new IllegalArgumentException("Unknown contract type: " + contractType);
        }
        
        wait.until(ExpectedConditions.elementToBeClickable(selector));
        driver.findElement(selector).click();
    }
    
    public void expandBreakdown() {
        wait.until(ExpectedConditions.elementToBeClickable(breakdownButton));
        driver.findElement(breakdownButton).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
    }
    
    public boolean isBreakdownPopupDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean hasBrokerageItems() {
        try {
            List<WebElement> items = driver.findElements(brokerageSpecificItems);
            return items.size() > 0;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isUSDCashItemPresent() {
        try {
            return driver.findElement(usdCashItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getUSDCashAmount() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usdCashAmount));
        return driver.findElement(usdCashAmount).getText();
    }
    
    public boolean isMexdolarBalanceFromSAP() {
        try {
            return driver.findElement(sapSourceIndicator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean hasExchangeRateConversion() {
        try {
            return driver.findElement(exchangeRateIndicator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void closeBreakdownPopup() {
        wait.until(ExpectedConditions.elementToBeClickable(closePopupButton));
        driver.findElement(closePopupButton).click();
    }
    
    public int getBreakdownItemsCount() {
        return driver.findElements(breakdownItems).size();
    }
}