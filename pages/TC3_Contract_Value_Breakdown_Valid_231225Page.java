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

    private By loginButton = By.id("loginBtn");
    private By contractSelector = By.id("contractSelector");
    private By brokerageContractOption = By.xpath("//option[@data-type='Brokerage']");
    private By bankContractOption = By.xpath("//option[@data-type='Bank']");
    private By contractValueComponent = By.id("contractValueComponent");
    private By breakdownButton = By.id("openBreakdownBtn");
    private By breakdownPopup = By.id("breakdownPopup");
    private By purchasingPowerMXNItem = By.xpath("//div[@data-item='purchasingPowerMXN']");
    private By purchasingPowerMXNValue = By.xpath("//div[@data-item='purchasingPowerMXN']//span[@class='value']");
    private By cashMXNItem = By.xpath("//div[@data-item='cashMXN']");
    private By cashMXNValue = By.xpath("//div[@data-item='cashMXN']//span[@class='value']");
    private By closePopupButton = By.xpath("//button[@class='closePopup']");
    private By advisorModuleStatus = By.id("advisorModuleStatus");
    private By sapServicesStatus = By.id("sapServicesStatus");
    private By currentCashData = By.id("currentCashData");
    private By mainAccountData = By.id("mainAccountData");

    public ContractValueBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void navigateToActicenter() {
        driver.get("https://acticenter.app");
    }

    public void login() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
    }

    public boolean isBrokerageContractAvailable() {
        return driver.findElements(brokerageContractOption).size() > 0;
    }

    public boolean isBankContractAvailable() {
        return driver.findElements(bankContractOption).size() > 0;
    }

    public boolean isAdvisorModuleOperational() {
        WebElement status = driver.findElement(advisorModuleStatus);
        return status.getText().equals("operational");
    }

    public boolean areSAPServicesAvailable() {
        WebElement status = driver.findElement(sapServicesStatus);
        return status.getText().equals("available");
    }

    public void selectContractType(String contractType) {
        wait.until(ExpectedConditions.elementToBeClickable(contractSelector)).click();
        if (contractType.equals("Brokerage")) {
            wait.until(ExpectedConditions.elementToBeClickable(brokerageContractOption)).click();
        } else if (contractType.equals("Bank")) {
            wait.until(ExpectedConditions.elementToBeClickable(bankContractOption)).click();
        }
    }

    public boolean isContractValueComponentVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent)).isDisplayed();
    }

    public void openContractBreakdown() {
        wait.until(ExpectedConditions.elementToBeClickable(breakdownButton)).click();
    }

    public boolean isBreakdownPopupVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup)).isDisplayed();
    }

    public boolean isPurchasingPowerMXNVisible() {
        return driver.findElements(purchasingPowerMXNItem).size() > 0 && 
               driver.findElement(purchasingPowerMXNItem).isDisplayed();
    }

    public boolean isCashMXNVisible() {
        return driver.findElements(cashMXNItem).size() > 0 && 
               driver.findElement(cashMXNItem).isDisplayed();
    }

    public String getPurchasingPowerMXNValue() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(purchasingPowerMXNValue)).getText();
    }

    public String getCashMXNValue() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(cashMXNValue)).getText();
    }

    public String getCurrentCashFromAdvisor() {
        return driver.findElement(currentCashData).getAttribute("data-value");
    }

    public String getMainAccountBalance() {
        return driver.findElement(mainAccountData).getAttribute("data-value");
    }

    public void closeBreakdownPopup() {
        wait.until(ExpectedConditions.elementToBeClickable(closePopupButton)).click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(breakdownPopup));
    }

    public boolean isBankContractSelected() {
        WebElement selector = driver.findElement(contractSelector);
        return selector.getAttribute("data-selected-type").equals("Bank");
    }
}