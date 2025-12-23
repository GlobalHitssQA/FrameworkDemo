package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ContractValueBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By usernameInput = By.id("username");
    private By passwordInput = By.id("password");
    private By loginButton = By.id("login-submit");
    private By contractSelector = By.id("contract-selector");
    private By contractOptionBancoPMMexdolar = By.xpath("//option[@data-type='BANCO_PM_MEXDOLAR']");
    private By contractOptionBancoPFNoMexdolar = By.xpath("//option[@data-type='BANCO_PF_NO_MEXDOLAR']");
    private By contractOptionCasaBolsaUSD = By.xpath("//option[@data-type='CASA_BOLSA_USD']");
    private By contractOptionZeroUSD = By.xpath("//option[@data-type='CONTRACT_ZERO_USD']");
    private By contractValueComponent = By.id("contract-value-component");
    private By contractValueBreakdownButton = By.id("breakdown-btn");
    private By breakdownPopup = By.xpath("//div[@class='breakdown-popup']");
    private By usdCashItem = By.xpath("//div[@class='breakdown-item' and contains(., 'Efectivo USD')]");
    private By usdCashAmount = By.xpath("//div[@class='breakdown-item' and contains(., 'Efectivo USD')]//span[@class='amount']");
    private By closePopupButton = By.xpath("//button[@class='close-popup']");
    
    public ContractValueBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToActicenter() {
        driver.get("https://acticenter.example.com");
    }
    
    public void performLogin() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameInput));
        driver.findElement(usernameInput).sendKeys("testuser");
        driver.findElement(passwordInput).sendKeys("testpass");
        driver.findElement(loginButton).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractSelector));
    }
    
    public void selectContract(String contractType) {
        wait.until(ExpectedConditions.elementToBeClickable(contractSelector));
        driver.findElement(contractSelector).click();
        
        By contractOption;
        switch(contractType) {
            case "BANCO_PM_MEXDOLAR":
                contractOption = contractOptionBancoPMMexdolar;
                break;
            case "BANCO_PF_NO_MEXDOLAR":
                contractOption = contractOptionBancoPFNoMexdolar;
                break;
            case "CASA_BOLSA_USD":
                contractOption = contractOptionCasaBolsaUSD;
                break;
            case "CONTRACT_ZERO_USD":
                contractOption = contractOptionZeroUSD;
                break;
            default:
                throw new IllegalArgumentException("Unknown contract type: " + contractType);
        }
        
        wait.until(ExpectedConditions.elementToBeClickable(contractOption));
        driver.findElement(contractOption).click();
    }
    
    public boolean isContractValueComponentVisible() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent));
            return driver.findElement(contractValueComponent).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void clickContractValueBreakdown() {
        wait.until(ExpectedConditions.elementToBeClickable(contractValueBreakdownButton));
        driver.findElement(contractValueBreakdownButton).click();
    }
    
    public boolean isBreakdownPopupDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
            return driver.findElement(breakdownPopup).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isUSDCashItemVisible() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(breakdownPopup));
            WebElement item = driver.findElement(usdCashItem);
            return item.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getUSDCashAmount() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(usdCashAmount));
            return driver.findElement(usdCashAmount).getText().trim();
        } catch (Exception e) {
            return null;
        }
    }
    
    public boolean isValidUSDAmount(String amount) {
        if (amount == null || amount.isEmpty()) {
            return false;
        }
        // Validate format like $1,234.56 or $0.00
        return amount.matches("\\$[0-9,]+\\.[0-9]{2}");
    }
    
    public void closeBreakdownPopup() {
        wait.until(ExpectedConditions.elementToBeClickable(closePopupButton));
        driver.findElement(closePopupButton).click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(breakdownPopup));
    }
    
    public void closeBrowser() {
        if (driver != null) {
            driver.quit();
        }
    }
}