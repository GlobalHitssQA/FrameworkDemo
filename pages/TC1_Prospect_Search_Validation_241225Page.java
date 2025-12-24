package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ProspectSearchPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators - Based on best practices and semantic conventions
    private By searchInput = By.id("prospect-search-input");
    private By searchInputAlt = By.cssSelector("[data-testid='prospect-search-field']");
    private By searchButton = By.id("prospect-search-btn");
    private By searchButtonAlt = By.cssSelector("[data-testid='search-button']");
    private By searchButtonIcon = By.cssSelector(".search-icon, .lupa-icon");
    private By resultsContainer = By.id("prospect-results-container");
    private By resultsContainerAlt = By.cssSelector("[data-testid='search-results']");
    private By noResultsMessage = By.className("no-results-message");
    private By noResultsMessageAlt = By.cssSelector("[data-testid='no-results-message']");
    private By noResultsMessageXPath = By.xpath("//div[contains(@class, 'no-results') or contains(text(), 'No se encontraron') or contains(text(), 'No results')]");
    private By loadingSpinner = By.className("loading-spinner");
    private By loadingSpinnerAlt = By.cssSelector("[data-testid='loading-indicator']");
    
    public ProspectSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToProspectSearch() {
        // Navigate to Acticenter prospect search screen
        // URL would be something like: driver.get("https://acticenter.actinver.com/prospects/search");
    }
    
    public boolean isSearchFieldDisplayed() {
        try {
            return driver.findElement(searchInput).isDisplayed();
        } catch (Exception e) {
            try {
                return driver.findElement(searchInputAlt).isDisplayed();
            } catch (Exception ex) {
                return false;
            }
        }
    }
    
    public void enterSearchTerm(String searchTerm) {
        WebElement searchField = getSearchInputElement();
        wait.until(ExpectedConditions.visibilityOf(searchField));
        searchField.clear();
        searchField.sendKeys(searchTerm);
    }
    
    public void clickSearchButton() {
        WebElement button = getSearchButtonElement();
        wait.until(ExpectedConditions.elementToBeClickable(button));
        button.click();
    }
    
    public void pressEnterOnSearchField() {
        WebElement searchField = getSearchInputElement();
        searchField.sendKeys(Keys.ENTER);
    }
    
    public void waitForSearchToComplete() {
        try {
            // Wait for loading spinner to appear and disappear
            wait.until(ExpectedConditions.visibilityOfElementLocated(loadingSpinner));
            wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingSpinner));
        } catch (Exception e) {
            try {
                wait.until(ExpectedConditions.visibilityOfElementLocated(loadingSpinnerAlt));
                wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingSpinnerAlt));
            } catch (Exception ex) {
                // If no loading spinner, wait for results container to be visible
                wait.until(ExpectedConditions.visibilityOfElementLocated(resultsContainer));
            }
        }
    }
    
    public boolean isSearchCompleted() {
        try {
            return driver.findElement(resultsContainer).isDisplayed() || 
                   driver.findElement(resultsContainerAlt).isDisplayed() ||
                   isNoResultsMessageDisplayed();
        } catch (Exception e) {
            return isNoResultsMessageDisplayed();
        }
    }
    
    public boolean isNoResultsMessageDisplayed() {
        try {
            return driver.findElement(noResultsMessage).isDisplayed();
        } catch (Exception e) {
            try {
                return driver.findElement(noResultsMessageAlt).isDisplayed();
            } catch (Exception ex) {
                try {
                    return driver.findElement(noResultsMessageXPath).isDisplayed();
                } catch (Exception exc) {
                    return false;
                }
            }
        }
    }
    
    public String getNoResultsMessageText() {
        try {
            return driver.findElement(noResultsMessage).getText();
        } catch (Exception e) {
            try {
                return driver.findElement(noResultsMessageAlt).getText();
            } catch (Exception ex) {
                try {
                    return driver.findElement(noResultsMessageXPath).getText();
                } catch (Exception exc) {
                    return "";
                }
            }
        }
    }
    
    private WebElement getSearchInputElement() {
        try {
            return driver.findElement(searchInput);
        } catch (Exception e) {
            return driver.findElement(searchInputAlt);
        }
    }
    
    private WebElement getSearchButtonElement() {
        try {
            return driver.findElement(searchButton);
        } catch (Exception e) {
            try {
                return driver.findElement(searchButtonAlt);
            } catch (Exception ex) {
                return driver.findElement(searchButtonIcon);
            }
        }
    }
}