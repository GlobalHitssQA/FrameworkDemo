package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfilePage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator followingCounter;
    private Locator followingLabel;
    private Locator repositoriesCounter;
    private Locator followersCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private Locator profileContainer;

    public GitHubProfilePage(Page page) {
        this.page = page;
        // Locators inferidos basados en prácticas comunes de desarrollo web
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username' i], #username-search");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit'], button:has-text('Search')");
        this.followingCounter = page.locator("[data-testid='following-count'], .following-count, [data-metric='following']");
        this.followingLabel = page.locator("[data-testid='following-label'], .following-label, span:has-text('Following')");
        this.repositoriesCounter = page.locator("[data-testid='repos-count'], .repos-count, [data-metric='repos']");
        this.followersCounter = page.locator("[data-testid='followers-count'], .followers-count, [data-metric='followers']");
        this.gistsCounter = page.locator("[data-testid='gists-count'], .gists-count, [data-metric='gists']");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img[alt*='avatar' i]");
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-container, .user-profile");
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileData() {
        profileContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
    }

    public boolean isFollowingCounterVisible() {
        return followingCounter.isVisible();
    }

    public int getFollowingCount() {
        String countText = followingCounter.textContent().trim();
        return Integer.parseInt(countText.replaceAll("[^0-9]", ""));
    }

    public boolean isFollowingLabelVisible() {
        return followingLabel.isVisible();
    }

    public String getFollowingLabelText() {
        return followingLabel.textContent().trim();
    }

    public boolean isProfileLoaded() {
        return userAvatar.isVisible();
    }
}