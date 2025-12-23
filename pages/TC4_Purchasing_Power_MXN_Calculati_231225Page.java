package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ContractBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By breakdownPopup = By.id("contract-breakdown-popup");
    private By purchasingPowerMXNLabel = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Poder de compra MXN')]");
    private By purchasingPowerMXNValue = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Poder de compra MXN')]/following-sibling::span[@class='breakdown-value']");
    private By breakdownCloseButton = By.id("breakdown-close-btn");
    private By breakdownContainer = By.className("breakdown-container");
    
    public ContractBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean isBreakdownPopupDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
            return driver.findElement(breakdownPopup).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void scrollToPurchasingPowerMXN() {
        try {
            WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(purchasingPowerMXNLabel));
            ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
            Thread.sleep(500);
        } catch (Exception e) {
            System.out.println("Could not scroll to Purchasing Power MXN: " + e.getMessage());
        }
    }
    
    public boolean isPurchasingPowerMXNDisplayed() {
        try {
            return driver.findElement(purchasingPowerMXNLabel).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getPurchasingPowerMXNValue() {
        try {
            WebElement valueElement = wait.until(ExpectedConditions.visibilityOfElementLocated(purchasingPowerMXNValue));
            return valueElement.getText().trim();
        } catch (Exception e) {
            return null;
        }
    }
    
    public boolean isPurchasingPowerValueRightAligned() {
        try {
            WebElement valueElement = driver.findElement(purchasingPowerMXNValue);
            String textAlign = valueElement.getCssValue("text-align");
            String float_value = valueElement.getCssValue("float");
            String justifyContent = valueElement.getCssValue("justify-content");
            
            return textAlign.equals("right") || float_value.equals("right") || justifyContent.equals("flex-end");
        } catch (Exception e) {
            return false;
        }
    }
    
    public void closeBreakdownPopup() {
        try {
            WebElement closeButton = wait.until(ExpectedConditions.elementToBeClickable(breakdownCloseButton));
            closeButton.click();
            wait.until(ExpectedConditions.invisibilityOfElementLocated(breakdownPopup));
        } catch (Exception e) {
            System.out.println("Could not close breakdown popup: " + e.getMessage());
        }
    }
}