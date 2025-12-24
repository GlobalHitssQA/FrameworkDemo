package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ProspectSearchPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators - Inferidos basados en mejores prácticas de naming
    private By searchInput = By.id("prospect-search-input");
    private By searchButton = By.cssSelector("[data-testid='search-button']");
    private By searchIcon = By.cssSelector(".search-icon, .lupa-icon");
    private By searchResultsContainer = By.id("search-results-container");
    private By noResultsMessage = By.cssSelector("[data-testid='no-results-message']");
    private By noResultsMessageAlt = By.className("no-results-message");
    private By loadingSpinner = By.cssSelector(".loading-spinner, [data-testid='loading-indicator']");
    private By prospectSearchScreen = By.id("prospect-search-screen");
    private By dashboardHeader = By.cssSelector("[data-testid='advisor-dashboard-header']");
    private By userMenu = By.cssSelector(".user-menu, [data-testid='user-menu']");
    
    public ProspectSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void navigateToProspectSearch() {
        // Assuming this is the default URL or navigate from dashboard
        // driver.get("https://acticenter.actinver.com/prospect-search");
        // Or click on menu item to access prospect search
    }

    public boolean isProspectSearchScreenDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(prospectSearchScreen));
            return driver.findElement(searchInput).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void enterSearchTerm(String searchTerm) {
        WebElement input = wait.until(ExpectedConditions.elementToBeClickable(searchInput));
        input.clear();
        input.sendKeys(searchTerm);
    }

    public String getSearchInputValue() {
        return driver.findElement(searchInput).getAttribute("value");
    }

    public void clickSearchButton() {
        try {
            driver.findElement(searchButton).click();
        } catch (Exception e) {
            // Fallback to search icon if main button not found
            driver.findElement(searchIcon).click();
        }
    }

    public void waitForSearchToComplete() {
        // Wait for loading spinner to appear and disappear
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(loadingSpinner));
            wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingSpinner));
        } catch (Exception e) {
            // If no loading spinner, wait for results container
            wait.until(ExpectedConditions.visibilityOfElementLocated(searchResultsContainer));
        }
    }

    public boolean isSearchCompleted() {
        try {
            // Verify loading spinner is not present
            return !driver.findElement(loadingSpinner).isDisplayed();
        } catch (Exception e) {
            return true; // If spinner not found, search is completed
        }
    }

    public boolean isNoResultsMessageDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(noResultsMessage)).isDisplayed();
        } catch (Exception e) {
            try {
                return driver.findElement(noResultsMessageAlt).isDisplayed();
            } catch (Exception ex) {
                return false;
            }
        }
    }

    public String getNoResultsMessage() {
        try {
            return driver.findElement(noResultsMessage).getText();
        } catch (Exception e) {
            try {
                return driver.findElement(noResultsMessageAlt).getText();
            } catch (Exception ex) {
                return "";
            }
        }
    }

    public boolean isUserLoggedIn() {
        try {
            return driver.findElement(userMenu).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean hasAdvisorPermissions() {
        try {
            // Verify advisor dashboard or specific elements are accessible
            return driver.findElement(dashboardHeader).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}