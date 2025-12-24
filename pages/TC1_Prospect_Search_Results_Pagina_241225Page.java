package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class ProspectSearchPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators - Inferred based on best practices
    private By dashboardContainer = By.cssSelector("[data-testid='advisor-dashboard']");
    private By searchInput = By.cssSelector("[data-testid='prospect-search-input']");
    private By searchButton = By.cssSelector("[data-testid='prospect-search-button']");
    private By resultsContainer = By.cssSelector("[data-testid='search-results-container']");
    private By resultItems = By.cssSelector("[data-testid='prospect-result-item']");
    private By prospectNameFields = By.cssSelector("[data-testid='prospect-name']");
    private By prospectEmailFields = By.cssSelector("[data-testid='prospect-email']");
    private By scrollableContainer = By.cssSelector("[data-testid='results-scroll-container']");
    private By loadingSpinner = By.cssSelector("[data-testid='loading-spinner']");
    private By userProfileIndicator = By.cssSelector("[data-testid='user-profile']");
    
    // Alternative locators (fallback)
    private By searchInputAlt = By.id("prospectSearchField");
    private By searchButtonAlt = By.className("search-button");
    private By resultItemsAlt = By.className("prospect-item");
    
    public ProspectSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean isUserAuthenticated() {
        try {
            return driver.findElement(userProfileIndicator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isDashboardAccessible() {
        try {
            return driver.findElement(dashboardContainer).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void navigateToDashboard() {
        // Assumes base URL is configured in test setup
        // driver.get(baseUrl + "/dashboard");
    }
    
    public boolean isDashboardDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(dashboardContainer));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public void enterSearchTerm(String searchTerm) {
        WebElement searchField = wait.until(ExpectedConditions.elementToBeClickable(searchInput));
        searchField.clear();
        searchField.sendKeys(searchTerm);
    }
    
    public void clickSearchButton() {
        WebElement button = wait.until(ExpectedConditions.elementToBeClickable(searchButton));
        button.click();
    }
    
    public void waitForSearchResults() {
        // Wait for loading spinner to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingSpinner));
        // Wait for results container to be visible
        wait.until(ExpectedConditions.visibilityOfElementLocated(resultsContainer));
    }
    
    public int getTotalResultsCount() {
        try {
            List<WebElement> results = driver.findElements(resultItems);
            return results.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    public int getVisibleResultsCount() {
        try {
            List<WebElement> results = driver.findElements(resultItems);
            int visibleCount = 0;
            for (WebElement result : results) {
                if (result.isDisplayed()) {
                    visibleCount++;
                }
            }
            return visibleCount;
        } catch (Exception e) {
            return 0;
        }
    }
    
    public boolean isProspectNameDisplayed(int index) {
        try {
            List<WebElement> names = driver.findElements(prospectNameFields);
            if (index < names.size()) {
                return names.get(index).isDisplayed() && !names.get(index).getText().trim().isEmpty();
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isProspectEmailDisplayed(int index) {
        try {
            List<WebElement> emails = driver.findElements(prospectEmailFields);
            if (index < emails.size()) {
                return emails.get(index).isDisplayed() && !emails.get(index).getText().trim().isEmpty();
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getProspectName(int index) {
        try {
            List<WebElement> names = driver.findElements(prospectNameFields);
            if (index < names.size()) {
                return names.get(index).getText();
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }
    
    public String getProspectEmail(int index) {
        try {
            List<WebElement> emails = driver.findElements(prospectEmailFields);
            if (index < emails.size()) {
                return emails.get(index).getText();
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }
    
    public boolean isScrollPresent() {
        try {
            WebElement scrollContainer = driver.findElement(scrollableContainer);
            JavascriptExecutor js = (JavascriptExecutor) driver;
            Long scrollHeight = (Long) js.executeScript("return arguments[0].scrollHeight", scrollContainer);
            Long clientHeight = (Long) js.executeScript("return arguments[0].clientHeight", scrollContainer);
            return scrollHeight > clientHeight;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isScrollEnabled() {
        try {
            WebElement scrollContainer = driver.findElement(scrollableContainer);
            String overflowY = scrollContainer.getCssValue("overflow-y");
            return overflowY.equals("scroll") || overflowY.equals("auto");
        } catch (Exception e) {
            return false;
        }
    }
    
    public void scrollToAdditionalResults() {
        try {
            WebElement scrollContainer = driver.findElement(scrollableContainer);
            JavascriptExecutor js = (JavascriptExecutor) driver;
            // Scroll to bottom of container
            js.executeScript("arguments[0].scrollTop = arguments[0].scrollHeight", scrollContainer);
            // Wait for potential lazy loading
            Thread.sleep(1000);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}