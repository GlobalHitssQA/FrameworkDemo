package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ContractValuePage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By contractInformation = By.id("contract-info-container");
    private By totalValueComponent = By.id("total-value-component");
    private By totalValueAmount = By.xpath("//div[@id='total-value-component']//span[@class='amount']");
    private By breakdownPopup = By.id("breakdown-popup");
    private By cashMXNItem = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Efectivo MXN')]");
    private By cashMXNValue = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Efectivo MXN')]//span[@class='value']");
    private By cashUSDItem = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Efectivo USD')]");
    private By pendingSettlementsItem = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Pendientes por liquidar')]");
    private By debtFundsItem = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Fondos de deuda')]");
    private By hedgeFundsItem = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Fondos de cobertura')]");
    private By equityFundsItem = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Fondos de renta variable')]");
    private By cdsAndNotesItem = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Cedes y pagarés')]");
    private By moneyMarketItem = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Mercado de dinero')]");
    private By capitalMarketItem = By.xpath("//div[@id='breakdown-popup']//li[contains(text(),'Mercado de capitales')]");
    private By outsidePopupArea = By.id("main-content");
    
    public ContractValuePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean isContractInformationDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(contractInformation));
            return driver.findElement(contractInformation).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isTotalValueComponentVisible() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(totalValueComponent));
            return driver.findElement(totalValueComponent).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getTotalValueAmount() {
        try {
            return driver.findElement(totalValueAmount).getText();
        } catch (Exception e) {
            return null;
        }
    }
    
    public void clickTotalValueComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(totalValueComponent));
        driver.findElement(totalValueComponent).click();
    }
    
    public boolean isBreakdownPopupVisible() {
        try {
            return driver.findElement(breakdownPopup).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isCashMXNPresent() {
        try {
            return driver.findElement(cashMXNItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getCashMXNValue() {
        try {
            return driver.findElement(cashMXNValue).getText();
        } catch (Exception e) {
            return null;
        }
    }
    
    public boolean isCashUSDPresent() {
        try {
            return driver.findElement(cashUSDItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isPendingSettlementsPresent() {
        try {
            return driver.findElement(pendingSettlementsItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isDebtFundsPresent() {
        try {
            return driver.findElement(debtFundsItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isHedgeFundsPresent() {
        try {
            return driver.findElement(hedgeFundsItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isEquityFundsPresent() {
        try {
            return driver.findElement(equityFundsItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isCDsAndNotesPresent() {
        try {
            return driver.findElement(cdsAndNotesItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isMoneyMarketPresent() {
        try {
            return driver.findElement(moneyMarketItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isCapitalMarketPresent() {
        try {
            return driver.findElement(capitalMarketItem).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isBreakdownAlignedWithTotalValue() {
        try {
            WebElement totalValue = driver.findElement(totalValueComponent);
            WebElement popup = driver.findElement(breakdownPopup);
            int totalValueX = totalValue.getLocation().getX();
            int popupX = popup.getLocation().getX();
            return Math.abs(totalValueX - popupX) <= 5;
        } catch (Exception e) {
            return false;
        }
    }
    
    public void clickOutsidePopup() {
        wait.until(ExpectedConditions.elementToBeClickable(outsidePopupArea));
        driver.findElement(outsidePopupArea).click();
    }
}