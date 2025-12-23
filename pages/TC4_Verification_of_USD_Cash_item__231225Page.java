package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ActicenterContractPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By loginButton = By.id("login-btn");
    private By usernameInput = By.id("username");
    private By passwordInput = By.id("password");
    private By submitLoginButton = By.xpath("//button[@type='submit']");
    private By contractValueComponent = By.id("contract-value-component");
    private By breakdownPopup = By.xpath("//div[@class='breakdown-popup']");
    private By usdCashItem = By.xpath("//div[@class='breakdown-item' and contains(., 'Efectivo USD')]");
    private By usdCashAmount = By.xpath("//div[@class='breakdown-item']//span[@class='usd-amount']");
    private By bancoPersonaMoralContractMexdolar = By.xpath("//div[@data-contract-type='banco-persona-moral' and @data-has-mexdolar='true']");
    private By bancoContractWithoutMexdolar = By.xpath("//div[@data-contract-type='banco' and @data-has-mexdolar='false']");
    private By casaDeBolsaContract = By.xpath("//div[@data-contract-type='casa-de-bolsa' and @data-currency='USD']");
    private By closePopupButton = By.xpath("//button[@class='close-popup']");
    private By sapServiceStatus = By.id("sap-service-status");
    private By agasServiceStatus = By.id("agas-service-status");
    
    public ActicenterContractPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToActicenter() {
        driver.get("https://acticenter.app/login");
    }
    
    public void login() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameInput));
        driver.findElement(usernameInput).sendKeys("test.user");
        driver.findElement(passwordInput).sendKeys("password123");
        driver.findElement(submitLoginButton).click();
        wait.until(ExpectedConditions.urlContains("/dashboard"));
    }
    
    public boolean verifySAPServiceStatus() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(sapServiceStatus));
        String status = driver.findElement(sapServiceStatus).getText();
        return status.equalsIgnoreCase("operational");
    }
    
    public boolean verifyAGASMicroserviceStatus() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(agasServiceStatus));
        String status = driver.findElement(agasServiceStatus).getText();
        return status.equalsIgnoreCase("implemented");
    }
    
    public void selectBancoPersonaMoralContractWithMexdolar() {
        wait.until(ExpectedConditions.elementToBeClickable(bancoPersonaMoralContractMexdolar));
        driver.findElement(bancoPersonaMoralContractMexdolar).click();
    }
    
    public void selectBancoContractWithoutMexdolar() {
        wait.until(ExpectedConditions.elementToBeClickable(bancoContractWithoutMexdolar));
        driver.findElement(bancoContractWithoutMexdolar).click();
    }
    
    public void selectCasaDeBolsaContract() {
        wait.until(ExpectedConditions.elementToBeClickable(casaDeBolsaContract));
        driver.findElement(casaDeBolsaContract).click();
    }
    
    public void clickContractValueComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(contractValueComponent));
        driver.findElement(contractValueComponent).click();
    }
    
    public void waitForBreakdownPopup() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
    }
    
    public boolean isUSDCashItemVisible() {
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
    
    public String getMexdolarBalanceFromSAP() {
        // Simulate SAP API call or retrieve from test data
        return "$1,234.56";
    }
    
    public String getCasaDeBolsaDollarAmount() {
        // Simulate getting Casa de Bolsa dollar amount from test data
        return "$5,678.90";
    }
    
    public void closeBreakdownPopup() {
        wait.until(ExpectedConditions.elementToBeClickable(closePopupButton));
        driver.findElement(closePopupButton).click();
    }
}