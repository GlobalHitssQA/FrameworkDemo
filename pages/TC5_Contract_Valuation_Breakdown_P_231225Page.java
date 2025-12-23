package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class ContractValuationPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By totalValueComponent = By.id("total-value-component");
    private By breakdownPopup = By.xpath("//div[@class='breakdown-popup']");
    private By breakdownItems = By.xpath("//div[@class='breakdown-popup']//div[@class='breakdown-item']");
    private By outsidePopupArea = By.xpath("//body");
    private By contractContainer = By.id("contract-container");
    private By breakdownList = By.xpath("//div[@class='breakdown-list']");
    
    public ContractValuationPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void setViewportToLandscape() {
        driver.manage().window().setSize(new Dimension(1024, 768));
    }
    
    public void setViewportToPortrait() {
        driver.manage().window().setSize(new Dimension(768, 1024));
    }
    
    public boolean isContractLoadedInLandscape() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractContainer));
        return driver.findElement(contractContainer).isDisplayed();
    }
    
    public boolean isContractLoadedInPortrait() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractContainer));
        return driver.findElement(contractContainer).isDisplayed();
    }
    
    public void clickTotalValueComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(totalValueComponent));
        driver.findElement(totalValueComponent).click();
    }
    
    public boolean isPopupDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
            return driver.findElement(breakdownPopup).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean areAllBreakdownItemsVisible() {
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(breakdownItems));
        return driver.findElements(breakdownItems).size() > 0;
    }
    
    public void clickOutsidePopup() {
        wait.until(ExpectedConditions.elementToBeClickable(outsidePopupArea));
        WebElement body = driver.findElement(outsidePopupArea);
        body.click();
    }
    
    public boolean isBreakdownVerticallyAligned() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownList));
        WebElement breakdown = driver.findElement(breakdownList);
        String alignment = breakdown.getCssValue("flex-direction");
        return alignment.equals("column") || alignment.equals("vertical");
    }
    
    public void testPopupAcrossMultipleViewportChanges() {
        for (int i = 0; i < 3; i++) {
            setViewportToLandscape();
            clickTotalValueComponent();
            clickOutsidePopup();
            
            setViewportToPortrait();
            clickTotalValueComponent();
            clickOutsidePopup();
        }
    }
    
    public boolean isPopupFunctionalAcrossViewports() {
        setViewportToLandscape();
        clickTotalValueComponent();
        boolean landscapeOpen = isPopupDisplayed();
        clickOutsidePopup();
        boolean landscapeClosed = !isPopupDisplayed();
        
        setViewportToPortrait();
        clickTotalValueComponent();
        boolean portraitOpen = isPopupDisplayed();
        clickOutsidePopup();
        boolean portraitClosed = !isPopupDisplayed();
        
        return landscapeOpen && landscapeClosed && portraitOpen && portraitClosed;
    }
    
    public boolean isBreakdownAlignmentCorrectInAllViews() {
        setViewportToLandscape();
        clickTotalValueComponent();
        boolean landscapeAlignment = isBreakdownVerticallyAligned();
        clickOutsidePopup();
        
        setViewportToPortrait();
        clickTotalValueComponent();
        boolean portraitAlignment = isBreakdownVerticallyAligned();
        clickOutsidePopup();
        
        return landscapeAlignment && portraitAlignment;
    }
}