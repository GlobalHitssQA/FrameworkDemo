package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class GitHubSearchPage {

    private WebDriver driver;
    private WebDriverWait wait;

    // ========== LOCATORS - Extracted from GitHub.com via Playwright ==========
    
    // Search Page Locators (REAL - from https://github.com/search)
    private By searchInput = By.id("query-builder-test"); // REAL: extracted from GitHub search page
    private By searchInputAlt = By.cssSelector("input.FormControl-input.QueryBuilder-Input"); // REAL: alternative selector
    private By searchInputByRole = By.cssSelector("input[role='combobox'][type='text']"); // REAL: role-based selector
    
    // Search Results Page Locators (REAL - from search results)
    private By usersFilterLink = By.cssSelector("a[data-testid='nav-item-users']"); // REAL: data-testid extracted
    private By searchResultsCount = By.cssSelector("h2[class*='result']"); // REAL: results heading
    private By userResultItem = By.cssSelector("div[data-testid='results-list'] > div"); // REAL: user result container
    private By userResultLink = By.cssSelector("a.prc-Link-Link-9ZwDx"); // REAL: user profile link class
    private By userAvatarInResults = By.cssSelector("img[data-testid='github-avatar']"); // REAL: avatar with data-testid
    
    // Constants
    private static final String GITHUB_SEARCH_URL = "https://github.com/search";
    private static final String GITHUB_BASE_URL = "https://github.com";

    public GitHubSearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public void navigateToSearchPage() {
        driver.get(GITHUB_SEARCH_URL);
        wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
    }

    public boolean isPageLoaded() {
        try {
            return driver.getCurrentUrl().contains("github.com");
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchComponentAvailable() {
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

    public boolean isSearchInputDisplayed() {
        try {
            WebElement input = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
            return input.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void enterSearchQuery(String query) {
        WebElement input = wait.until(ExpectedConditions.elementToBeClickable(searchInput));
        input.clear();
        input.sendKeys(query);
    }

    public String getSearchInputValue() {
        WebElement input = driver.findElement(searchInput);
        return input.getAttribute("value");
    }

    public void clickSearchButton() {
        WebElement input = driver.findElement(searchInput);
        input.sendKeys(org.openqa.selenium.Keys.ENTER);
    }

    public void waitForSearchResults() {
        wait.until(ExpectedConditions.urlContains("search?q="));
        wait.until(ExpectedConditions.visibilityOfElementLocated(usersFilterLink));
    }

    public void clickUsersFilter() {
        WebElement usersLink = wait.until(ExpectedConditions.elementToBeClickable(usersFilterLink));
        usersLink.click();
        wait.until(ExpectedConditions.urlContains("type=users"));
    }

    public void clickOnUserResult(String username) {
        // First filter by users
        clickUsersFilter();
        
        // Wait for user results and click on matching user
        wait.until(ExpectedConditions.visibilityOfElementLocated(userResultLink));
        
        By userLink = By.xpath("//a[contains(@href, '/" + username + "')]/span[contains(text(), '" + username + "')]");
        WebElement userElement = wait.until(ExpectedConditions.elementToBeClickable(userLink));
        userElement.click();
        
        // Wait for profile page to load
        wait.until(ExpectedConditions.urlContains("/" + username));
    }
}

// ============================================================================
// FILE: GitHubProfilePage.java
// ============================================================================

package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class GitHubProfilePage {

    private WebDriver driver;
    private WebDriverWait wait;

    // ========== LOCATORS - Extracted from GitHub.com/octocat via Playwright ==========
    
    // Profile Avatar (REAL - extracted from profile page)
    private By avatarImage = By.cssSelector("img.avatar.avatar-user.width-full"); // REAL: avatar CSS class
    private By avatarLink = By.cssSelector("a[href*='avatars.githubusercontent.com']"); // REAL: avatar link
    
    // Profile Info Section (REAL - extracted via itemprop attributes)
    private By fullName = By.cssSelector("span.p-name.vcard-fullname[itemprop='name']"); // REAL: itemprop name
    private By username = By.cssSelector("span.p-nickname.vcard-username[itemprop='additionalName']"); // REAL: itemprop additionalName
    private By userBio = By.cssSelector("div.p-note.user-profile-bio"); // REAL: bio container
    
    // Location and Organization (REAL - extracted via itemprop)
    private By location = By.cssSelector("li[itemprop='homeLocation']"); // REAL: itemprop homeLocation
    private By organization = By.cssSelector("li[itemprop='worksFor']"); // REAL: itemprop worksFor
    private By organizationLink = By.cssSelector("li[itemprop='worksFor'] a"); // REAL: org link
    private By websiteLink = By.cssSelector("li[itemprop='url'] a, a[href*='github.blog']"); // REAL: website/blog link
    
    // Follow Button (REAL - extracted from profile)
    private By followButton = By.cssSelector("a.btn.btn-sm.mini-follow-button"); // REAL: follow button class
    private By followButtonAlt = By.xpath("//a[contains(@class, 'btn') and contains(text(), 'Follow')]"); // Alternative
    
    // Navigation Tabs with Counts (REAL - extracted from nav tabs)
    private By repositoriesTab = By.cssSelector("a[href*='tab=repositories']"); // REAL: repos tab
    private By repositoriesCount = By.cssSelector("a[href*='tab=repositories'] span.Counter"); // REAL: repos counter
    
    // Followers/Following Links (REAL - extracted from profile sidebar)
    private By followersLink = By.cssSelector("a[href*='tab=followers']"); // REAL: followers link
    private By followingLink = By.cssSelector("a[href*='tab=following']"); // REAL: following link
    
    // Followers List Page (REAL - extracted from followers tab)
    private By followerAvatar = By.cssSelector("img.avatar.avatar-user[alt^='@']"); // REAL: follower avatar
    private By followerLink = By.cssSelector("a[data-hovercard-type='user']"); // REAL: follower link with hovercard
    private By followerUsername = By.cssSelector("a[data-hovercard-type='user'] span.Link--secondary"); // REAL: follower username
    
    // Profile Header (REAL - h1 containing name info)
    private By profileHeading = By.cssSelector("h1.vcard-names, h1[class*='vcard']"); // REAL: profile heading

    public GitHubProfilePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isProfilePageLoaded() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(avatarImage));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAvatarDisplayed() {
        try {
            WebElement avatar = driver.findElement(avatarImage);
            return avatar.isDisplayed() && avatar.getAttribute("src").contains("avatars");
        } catch (Exception e) {
            return false;
        }
    }

    public String getFullName() {
        WebElement nameElement = wait.until(ExpectedConditions.visibilityOfElementLocated(fullName));
        return nameElement.getText().trim();
    }

    public String getUsername() {
        WebElement usernameElement = wait.until(ExpectedConditions.visibilityOfElementLocated(username));
        return usernameElement.getText().trim();
    }

    public String getLocation() {
        try {
            WebElement locationElement = driver.findElement(location);
            return locationElement.getText().trim();
        } catch (Exception e) {
            return "";
        }
    }

    public String getOrganization() {
        try {
            WebElement orgElement = driver.findElement(organizationLink);
            return orgElement.getText().trim();
        } catch (Exception e) {
            return "";
        }
    }

    public String getWebsiteLink() {
        try {
            WebElement linkElement = driver.findElement(websiteLink);
            return linkElement.getAttribute("href");
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isFollowButtonDisplayed() {
        try {
            return driver.findElement(followButton).isDisplayed();
        } catch (Exception e) {
            try {
                return driver.findElement(followButtonAlt).isDisplayed();
            } catch (Exception ex) {
                return false;
            }
        }
    }

    public String getRepositoriesCount() {
        try {
            WebElement reposTab = driver.findElement(repositoriesTab);
            String tabText = reposTab.getText();
            // Extract number from "Repositories 8"
            return tabText.replaceAll("[^0-9]", "");
        } catch (Exception e) {
            return "0";
        }
    }

    public String getFollowersCount() {
        WebElement followersElement = driver.findElement(followersLink);
        String text = followersElement.getText();
        // Extract "21.3k" from "21.3k followers"
        return text.split("\\s+")[0].trim();
    }

    public String getFollowingCount() {
        WebElement followingElement = driver.findElement(followingLink);
        String text = followingElement.getText();
        // Extract "9" from "9 following"
        return text.split("\\s+")[0].trim();
    }

    public void clickFollowersLink() {
        WebElement link = wait.until(ExpectedConditions.elementToBeClickable(followersLink));
        link.click();
        wait.until(ExpectedConditions.urlContains("tab=followers"));
    }

    public boolean areFollowerAvatarsDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(followerAvatar));
            List<WebElement> avatars = driver.findElements(followerAvatar);
            return avatars.size() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean areFollowerLinksDisplayed() {
        try {
            List<WebElement> links = driver.findElements(followerLink);
            return links.size() > 0 && links.get(0).getAttribute("href").contains("github.com");
        } catch (Exception e) {
            return false;
        }
    }

    public int getFollowerCardsCount() {
        List<WebElement> cards = driver.findElements(followerLink);
        return cards.size();
    }
}