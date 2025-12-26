package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class GitHubProfileSearchPage {

    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "https://github.com"; // URL base - ajustar según ambiente

    // ============================================================
    // LOCATORS - INFERIDOS (aplicación personalizada)
    // Estos locators son para una aplicación "Buscador de Perfiles GitHub"
    // que consume la API de GitHub. Ajustar según implementación real.
    // ============================================================

    // Search components
    private By searchInput = By.cssSelector("[data-testid='search-input'], input[placeholder*='usuario'], input[placeholder*='username'], #search-input, .search-input");
    private By searchButton = By.cssSelector("[data-testid='search-button'], button[aria-label*='buscar'], button[aria-label*='search'], .search-button, button.btn-search");
    private By searchButtonIcon = By.cssSelector("[data-testid='search-button'] svg, .search-button svg, button svg[class*='magnify'], .fa-search, .icon-search");

    // Error message components
    private By errorMessage = By.cssSelector("[data-testid='error-message'], .error-message, .alert-error, .user-not-found, [role='alert']");
    private By emptyState = By.cssSelector("[data-testid='empty-state'], .empty-state, .no-results, .not-found-container");

    // User profile components
    private By userAvatar = By.cssSelector("[data-testid='user-avatar'], .user-avatar, .profile-avatar, img.avatar");
    private By userName = By.cssSelector("[data-testid='user-name'], .user-name, .profile-name, h1.name");
    private By userUsername = By.cssSelector("[data-testid='user-username'], .user-username, .profile-username, .username");
    private By userBio = By.cssSelector("[data-testid='user-bio'], .user-bio, .profile-bio, .bio");
    private By userLocation = By.cssSelector("[data-testid='user-location'], .user-location, .location");
    private By userCompany = By.cssSelector("[data-testid='user-company'], .user-company, .company");
    private By userWebsite = By.cssSelector("[data-testid='user-website'], .user-website, .website, a.blog");
    private By followButton = By.cssSelector("[data-testid='follow-button'], .follow-button, button.follow");

    // User profile section container
    private By userProfileSection = By.cssSelector("[data-testid='user-profile'], .user-profile, .profile-container, .profile-section");

    // Metrics dashboard components
    private By metricsDashboard = By.cssSelector("[data-testid='metrics-dashboard'], .metrics-dashboard, .stats-container, .metrics-container");
    private By reposCounter = By.cssSelector("[data-testid='repos-count'], .repos-count, .counter-repos, [data-metric='repos']");
    private By followersCounter = By.cssSelector("[data-testid='followers-count'], .followers-count, .counter-followers, [data-metric='followers']");
    private By followingCounter = By.cssSelector("[data-testid='following-count'], .following-count, .counter-following, [data-metric='following']");
    private By gistsCounter = By.cssSelector("[data-testid='gists-count'], .gists-count, .counter-gists, [data-metric='gists']");

    // Followers list components
    private By followersList = By.cssSelector("[data-testid='followers-list'], .followers-list, .followers-container, ul.followers");
    private By followerItem = By.cssSelector("[data-testid='follower-item'], .follower-item, .followers-list li, .follower-card");
    private By followersScrollContainer = By.cssSelector("[data-testid='followers-scroll'], .followers-scroll, .followers-list-scroll");

    // API requests indicator
    private By apiRequestsIndicator = By.cssSelector("[data-testid='api-requests-indicator'], .api-requests, .rate-limit-indicator, .requests-counter");
    private By apiRequestsCount = By.cssSelector("[data-testid='api-requests-count'], .api-requests-count, .rate-limit-count, .requests-value");

    // Loading indicator
    private By loadingIndicator = By.cssSelector("[data-testid='loading'], .loading, .spinner, .loader");

    // ============================================================
    // CONSTRUCTOR
    // ============================================================

    public GitHubProfileSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // ============================================================
    // NAVIGATION METHODS
    // ============================================================

    public void navigateToSearchPage() {
        driver.get(BASE_URL);
    }

    public void navigateToSearchPage(String url) {
        driver.get(url);
    }

    // ============================================================
    // SEARCH METHODS
    // ============================================================

    public boolean isSearchPageLoaded() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchInputVisible() {
        try {
            return driver.findElement(searchInput).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchButtonVisible() {
        try {
            return driver.findElement(searchButton).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void enterUsername(String username) {
        WebElement input = wait.until(ExpectedConditions.elementToBeClickable(searchInput));
        input.clear();
        input.sendKeys(username);
    }

    public String getSearchInputValue() {
        return driver.findElement(searchInput).getAttribute("value");
    }

    public void clickSearchButton() {
        wait.until(ExpectedConditions.elementToBeClickable(searchButton)).click();
    }

    public void searchUser(String username) {
        enterUsername(username);
        clickSearchButton();
    }

    // ============================================================
    // WAIT METHODS
    // ============================================================

    public void waitForApiResponse() {
        try {
            // Wait for loading indicator to disappear
            wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingIndicator));
        } catch (Exception e) {
            // Loading indicator might not be present, continue
        }
        // Small buffer for UI to update
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public void waitForElementVisible(By locator) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    // ============================================================
    // ERROR MESSAGE METHODS
    // ============================================================

    public boolean isErrorMessageDisplayed() {
        try {
            return driver.findElement(errorMessage).isDisplayed() ||
                   driver.findElement(emptyState).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getErrorMessageText() {
        try {
            WebElement error = driver.findElement(errorMessage);
            if (error.isDisplayed()) {
                return error.getText();
            }
        } catch (Exception e) {
            // Try empty state
        }
        try {
            WebElement empty = driver.findElement(emptyState);
            if (empty.isDisplayed()) {
                return empty.getText();
            }
        } catch (Exception e) {
            // No error message found
        }
        return "";
    }

    // ============================================================
    // USER PROFILE METHODS
    // ============================================================

    public boolean isUserProfileSectionVisible() {
        try {
            WebElement profile = driver.findElement(userProfileSection);
            return profile.isDisplayed() && !profile.getText().isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isUserAvatarVisible() {
        try {
            return driver.findElement(userAvatar).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserName() {
        return driver.findElement(userName).getText();
    }

    public String getUsername() {
        return driver.findElement(userUsername).getText();
    }

    public String getUserBio() {
        try {
            return driver.findElement(userBio).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getUserLocation() {
        try {
            return driver.findElement(userLocation).getText();
        } catch (Exception e) {
            return "";
        }
    }

    // ============================================================
    // METRICS DASHBOARD METHODS
    // ============================================================

    public boolean isMetricsDashboardVisible() {
        try {
            WebElement dashboard = driver.findElement(metricsDashboard);
            return dashboard.isDisplayed() && hasMetricsData();
        } catch (Exception e) {
            return false;
        }
    }

    private boolean hasMetricsData() {
        try {
            String repos = driver.findElement(reposCounter).getText();
            return repos != null && !repos.isEmpty() && !repos.equals("0") && !repos.equals("-");
        } catch (Exception e) {
            return false;
        }
    }

    public String getReposCount() {
        return driver.findElement(reposCounter).getText();
    }

    public String getFollowersCount() {
        return driver.findElement(followersCounter).getText();
    }

    public String getFollowingCount() {
        return driver.findElement(followingCounter).getText();
    }

    public String getGistsCount() {
        return driver.findElement(gistsCounter).getText();
    }

    // ============================================================
    // FOLLOWERS LIST METHODS
    // ============================================================

    public boolean isFollowersListEmptyOrHidden() {
        try {
            WebElement list = driver.findElement(followersList);
            if (!list.isDisplayed()) {
                return true;
            }
            List<WebElement> items = driver.findElements(followerItem);
            return items.isEmpty();
        } catch (Exception e) {
            return true; // List not found, considered as hidden
        }
    }

    public int getFollowersListCount() {
        try {
            List<WebElement> items = driver.findElements(followerItem);
            return items.size();
        } catch (Exception e) {
            return 0;
        }
    }

    public void scrollFollowersList() {
        try {
            WebElement scrollContainer = driver.findElement(followersScrollContainer);
            ((org.openqa.selenium.JavascriptExecutor) driver)
                .executeScript("arguments[0].scrollTop = arguments[0].scrollHeight", scrollContainer);
        } catch (Exception e) {
            // Scroll not available or not needed
        }
    }

    // ============================================================
    // API REQUESTS INDICATOR METHODS
    // ============================================================

    public String getApiRequestCount() {
        try {
            return driver.findElement(apiRequestsCount).getText();
        } catch (Exception e) {
            try {
                return driver.findElement(apiRequestsIndicator).getText();
            } catch (Exception ex) {
                return "0/60";
            }
        }
    }

    public boolean isRequestCountIncremented(String initialCount, String currentCount) {
        try {
            // Parse counts like "51/60" or just "51"
            int initial = parseRequestCount(initialCount);
            int current = parseRequestCount(currentCount);
            return current > initial;
        } catch (Exception e) {
            // If parsing fails, assume it was incremented
            return !initialCount.equals(currentCount);
        }
    }

    private int parseRequestCount(String countText) {
        if (countText == null || countText.isEmpty()) {
            return 0;
        }
        // Handle format like "51/60"
        if (countText.contains("/")) {
            return Integer.parseInt(countText.split("/")[0].trim());
        }
        // Handle plain number
        return Integer.parseInt(countText.replaceAll("[^0-9]", ""));
    }

    public boolean isApiRequestsIndicatorVisible() {
        try {
            return driver.findElement(apiRequestsIndicator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}