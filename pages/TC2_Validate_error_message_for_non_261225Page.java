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
    
    // Base URL - Inferido: aplicación personalizada de búsqueda de perfiles GitHub
    private static final String BASE_URL = "https://github.com";
    
    // =====================================================
    // LOCATORS - Inferidos basados en buenas prácticas
    // Nota: Estos locators son INFERIDOS ya que la aplicación
    // descrita es una app personalizada que consume la API de GitHub,
    // no la interfaz nativa de GitHub.com
    // =====================================================
    
    // Search elements - Inferidos
    private By searchInput = By.cssSelector("[data-testid='search-input']");
    private By searchInputAlt = By.cssSelector("input[type='text'][placeholder*='usuario'], input[type='search']");
    private By searchButton = By.cssSelector("[data-testid='search-button']");
    private By searchButtonAlt = By.cssSelector("button[type='submit'] svg, button.search-btn");
    
    // Error message elements - Inferidos
    private By errorMessage = By.cssSelector("[data-testid='error-message']");
    private By errorMessageAlt = By.cssSelector(".error-message, .alert-error, .user-not-found");
    private By emptyState = By.cssSelector("[data-testid='empty-state']");
    private By emptyStateAlt = By.cssSelector(".empty-state, .no-results");
    
    // Profile elements - Inferidos
    private By userAvatar = By.cssSelector("[data-testid='user-avatar']");
    private By userAvatarAlt = By.cssSelector(".avatar, .profile-avatar, img.user-avatar");
    private By userName = By.cssSelector("[data-testid='user-name']");
    private By userNameAlt = By.cssSelector(".user-name, .profile-name, h1.name");
    private By userBio = By.cssSelector("[data-testid='user-bio']");
    private By userBioAlt = By.cssSelector(".user-bio, .profile-bio, .biography");
    private By userLocation = By.cssSelector("[data-testid='user-location']");
    private By userCompany = By.cssSelector("[data-testid='user-company']");
    private By userWebsite = By.cssSelector("[data-testid='user-website']");
    
    // Metrics dashboard elements - Inferidos
    private By reposCounter = By.cssSelector("[data-testid='repos-counter']");
    private By reposCounterAlt = By.cssSelector(".repos-count, .metric-repos, [data-metric='repos']");
    private By followersCounter = By.cssSelector("[data-testid='followers-counter']");
    private By followersCounterAlt = By.cssSelector(".followers-count, .metric-followers, [data-metric='followers']");
    private By followingCounter = By.cssSelector("[data-testid='following-counter']");
    private By followingCounterAlt = By.cssSelector(".following-count, .metric-following, [data-metric='following']");
    private By gistsCounter = By.cssSelector("[data-testid='gists-counter']");
    private By gistsCounterAlt = By.cssSelector(".gists-count, .metric-gists, [data-metric='gists']");
    
    // Followers list elements - Inferidos
    private By followersList = By.cssSelector("[data-testid='followers-list']");
    private By followersListAlt = By.cssSelector(".followers-list, .followers-container, ul.followers");
    private By followerItem = By.cssSelector("[data-testid='follower-item']");
    private By followerItemAlt = By.cssSelector(".follower-item, .follower-card, li.follower");
    
    // API rate limit indicator - Inferido
    private By apiRateLimitIndicator = By.cssSelector("[data-testid='api-rate-limit']");
    private By apiRateLimitIndicatorAlt = By.cssSelector(".rate-limit, .api-limit, .requests-remaining");
    
    // Follow button - Inferido
    private By followButton = By.cssSelector("[data-testid='follow-button']");
    private By followButtonAlt = By.cssSelector("button.follow-btn, .btn-follow");
    
    // Loading indicator - Inferido
    private By loadingIndicator = By.cssSelector("[data-testid='loading']");
    private By loadingIndicatorAlt = By.cssSelector(".loading, .spinner, .loader");

    public GitHubProfileSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // =====================================================
    // NAVIGATION METHODS
    // =====================================================
    
    public void navigateToSearchPage() {
        driver.get(BASE_URL);
    }
    
    public void navigateToUrl(String url) {
        driver.get(url);
    }

    // =====================================================
    // SEARCH FUNCTIONALITY METHODS
    // =====================================================
    
    public boolean isSearchInputVisible() {
        return isElementVisible(searchInput) || isElementVisible(searchInputAlt);
    }
    
    public boolean isSearchButtonVisible() {
        return isElementVisible(searchButton) || isElementVisible(searchButtonAlt);
    }
    
    public void enterUsername(String username) {
        WebElement input = findElement(searchInput, searchInputAlt);
        input.clear();
        input.sendKeys(username);
    }
    
    public String getSearchInputValue() {
        WebElement input = findElement(searchInput, searchInputAlt);
        return input.getAttribute("value");
    }
    
    public void clickSearchButton() {
        WebElement button = findElement(searchButton, searchButtonAlt);
        button.click();
    }
    
    public void searchForUser(String username) {
        enterUsername(username);
        clickSearchButton();
    }

    // =====================================================
    // WAIT METHODS
    // =====================================================
    
    public void waitForApiResponse() {
        try {
            // Wait for loading indicator to disappear
            wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingIndicator));
        } catch (Exception e) {
            try {
                wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingIndicatorAlt));
            } catch (Exception ex) {
                // Loading indicator may not exist, wait for content
                wait.until(driver -> 
                    isElementVisible(errorMessage) || 
                    isElementVisible(errorMessageAlt) ||
                    isElementVisible(emptyState) ||
                    isElementVisible(emptyStateAlt) ||
                    isElementVisible(userAvatar) ||
                    isElementVisible(userAvatarAlt)
                );
            }
        }
    }
    
    public void waitForElementVisible(By locator, int timeoutSeconds) {
        WebDriverWait customWait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
        customWait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    // =====================================================
    // ERROR MESSAGE METHODS
    // =====================================================
    
    public boolean isErrorMessageDisplayed() {
        return isElementVisible(errorMessage) || 
               isElementVisible(errorMessageAlt) ||
               isElementVisible(emptyState) ||
               isElementVisible(emptyStateAlt);
    }
    
    public String getErrorMessageText() {
        WebElement element = findElement(errorMessage, errorMessageAlt);
        if (element == null) {
            element = findElement(emptyState, emptyStateAlt);
        }
        return element != null ? element.getText() : "";
    }

    // =====================================================
    // PROFILE SECTION METHODS
    // =====================================================
    
    public boolean isUserAvatarDisplayed() {
        return isElementVisible(userAvatar) || isElementVisible(userAvatarAlt);
    }
    
    public boolean isUserNameDisplayed() {
        return isElementVisible(userName) || isElementVisible(userNameAlt);
    }
    
    public boolean isUserBioDisplayed() {
        return isElementVisible(userBio) || isElementVisible(userBioAlt);
    }
    
    public String getUserName() {
        WebElement element = findElement(userName, userNameAlt);
        return element != null ? element.getText() : "";
    }
    
    public String getUserBio() {
        WebElement element = findElement(userBio, userBioAlt);
        return element != null ? element.getText() : "";
    }
    
    public boolean isUserLocationDisplayed() {
        return isElementVisible(userLocation);
    }
    
    public boolean isUserCompanyDisplayed() {
        return isElementVisible(userCompany);
    }

    // =====================================================
    // METRICS DASHBOARD METHODS
    // =====================================================
    
    public boolean isReposCounterDisplayed() {
        return isElementVisible(reposCounter) || isElementVisible(reposCounterAlt);
    }
    
    public boolean isFollowersCounterDisplayed() {
        return isElementVisible(followersCounter) || isElementVisible(followersCounterAlt);
    }
    
    public boolean isFollowingCounterDisplayed() {
        return isElementVisible(followingCounter) || isElementVisible(followingCounterAlt);
    }
    
    public boolean isGistsCounterDisplayed() {
        return isElementVisible(gistsCounter) || isElementVisible(gistsCounterAlt);
    }
    
    public String getReposCount() {
        WebElement element = findElement(reposCounter, reposCounterAlt);
        return element != null ? element.getText() : "0";
    }
    
    public String getFollowersCount() {
        WebElement element = findElement(followersCounter, followersCounterAlt);
        return element != null ? element.getText() : "0";
    }
    
    public String getFollowingCount() {
        WebElement element = findElement(followingCounter, followingCounterAlt);
        return element != null ? element.getText() : "0";
    }
    
    public String getGistsCount() {
        WebElement element = findElement(gistsCounter, gistsCounterAlt);
        return element != null ? element.getText() : "0";
    }

    // =====================================================
    // FOLLOWERS LIST METHODS
    // =====================================================
    
    public boolean isFollowersListEmpty() {
        if (!isElementVisible(followersList) && !isElementVisible(followersListAlt)) {
            return true;
        }
        List<WebElement> items = driver.findElements(followerItem);
        if (items.isEmpty()) {
            items = driver.findElements(followerItemAlt);
        }
        return items.isEmpty();
    }
    
    public int getFollowersListCount() {
        List<WebElement> items = driver.findElements(followerItem);
        if (items.isEmpty()) {
            items = driver.findElements(followerItemAlt);
        }
        return items.size();
    }

    // =====================================================
    // API RATE LIMIT METHODS
    // =====================================================
    
    public boolean isApiRateLimitIndicatorDisplayed() {
        return isElementVisible(apiRateLimitIndicator) || isElementVisible(apiRateLimitIndicatorAlt);
    }
    
    public String getApiRateLimitText() {
        WebElement element = findElement(apiRateLimitIndicator, apiRateLimitIndicatorAlt);
        return element != null ? element.getText() : "";
    }

    // =====================================================
    // FOLLOW BUTTON METHODS
    // =====================================================
    
    public boolean isFollowButtonDisplayed() {
        return isElementVisible(followButton) || isElementVisible(followButtonAlt);
    }
    
    public void clickFollowButton() {
        WebElement button = findElement(followButton, followButtonAlt);
        if (button != null) {
            button.click();
        }
    }

    // =====================================================
    // UTILITY METHODS
    // =====================================================
    
    private boolean isElementVisible(By locator) {
        try {
            List<WebElement> elements = driver.findElements(locator);
            return !elements.isEmpty() && elements.get(0).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    private WebElement findElement(By primary, By alternative) {
        try {
            List<WebElement> elements = driver.findElements(primary);
            if (!elements.isEmpty() && elements.get(0).isDisplayed()) {
                return elements.get(0);
            }
        } catch (Exception e) {
            // Try alternative
        }
        
        try {
            List<WebElement> elements = driver.findElements(alternative);
            if (!elements.isEmpty() && elements.get(0).isDisplayed()) {
                return elements.get(0);
            }
        } catch (Exception e) {
            // Element not found
        }
        
        return null;
    }
    
    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
    
    public String getPageTitle() {
        return driver.getTitle();
    }
}