package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubFollowersPage {
    private Page page;
    
    // Real locators extracted from GitHub followers page
    private Locator followersContainer;
    private Locator followerItems;
    private Locator nextPageButton;
    private Locator followerAvatars;
    private Locator followerLinks;
    private Locator followButtons;

    public GitHubFollowersPage(Page page) {
        this.page = page;
        // Main container with followers list
        this.followersContainer = page.locator("main");
        // Individual follower items in the list
        this.followerItems = page.locator("main > div > div:nth-child(2) > div > div");
        // Next page button for pagination
        this.nextPageButton = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Next"));
        // Follower avatars
        this.followerAvatars = page.locator("img[alt*='@']");
        // Follower profile links
        this.followerLinks = page.locator("a[href^='/']").filter(new Locator.FilterOptions().setHasText("Follow"));
        // Follow buttons
        this.followButtons = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Follow"));
    }

    public Locator getFollowersContainer() {
        return followersContainer;
    }

    public void scrollFollowersList() {
        page.evaluate("window.scrollBy(0, 800)");
    }

    public void scrollToBottom() {
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    }

    public boolean isScrollable() {
        Object scrollHeight = page.evaluate("document.body.scrollHeight");
        Object clientHeight = page.evaluate("document.body.clientHeight");
        return (Integer) scrollHeight > (Integer) clientHeight;
    }

    public int getVisibleFollowersCount() {
        return followerItems.count();
    }

    public Locator getNextPageButton() {
        return nextPageButton;
    }

    public boolean isFollowerVisible(int index) {
        return followerItems.nth(index).isVisible();
    }

    public void clickFollowerByIndex(int index) {
        followerItems.nth(index).click();
    }

    public String getFollowerUsername(int index) {
        return followerItems.nth(index).textContent();
    }
}

class GitHubSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchResults;

    public GitHubSearchPage(Page page) {
        this.page = page;
        // Search input locator
        this.searchInput = page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Search GitHub"));
        this.searchResults = page.locator("main");
    }

    public void navigateToSearchPage() {
        page.navigate("https://github.com/search?type=users");
    }

    public void searchUser(String username) {
        searchInput.fill(username);
        searchInput.press("Enter");
        page.waitForLoadState();
    }

    public void clickOnUserResult(String username) {
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName(username).setExact(false)).first().click();
    }
}

class GitHubProfilePage {
    private Page page;
    private Locator followersLink;
    private Locator followingLink;
    private Locator profileAvatar;

    public GitHubProfilePage(Page page) {
        this.page = page;
        // Followers link with count (e.g., "269k followers")
        this.followersLink = page.locator("a[href*='tab=followers']");
        this.followingLink = page.locator("a[href*='tab=following']");
        this.profileAvatar = page.locator("img[alt*='View'][alt*='avatar']");
    }

    public void clickFollowersLink() {
        followersLink.click();
        page.waitForLoadState();
    }

    public void clickFollowingLink() {
        followingLink.click();
    }

    public boolean isProfileLoaded() {
        return profileAvatar.isVisible();
    }
}