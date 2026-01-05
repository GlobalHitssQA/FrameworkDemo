package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class GitHubProfileSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator userProfile;
    private Locator userAvatar;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        // Inferidos siguiendo buenas prácticas de naming
        this.searchInput = page.locator("[data-testid='github-username-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.reposMetric = page.locator("[data-testid='repos-metric']");
        this.followersMetric = page.locator("[data-testid='followers-metric']");
        this.followingMetric = page.locator("[data-testid='following-metric']");
        this.gistsMetric = page.locator("[data-testid='gists-metric']");
        this.userProfile = page.locator("[data-testid='user-profile-container']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
    }

    public void navigateToSearchPage() {
        page.navigate("https://github.com");
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isProfileDisplayed() {
        return userProfile.isVisible() && userAvatar.isVisible();
    }

    public boolean isReposMetricVisible() {
        return reposMetric.isVisible();
    }

    public boolean isFollowersMetricVisible() {
        return followersMetric.isVisible();
    }

    public boolean isFollowingMetricVisible() {
        return followingMetric.isVisible();
    }

    public boolean isGistsMetricVisible() {
        return gistsMetric.isVisible();
    }

    public String getReposCount() {
        return reposMetric.textContent();
    }

    public String getFollowersCount() {
        return followersMetric.textContent();
    }

    public String getFollowingCount() {
        return followingMetric.textContent();
    }

    public String getGistsCount() {
        return gistsMetric.textContent();
    }
}