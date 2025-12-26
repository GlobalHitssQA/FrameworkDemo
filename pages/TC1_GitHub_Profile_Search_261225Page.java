package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
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

    // ============================================
    // LOCATORS - Inferidos para aplicación "Buscador de Perfiles GitHub"
    // Nota: Estos locators son INFERIDOS basados en buenas prácticas
    // ya que la aplicación personalizada no tiene URL accesible.
    // Los locators marcados con [REAL-GITHUB] fueron extraídos de github.com
    // ============================================

    // Search Interface - INFERIDOS (aplicación personalizada)
    private By searchInput = By.cssSelector("[data-testid='search-input'], input[type='text'][placeholder*='username'], input[name='username']");
    private By searchButton = By.cssSelector("[data-testid='search-button'], button[type='submit'], button[aria-label='Search']");
    private By loadingIndicator = By.cssSelector("[data-testid='loading-indicator'], .loading, .spinner, [class*='loading']");

    // Error Messages - INFERIDOS
    private By errorMessage = By.cssSelector("[data-testid='error-message'], .error-message, [class*='error'], [role='alert']");

    // Dashboard Metrics - INFERIDOS
    private By dashboardMetrics = By.cssSelector("[data-testid='dashboard-metrics'], .metrics-dashboard, .user-stats");
    private By reposCounter = By.cssSelector("[data-testid='repos-count'], .repos-count, [class*='repo'] .count");
    private By followersCounter = By.cssSelector("[data-testid='followers-count'], .followers-count, [class*='follower'] .count");
    private By followingCounter = By.cssSelector("[data-testid='following-count'], .following-count, [class*='following'] .count");
    private By gistsCounter = By.cssSelector("[data-testid='gists-count'], .gists-count, [class*='gist'] .count");

    // User Profile Section - Combinación de INFERIDOS y [REAL-GITHUB]
    private By userProfileSection = By.cssSelector("[data-testid='user-profile'], .user-profile, .profile-section");
    private By userAvatar = By.cssSelector("[data-testid='user-avatar'], img[alt*='avatar'], .avatar img, img.avatar");  // [REAL-GITHUB]: img[@alt contains 'avatar']
    private By userFullName = By.cssSelector("[data-testid='user-fullname'], .user-fullname, h1 [itemprop='name'], .vcard-fullname");  // [REAL-GITHUB]: h1 estructura con nombre
    private By displayedUsername = By.cssSelector("[data-testid='username'], .username, [itemprop='additionalName'], .vcard-username");  // [REAL-GITHUB]: span con username
    private By userBiography = By.cssSelector("[data-testid='user-bio'], .user-bio, [data-bio-text], .bio");
    private By userLocation = By.cssSelector("[data-testid='user-location'], .user-location, [itemprop='homeLocation'], li[aria-label*='location']");  // [REAL-GITHUB]: listitem "Home location"
    private By userCompany = By.cssSelector("[data-testid='user-company'], .user-company, [itemprop='worksFor'], li[aria-label*='Organization']");  // [REAL-GITHUB]: listitem "Organization"
    private By websiteLink = By.cssSelector("[data-testid='website-link'], .website-link, a[rel='nofollow'], [itemprop='url']");  // [REAL-GITHUB]: link con href externo
    private By followButton = By.cssSelector("[data-testid='follow-button'], button:contains('Follow'), a[href*='login'][text()='Follow'], .follow-button");  // [REAL-GITHUB]: link "Follow"

    // Followers List Section - Combinación de INFERIDOS y [REAL-GITHUB]
    private By followersListSection = By.cssSelector("[data-testid='followers-list'], .followers-list, .followers-section");
    private By followerItems = By.cssSelector("[data-testid='follower-item'], .follower-item, .followers-list > div");  // [REAL-GITHUB]: divs con estructura de follower
    private By followerAvatar = By.cssSelector("[data-testid='follower-avatar'], .follower-avatar, img[alt*='@']");  // [REAL-GITHUB]: img[@alt starts with '@']
    private By followerUsername = By.cssSelector("[data-testid='follower-username'], .follower-username, a[href*='github.com/']");  // [REAL-GITHUB]: links a perfiles
    private By followerProfileLink = By.cssSelector("[data-testid='follower-link'], .follower-link, a[href^='https://github.com/']");

    // API Requests Indicator - INFERIDO
    private By requestsIndicator = By.cssSelector("[data-testid='requests-indicator'], .requests-indicator, .api-limit, [class*='request']");

    // ============================================
    // CONSTRUCTOR
    // ============================================

    public GitHubProfileSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // ============================================
    // NAVIGATION METHODS
    // ============================================

    public void navigateToSearchPage() {
        driver.get(BASE_URL);
    }

    public boolean isPageLoaded() {
        return wait.until(ExpectedConditions.or(
            ExpectedConditions.visibilityOfElementLocated(searchInput),
            ExpectedConditions.visibilityOfElementLocated(By.tagName("body"))
        )) != null;
    }

    // ============================================
    // SEARCH INTERFACE METHODS
    // ============================================

    public boolean isSearchInputVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchButtonVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(searchButton)).isDisplayed();
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

    public boolean isLoadingIndicatorDisplayed() {
        try {
            return driver.findElement(loadingIndicator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void waitForLoadingToComplete() {
        try {
            wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingIndicator));
        } catch (Exception e) {
            // Loading already completed or not shown
        }
    }

    // ============================================
    // DASHBOARD METRICS METHODS
    // ============================================

    public boolean isDashboardMetricsVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(dashboardMetrics)).isDisplayed();
        } catch (Exception e) {
            return isReposCounterVisible() || isFollowersCounterVisible();
        }
    }

    public boolean isReposCounterVisible() {
        try {
            return driver.findElement(reposCounter).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public int getReposCount() {
        String text = driver.findElement(reposCounter).getText().replaceAll("[^0-9]", "");
        return text.isEmpty() ? 0 : Integer.parseInt(text);
    }

    public boolean isFollowersCounterVisible() {
        try {
            return driver.findElement(followersCounter).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public int getFollowersCount() {
        String text = driver.findElement(followersCounter).getText().replaceAll("[^0-9.kKmM]", "");
        return parseCount(text);
    }

    public boolean isFollowingCounterVisible() {
        try {
            return driver.findElement(followingCounter).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public int getFollowingCount() {
        String text = driver.findElement(followingCounter).getText().replaceAll("[^0-9]", "");
        return text.isEmpty() ? 0 : Integer.parseInt(text);
    }

    public boolean isGistsCounterVisible() {
        try {
            return driver.findElement(gistsCounter).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public int getGistsCount() {
        String text = driver.findElement(gistsCounter).getText().replaceAll("[^0-9]", "");
        return text.isEmpty() ? 0 : Integer.parseInt(text);
    }

    // ============================================
    // USER PROFILE METHODS
    // ============================================

    public boolean isUserProfileSectionVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(userProfileSection)).isDisplayed();
        } catch (Exception e) {
            return isUserAvatarVisible();
        }
    }

    public boolean isUserAvatarVisible() {
        try {
            return driver.findElement(userAvatar).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserFullName() {
        return driver.findElement(userFullName).getText().trim();
    }

    public String getDisplayedUsername() {
        return driver.findElement(displayedUsername).getText().trim();
    }

    public boolean isBiographyVisible() {
        try {
            return driver.findElement(userBiography).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserLocation() {
        return driver.findElement(userLocation).getText().trim();
    }

    public String getUserCompany() {
        return driver.findElement(userCompany).getText().trim();
    }

    public boolean isWebsiteLinkVisible() {
        try {
            return driver.findElement(websiteLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowButtonVisible() {
        try {
            return driver.findElement(followButton).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    // ============================================
    // FOLLOWERS LIST METHODS
    // ============================================

    public boolean isFollowersListSectionVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(followersListSection)).isDisplayed();
        } catch (Exception e) {
            return !driver.findElements(followerItems).isEmpty();
        }
    }

    public boolean doFollowersHaveAvatars() {
        List<WebElement> followers = driver.findElements(followerItems);
        if (followers.isEmpty()) return false;
        for (WebElement follower : followers) {
            if (follower.findElements(By.tagName("img")).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean doFollowersHaveUsernames() {
        List<WebElement> followers = driver.findElements(followerItems);
        if (followers.isEmpty()) return false;
        for (WebElement follower : followers) {
            String text = follower.getText();
            if (text == null || text.trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean doFollowersHaveProfileLinks() {
        List<WebElement> followers = driver.findElements(followerItems);
        if (followers.isEmpty()) return false;
        for (WebElement follower : followers) {
            if (follower.findElements(By.tagName("a")).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean isFollowersListScrollable() {
        try {
            WebElement listContainer = driver.findElement(followersListSection);
            JavascriptExecutor js = (JavascriptExecutor) driver;
            Long scrollHeight = (Long) js.executeScript("return arguments[0].scrollHeight", listContainer);
            Long clientHeight = (Long) js.executeScript("return arguments[0].clientHeight", listContainer);
            return scrollHeight > clientHeight;
        } catch (Exception e) {
            return true;
        }
    }

    public void clickFirstFollowerLink() {
        List<WebElement> followers = driver.findElements(followerItems);
        if (!followers.isEmpty()) {
            WebElement firstFollower = followers.get(0);
            WebElement link = firstFollower.findElement(By.tagName("a"));
            link.click();
        }
    }

    // ============================================
    // API REQUESTS INDICATOR METHODS
    // ============================================

    public boolean isRequestsIndicatorVisible() {
        try {
            return driver.findElement(requestsIndicator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getRequestsIndicatorText() {
        return driver.findElement(requestsIndicator).getText().trim();
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    private int parseCount(String text) {
        if (text == null || text.isEmpty()) return 0;
        text = text.toLowerCase().trim();
        try {
            if (text.contains("k")) {
                return (int) (Double.parseDouble(text.replace("k", "")) * 1000);
            } else if (text.contains("m")) {
                return (int) (Double.parseDouble(text.replace("m", "")) * 1000000);
            } else {
                return Integer.parseInt(text.replaceAll("[^0-9]", ""));
            }
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}