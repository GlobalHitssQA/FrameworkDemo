package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator userAvatar;
    private Locator userDetailsSection;
    private Locator biographyField;
    private Locator repositoriesCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='username-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userDetailsSection = page.locator("[data-testid='user-details-section']");
        this.biographyField = page.locator("[data-testid='user-biography']");
        this.repositoriesCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
    }

    public void navigateToSearchComponent() {
        page.navigate("https://github.com");
        page.waitForLoadState();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isProfileLoaded() {
        try {
            userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
            return userAvatar.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isUserDetailsSectionVisible() {
        return userDetailsSection.isVisible();
    }

    public boolean isBiographyFieldDisplayed() {
        return biographyField.isVisible();
    }

    public String getBiographyText() {
        try {
            return biographyField.textContent();
        } catch (Exception e) {
            return null;
        }
    }

    public boolean isRepositoriesCounterVisible() {
        return repositoriesCounter.isVisible();
    }

    public String getRepositoriesCount() {
        return repositoriesCounter.textContent();
    }

    public boolean isFollowersCounterVisible() {
        return followersCounter.isVisible();
    }

    public String getFollowersCount() {
        return followersCounter.textContent();
    }

    public boolean isFollowingCounterVisible() {
        return followingCounter.isVisible();
    }

    public String getFollowingCount() {
        return followingCounter.textContent();
    }

    public boolean isGistsCounterVisible() {
        return gistsCounter.isVisible();
    }

    public String getGistsCount() {
        return gistsCounter.textContent();
    }
}