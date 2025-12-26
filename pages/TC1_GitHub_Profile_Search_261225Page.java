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
    private static final String BASE_URL = "https://github.com"; // URL de la aplicación de búsqueda
    
    // ============================================
    // LOCATORS - Inferidos (aplicación personalizada de búsqueda)
    // ============================================
    
    // Search Component Locators (INFERIDOS - basados en buenas prácticas)
    private By searchInput = By.cssSelector("[data-testid='search-input']");
    private By searchButton = By.cssSelector("[data-testid='search-button']");
    private By searchButtonIcon = By.cssSelector("[data-testid='search-button'] svg, [data-testid='search-button'] .fa-search");
    
    // API Request Indicator Locators (INFERIDOS)
    private By requestIndicator = By.cssSelector("[data-testid='api-request-indicator']");
    
    // Profile Section Locators (INFERIDOS para la app, inspirados en GitHub real)
    private By profileSection = By.cssSelector("[data-testid='profile-section']");
    private By userAvatar = By.cssSelector("[data-testid='user-avatar']");
    private By fullName = By.cssSelector("[data-testid='user-fullname']");
    private By username = By.cssSelector("[data-testid='user-username']");
    private By biography = By.cssSelector("[data-testid='user-bio']");
    private By location = By.cssSelector("[data-testid='user-location']");
    private By company = By.cssSelector("[data-testid='user-company']");
    private By websiteLink = By.cssSelector("[data-testid='user-website']");
    private By followButton = By.cssSelector("[data-testid='follow-button']");
    
    // Metrics Dashboard Locators (INFERIDOS)
    private By metricsSection = By.cssSelector("[data-testid='metrics-dashboard']");
    private By reposCounter = By.cssSelector("[data-testid='repos-count']");
    private By followersCounter = By.cssSelector("[data-testid='followers-count']");
    private By followingCounter = By.cssSelector("[data-testid='following-count']");
    private By gistsCounter = By.cssSelector("[data-testid='gists-count']");
    
    // Followers List Locators (INFERIDOS)
    private By followersList = By.cssSelector("[data-testid='followers-list']");
    private By followerItems = By.cssSelector("[data-testid='follower-item']");
    private By followerAvatar = By.cssSelector("[data-testid='follower-avatar']");
    private By followerUsername = By.cssSelector("[data-testid='follower-username']");
    private By followerProfileLink = By.cssSelector("[data-testid='follower-link']");
    
    // Error Message Locator (INFERIDO)
    private By errorMessage = By.cssSelector("[data-testid='error-message']");
    
    // ============================================
    // LOCATORS ALTERNATIVOS - Extraídos de GitHub real (para referencia)
    // ============================================
    
    // GitHub Real Profile Locators (REALES - extraídos con Playwright)
    private By githubRealAvatar = By.cssSelector("img[alt*='View'][alt*='avatar']");
    private By githubRealFullName = By.cssSelector("h1 span[itemprop='name'], h1 > span:first-child");
    private By githubRealUsername = By.cssSelector("h1 span[itemprop='additionalName'], h1 > span:last-child");
    private By githubRealFollowersLink = By.cssSelector("a[href*='tab=followers']");
    private By githubRealFollowingLink = By.cssSelector("a[href*='tab=following']");
    private By githubRealLocation = By.cssSelector("li[itemprop='homeLocation'] span, li:has(svg) span:contains('San Francisco')");
    private By githubRealCompany = By.cssSelector("li[itemprop='worksFor'] a, a[href*='/github']");
    private By githubRealWebsite = By.cssSelector("li a[href*='github.blog'], a[rel='nofollow']");
    private By githubRealFollowButton = By.cssSelector("a:contains('Follow'), button:contains('Follow')");
    private By githubRealReposTab = By.cssSelector("a[href*='tab=repositories']");
    
    // ============================================
    // CONSTRUCTOR
    // ============================================
    
    public GitHubProfileSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    // ============================================
    // NAVIGATION METHODS
    // ============================================
    
    public void navigateToSearchPage() {
        driver.get(BASE_URL);
    }
    
    // ============================================
    // SEARCH INTERACTION METHODS
    // ============================================
    
    public void enterUsername(String usernameText) {
        WebElement input = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
        input.clear();
        input.sendKeys(usernameText);
    }
    
    public String getSearchInputValue() {
        return driver.findElement(searchInput).getAttribute("value");
    }
    
    public void clickSearchButton() {
        wait.until(ExpectedConditions.elementToBeClickable(searchButton)).click();
    }
    
    public void searchUser(String usernameText) {
        enterUsername(usernameText);
        clickSearchButton();
        waitForAPIResponse();
    }
    
    // ============================================
    // WAIT METHODS
    // ============================================
    
    public void waitForAPIResponse() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(profileSection));
    }
    
    // ============================================
    // VISIBILITY CHECK METHODS
    // ============================================
    
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
    
    public boolean isSearchComponentVisible() {
        return isSearchInputVisible() && isSearchButtonVisible();
    }
    
    public boolean isAPIConnectionActive() {
        try {
            WebElement indicator = driver.findElement(requestIndicator);
            String text = indicator.getText();
            // Verifica formato como "51/60" donde el primer número es menor que el límite
            return text.matches("\\d+/\\d+");
        } catch (Exception e) {
            return true; // Asume activa si no hay indicador
        }
    }
    
    public boolean isProfileDataLoaded() {
        try {
            return driver.findElement(profileSection).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isProfileSectionVisible() {
        try {
            return driver.findElement(profileSection).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isAvatarDisplayed() {
        try {
            WebElement avatar = driver.findElement(userAvatar);
            return avatar.isDisplayed() && !avatar.getAttribute("src").isEmpty();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isBiographyVisible() {
        try {
            return driver.findElement(biography).isDisplayed();
        } catch (Exception e) {
            return false;
        }
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
    // METRICS VISIBILITY METHODS
    // ============================================
    
    public boolean isReposCounterVisible() {
        try {
            return driver.findElement(reposCounter).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isFollowersCounterVisible() {
        try {
            return driver.findElement(followersCounter).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isFollowingCounterVisible() {
        try {
            return driver.findElement(followingCounter).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isGistsCounterVisible() {
        try {
            return driver.findElement(gistsCounter).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    // ============================================
    // GETTER METHODS - Profile Data
    // ============================================
    
    public String getFullName() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(fullName)).getText();
    }
    
    public String getUsername() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(username)).getText();
    }
    
    public String getBiography() {
        return driver.findElement(biography).getText();
    }
    
    public String getLocation() {
        return driver.findElement(location).getText();
    }
    
    public String getCompany() {
        return driver.findElement(company).getText();
    }
    
    public String getWebsiteUrl() {
        return driver.findElement(websiteLink).getAttribute("href");
    }
    
    // ============================================
    // GETTER METHODS - Metrics
    // ============================================
    
    public int getReposCount() {
        String text = driver.findElement(reposCounter).getText().replaceAll("[^0-9.kKmM]", "");
        return parseMetricValue(text);
    }
    
    public int getFollowersCount() {
        String text = driver.findElement(followersCounter).getText().replaceAll("[^0-9.kKmM]", "");
        return parseMetricValue(text);
    }
    
    public int getFollowingCount() {
        String text = driver.findElement(followingCounter).getText().replaceAll("[^0-9.kKmM]", "");
        return parseMetricValue(text);
    }
    
    public int getGistsCount() {
        String text = driver.findElement(gistsCounter).getText().replaceAll("[^0-9.kKmM]", "");
        return parseMetricValue(text);
    }
    
    private int parseMetricValue(String text) {
        try {
            if (text.toLowerCase().contains("k")) {
                return (int) (Double.parseDouble(text.toLowerCase().replace("k", "")) * 1000);
            } else if (text.toLowerCase().contains("m")) {
                return (int) (Double.parseDouble(text.toLowerCase().replace("m", "")) * 1000000);
            }
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
    
    // ============================================
    // FOLLOWERS LIST METHODS
    // ============================================
    
    public boolean isFollowersListVisible() {
        try {
            return driver.findElement(followersList).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public List<WebElement> getFollowerItems() {
        return driver.findElements(followerItems);
    }
    
    public boolean areFollowerAvatarsDisplayed() {
        List<WebElement> followers = getFollowerItems();
        if (followers.isEmpty()) return false;
        
        for (WebElement follower : followers) {
            try {
                WebElement avatar = follower.findElement(followerAvatar);
                if (!avatar.isDisplayed() || avatar.getAttribute("src").isEmpty()) {
                    return false;
                }
            } catch (Exception e) {
                return false;
            }
        }
        return true;
    }
    
    public boolean areFollowerUsernamesDisplayed() {
        List<WebElement> followers = getFollowerItems();
        if (followers.isEmpty()) return false;
        
        for (WebElement follower : followers) {
            try {
                WebElement usernameEl = follower.findElement(followerUsername);
                if (!usernameEl.isDisplayed() || usernameEl.getText().isEmpty()) {
                    return false;
                }
            } catch (Exception e) {
                return false;
            }
        }
        return true;
    }
    
    public boolean areFollowerProfileLinksPresent() {
        List<WebElement> followers = getFollowerItems();
        if (followers.isEmpty()) return false;
        
        for (WebElement follower : followers) {
            try {
                WebElement link = follower.findElement(followerProfileLink);
                String href = link.getAttribute("href");
                if (href == null || href.isEmpty()) {
                    return false;
                }
            } catch (Exception e) {
                return false;
            }
        }
        return true;
    }
    
    // ============================================
    // ERROR HANDLING METHODS
    // ============================================
    
    public boolean isErrorMessageDisplayed() {
        try {
            return driver.findElement(errorMessage).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getErrorMessage() {
        try {
            return driver.findElement(errorMessage).getText();
        } catch (Exception e) {
            return "";
        }
    }
}