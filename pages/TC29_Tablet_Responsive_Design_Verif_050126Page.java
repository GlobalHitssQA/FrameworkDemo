package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.BoundingBox;

public class GitHubProfilePage {
    private Page page;
    
    // Locators - inferidos basados en la estructura típica de la aplicación
    private Locator searchInput;
    private Locator searchButton;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private Locator userName;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    private Locator followersList;
    private Locator profileSection;
    
    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='search' i], #search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit'], button.search-btn");
        this.reposCounter = page.locator("[data-testid='repos-counter'], .repos-count, #repos-count");
        this.followersCounter = page.locator("[data-testid='followers-counter'], .followers-count, #followers-count");
        this.followingCounter = page.locator("[data-testid='following-counter'], .following-count, #following-count");
        this.gistsCounter = page.locator("[data-testid='gists-counter'], .gists-count, #gists-count");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar img, #user-avatar");
        this.userName = page.locator("[data-testid='user-name'], .user-name, #user-name");
        this.username = page.locator("[data-testid='username'], .username, #username");
        this.userBio = page.locator("[data-testid='user-bio'], .bio, #user-bio");
        this.userLocation = page.locator("[data-testid='user-location'], .location, #user-location");
        this.userCompany = page.locator("[data-testid='user-company'], .company, #user-company");
        this.userWebLink = page.locator("[data-testid='user-web-link'], .web-link, a.website");
        this.followButton = page.locator("[data-testid='follow-button'], button.follow-btn, #follow-button");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, #followers-list");
        this.profileSection = page.locator("[data-testid='profile-section'], .profile-section, #profile-section");
    }
    
    public void navigateToApplication() {
        page.navigate("https://github.com");
        page.waitForLoadState();
    }
    
    public boolean isPageLoaded() {
        return page.title().length() > 0;
    }
    
    public void resizeViewport(int width, int height) {
        page.setViewportSize(width, height);
        page.waitForTimeout(500);
    }
    
    public boolean isSearchInputVisible() {
        return searchInput.first().isVisible();
    }
    
    public boolean isSearchButtonVisible() {
        return searchButton.first().isVisible();
    }
    
    public double getSearchInputWidth() {
        BoundingBox box = searchInput.first().boundingBox();
        return box != null ? box.width : 0;
    }
    
    public boolean isSearchButtonProperlyPositioned() {
        return searchButton.first().boundingBox() != null;
    }
    
    public void searchUser(String username) {
        searchInput.first().fill(username);
        searchButton.first().click();
        page.waitForTimeout(1000);
    }
    
    public boolean isReposCounterVisible() {
        return reposCounter.first().isVisible();
    }
    
    public boolean isFollowersCounterVisible() {
        return followersCounter.first().isVisible();
    }
    
    public boolean isFollowingCounterVisible() {
        return followingCounter.first().isVisible();
    }
    
    public boolean isGistsCounterVisible() {
        return gistsCounter.first().isVisible();
    }
    
    public boolean isAvatarVisible() {
        return userAvatar.first().isVisible();
    }
    
    public boolean isNameVisible() {
        return userName.first().isVisible();
    }
    
    public boolean isUsernameVisible() {
        return username.first().isVisible();
    }
    
    public boolean isBioVisible() {
        return userBio.first().isVisible();
    }
    
    public boolean isLocationVisible() {
        return userLocation.first().isVisible();
    }
    
    public boolean isCompanyVisible() {
        return userCompany.first().isVisible();
    }
    
    public boolean isWebLinkVisible() {
        return userWebLink.first().isVisible();
    }
    
    public boolean isFollowButtonVisible() {
        return followButton.first().isVisible();
    }
    
    public boolean isFollowersListVisible() {
        return followersList.first().isVisible();
    }
    
    public boolean isFollowersListScrollable() {
        Object scrollHeight = followersList.first().evaluate("el => el.scrollHeight");
        Object clientHeight = followersList.first().evaluate("el => el.clientHeight");
        return (Integer) scrollHeight > (Integer) clientHeight;
    }
    
    public boolean isLayoutAdaptedToLandscape() {
        return profileSection.first().isVisible();
    }
    
    public boolean isHorizontalSpaceUtilized() {
        BoundingBox box = profileSection.first().boundingBox();
        return box != null && box.width > 800;
    }
    
    public double getTapTargetSize(String elementType) {
        Locator element = elementType.equals("searchButton") ? searchButton : followButton;
        BoundingBox box = element.first().boundingBox();
        if (box == null) return 0;
        return Math.min(box.width, box.height);
    }
    
    public boolean hasHorizontalScroll() {
        Object scrollWidth = page.evaluate("document.documentElement.scrollWidth");
        Object clientWidth = page.evaluate("document.documentElement.clientWidth");
        return (Integer) scrollWidth > (Integer) clientWidth;
    }
    
    public boolean isContentWithinViewport() {
        return !hasHorizontalScroll();
    }
}