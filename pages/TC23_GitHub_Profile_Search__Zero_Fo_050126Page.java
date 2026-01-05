package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class GitHubProfileSearchPage {
    private Page page;
    
    // Locators - Inferidos (no se proporcionó URL específica del componente)
    private Locator searchInput;
    private Locator searchButton;
    private Locator followersCounter;
    private Locator repositoriesCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private Locator username;
    private Locator fullName;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator websiteLink;
    private Locator followButton;
    private Locator followersList;
    private Locator requestsIndicator;
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos basados en buenas prácticas y patrones comunes de GitHub
        this.searchInput = page.locator("[data-testid='github-username-search-input'], input[type='text'][placeholder*='username' i], #username-search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search' i], button.search-btn");
        this.followersCounter = page.locator("[data-testid='followers-count'], .followers-counter, [aria-label*='followers' i]");
        this.repositoriesCounter = page.locator("[data-testid='repositories-count'], .repos-counter, [aria-label*='repositories' i]");
        this.followingCounter = page.locator("[data-testid='following-count'], .following-counter, [aria-label*='following' i]");
        this.gistsCounter = page.locator("[data-testid='gists-count'], .gists-counter, [aria-label*='gists' i]");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar, img.user-avatar");
        this.username = page.locator("[data-testid='username'], .username, .user-login");
        this.fullName = page.locator("[data-testid='full-name'], .user-full-name, .vcard-fullname");
        this.biography = page.locator("[data-testid='user-bio'], .user-bio, .user-profile-bio");
        this.location = page.locator("[data-testid='user-location'], .user-location, [itemprop='homeLocation']");
        this.company = page.locator("[data-testid='user-company'], .user-company, [itemprop='worksFor']");
        this.websiteLink = page.locator("[data-testid='user-website'], .user-website-link, [itemprop='url']");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .btn-follow");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, .followers-container");
        this.requestsIndicator = page.locator("[data-testid='api-requests-indicator'], .requests-indicator, .rate-limit-display");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, .user-not-found");
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public String getFollowersCount() {
        return followersCounter.textContent().trim();
    }

    public String getRepositoriesCount() {
        return repositoriesCounter.textContent().trim();
    }

    public String getFollowingCount() {
        return followingCounter.textContent().trim();
    }

    public String getGistsCount() {
        return gistsCounter.textContent().trim();
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isRepositoriesCountVisible() {
        return repositoriesCounter.isVisible();
    }

    public boolean isFollowingCountVisible() {
        return followingCounter.isVisible();
    }

    public boolean isGistsCountVisible() {
        return gistsCounter.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isFollowersListEmpty() {
        try {
            return followersList.locator("> *").count() == 0;
        } catch (Exception e) {
            return true;
        }
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }

    public String getRequestsIndicator() {
        return requestsIndicator.textContent().trim();
    }
}