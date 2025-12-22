package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class SearchPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By magnifyingGlassIcon = By.xpath("//button[@id='search-icon']|//i[@class='fa-magnifying-glass']");
    private By searchScreen = By.id("search-modal");
    private By searchInput = By.id("search-input");
    private By searchButton = By.id("search-submit-btn");
    private By searchResults = By.className("search-results-list");
    private By searchResultItems = By.xpath("//div[@class='search-result-item']");
    private By bpSearchOption = By.id("bp-search-option");
    private By contractSearchOption = By.id("contract-search-option");
    
    public SearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void locateMagnifyingGlassIcon() {
        wait.until(ExpectedConditions.presenceOfElementLocated(magnifyingGlassIcon));
    }
    
    public boolean isMagnifyingGlassPresent() {
        try {
            return driver.findElement(magnifyingGlassIcon).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isMagnifyingGlassVisible() {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(magnifyingGlassIcon));
        return element.isDisplayed();
    }
    
    public void clickMagnifyingGlassIcon() {
        WebElement icon = wait.until(ExpectedConditions.elementToBeClickable(magnifyingGlassIcon));
        icon.click();
    }
    
    public boolean isSearchScreenDisplayed() {
        try {
            WebElement screen = wait.until(ExpectedConditions.visibilityOfElementLocated(searchScreen));
            return screen.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void enterSearchCriteria(String criteria) {
        WebElement input = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
        input.clear();
        input.sendKeys(criteria);
        driver.findElement(searchButton).click();
    }
    
    public boolean areSearchResultsDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(searchResults));
            List<WebElement> results = driver.findElements(searchResultItems);
            return results.size() > 0;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean searchResultsContain(String clientName) {
        List<WebElement> results = driver.findElements(searchResultItems);
        for (WebElement result : results) {
            if (result.getText().contains(clientName)) {
                return true;
            }
        }
        return false;
    }
    
    public void selectClientFromResults(String clientName) {
        List<WebElement> results = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(searchResultItems));
        for (WebElement result : results) {
            if (result.getText().contains(clientName)) {
                result.click();
                break;
            }
        }
    }
}

package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class ClientPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By clientGeneralScreen = By.id("client-general-screen");
    private By clientNameLabel = By.id("client-name");
    private By contractsList = By.className("contracts-list");
    private By contractItems = By.xpath("//div[@class='contract-item']");
    
    public ClientPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean isClientScreenDisplayed() {
        try {
            WebElement screen = wait.until(ExpectedConditions.visibilityOfElementLocated(clientGeneralScreen));
            return screen.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getClientName() {
        WebElement nameElement = wait.until(ExpectedConditions.visibilityOfElementLocated(clientNameLabel));
        return nameElement.getText();
    }
    
    public String selectFirstContract() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(contractsList));
        List<WebElement> contracts = driver.findElements(contractItems);
        if (contracts.size() > 0) {
            WebElement firstContract = contracts.get(0);
            String contractId = firstContract.getAttribute("data-contract-id");
            firstContract.click();
            return contractId;
        }
        return null;
    }
}

package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ContractPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By contractScreen = By.id("contract-screen");
    private By contractValueComponent = By.id("contract-value-component");
    private By contractValueAmount = By.className("contract-value-amount");
    private By contractIdLabel = By.id("contract-id-display");
    
    public ContractPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean isContractLoaded() {
        try {
            WebElement screen = wait.until(ExpectedConditions.visibilityOfElementLocated(contractScreen));
            return screen.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isContractValueComponentDisplayed() {
        try {
            WebElement component = wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent));
            return component.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getContractValue() {
        WebElement valueElement = wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueAmount));
        return valueElement.getText();
    }
    
    public String getDisplayedContractId() {
        WebElement idElement = wait.until(ExpectedConditions.visibilityOfElementLocated(contractIdLabel));
        return idElement.getText();
    }
}