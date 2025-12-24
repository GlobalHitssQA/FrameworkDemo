package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;
import java.util.ArrayList;

public class ProspectSearchPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators - Based on best practices with semantic naming
    private By prospectSearchMenu = By.cssSelector("[data-testid='prospect-search-menu']");
    private By searchInputField = By.id("prospect-search-input");
    private By searchButton = By.cssSelector("[data-testid='search-button']");
    private By searchResultsContainer = By.className("search-results-container");
    private By searchResultItems = By.cssSelector(".search-result-item");
    private By prospectNameInResult = By.className("prospect-name");
    private By loadingSpinner = By.className("loading-spinner");
    private By noResultsMessage = By.cssSelector("[data-testid='no-results-message']");
    
    public ProspectSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToProspectSearch() {
        WebElement searchMenu = wait.until(ExpectedConditions.elementToBeClickable(prospectSearchMenu));
        searchMenu.click();
    }
    
    public void enterSearchText(String searchText) {
        WebElement searchInput = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInputField));
        searchInput.clear();
        searchInput.sendKeys(searchText);
    }
    
    public void clickSearchButton() {
        WebElement btnSearch = wait.until(ExpectedConditions.elementToBeClickable(searchButton));
        btnSearch.click();
    }
    
    public void waitForSearchResults() {
        // Wait for loading spinner to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingSpinner));
        // Wait for results container to be visible
        wait.until(ExpectedConditions.visibilityOfElementLocated(searchResultsContainer));
    }
    
    public boolean areSearchResultsDisplayed() {
        try {
            WebElement resultsContainer = driver.findElement(searchResultsContainer);
            return resultsContainer.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public List<String> getSearchResultNames() {
        List<String> prospectNames = new ArrayList<>();
        List<WebElement> resultItems = driver.findElements(searchResultItems);
        
        for (WebElement item : resultItems) {
            try {
                WebElement nameElement = item.findElement(prospectNameInResult);
                prospectNames.add(nameElement.getText().trim());
            } catch (Exception e) {
                // Skip if element not found
            }
        }
        
        return prospectNames;
    }
    
    public boolean isNoResultsMessageDisplayed() {
        try {
            WebElement noResults = driver.findElement(noResultsMessage);
            return noResults.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public int getSearchResultsCount() {
        List<WebElement> results = driver.findElements(searchResultItems);
        return results.size();
    }
}