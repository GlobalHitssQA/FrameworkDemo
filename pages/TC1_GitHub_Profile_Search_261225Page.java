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
    private static final String BASE_URL = "https://github.com";
    private static final int TIMEOUT_SECONDS = 10;

    // =====================================================
    // LOCATORS - Search Component (Inferido - aplicación custom)
    // =====================================================
    private By searchInput = By.cssSelector("[data-testid='search-input'], input[placeholder*='username'], input[type='search'], #search-username");
    private By searchButton = By.cssSelector("[data-testid='search-button'], button[aria-label*='Search'], button.search-btn, #search-btn");
    private By searchIcon = By.cssSelector("[data-testid='search-icon'], .fa-search, svg[class*='search'], .search-icon");

    // =====================================================
    // LOCATORS - Error Messages (Inferido)
    // =====================================================
    private By errorMessage = By.cssSelector("[data-testid='error-message'], .error-message, .alert-danger, #user-not-found");

    // =====================================================
    // LOCATORS - Profile Section (Basado en GitHub real)
    // =====================================================
    private By profileSection = By.cssSelector("[data-testid='profile-section'], .user-profile, #profile-container, main");
    private By userAvatar = By.cssSelector("[data-testid='user-avatar'], img[alt*='avatar'], .avatar, img.avatar-user");
    private By userFullName = By.cssSelector("[data-testid='user-fullname'], .vcard-fullname, h1 span[itemprop='name'], .user-fullname");
    private By userName = By.cssSelector("[data-testid='username'], .vcard-username, h1 span[itemprop='additionalName'], .user-login");
    private By userBio = By.cssSelector("[data-testid='user-bio'], .user-profile-bio, [data-bio-text], .bio");
    private By userLocation = By.cssSelector("[data-testid='user-location'], [itemprop='homeLocation'], .vcard-detail[itemprop='homeLocation'], .location");
    private By userCompany = By.cssSelector("[data-testid='user-company'], [itemprop='worksFor'], .vcard-detail[itemprop='worksFor'], .company");
    private By userWebsite = By.cssSelector("[data-testid='user-website'], [itemprop='url'], a[rel='nofollow me'], .website-link");
    private By followButton = By.cssSelector("[data-testid='follow-button'], input[value='Follow'], button:contains('Follow'), .follow-btn, a[href*='login'][href*='follow']");

    // =====================================================
    // LOCATORS - Metrics Dashboard (Inferido - aplicación custom)
    // =====================================================
    private By metricsSection = By.cssSelector("[data-testid='metrics-dashboard'], .metrics-container, #stats-container, .user-stats");
    private By reposCounter = By.cssSelector("[data-testid='repos-count'], .counter[data-metric='repos'], #repos-count, a[href*='repositories'] span");
    private By followersCounter = By.cssSelector("[data-testid='followers-count'], .counter[data-metric='followers'], #followers-count, a[href*='followers']");
    private By followingCounter = By.cssSelector("[data-testid='following-count'], .counter[data-metric='following'], #following-count, a[href*='following']");
    private By gistsCounter = By.cssSelector("[data-testid='gists-count'], .counter[data-metric='gists'], #gists-count, a[href*='gists']");

    // =====================================================
    // LOCATORS - Followers List (Basado en GitHub real)
    // =====================================================
    private By followersListSection = By.cssSelector("[data-testid='followers-list'], .followers-container, #followers-list, [data-hovercard-type='user']");
    private By followerItems = By.cssSelector("[data-testid='follower-item'], .follower-item, .follow-list-item, main > div > div:nth-child(2) > div");
    private By followerAvatar = By.cssSelector("[data-testid='follower-avatar'], .follower-avatar, img[alt*='@'], .avatar-user");
    private By followerUsername = By.cssSelector("[data-testid='follower-username'], .follower-username, a[data-hovercard-type='user'], .Link--primary");
    private By followerProfileLink = By.cssSelector("[data-testid='follower-link'], a.follower-link, a[href*='github.com/'], a[data-hovercard-type='user']");

    // =====================================================
    // LOCATORS - API Requests Indicator (Inferido)
    // =====================================================
    private By apiRequestsIndicator = By.cssSelector("[data-testid='api-limit-indicator'], .api-limit, #rate-limit, .requests-remaining");
    private By loadingSpinner = By.cssSelector("[data-testid='loading'], .loading, .spinner, [aria-label='Loading']");

    // =====================================================
    // CONSTRUCTOR
    // =====================================================
    public GitHubProfileSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(TIMEOUT_SECONDS));
    }

    // =====================================================
    // NAVIGATION METHODS
    // =====================================================
    public void navigateToSearchPage() {
        driver.get(BASE_URL);
        waitForPageLoad();
    }

    public void navigateToUserProfile(String username) {
        driver.get(BASE_URL + "/" + username);
        waitForPageLoad();
    }

    // =====================================================
    // SEARCH COMPONENT METHODS
    // =====================================================
    public boolean isSearchComponentDisplayed() {
        return isElementVisible(searchInput) && isElementVisible(searchButton);
    }

    public boolean isSearchInputVisible() {
        return isElementVisible(searchInput);
    }

    public boolean isSearchButtonVisible() {
        return isElementVisible(searchButton);
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

    public void searchForUser(String username) {
        enterUsername(username);
        clickSearchButton();
        waitForAPIResponse();
    }

    // =====================================================
    // WAIT METHODS
    // =====================================================
    public void waitForAPIResponse() {
        try {
            wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingSpinner));
        } catch (Exception e) {
            // Loading spinner may not be present
        }
        wait.until(ExpectedConditions.or(
            ExpectedConditions.visibilityOfElementLocated(profileSection),
            ExpectedConditions.visibilityOfElementLocated(errorMessage)
        ));
    }

    public void waitForPageLoad() {
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
    }

    // =====================================================
    // ERROR HANDLING METHODS
    // =====================================================
    public boolean isErrorMessageDisplayed() {
        return isElementVisible(errorMessage);
    }

    public String getErrorMessageText() {
        if (isErrorMessageDisplayed()) {
            return driver.findElement(errorMessage).getText();
        }
        return "";
    }

    // =====================================================
    // PROFILE SECTION METHODS
    // =====================================================
    public boolean isProfileSectionVisible() {
        return isElementVisible(profileSection);
    }

    public boolean isAvatarVisible() {
        return isElementVisible(userAvatar);
    }

    public String getAvatarSrc() {
        return driver.findElement(userAvatar).getAttribute("src");
    }

    public boolean isFullNameVisible() {
        return isElementVisible(userFullName);
    }

    public String getFullName() {
        if (isFullNameVisible()) {
            return driver.findElement(userFullName).getText();
        }
        return "";
    }

    public boolean isUsernameVisible() {
        return isElementVisible(userName);
    }

    public String getUsername() {
        if (isUsernameVisible()) {
            return driver.findElement(userName).getText();
        }
        return "";
    }

    public boolean isBioVisible() {
        return isElementVisible(userBio);
    }

    public String getBio() {
        if (isBioVisible()) {
            return driver.findElement(userBio).getText();
        }
        return "";
    }

    public boolean isLocationVisible() {
        return isElementVisible(userLocation);
    }

    public String getLocation() {
        if (isLocationVisible()) {
            return driver.findElement(userLocation).getText();
        }
        return "";
    }

    public boolean isCompanyVisible() {
        return isElementVisible(userCompany);
    }

    public String getCompany() {
        if (isCompanyVisible()) {
            return driver.findElement(userCompany).getText();
        }
        return "";
    }

    public boolean isWebsiteVisible() {
        return isElementVisible(userWebsite);
    }

    public String getWebsiteUrl() {
        if (isWebsiteVisible()) {
            return driver.findElement(userWebsite).getAttribute("href");
        }
        return "";
    }

    public boolean isFollowButtonVisible() {
        return isElementVisible(followButton);
    }

    public void clickFollowButton() {
        wait.until(ExpectedConditions.elementToBeClickable(followButton)).click();
    }

    // =====================================================
    // METRICS DASHBOARD METHODS
    // =====================================================
    public boolean isReposCounterVisible() {
        return isElementVisible(reposCounter);
    }

    public String getReposCount() {
        if (isReposCounterVisible()) {
            return driver.findElement(reposCounter).getText().replaceAll("[^0-9.kKmM]", "");
        }
        return "0";
    }

    public boolean isFollowersCounterVisible() {
        return isElementVisible(followersCounter);
    }

    public String getFollowersCount() {
        if (isFollowersCounterVisible()) {
            return driver.findElement(followersCounter).getText().replaceAll("[^0-9.kKmM]", "");
        }
        return "0";
    }

    public boolean isFollowingCounterVisible() {
        return isElementVisible(followingCounter);
    }

    public String getFollowingCount() {
        if (isFollowingCounterVisible()) {
            return driver.findElement(followingCounter).getText().replaceAll("[^0-9.kKmM]", "");
        }
        return "0";
    }

    public boolean isGistsCounterVisible() {
        return isElementVisible(gistsCounter);
    }

    public String getGistsCount() {
        if (isGistsCounterVisible()) {
            return driver.findElement(gistsCounter).getText().replaceAll("[^0-9.kKmM]", "");
        }
        return "0";
    }

    // =====================================================
    // FOLLOWERS LIST METHODS
    // =====================================================
    public boolean isFollowersListVisible() {
        return isElementVisible(followersListSection);
    }

    public int getFollowersCount() {
        List<WebElement> followers = driver.findElements(followerItems);
        return followers.size();
    }

    public boolean areFollowerAvatarsVisible() {
        List<WebElement> avatars = driver.findElements(followerAvatar);
        return !avatars.isEmpty();
    }

    public boolean areFollowerUsernamesVisible() {
        List<WebElement> usernames = driver.findElements(followerUsername);
        return !usernames.isEmpty();
    }

    public boolean areFollowerProfileLinksVisible() {
        List<WebElement> links = driver.findElements(followerProfileLink);
        return !links.isEmpty();
    }

    public List<WebElement> getFollowerElements() {
        return driver.findElements(followerItems);
    }

    public void clickFollowerByIndex(int index) {
        List<WebElement> followers = driver.findElements(followerProfileLink);
        if (index < followers.size()) {
            followers.get(index).click();
        }
    }

    // =====================================================
    // API INDICATOR METHODS
    // =====================================================
    public boolean isApiLimitIndicatorVisible() {
        return isElementVisible(apiRequestsIndicator);
    }

    public String getApiLimitText() {
        if (isApiLimitIndicatorVisible()) {
            return driver.findElement(apiRequestsIndicator).getText();
        }
        return "";
    }

    // =====================================================
    // UTILITY METHODS
    // =====================================================
    private boolean isElementVisible(By locator) {
        try {
            WebElement element = driver.findElement(locator);
            return element.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void scrollToFollowersList() {
        WebElement element = driver.findElement(followersListSection);
        ((org.openqa.selenium.JavascriptExecutor) driver)
            .executeScript("arguments[0].scrollIntoView(true);", element);
    }
}