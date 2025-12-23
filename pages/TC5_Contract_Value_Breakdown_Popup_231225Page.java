package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

public class ContractValueBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By usernameInput = By.id("username");
    private By passwordInput = By.id("password");
    private By loginButton = By.id("loginBtn");
    private By contractValueComponent = By.xpath("//div[@class='contract-value-total']|//div[contains(@class,'valor-total-contrato')]");
    private By breakdownPopup = By.xpath("//div[@class='breakdown-popup']|//div[contains(@class,'popup-desglose')]");
    private By pageBody = By.tagName("body");
    private By bankingSegmentSelector = By.id("bankingSegment");
    private By contractTypeSelector = By.id("contractType");
    private By pageLoader = By.className("loader");
    private By responsiveContainer = By.className("responsive-container");
    
    public ContractValueBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToActicenter() {
        driver.get("https://acticenter.test.com");
        driver.manage().window().maximize();
    }
    
    public void login() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameInput));
        driver.findElement(usernameInput).sendKeys("testuser");
        driver.findElement(passwordInput).sendKeys("testpass123");
        driver.findElement(loginButton).click();
        waitForPageLoad();
    }
    
    public boolean verifyTestContractsAvailable() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(contractValueComponent));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public void configureResponsiveEmulation() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("document.body.classList.add('responsive-mode');");
    }
    
    public void setResponsiveMode(String orientation) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Map<String, Object> deviceMetrics = new HashMap<>();
        
        if (orientation.equalsIgnoreCase("landscape")) {
            deviceMetrics.put("width", 926);
            deviceMetrics.put("height", 428);
            deviceMetrics.put("deviceScaleFactor", 1);
            deviceMetrics.put("mobile", true);
        } else if (orientation.equalsIgnoreCase("portrait")) {
            deviceMetrics.put("width", 428);
            deviceMetrics.put("height", 926);
            deviceMetrics.put("deviceScaleFactor", 1);
            deviceMetrics.put("mobile", true);
        }
        
        Map<String, Object> params = new HashMap<>();
        params.put("deviceMetrics", deviceMetrics);
        
        ((JavascriptExecutor) driver).executeScript(
            "return window.matchMedia('(orientation: " + orientation + ")').matches"
        );
        
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    public void selectBankingSegment(String segment) {
        wait.until(ExpectedConditions.elementToBeClickable(bankingSegmentSelector));
        WebElement segmentDropdown = driver.findElement(bankingSegmentSelector);
        segmentDropdown.click();
        By segmentOption = By.xpath("//option[contains(text(),'" + segment + "')]");
        wait.until(ExpectedConditions.elementToBeClickable(segmentOption)).click();
    }
    
    public void selectContractType(String contractType) {
        wait.until(ExpectedConditions.elementToBeClickable(contractTypeSelector));
        WebElement typeDropdown = driver.findElement(contractTypeSelector);
        typeDropdown.click();
        By typeOption = By.xpath("//option[contains(text(),'" + contractType + "')]");
        wait.until(ExpectedConditions.elementToBeClickable(typeOption)).click();
    }
    
    public void waitForPageLoad() {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(pageLoader));
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    public void clickContractValueComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(contractValueComponent));
        WebElement component = driver.findElement(contractValueComponent);
        component.click();
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    public void clickOutsidePopup() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
        WebElement body = driver.findElement(pageBody);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", body);
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    public boolean isBreakdownPopupDisplayed() {
        try {
            WebElement popup = wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
            return popup.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isLandscapeModeActive() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Object result = js.executeScript(
            "return window.matchMedia('(orientation: landscape)').matches || window.innerWidth > window.innerHeight;"
        );
        return (Boolean) result;
    }
    
    public boolean isPortraitModeActive() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Object result = js.executeScript(
            "return window.matchMedia('(orientation: portrait)').matches || window.innerHeight > window.innerWidth;"
        );
        return (Boolean) result;
    }
}