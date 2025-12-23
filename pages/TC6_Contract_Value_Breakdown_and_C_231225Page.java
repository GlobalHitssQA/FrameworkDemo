package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;
import java.util.regex.Pattern;

public class ContractValueBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By loginButton = By.id("login-btn");
    private By contractSelector = By.xpath("//select[@id='contract-selector']");
    private By contractWithZeroValues = By.xpath("//option[contains(@data-zero-values, 'true')]");
    private By contractValueComponent = By.id("contract-value-component");
    private By openBreakdownButton = By.xpath("//button[@id='open-breakdown-btn']");
    private By breakdownPopup = By.id("breakdown-popup");
    private By zeroValueItems = By.xpath("//div[@class='breakdown-item']//span[contains(text(), '$0.00')]");
    private By allBreakdownItems = By.xpath("//div[@class='breakdown-item']//span[@class='item-value']");
    private By closePopupButton = By.xpath("//button[@id='close-breakdown-popup']");
    private By searchMagnifyingGlassDesktop = By.xpath("//button[@id='search-icon-desktop']");
    private By searchMagnifyingGlassResponsive = By.xpath("//button[@id='search-icon-responsive']");
    private By generalClientScreen = By.id("general-client-screen");
    private By searchResultsList = By.xpath("//div[@id='search-results']//div[@class='contract-item']");
    private By selectedContract = By.xpath("//div[@class='contract-selected']");
    private By responsiveViewToggle = By.id("responsive-view-toggle");
    private By searchInputIndividual = By.id("search-individual");
    private By searchInputCorporate = By.id("search-corporate");
    private By searchInputBank = By.id("search-bank");
    private By searchInputBrokerageHouse = By.id("search-brokerage-house");
    private By searchResultsIndividual = By.xpath("//div[@data-type='individual'][@class='search-result']");
    private By searchResultsCorporate = By.xpath("//div[@data-type='corporate'][@class='search-result']");
    private By searchResultsBank = By.xpath("//div[@data-type='bank'][@class='search-result']");
    private By searchResultsBrokerageHouse = By.xpath("//div[@data-type='brokerage-house'][@class='search-result']");
    private By headerSearchInput = By.xpath("//header//input[@id='header-search']");
    private By headerSearchButton = By.xpath("//header//button[@id='header-search-btn']");
    private By headerSearchResults = By.xpath("//header//div[@id='header-search-results']");
    
    public ContractValueBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToActicenter() {
        driver.get("https://acticenter.example.com");
    }
    
    public boolean isUserAuthenticated() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(contractSelector));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean areZeroValueContractsAvailable() {
        List<WebElement> contracts = driver.findElements(contractWithZeroValues);
        return !contracts.isEmpty();
    }
    
    public boolean areAllContractTypesAvailable() {
        return driver.findElements(By.xpath("//option[@data-type='individual']")).size() > 0 &&
               driver.findElements(By.xpath("//option[@data-type='corporate']")).size() > 0 &&
               driver.findElements(By.xpath("//option[@data-type='bank']")).size() > 0 &&
               driver.findElements(By.xpath("//option[@data-type='brokerage-house']")).size() > 0;
    }
    
    public void selectContractWithZeroValueItems() {
        wait.until(ExpectedConditions.elementToBeClickable(contractWithZeroValues)).click();
    }
    
    public void viewContractValueComponent() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent));
    }
    
    public boolean isContractValueComponentVisible() {
        return driver.findElement(contractValueComponent).isDisplayed();
    }
    
    public void openValueBreakdown() {
        wait.until(ExpectedConditions.elementToBeClickable(openBreakdownButton)).click();
    }
    
    public boolean isBreakdownPopupDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup)).isDisplayed();
    }
    
    public void checkZeroValueItems() {
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(zeroValueItems));
    }
    
    public boolean allZeroValueItemsDisplayCorrectly() {
        List<WebElement> items = driver.findElements(zeroValueItems);
        for (WebElement item : items) {
            if (!item.getText().contains("$0.00")) {
                return false;
            }
        }
        return items.size() > 0;
    }
    
    public boolean zeroValueFormatHasTwoDecimals() {
        List<WebElement> items = driver.findElements(zeroValueItems);
        Pattern pattern = Pattern.compile("\\$0\\.00");
        for (WebElement item : items) {
            if (!pattern.matcher(item.getText()).find()) {
                return false;
            }
        }
        return true;
    }
    
    public void closeBreakdownPopup() {
        wait.until(ExpectedConditions.elementToBeClickable(closePopupButton)).click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(breakdownPopup));
    }
    
    public void clickSearchMagnifyingGlassDesktop() {
        wait.until(ExpectedConditions.elementToBeClickable(searchMagnifyingGlassDesktop)).click();
    }
    
    public boolean isGeneralClientScreenDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(generalClientScreen)).isDisplayed();
    }
    
    public void selectContractFromSearch() {
        List<WebElement> results = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(searchResultsList));
        if (!results.isEmpty()) {
            results.get(0).click();
        }
    }
    
    public boolean isContractSelectedAndDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedContract)).isDisplayed();
    }
    
    public void switchToResponsiveView() {
        wait.until(ExpectedConditions.elementToBeClickable(responsiveViewToggle)).click();
    }
    
    public void clickSearchMagnifyingGlassResponsive() {
        wait.until(ExpectedConditions.elementToBeClickable(searchMagnifyingGlassResponsive)).click();
    }
    
    public boolean isGeneralClientScreenDisplayedResponsive() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(generalClientScreen)).isDisplayed();
    }
    
    public void selectAnotherContractFromSearchResponsive() {
        List<WebElement> results = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(searchResultsList));
        if (results.size() > 1) {
            results.get(1).click();
        }
    }
    
    public boolean canSelectContractInResponsive() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedContract)).isDisplayed();
    }
    
    public void searchForIndividualContracts() {
        WebElement searchInput = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInputIndividual));
        searchInput.clear();
        searchInput.sendKeys("Individual");
    }
    
    public void searchForCorporateContracts() {
        WebElement searchInput = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInputCorporate));
        searchInput.clear();
        searchInput.sendKeys("Corporate");
    }
    
    public boolean hasIndividualContractResults() {
        return driver.findElements(searchResultsIndividual).size() > 0;
    }
    
    public boolean hasCorporateContractResults() {
        return driver.findElements(searchResultsCorporate).size() > 0;
    }
    
    public void searchForBankContracts() {
        WebElement searchInput = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInputBank));
        searchInput.clear();
        searchInput.sendKeys("Bank");
    }
    
    public void searchForBrokerageHouseContracts() {
        WebElement searchInput = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInputBrokerageHouse));
        searchInput.clear();
        searchInput.sendKeys("Brokerage House");
    }
    
    public boolean hasBankContractResults() {
        return driver.findElements(searchResultsBank).size() > 0;
    }
    
    public boolean hasBrokerageHouseContractResults() {
        return driver.findElements(searchResultsBrokerageHouse).size() > 0;
    }
    
    public void performSearchInHeaderDesktop() {
        WebElement headerSearch = wait.until(ExpectedConditions.visibilityOfElementLocated(headerSearchInput));
        headerSearch.clear();
        headerSearch.sendKeys("test contract");
        wait.until(ExpectedConditions.elementToBeClickable(headerSearchButton)).click();
    }
    
    public boolean isHeaderSearchFunctional() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(headerSearchResults)).isDisplayed();
    }
}