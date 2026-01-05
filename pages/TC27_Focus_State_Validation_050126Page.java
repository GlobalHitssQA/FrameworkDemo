package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class GitHubProfileSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator followButton;
    private Locator webLink;
    private Locator followerLinks;
    private Locator firstFollowerLink;
    private Locator repositoryCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.followButton = page.locator("[data-testid='follow-button']");
        this.webLink = page.locator("[data-testid='profile-web-link']");
        this.followerLinks = page.locator("[data-testid='follower-link']");
        this.firstFollowerLink = page.locator("[data-testid='follower-link']").first();
        this.repositoryCounter = page.locator("[data-testid='repo-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
    }

    public void navigateToSearchInterface() {
        page.navigate("https://github.com");
        page.waitForLoadState();
    }

    public void clickSearchInput() {
        searchInput.click();
    }

    public void verifySearchInputHasFocus() {
        assertThat(searchInput).isFocused();
        String focusStyle = searchInput.evaluate("el => window.getComputedStyle(el).outline").toString();
        assert !focusStyle.isEmpty() || !focusStyle.equals("none");
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void verifySearchButtonHasFocus() {
        assertThat(searchButton).isFocused();
    }

    public void searchUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForLoadState();
    }

    public void clickFollowButton() {
        followButton.waitFor();
        followButton.click();
    }

    public void verifyFollowButtonHasFocus() {
        assertThat(followButton).isFocused();
    }

    public void clickWebLink() {
        webLink.waitFor();
        webLink.click();
    }

    public void verifyWebLinkHasFocus() {
        assertThat(webLink).isFocused();
    }

    public void clickFirstFollowerLink() {
        firstFollowerLink.waitFor();
        firstFollowerLink.click();
    }

    public void verifyFollowerLinkHasFocus() {
        assertThat(firstFollowerLink).isFocused();
    }

    public void navigateWithTabKey() {
        page.keyboard().press("Tab");
        page.keyboard().press("Tab");
        page.keyboard().press("Tab");
    }

    public void verifyKeyboardFocusConsistency() {
        Locator focusedElement = page.locator(":focus");
        assertThat(focusedElement).isVisible();
        String focusedElementTag = focusedElement.evaluate("el => el.tagName").toString();
        assert focusedElementTag.equals("INPUT") || focusedElementTag.equals("BUTTON") || focusedElementTag.equals("A");
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public String getRepositoryCount() {
        return repositoryCounter.textContent();
    }

    public String getFollowersCount() {
        return followersCounter.textContent();
    }

    public String getFollowingCount() {
        return followingCounter.textContent();
    }

    public String getGistsCount() {
        return gistsCounter.textContent();
    }
}