package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;
import java.util.List;

public class ContractValuePage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By contractValueComponent = By.id("contract-value-component");
    private By valueBreakdownButton = By.xpath("//button[@class='value-breakdown-btn']");
    private By breakdownPopup = By.id("breakdown-popup");
    private By zeroValueItems = By.xpath("//div[@class='item-value' and text()='$0.00']");
    private By closePopupButton = By.xpath("//button[@class='close-popup']");
    private By searchMagnifyingGlass = By.id("search-magnifying-glass");
    private By generalClientScreen = By.id("general-client-screen");
    private By contractSearchResults = By.xpath("//div[@class='contract-search-result']");
    private By selectedContract = By.xpath("//div[@class='selected-contract']");
    private By responsiveViewToggle = By.id("responsive-view-toggle");
    private By searchInput = By.id("contract-search-input");
    private By searchButton = By.id("search-button");
    private By searchResultsList = By.xpath("//ul[@class='search-results']/li");
    private By headerSearch = By.id("header-search");
    private By headerSearchInput = By.xpath("//input[@id='header-search-input']");
    private By headerSearchButton = By.xpath("//button[@id='header-search-btn']");
    
    public ContractValuePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void verifyUserAuthenticated() {
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("user-dashboard")));
    }
    
    public void verifyZeroValueContractsAvailable() {
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@class='contract' and @data-has-zero-values='true']")));
    }
    
    public void verifyDifferentContractTypesAvailable() {
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath("//div[@class='contract']")));
    }
    
    public void selectContractWithZeroValues() {
        WebElement contract = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[@class='contract' and @data-has-zero-values='true']")));
        contract.click();
    }
    
    public boolean isContractValueComponentDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent)).isDisplayed();
    }
    
    public void openValueBreakdown() {
        WebElement breakdownBtn = wait.until(ExpectedConditions.elementToBeClickable(valueBreakdownButton));
        breakdownBtn.click();
    }
    
    public boolean isBreakdownPopupDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup)).isDisplayed();
    }
    
    public boolean verifyZeroValueItemsShowCorrectly() {
        List<WebElement> items = driver.findElements(zeroValueItems);
        for (WebElement item : items) {
            if (!item.getText().equals("$0.00")) {
                return false;
            }
        }
        return items.size() > 0;
    }
    
    public boolean verifyCurrencyFormatWithTwoDecimals() {
        List<WebElement> items = driver.findElements(zeroValueItems);
        for (WebElement item : items) {
            String text = item.getText();
            if (!text.matches("\\$\\d+\\.\\d{2}")) {
                return false;
            }
        }
        return true;
    }
    
    public void closeBreakdownPopup() {
        WebElement closeBtn = wait.until(ExpectedConditions.elementToBeClickable(closePopupButton));
        closeBtn.click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(breakdownPopup));
    }
    
    public void clickSearchMagnifyingGlass() {
        WebElement searchIcon = wait.until(ExpectedConditions.elementToBeClickable(searchMagnifyingGlass));
        searchIcon.click();
    }
    
    public boolean isGeneralClientScreenDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(generalClientScreen)).isDisplayed();
    }
    
    public void selectContractFromSearchResults() {
        WebElement firstResult = wait.until(ExpectedConditions.elementToBeClickable(contractSearchResults));
        firstResult.click();
    }
    
    public boolean isContractDisplayedCorrectly() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedContract)).isDisplayed();
    }
    
    public void switchToResponsiveView() {
        WebElement toggleBtn = wait.until(ExpectedConditions.elementToBeClickable(responsiveViewToggle));
        toggleBtn.click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//body[@class='responsive-view']")));
    }
    
    public void searchByContractType(String contractType) {
        WebElement searchField = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
        searchField.clear();
        searchField.sendKeys(contractType);
        WebElement searchBtn = driver.findElement(searchButton);
        searchBtn.click();
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(searchResultsList));
    }
    
    public boolean hasSearchResults() {
        List<WebElement> results = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(searchResultsList));
        return results.size() > 0;
    }
    
    public void verifyHeaderSearchFunctionality() {
        WebElement headerSearchElement = wait.until(ExpectedConditions.visibilityOfElementLocated(headerSearch));
        headerSearchElement.click();
    }
    
    public boolean isHeaderSearchWorking() {
        WebElement headerInput = wait.until(ExpectedConditions.visibilityOfElementLocated(headerSearchInput));
        headerInput.sendKeys("test contract");
        WebElement headerBtn = driver.findElement(headerSearchButton);
        headerBtn.click();
        List<WebElement> results = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(searchResultsList));
        return results.size() > 0;
    }
}