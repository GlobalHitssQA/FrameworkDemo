package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.BoundingBox;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {
    
    private Page page;
    
    // Locators - INFERIDOS (basados en buenas prácticas y metadata del proyecto)
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileContainer;
    private Locator userAvatar;
    private Locator userName;
    private Locator userUsername;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator metricsContainer;
    private Locator followersList;
    private Locator followerItems;
    private Locator errorMessage;
    private Locator apiLimitIndicator;
    private Locator mainContainer;
    private Locator userDetailsSection;
    private Locator followersSection;
    
    private static final String BASE_URL = "https://github.com";

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Locators inferidos - siguiendo convenciones de data-testid y selectores semánticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.profileContainer = page.locator("[data-testid='profile-container']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-fullname']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");
        this.reposMetric = page.locator("[data-testid='metric-repos']");
        this.followersMetric = page.locator("[data-testid='metric-followers']");
        this.followingMetric = page.locator("[data-testid='metric-following']");
        this.gistsMetric = page.locator("[data-testid='metric-gists']");
        this.metricsContainer = page.locator("[data-testid='metrics-container']");
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");
        this.mainContainer = page.locator("[data-testid='main-container']");
        this.userDetailsSection = page.locator("[data-testid='user-details-section']");
        this.followersSection = page.locator("[data-testid='followers-section']");
    }

    public void navigate() {
        page.navigate(BASE_URL);
    }

    public boolean isPageLoaded() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        profileContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isProfileDisplayed() {
        return profileContainer.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean areMetricsVisible() {
        return reposMetric.isVisible() && 
               followersMetric.isVisible() && 
               followingMetric.isVisible() && 
               gistsMetric.isVisible();
    }

    public boolean isLayoutVerticallyStacked() {
        if (!userDetailsSection.isVisible() || !followersSection.isVisible()) {
            return false;
        }
        BoundingBox userDetailsBox = userDetailsSection.boundingBox();
        BoundingBox followersBox = followersSection.boundingBox();
        
        if (userDetailsBox == null || followersBox == null) {
            return false;
        }
        
        // En layout vertical, la sección de followers debe estar debajo de user details
        return followersBox.y > userDetailsBox.y;
    }

    public boolean isAvatarProperlyScaled(int viewportWidth) {
        BoundingBox box = userAvatar.boundingBox();
        if (box == null) return false;
        // Avatar no debe exceder el 80% del ancho del viewport en móvil
        return box.width <= viewportWidth * 0.8;
    }

    public boolean areMetricsProperlyScaled(int viewportWidth) {
        BoundingBox box = metricsContainer.boundingBox();
        if (box == null) return false;
        // Métricas no deben exceder el ancho del viewport
        return box.width <= viewportWidth;
    }

    public boolean isFollowersListProperlyScaled(int viewportWidth) {
        BoundingBox box = followersList.boundingBox();
        if (box == null) return false;
        // Lista de followers no debe exceder el ancho del viewport
        return box.width <= viewportWidth;
    }

    public boolean hasHorizontalOverflow() {
        Object hasOverflow = page.evaluate(
            "() => document.documentElement.scrollWidth > document.documentElement.clientWidth"
        );
        return Boolean.TRUE.equals(hasOverflow);
    }

    public boolean canScrollVertically() {
        Object canScroll = page.evaluate(
            "() => document.documentElement.scrollHeight > document.documentElement.clientHeight"
        );
        return Boolean.TRUE.equals(canScroll);
    }

    public void scrollToBottom() {
        page.evaluate("() => window.scrollTo(0, document.documentElement.scrollHeight)");
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isSearchButtonTouchFriendly(int minSize) {
        BoundingBox box = searchButton.boundingBox();
        if (box == null) return false;
        return box.width >= minSize && box.height >= minSize;
    }

    public boolean isFollowButtonTouchFriendly(int minSize) {
        if (!followButton.isVisible()) return true; // Button may not be visible for some users
        BoundingBox box = followButton.boundingBox();
        if (box == null) return false;
        return box.width >= minSize && box.height >= minSize;
    }

    public boolean areFollowerLinksTouchFriendly(int minSize) {
        int count = followerItems.count();
        if (count == 0) return true; // No followers to check
        
        for (int i = 0; i < Math.min(count, 5); i++) {
            BoundingBox box = followerItems.nth(i).boundingBox();
            if (box != null && (box.height < minSize)) {
                return false;
            }
        }
        return true;
    }

    public String getErrorMessage() {
        return errorMessage.isVisible() ? errorMessage.textContent() : "";
    }

    public String getUserFullName() {
        return userName.textContent();
    }

    public String getUsername() {
        return userUsername.textContent();
    }

    public String getUserBio() {
        return userBio.isVisible() ? userBio.textContent() : "";
    }

    public String getUserLocation() {
        return userLocation.isVisible() ? userLocation.textContent() : "";
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public void clickFollowerLink(int index) {
        followerItems.nth(index).click();
    }
}