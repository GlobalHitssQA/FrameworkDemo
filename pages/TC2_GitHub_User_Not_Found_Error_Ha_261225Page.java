package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

/**
 * Page Object for GitHub Search Page
 * Locators extracted via Playwright from https://github.com/search
 */
public class GitHubSearchPage {
    
    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "https://github.com";
    private static final String SEARCH_URL = "https://github.com/search";
    
    // LOCATORS - Extracted from Playwright inspection (REAL)
    private By searchInput = By.cssSelector("input[type='text'][aria-label='Search GitHub'], input[placeholder='Search GitHub']"); // Real - from search page
    private By searchButton = By.cssSelector("button[type='submit'], button:has-text('Search')"); // Real - from search page
    private By advancedSearchLink = By.cssSelector("a[href='/search/advanced']"); // Real - from search page
    
    public GitHubSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToSearchPage() {
        driver.get(SEARCH_URL);
    }
    
    public void navigateToUserProfile(String username) {
        driver.get(BASE_URL + "/" + username);
    }
    
    public boolean isSearchPageLoaded() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isGitHubReachable() {
        return driver.getTitle() != null && !driver.getTitle().isEmpty();
    }
    
    public boolean isSearchInputVisible() {
        try {
            return driver.findElement(searchInput).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void enterSearchText(String text) {
        WebElement input = wait.until(ExpectedConditions.elementToBeClickable(searchInput));
        input.clear();
        input.sendKeys(text);
    }
    
    public String getSearchInputValue() {
        return driver.findElement(searchInput).getAttribute("value");
    }
    
    public void clickSearchButton() {
        wait.until(ExpectedConditions.elementToBeClickable(searchButton)).click();
    }
    
    public void searchForUser(String username) {
        enterSearchText(username);
        clickSearchButton();
    }
}

/**
 * Page Object for GitHub User Profile Page
 * Locators extracted via Playwright from https://github.com/octocat
 */
class GitHubProfilePage {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    // LOCATORS - Extracted from Playwright inspection (REAL)
    private By userAvatar = By.cssSelector("img[alt^='View'][alt$='full-sized avatar'], a[href*='avatars.githubusercontent.com'] img"); // Real - from profile
    private By userFullName = By.cssSelector("h1 span[itemprop='name'], h1 > span:first-child"); // Real - The Octocat
    private By userName = By.cssSelector("h1 span[itemprop='additionalName'], h1 > span:last-child"); // Real - octocat
    private By userBio = By.cssSelector("div[data-bio-text], .user-profile-bio"); // Inferred
    private By userLocation = By.cssSelector("li[itemprop='homeLocation'] span, li:has(svg[class*='location']) span"); // Real - San Francisco
    private By userCompany = By.cssSelector("li[itemprop='worksFor'] a, li:has(svg[class*='organization']) a"); // Real - @github
    private By userWebsite = By.cssSelector("li[itemprop='url'] a, a[href='https://github.blog']"); // Real
    private By followButton = By.cssSelector("a[href*='login?return_to'][href*='Follow'], button:has-text('Follow')"); // Real
    private By followersLink = By.cssSelector("a[href$='tab=followers']"); // Real - 21.3k followers
    private By followingLink = By.cssSelector("a[href$='tab=following']"); // Real - 9 following
    private By repositoriesTab = By.cssSelector("a[href$='tab=repositories']"); // Real - Repositories 8
    private By repositoriesList = By.cssSelector("div[data-hpc] li, ul[data-filterable-for] li"); // Inferred
    private By popularRepositories = By.cssSelector("h2:has-text('Popular repositories') + ol li, ol.d-flex li"); // Real
    private By achievementsBadges = By.cssSelector("a[href*='achievement'] img"); // Real
    private By profileNavigation = By.cssSelector("nav[aria-label='User profile']"); // Real
    
    public GitHubProfilePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean isAvatarDisplayed() {
        try {
            return driver.findElement(userAvatar).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isUserNameDisplayed() {
        try {
            return driver.findElement(userName).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isBioDisplayed() {
        try {
            return driver.findElement(userBio).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isFollowersCountDisplayed() {
        try {
            return driver.findElement(followersLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isFollowingCountDisplayed() {
        try {
            return driver.findElement(followingLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isRepositoriesDisplayed() {
        try {
            return driver.findElement(repositoriesTab).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isFollowersListDisplayed() {
        try {
            List<WebElement> followers = driver.findElements(By.cssSelector("a[href*='tab=followers'] + div img"));
            return !followers.isEmpty();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getUserName() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(userName)).getText();
    }
    
    public String getFullName() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(userFullName)).getText();
    }
    
    public String getFollowersCount() {
        return driver.findElement(followersLink).getText();
    }
    
    public String getFollowingCount() {
        return driver.findElement(followingLink).getText();
    }
    
    public String getLocation() {
        return driver.findElement(userLocation).getText();
    }
    
    public String getCompany() {
        return driver.findElement(userCompany).getText();
    }
    
    public void clickFollowButton() {
        wait.until(ExpectedConditions.elementToBeClickable(followButton)).click();
    }
}

/**
 * Page Object for GitHub 404 Error Page
 * Locators extracted via Playwright from https://github.com/usuarioquenoexiste123456789
 */
class GitHubErrorPage {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    // LOCATORS - Extracted from Playwright inspection (REAL)
    private By error404Image = By.cssSelector("img[alt*='404'], img[alt*='This is not the web page you are looking for']"); // Real
    private By errorPageSearchInput = By.cssSelector("main search input[type='text'], main input[type='text']"); // Real
    private By errorPageSearchButton = By.cssSelector("main search button, main button:has-text('Search')"); // Real
    private By errorPageSearchLabel = By.cssSelector("main search div:first-child, div:has-text('Find code, projects, and people')"); // Real
    private By contactSupportLink = By.cssSelector("a[href*='support.github.com?tags=dotcom-404']"); // Real
    private By githubStatusLink = By.cssSelector("a[href='https://githubstatus.com']"); // Real
    private By twitterStatusLink = By.cssSelector("a[href='https://twitter.com/githubstatus']"); // Real
    private By mainContent = By.cssSelector("main"); // Real
    
    public GitHubErrorPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean isPageLoaded() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(mainContent));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean is404ImageDisplayed() {
        try {
            return driver.findElement(error404Image).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String get404ImageAltText() {
        try {
            return driver.findElement(error404Image).getAttribute("alt");
        } catch (Exception e) {
            return "";
        }
    }
    
    public boolean isSearchBoxVisible() {
        try {
            return driver.findElement(errorPageSearchInput).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getSearchLabelText() {
        try {
            return driver.findElement(errorPageSearchLabel).getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    public void enterSearchOnErrorPage(String text) {
        WebElement input = wait.until(ExpectedConditions.elementToBeClickable(errorPageSearchInput));
        input.clear();
        input.sendKeys(text);
    }
    
    public void clickSearchOnErrorPage() {
        wait.until(ExpectedConditions.elementToBeClickable(errorPageSearchButton)).click();
    }
    
    public boolean isPageTitle404() {
        return driver.getTitle().contains("Page not found") || driver.getTitle().contains("404");
    }
    
    public void clickContactSupport() {
        wait.until(ExpectedConditions.elementToBeClickable(contactSupportLink)).click();
    }
    
    public void clickGitHubStatus() {
        wait.until(ExpectedConditions.elementToBeClickable(githubStatusLink)).click();
    }
}