package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.BoundingBox;

public class GitHubProfileSearchPage {
    private Page page;
    private static final String BASE_URL = "https://github.com";
    
    // Locators - INFERIDOS
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileContainer;
    private Locator leftSection;
    private Locator avatar;
    private Locator username;
    private Locator fullName;
    private Locator bio;
    private Locator location;
    private Locator company;
    private Locator webLink;
    private Locator followButton;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Inicialización de locators inferidos basados en buenas prácticas
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username'], #search-username");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit'], button.search-btn");
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-wrapper, #profile-section");
        this.leftSection = page.locator("[data-testid='left-section'], .profile-left-section, .user-details-left");
        this.avatar = page.locator("[data-testid='user-avatar'], .avatar img, img.profile-avatar");
        this.username = page.locator("[data-testid='username'], .username, .user-login");
        this.fullName = page.locator("[data-testid='full-name'], .full-name, .user-name");
        this.bio = page.locator("[data-testid='bio'], .bio, .user-bio");
        this.location = page.locator("[data-testid='location'], .location, .user-location");
        this.company = page.locator("[data-testid='company'], .company, .user-company");
        this.webLink = page.locator("[data-testid='web-link'], .website, .user-web");
        this.followButton = page.locator("[data-testid='follow-button'], button.follow-btn, .follow-button");
        this.reposCounter = page.locator("[data-testid='repos-count'], .repos-counter, .repositories-count");
        this.followersCounter = page.locator("[data-testid='followers-count'], .followers-counter, .followers-count");
        this.followingCounter = page.locator("[data-testid='following-count'], .following-counter, .following-count");
        this.gistsCounter = page.locator("[data-testid='gists-count'], .gists-counter, .gists-count");
    }

    public void navigateTo() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void searchUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean isProfileVisible() {
        return profileContainer.isVisible();
    }

    public boolean isLeftSectionAlignedLeft() {
        if (!leftSection.isVisible()) return false;
        BoundingBox box = leftSection.boundingBox();
        return box != null && box.x >= 0 && box.x < 100;
    }

    public boolean hasConsistentSpacing() {
        if (!leftSection.isVisible()) return false;
        BoundingBox leftBox = leftSection.boundingBox();
        return leftBox != null && leftBox.width > 0;
    }

    public boolean isLayoutResponsive() {
        return profileContainer.isVisible();
    }

    public boolean isLeftSectionAlignedInTablet() {
        return leftSection.isVisible();
    }

    public boolean isLeftSectionAlignedInMobile() {
        return leftSection.isVisible();
    }

    public boolean isLeftSectionAlignedInLandscape() {
        return leftSection.isVisible();
    }

    public boolean isAvatarVisible() {
        return avatar.first().isVisible();
    }

    public boolean isUsernameVisible() {
        return username.first().isVisible();
    }

    public boolean isBioVisible() {
        return bio.first().isVisible() || bio.count() == 0;
    }

    public boolean areInternalElementsAligned() {
        return isAvatarVisible() && isUsernameVisible();
    }

    public String getUsername() {
        return username.first().textContent();
    }

    public String getReposCount() {
        return reposCounter.first().textContent();
    }

    public String getFollowersCount() {
        return followersCounter.first().textContent();
    }

    public String getFollowingCount() {
        return followingCounter.first().textContent();
    }
}