package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.options.WaitForSelectorState;

import java.util.List;

/**
 * Page Object for GitHub Profile Search Component
 * Locators are INFERRED based on semantic best practices
 * as the actual application URL was not available for inspection
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private static final String BASE_URL = "https://github.com";

    // INFERRED LOCATORS - Based on semantic naming conventions
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator userProfile;
    private final Locator followersSection;
    private final Locator followersList;
    private final Locator followerItems;
    private final Locator followerAvatars;
    private final Locator followerUsernames;
    private final Locator followerProfileLinks;
    private final Locator metricsRepos;
    private final Locator metricsFollowers;
    private final Locator metricsFollowing;
    private final Locator metricsGists;
    private final Locator userAvatar;
    private final Locator userFullName;
    private final Locator userUsername;
    private final Locator userBio;
    private final Locator errorMessage;
    private final Locator requestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Search Interface - INFERRED locators
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // User Profile Section - INFERRED locators
        this.userProfile = page.locator("[data-testid='user-profile']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        
        // Metrics Dashboard - INFERRED locators
        this.metricsRepos = page.locator("[data-testid='metric-repos']");
        this.metricsFollowers = page.locator("[data-testid='metric-followers']");
        this.metricsFollowing = page.locator("[data-testid='metric-following']");
        this.metricsGists = page.locator("[data-testid='metric-gists']");
        
        // Followers List Section - INFERRED locators
        this.followersSection = page.locator("[data-testid='followers-section']");
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatars = page.locator("[data-testid='follower-item'] [data-testid='follower-avatar']");
        this.followerUsernames = page.locator("[data-testid='follower-item'] [data-testid='follower-username']");
        this.followerProfileLinks = page.locator("[data-testid='follower-item'] [data-testid='follower-profile-link']");
        
        // Error and Status - INFERRED locators
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.requestsIndicator = page.locator("[data-testid='requests-indicator']");
    }

    public void navigate() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        userProfile.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isFollowersListVisible() {
        return followersSection.isVisible() && followersList.isVisible();
    }

    public boolean doFollowersHaveAvatars() {
        int followerCount = followerItems.count();
        int avatarCount = followerAvatars.count();
        return followerCount > 0 && avatarCount == followerCount;
    }

    public boolean doFollowersHaveUsernames() {
        int followerCount = followerItems.count();
        int usernameCount = followerUsernames.count();
        return followerCount > 0 && usernameCount == followerCount;
    }

    public boolean doFollowersHaveProfileLinks() {
        int followerCount = followerItems.count();
        int linkCount = followerProfileLinks.count();
        return followerCount > 0 && linkCount == followerCount;
    }

    public boolean isFollowersListScrollable() {
        return (Boolean) page.evaluate(
            "() => {" +
            "  const list = document.querySelector('[data-testid=\"followers-list\"]');" +
            "  return list && list.scrollHeight > list.clientHeight;" +
            "}"
        );
    }

    public void scrollFollowersList() {
        page.evaluate(
            "() => {" +
            "  const list = document.querySelector('[data-testid=\"followers-list\"]');" +
            "  if (list) {" +
            "    list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });" +
            "  }" +
            "}"
        );
        page.waitForTimeout(500); // Wait for smooth scroll animation
    }

    public boolean areAdditionalFollowersVisible() {
        Double scrollTop = (Double) page.evaluate(
            "() => {" +
            "  const list = document.querySelector('[data-testid=\"followers-list\"]');" +
            "  return list ? list.scrollTop : 0;" +
            "}"
        );
        return scrollTop > 0;
    }

    public void clickFirstFollowerProfileLink() {
        followerProfileLinks.first().click();
    }

    public boolean isFollowerProfilePageOpened(BrowserContext context) {
        page.waitForTimeout(1000); // Wait for new tab to open
        List<Page> pages = context.pages();
        if (pages.size() > 1) {
            Page newPage = pages.get(pages.size() - 1);
            String url = newPage.url();
            return url.contains("github.com/");
        }
        // Check if navigation happened in same page
        return page.url().contains("github.com/") && !page.url().equals(BASE_URL);
    }

    // Additional utility methods
    public boolean isUserProfileDisplayed() {
        return userProfile.isVisible();
    }

    public String getUserFullName() {
        return userFullName.isVisible() ? userFullName.textContent() : "";
    }

    public String getUserUsername() {
        return userUsername.isVisible() ? userUsername.textContent() : "";
    }

    public String getUserBio() {
        return userBio.isVisible() ? userBio.textContent() : "";
    }

    public int getFollowersCount() {
        return followerItems.count();
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public String getRequestsIndicatorText() {
        return requestsIndicator.isVisible() ? requestsIndicator.textContent() : "";
    }
}