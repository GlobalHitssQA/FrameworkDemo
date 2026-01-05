package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.LoadState;

public class GitHubSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileContainer;
    private Locator followersList;
    private Locator followersItems;
    private Locator firstFollowerLink;
    private Locator firstFollowerAvatar;
    private Locator firstFollowerUsername;
    private Locator profileUsername;

    public GitHubSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.profileContainer = page.locator("[data-testid='profile-container']");
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followersItems = page.locator("[data-testid='follower-item']");
        this.firstFollowerLink = page.locator("[data-testid='follower-item']:first-child a");
        this.firstFollowerAvatar = page.locator("[data-testid='follower-item']:first-child img");
        this.firstFollowerUsername = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-username']");
        this.profileUsername = page.locator("[data-testid='profile-username']");
    }

    public void navigateToSearchPage() {
        page.navigate("https://github.com");
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void searchUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isProfileContainerVisible() {
        return profileContainer.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersCount() {
        return followersItems.count();
    }

    public boolean isFirstFollowerAvatarVisible() {
        return firstFollowerAvatar.isVisible();
    }

    public boolean isFirstFollowerUsernameVisible() {
        return firstFollowerUsername.isVisible();
    }

    public void hoverOverFirstFollower() {
        firstFollowerLink.hover();
    }

    public String getFirstFollowerCursorStyle() {
        return firstFollowerLink.evaluate("element => window.getComputedStyle(element).cursor").toString();
    }

    public String getFirstFollowerUsername() {
        return firstFollowerUsername.textContent().trim();
    }

    public void clickFirstFollowerLink() {
        firstFollowerLink.click();
    }

    public String getProfileUsername() {
        return profileUsername.textContent().trim();
    }
}