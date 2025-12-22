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
    
    private By contractValueComponent = By.xpath("//div[@class='contract-value-component']");
    private By breakdownPopup = By.id("breakdown-popup");
    private By purchasingPowerMXNItem = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Poder de compra MXN')]");
    private By purchasingPowerMXNValue = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Poder de compra MXN')]/following-sibling::span[@class='breakdown-value']");
    private By breakdownItemsList = By.xpath("//div[@class='breakdown-item']");
    
    public ContractBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void clickContractValueComponent() {
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(contractValueComponent));
        element.click();
    }
    
    public boolean isBreakdownPopupDisplayed() {
        try {
            WebElement popup = wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
            return popup.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isPurchasingPowerMXNPresent() {
        try {
            WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(purchasingPowerMXNItem));
            return element.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getPurchasingPowerMXNValue() {
        WebElement valueElement = wait.until(ExpectedConditions.visibilityOfElementLocated(purchasingPowerMXNValue));
        return valueElement.getText().trim();
    }
    
    public void closeBreakdownPopup() {
        By closeButton = By.xpath("//div[@id='breakdown-popup']//button[@class='close-btn']");
        WebElement closeBtn = wait.until(ExpectedConditions.elementToBeClickable(closeButton));
        closeBtn.click();
    }
}