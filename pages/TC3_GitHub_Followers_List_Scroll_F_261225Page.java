package pages;

import org.openqa.selenium.By;
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
    private static final String BASE_URL = "https://github.com";

    // ============ LOCATORS (Extracted from Playwright inspection) ============
    
    // Navigation and Search - Real locators from GitHub
    private By signInLink = By.cssSelector("a[href*='/login']");
    private By homepageLink = By.cssSelector("a[href='/'][aria-label='Homepage']");
    
    // User Profile Section - Real locators
    private By userProfileHeading = By.cssSelector("h1[class*='vcard-names']");
    private By userFullName = By.cssSelector("h1 span[itemprop='name'], h1 span.p-name");
    private By userUsername = By.cssSelector("h1 span[itemprop='additionalName'], h1 span.p-nickname");
    private By userAvatar = By.cssSelector("img.avatar-user, a[href*='avatars'] img");
    private By userBio = By.cssSelector("div.p-note, div[data-bio-text]");
    private By userLocation = By.cssSelector("li[itemprop='homeLocation'] span, span.p-label");
    private By userOrganization = By.cssSelector("li[itemprop='worksFor'] span");
    private By followButton = By.cssSelector("a[href*='/login?return_to'][class*='btn']:has-text('Follow'), input[value='Follow']");
    
    // Profile Stats - Real locators
    private By followersLink = By.cssSelector("a[href*='tab=followers']");
    private By followingLink = By.cssSelector("a[href*='tab=following']");
    private By repositoriesTab = By.cssSelector("a[href*='tab=repositories']");
    
    // Followers List Section - Real locators from inspection
    private By followersListContainer = By.cssSelector("div[class*='Layout-main'] > div, main div.position-relative");
    private By followerItem = By.cssSelector("div.d-table, div[class*='follow-list-item']");
    private By followerAvatar = By.cssSelector("img[class*='avatar'], a[href*='github.com'] img.avatar-user");
    private By followerUsername = By.cssSelector("a[data-hovercard-type='user'] span.Link--secondary, a.d-inline-block span");
    private By followerProfileLink = By.cssSelector("a[data-hovercard-type='user'], a.d-inline-block[href*='github.com']");
    private By followerFollowButton = By.cssSelector("a[href*='/login']:has-text('Follow'), input[name='follow']");
    
    // Pagination - Real locators
    private By paginationNext = By.cssSelector("a[href*='page='][rel='next'], a:has-text('Next')");
    private By paginationPrevious = By.cssSelector("a[href*='page='][rel='prev'], div:has-text('Previous')");
    
    // Profile Navigation Tabs - Real locators
    private By overviewTab = By.cssSelector("a[data-tab-item='overview'], nav a[href*='github.com/']:not([href*='tab'])");
    private By projectsTab = By.cssSelector("a[href*='tab=projects']");
    
    // ============ CONSTRUCTOR ============
    
    public GitHubProfilePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // ============ NAVIGATION METHODS ============
    
    public void navigateToGitHub() {
        driver.get(BASE_URL);
    }

    public void navigateToUserProfile(String username) {
        driver.get(BASE_URL + "/" + username);
        wait.until(ExpectedConditions.presenceOfElementLocated(userAvatar));
    }

    public void navigateToFollowersTab() {
        WebElement followersLinkElement = wait.until(
            ExpectedConditions.elementToBeClickable(followersLink)
        );
        followersLinkElement.click();
        wait.until(ExpectedConditions.urlContains("tab=followers"));
    }

    // ============ VERIFICATION METHODS ============
    
    public boolean isGitHubAccessible() {
        try {
            return driver.getTitle().toLowerCase().contains("github");
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchInterfaceDisplayed() {
        try {
            return driver.findElement(homepageLink).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isUserProfileDisplayed() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(userAvatar));
            return driver.findElement(userAvatar).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isFollowersListDisplayed() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(followerItem));
            List<WebElement> followers = driver.findElements(followerItem);
            return !followers.isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean areFollowerAvatarsDisplayed() {
        List<WebElement> avatars = driver.findElements(followerAvatar);
        if (avatars.isEmpty()) return false;
        
        for (WebElement avatar : avatars) {
            if (!avatar.isDisplayed()) return false;
        }
        return true;
    }

    public boolean areFollowerUsernamesDisplayed() {
        List<WebElement> usernames = driver.findElements(followerProfileLink);
        return !usernames.isEmpty();
    }

    public boolean areFollowerProfileLinksPresent() {
        List<WebElement> links = driver.findElements(followerProfileLink);
        if (links.isEmpty()) return false;
        
        for (WebElement link : links) {
            String href = link.getAttribute("href");
            if (href == null || !href.contains("github.com")) return false;
        }
        return true;
    }

    public int getVisibleFollowersCount() {
        List<WebElement> followers = driver.findElements(followerItem);
        return followers.size();
    }

    public boolean isFollowersListScrollable() {
        try {
            // Check if pagination exists (GitHub uses pagination instead of infinite scroll)
            List<WebElement> nextButtons = driver.findElements(paginationNext);
            if (!nextButtons.isEmpty()) {
                return true;
            }
            
            // Alternative: Check if container has scrollable content
            WebElement container = driver.findElement(followersListContainer);
            JavascriptExecutor js = (JavascriptExecutor) driver;
            Long scrollHeight = (Long) js.executeScript(
                "return arguments[0].scrollHeight", container
            );
            Long clientHeight = (Long) js.executeScript(
                "return arguments[0].clientHeight", container
            );
            return scrollHeight > clientHeight;
        } catch (Exception e) {
            // If we have multiple followers, pagination should exist
            return getVisibleFollowersCount() > 10;
        }
    }

    public String getFirstVisibleFollowerUsername() {
        try {
            List<WebElement> links = driver.findElements(followerProfileLink);
            if (!links.isEmpty()) {
                String href = links.get(0).getAttribute("href");
                return href.substring(href.lastIndexOf("/") + 1);
            }
        } catch (Exception e) {
            // Handle exception
        }
        return "";
    }

    public void scrollDownFollowersList() {
        try {
            // GitHub uses pagination - click Next to see more followers
            List<WebElement> nextButtons = driver.findElements(paginationNext);
            if (!nextButtons.isEmpty() && nextButtons.get(0).isDisplayed()) {
                nextButtons.get(0).click();
                wait.until(ExpectedConditions.urlContains("page="));
            } else {
                // Fallback: Scroll the page
                JavascriptExecutor js = (JavascriptExecutor) driver;
                js.executeScript("window.scrollBy(0, 500)");
            }
        } catch (Exception e) {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("window.scrollBy(0, 500)");
        }
    }

    public void clickOnFirstFollowerProfileLink() {
        List<WebElement> links = driver.findElements(followerProfileLink);
        if (!links.isEmpty()) {
            String href = links.get(0).getAttribute("href");
            driver.get(href);
        }
    }

    public boolean isOnGitHubUserProfilePage() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(userAvatar));
            String currentUrl = driver.getCurrentUrl();
            return currentUrl.contains("github.com/") && 
                   !currentUrl.contains("tab=followers") &&
                   !currentUrl.contains("login");
        } catch (Exception e) {
            return false;
        }
    }

    // ============ UTILITY METHODS ============
    
    public String getUserFullName() {
        try {
            return driver.findElement(userFullName).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getFollowersCount() {
        try {
            WebElement element = driver.findElement(followersLink);
            return element.getText();
        } catch (Exception e) {
            return "0";
        }
    }

    public void waitForPageLoad() {
        wait.until(webDriver -> 
            ((JavascriptExecutor) webDriver)
                .executeScript("return document.readyState")
                .equals("complete")
        );
    }
}