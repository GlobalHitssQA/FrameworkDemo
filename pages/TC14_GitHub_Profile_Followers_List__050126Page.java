package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubProfileSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileContainer;
    private Locator followersContainer;
    private Locator followersList;
    private Locator followerItems;
    private Locator userAvatar;
    private Locator followersCount;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.profileContainer = page.locator("[data-testid='profile-container']");
        this.followersContainer = page.locator("[data-testid='followers-container']");
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.followersCount = page.locator("[data-testid='followers-count']");
    }

    public void navigateToSearchPage() {
        page.navigate("https://github.com");
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void searchUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForTimeout(2000);
    }

    public boolean isProfileVisible() {
        return profileContainer.isVisible();
    }

    public int getVisibleFollowersCount() {
        return followerItems.count();
    }

    public boolean isFollowersContainerScrollable() {
        String overflow = (String) followersContainer.evaluate("el => window.getComputedStyle(el).overflowY");
        return overflow.equals("auto") || overflow.equals("scroll");
    }

    public String getFirstFollowerName() {
        if (followerItems.count() > 0) {
            return followerItems.first().textContent();
        }
        return null;
    }

    public String getFirstVisibleFollowerName() {
        Locator visibleFollowers = followerItems.filter(new Locator.FilterOptions().setHasText(".*"));
        if (visibleFollowers.count() > 0) {
            return visibleFollowers.first().textContent();
        }
        return null;
    }

    public String getLastVisibleFollowerName() {
        if (followerItems.count() > 0) {
            return followerItems.last().textContent();
        }
        return null;
    }

    public void scrollFollowersListDown(int pixels) {
        followersContainer.evaluate("el => el.scrollTop += " + pixels);
    }

    public void scrollFollowersListToBottom() {
        followersContainer.evaluate("el => el.scrollTop = el.scrollHeight");
    }

    public void scrollFollowersListToTop() {
        followersContainer.evaluate("el => el.scrollTop = 0");
    }

    public boolean isFollowersListAtBottom() {
        Boolean atBottom = (Boolean) followersContainer.evaluate(
            "el => Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 1"
        );
        return atBottom;
    }

    public boolean isFollowersListAtTop() {
        Integer scrollTop = (Integer) followersContainer.evaluate("el => el.scrollTop");
        return scrollTop == 0;
    }
}