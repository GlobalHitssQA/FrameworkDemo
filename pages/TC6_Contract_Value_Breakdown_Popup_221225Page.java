package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;
import java.util.List;

public class ContractValueBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private Actions actions;
    
    private By contractValueComponent = By.id("contract-value-component");
    private By breakdownPopup = By.className("breakdown-popup");
    private By breakdownItems = By.xpath("//div[@class='breakdown-popup']//div[@class='breakdown-item']");
    private By totalContractValue = By.id("total-contract-value");
    private By outsideArea = By.tagName("body");
    private By loginUsername = By.id("username");
    private By loginPassword = By.id("password");
    private By loginButton = By.id("login-btn");
    private By contractsList = By.className("contracts-list");
    private By firstContract = By.xpath("//div[@class='contracts-list']//div[@class='contract-item'][1]");
    
    public ContractValueBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.actions = new Actions(driver);
    }
    
    public void navigateToActicenter() {
        driver.get("https://acticenter.example.com");
    }
    
    public void performLogin() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(loginUsername));
        driver.findElement(loginUsername).sendKeys("testuser");
        driver.findElement(loginPassword).sendKeys("testpass");
        driver.findElement(loginButton).click();
    }
    
    public void selectContract() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractsList));
        driver.findElement(firstContract).click();
    }
    
    public void accessContract() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent));
    }
    
    public boolean isContractValueComponentVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void clickContractValueComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(contractValueComponent)).click();
    }
    
    public boolean isBreakdownPopupDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isBreakdownPopupVisible() {
        try {
            WebElement popup = driver.findElement(breakdownPopup);
            return popup.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean areAllBreakdownItemsVisible() {
        try {
            List<WebElement> items = driver.findElements(breakdownItems);
            return items.size() > 0 && items.stream().allMatch(WebElement::isDisplayed);
        } catch (Exception e) {
            return false;
        }
    }
    
    public void clickOutsideBreakdownPopup() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("document.body.click();");
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    public boolean isTotalContractValueDisplayed() {
        try {
            return driver.findElement(totalContractValue).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void clickMultipleAreasOutsidePopup() {
        clickContractValueComponent();
        wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
        
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("document.elementFromPoint(50, 50).click();");
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    public void clickInsideBreakdownPopup() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
        WebElement popup = driver.findElement(breakdownPopup);
        actions.moveToElement(popup).click().perform();
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}