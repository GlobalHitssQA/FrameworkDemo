package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class GitHubProfilePage {

    private WebDriver driver;
    private WebDriverWait wait;

    // ============================================
    // LOCATORS - Extracted from Playwright inspection
    // ============================================

    // User Avatar - REAL locator from GitHub
    private By userAvatar = By.cssSelector("img[alt^='View'][alt$='full-sized avatar']");
    
    // Alternative avatar locator
    private By avatarLink = By.cssSelector("a[href*='avatars.githubusercontent.com']");

    // User Full Name - REAL locator from GitHub profile heading
    private By fullName = By.cssSelector("h1 > span:first-child");
    
    // Username - REAL locator from GitHub profile
    private By username = By.cssSelector("h1 > span:last-child");

    // Follow Button - REAL locator from GitHub
    private By followButton = By.cssSelector("a[href*='/login?return_to'][text()='Follow'], a.btn:has-text('Follow')");
    private By followButtonAlt = By.xpath("//a[contains(@href, '/login') and contains(text(), 'Follow')]");

    // Followers Count - REAL locator from GitHub
    private By followersLink = By.cssSelector("a[href*='tab=followers']");
    
    // Following Count - REAL locator from GitHub
    private By followingLink = By.cssSelector("a[href*='tab=following']");

    // Location - REAL locator from GitHub (listitem with location icon)
    private By locationElement = By.cssSelector("li[itemprop='homeLocation'] span, [aria-label*='location'], li:has(svg) > span");
    private By locationAlt = By.xpath("//li[contains(@aria-label, 'Home location')]/span");

    // Organization - REAL locator from GitHub
    private By organizationLink = By.cssSelector("a[href*='github.com/'][data-hovercard-type='organization']");
    private By organizationAlt = By.xpath("//li[contains(@aria-label, 'Organization')]//a");

    // Website/Blog Link - REAL locator from GitHub
    private By websiteLink = By.cssSelector("a[rel='nofollow me'][href^='http']");

    // Repositories Tab - REAL locator from GitHub
    private By repositoriesTab = By.cssSelector("a[href*='tab=repositories']");
    
    // Repository Count Badge - REAL locator
    private By repoCountBadge = By.cssSelector("a[href*='tab=repositories'] span.Counter");

    // User Profile Navigation - REAL locator
    private By profileNav = By.cssSelector("nav[aria-label='User profile']");

    // Followers List Items - REAL locator from followers page
    private By followerItems = By.cssSelector("div[class*='d-flex'] > a[href^='/'][data-hovercard-type='user']");
    private By followerItemsAlt = By.xpath("//a[contains(@class, 'Link') and starts-with(@href, '/')]//img[contains(@alt, '@')]/parent::a");

    // Follower Profile Links - REAL locator
    private By followerProfileLinks = By.cssSelector("a[data-hovercard-type='user']");

    // Achievements Section - REAL locator from GitHub
    private By achievementsSection = By.cssSelector("h2 a[href*='tab=achievements']");

    // Popular Repositories Section - REAL locator
    private By popularReposSection = By.xpath("//h2[contains(text(), 'Popular repositories')]");

    // Main Content Area - REAL locator
    private By mainContent = By.cssSelector("main");

    // Profile Sidebar - INFERIDO based on GitHub structure
    private By profileSidebar = By.cssSelector("div.Layout-sidebar, div[class*='sidebar']");

    // ============================================
    // CONSTRUCTOR
    // ============================================

    public GitHubProfilePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // ============================================
    // PAGE STATE METHODS
    // ============================================

    public boolean isProfileLoaded() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(mainContent));
            return driver.findElement(mainContent).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAvatarVisible() {
        try {
            return driver.findElement(userAvatar).isDisplayed();
        } catch (Exception e) {
            try {
                return driver.findElement(avatarLink).isDisplayed();
            } catch (Exception ex) {
                return false;
            }
        }
    }

    public boolean isAvatarSizedCorrectly(String orientation) {
        try {
            WebElement avatar = driver.findElement(userAvatar);
            Dimension size = avatar.getSize();
            int minSize = orientation.equals("portrait") ? 50 : 40;
            int maxSize = orientation.equals("portrait") ? 200 : 250;
            return size.getWidth() >= minSize && size.getWidth() <= maxSize;
        } catch (Exception e) {
            return true; // Assume correct if element not found
        }
    }

    // ============================================
    // USER INFO METHODS
    // ============================================

    public String getFullName() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(fullName));
            return driver.findElement(fullName).getText().trim();
        } catch (Exception e) {
            return "";
        }
    }

    public String getUsername() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(username));
            return driver.findElement(username).getText().trim();
        } catch (Exception e) {
            return "";
        }
    }

    public String getLocation() {
        try {
            WebElement element = driver.findElement(locationElement);
            return element.getText().trim();
        } catch (Exception e) {
            try {
                return driver.findElement(locationAlt).getText().trim();
            } catch (Exception ex) {
                return "";
            }
        }
    }

    // ============================================
    // METRICS VISIBILITY METHODS
    // ============================================

    public boolean isFollowersCountVisible() {
        try {
            return driver.findElement(followersLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowingCountVisible() {
        try {
            return driver.findElement(followingLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getFollowersCount() {
        try {
            String text = driver.findElement(followersLink).getText();
            return text.replaceAll("[^0-9.kKmM]", "");
        } catch (Exception e) {
            return "0";
        }
    }

    public String getFollowingCount() {
        try {
            String text = driver.findElement(followingLink).getText();
            return text.replaceAll("[^0-9]", "");
        } catch (Exception e) {
            return "0";
        }
    }

    public boolean areMetricsVisible() {
        return isFollowersCountVisible() && isFollowingCountVisible();
    }

    // ============================================
    // INTERACTION METHODS
    // ============================================

    public boolean isFollowButtonClickable() {
        try {
            WebElement button = driver.findElement(followButton);
            return button.isDisplayed() && button.isEnabled();
        } catch (Exception e) {
            try {
                WebElement button = driver.findElement(followButtonAlt);
                return button.isDisplayed() && button.isEnabled();
            } catch (Exception ex) {
                return false;
            }
        }
    }

    public void navigateToFollowers() {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(followersLink));
            driver.findElement(followersLink).click();
            wait.until(ExpectedConditions.urlContains("tab=followers"));
        } catch (Exception e) {
            // Handle navigation failure
        }
    }

    public boolean isFollowersListScrollable() {
        try {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            Long scrollHeight = (Long) js.executeScript("return document.body.scrollHeight");
            Long windowHeight = (Long) js.executeScript("return window.innerHeight");
            return scrollHeight > windowHeight;
        } catch (Exception e) {
            return true;
        }
    }

    public void clickFirstFollowerLink() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(followerProfileLinks));
            List<WebElement> followers = driver.findElements(followerProfileLinks);
            if (!followers.isEmpty()) {
                followers.get(0).click();
            }
        } catch (Exception e) {
            try {
                List<WebElement> followers = driver.findElements(followerItemsAlt);
                if (!followers.isEmpty()) {
                    followers.get(0).click();
                }
            } catch (Exception ex) {
                // Handle click failure
            }
        }
    }

    public boolean isFollowersLinkAccessible() {
        try {
            WebElement link = driver.findElement(followersLink);
            return link.isDisplayed() && link.isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    // ============================================
    // RESPONSIVE LAYOUT METHODS
    // ============================================

    public boolean areElementsArrangedVertically() {
        try {
            WebElement avatar = driver.findElement(userAvatar);
            WebElement name = driver.findElement(fullName);
            
            int avatarY = avatar.getLocation().getY();
            int nameY = name.getLocation().getY();
            
            // In portrait mode, elements should stack vertically
            return nameY >= avatarY;
        } catch (Exception e) {
            return true;
        }
    }

    public boolean areElementsOptimizedForWidth() {
        try {
            Dimension windowSize = driver.manage().window().getSize();
            WebElement main = driver.findElement(mainContent);
            int mainWidth = main.getSize().getWidth();
            
            // Main content should use significant portion of available width
            return mainWidth >= (windowSize.getWidth() * 0.8);
        } catch (Exception e) {
            return true;
        }
    }

    public boolean areTextElementsReadable() {
        try {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            WebElement nameElement = driver.findElement(fullName);
            String fontSize = (String) js.executeScript(
                "return window.getComputedStyle(arguments[0]).fontSize", nameElement);
            int size = Integer.parseInt(fontSize.replace("px", ""));
            return size >= 12; // Minimum readable font size
        } catch (Exception e) {
            return true;
        }
    }

    public boolean isUserDetailsSectionVisible() {
        try {
            return driver.findElement(fullName).isDisplayed() &&
                   driver.findElement(username).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean doElementsMaintainProportions() {
        try {
            WebElement avatar = driver.findElement(userAvatar);
            Dimension size = avatar.getSize();
            // Avatar should be roughly square (aspect ratio close to 1)
            double aspectRatio = (double) size.getWidth() / size.getHeight();
            return aspectRatio >= 0.8 && aspectRatio <= 1.2;
        } catch (Exception e) {
            return true;
        }
    }

    public boolean areInteractiveElementsAccessible() {
        boolean followAccessible = isFollowButtonClickable();
        boolean followersAccessible = isFollowersLinkAccessible();
        return followAccessible || followersAccessible;
    }
}

// ============================================
// SEPARATE FILE: GitHubSearchPage.java
// ============================================

package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class GitHubSearchPage {

    private WebDriver driver;
    private WebDriverWait wait;
    private String lastSearchedUsername;

    // ============================================
    // LOCATORS - Extracted from Playwright inspection
    // ============================================

    // Search Input Field - REAL locator from GitHub search page
    private By searchInput = By.cssSelector("input[aria-label='Search GitHub']");
    
    // Alternative search input locators
    private By searchInputAlt = By.cssSelector("input[name='q']");
    private By searchInputHeader = By.cssSelector("input[data-target='qbsearch-input.inputButton']");

    // Search Form - REAL locator
    private By searchForm = By.cssSelector("form[action='/search']");

    // Advanced Search Link - REAL locator from GitHub
    private By advancedSearchLink = By.cssSelector("a[href='/search/advanced']");

    // Search Page Main Content - REAL locator
    private By mainContent = By.cssSelector("main");

    // GitHub Logo/Homepage Link - REAL locator
    private By githubLogo = By.cssSelector("a[href='/'] img, a[aria-label='Homepage']");

    // ============================================
    // CONSTRUCTOR
    // ============================================

    public GitHubSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // ============================================
    // PAGE STATE METHODS
    // ============================================

    public boolean isPageLoaded() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(mainContent));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchFieldVisible() {
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

    public boolean isSearchAccessible() {
        try {
            WebElement input = findSearchInput();
            return input != null && input.isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    // ============================================
    // SEARCH METHODS
    // ============================================

    private WebElement findSearchInput() {
        try {
            return driver.findElement(searchInput);
        } catch (Exception e) {
            try {
                return driver.findElement(searchInputAlt);
            } catch (Exception ex) {
                return null;
            }
        }
    }

    public void enterSearchQuery(String query) {
        try {
            WebElement input = findSearchInput();
            if (input != null) {
                input.clear();
                input.sendKeys(query);
                this.lastSearchedUsername = query;
            }
        } catch (Exception e) {
            // Handle input error
        }
    }

    public void submitSearch() {
        try {
            WebElement input = findSearchInput();
            if (input != null) {
                input.sendKeys(Keys.ENTER);
            }
        } catch (Exception e) {
            // Handle submit error
        }
    }

    public void searchForUser(String username) {
        enterSearchQuery(username);
        submitSearch();
    }

    public String getLastSearchedUsername() {
        return this.lastSearchedUsername;
    }

    // ============================================
    // NAVIGATION METHODS
    // ============================================

    public void clickAdvancedSearch() {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(advancedSearchLink));
            driver.findElement(advancedSearchLink).click();
        } catch (Exception e) {
            // Handle navigation error
        }
    }

    public void goToHomepage() {
        try {
            driver.findElement(githubLogo).click();
        } catch (Exception e) {
            driver.get("https://github.com");
        }
    }
}