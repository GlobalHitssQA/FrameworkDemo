package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class ContractBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By usernameInput = By.id("username");
    private By passwordInput = By.id("password");
    private By loginButton = By.id("loginBtn");
    private By contractValueComponent = By.xpath("//div[@class='contract-value-total']");
    private By breakdownPopup = By.xpath("//div[@class='breakdown-popup']");
    private By popupOverlay = By.xpath("//div[@class='popup-overlay']");
    private By bodyElement = By.tagName("body");
    private By bancaPatrimonialOption = By.xpath("//div[@data-segment='banca-patrimonial']");
    private By bancaPrivadaOption = By.xpath("//div[@data-segment='banca-privada']");
    private By wealthManagementOption = By.xpath("//div[@data-segment='wealth-management']");
    private By personaFisicaContract = By.xpath("//select[@id='contract-type']/option[@value='persona-fisica']");
    private By personaMoralContract = By.xpath("//select[@id='contract-type']/option[@value='persona-moral']");
    private By contractSelector = By.id("contract-type");
    
    private static final int LANDSCAPE_WIDTH = 1024;
    private static final int LANDSCAPE_HEIGHT = 768;
    private static final int PORTRAIT_WIDTH = 768;
    private static final int PORTRAIT_HEIGHT = 1024;
    
    public ContractBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void login() {
        driver.get("https://acticenter.example.com");
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameInput));
        driver.findElement(usernameInput).sendKeys("testuser");
        driver.findElement(passwordInput).sendKeys("testpassword");
        driver.findElement(loginButton).click();
        wait.until(ExpectedConditions.urlContains("/dashboard"));
    }
    
    public boolean verifyTestContractsAvailable() {
        wait.until(ExpectedConditions.presenceOfElementLocated(contractSelector));
        return driver.findElement(contractSelector).isDisplayed();
    }
    
    public void setLandscapeOrientation() {
        driver.manage().window().setSize(new Dimension(LANDSCAPE_WIDTH, LANDSCAPE_HEIGHT));
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    public void setPortraitOrientation() {
        driver.manage().window().setSize(new Dimension(PORTRAIT_WIDTH, PORTRAIT_HEIGHT));
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    public void selectBankingSegment(String segment) {
        By segmentLocator;
        switch(segment) {
            case "Banca Patrimonial":
                segmentLocator = bancaPatrimonialOption;
                break;
            case "Banca Privada":
                segmentLocator = bancaPrivadaOption;
                break;
            case "Wealth Management":
                segmentLocator = wealthManagementOption;
                break;
            default:
                throw new IllegalArgumentException("Invalid banking segment: " + segment);
        }
        wait.until(ExpectedConditions.elementToBeClickable(segmentLocator));
        driver.findElement(segmentLocator).click();
    }
    
    public void selectContract(String contractType) {
        By contractLocator;
        switch(contractType) {
            case "Persona Fisica":
                contractLocator = personaFisicaContract;
                break;
            case "Persona Moral":
                contractLocator = personaMoralContract;
                break;
            default:
                throw new IllegalArgumentException("Invalid contract type: " + contractType);
        }
        wait.until(ExpectedConditions.elementToBeClickable(contractSelector));
        driver.findElement(contractSelector).click();
        wait.until(ExpectedConditions.elementToBeClickable(contractLocator));
        driver.findElement(contractLocator).click();
    }
    
    public boolean isLandscapeMode() {
        Dimension size = driver.manage().window().getSize();
        return size.getWidth() > size.getHeight();
    }
    
    public boolean isPortraitMode() {
        Dimension size = driver.manage().window().getSize();
        return size.getHeight() > size.getWidth();
    }
    
    public boolean isBankingSegmentActive(String segment) {
        By segmentLocator;
        switch(segment) {
            case "Banca Patrimonial":
                segmentLocator = bancaPatrimonialOption;
                break;
            case "Banca Privada":
                segmentLocator = bancaPrivadaOption;
                break;
            case "Wealth Management":
                segmentLocator = wealthManagementOption;
                break;
            default:
                return false;
        }
        WebElement element = driver.findElement(segmentLocator);
        return element.getAttribute("class").contains("active");
    }
    
    public void clickContractValueComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(contractValueComponent));
        driver.findElement(contractValueComponent).click();
    }
    
    public boolean isBreakdownPopupDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
        return driver.findElement(breakdownPopup).isDisplayed();
    }
    
    public void clickOutsideBreakdownPopup() {
        wait.until(ExpectedConditions.elementToBeClickable(bodyElement));
        WebElement body = driver.findElement(bodyElement);
        body.click();
    }
    
    public boolean isBreakdownPopupClosed() {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(breakdownPopup));
        return driver.findElements(breakdownPopup).isEmpty() || 
               !driver.findElement(breakdownPopup).isDisplayed();
    }
}