package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ValuationBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By totalValuationComponent = By.id("total-valuation-component");
    private By breakdownPopup = By.xpath("//div[@class='valuation-breakdown-popup']");
    private By usdCashField = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Efectivo USD')]/parent::div");
    private By usdCashAmount = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Efectivo USD')]/following-sibling::span[@class='amount']");
    private By usdCashLabel = By.xpath("//span[contains(text(),'Efectivo USD')]");
    private By breakdownItems = By.xpath("//div[@class='breakdown-item']");
    private By closePopupBtn = By.xpath("//button[@class='close-breakdown-popup']");
    
    public ValuationBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void clickTotalValuationComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(totalValuationComponent));
        driver.findElement(totalValuationComponent).click();
    }
    
    public boolean isBreakdownPopupVisible() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
            return driver.findElement(breakdownPopup).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isUSDCashFieldVisible() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(usdCashField));
            return driver.findElement(usdCashField).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getUSDCashAmount() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usdCashAmount));
        String amount = driver.findElement(usdCashAmount).getText();
        return amount.replaceAll("[^0-9.]", "").trim();
    }
    
    public boolean verifyUSDCashNoCurrencyConversion(String expectedBalance) {
        String displayedAmount = getUSDCashAmount();
        String currencySymbol = driver.findElement(usdCashAmount).getText();
        return currencySymbol.contains("USD") && displayedAmount.equals(expectedBalance);
    }
    
    public void closeBreakdownPopup() {
        wait.until(ExpectedConditions.elementToBeClickable(closePopupBtn));
        driver.findElement(closePopupBtn).click();
    }
}