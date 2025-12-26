package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.util.List;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - basados en buenas prácticas y convenciones semánticas
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (basados en data-testid semánticos y selectores CSS estables)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator userProfileContainer;
    private final Locator userAvatar;
    private final Locator userName;
    private final Locator userUsername;
    private final Locator userBio;
    private final Locator reposCounter;
    private final Locator followersCounter;
    private final Locator followingCounter;
    private final Locator gistsCounter;
    private final Locator followersListContainer;
    private final Locator followerItems;
    private final Locator followerAvatar;
    private final Locator followerUsername;
    private final Locator followerProfileLink;
    private final Locator apiRequestsIndicator;
    private final Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Search section - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // User profile section - INFERIDOS
        this.userProfileContainer = page.locator("[data-testid='user-profile-container']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-fullname']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        
        // Metrics counters - INFERIDOS
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
        
        // Followers list section (right panel) - INFERIDOS
        this.followersListContainer = page.locator("[data-testid='followers-list-container']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatar = page.locator("[data-testid='follower-avatar']");
        this.followerUsername = page.locator("[data-testid='follower-username']");
        this.followerProfileLink = page.locator("[data-testid='follower-profile-link']");
        
        // Status indicators - INFERIDOS
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void searchForUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean isUserProfileDisplayed() {
        return userProfileContainer.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersListContainer.isVisible();
    }

    public boolean isFollowersListInRightSection() {
        String position = followersListContainer.evaluate(
            "el => window.getComputedStyle(el).position"
        ).toString();
        Double left = (Double) followersListContainer.evaluate(
            "el => el.getBoundingClientRect().left"
        );
        Double windowWidth = (Double) page.evaluate("() => window.innerWidth");
        
        // Verify the container is in the right half of the screen
        return left > (windowWidth / 2);
    }

    public boolean isFollowersListVerticallyAligned() {
        String flexDirection = followersListContainer.evaluate(
            "el => window.getComputedStyle(el).flexDirection"
        ).toString();
        return "column".equals(flexDirection) || 
               followersListContainer.evaluate(
                   "el => window.getComputedStyle(el).display"
               ).toString().contains("block");
    }

    public boolean doAllFollowersHaveAvatar() {
        int followerCount = followerItems.count();
        if (followerCount == 0) return false;
        
        for (int i = 0; i < followerCount; i++) {
            Locator avatar = followerItems.nth(i).locator("[data-testid='follower-avatar']");
            if (!avatar.isVisible()) return false;
        }
        return true;
    }

    public boolean doAllFollowersHaveUsername() {
        int followerCount = followerItems.count();
        if (followerCount == 0) return false;
        
        for (int i = 0; i < followerCount; i++) {
            Locator username = followerItems.nth(i).locator("[data-testid='follower-username']");
            if (!username.isVisible() || username.textContent().isEmpty()) return false;
        }
        return true;
    }

    public boolean doAllFollowersHaveProfileLink() {
        int followerCount = followerItems.count();
        if (followerCount == 0) return false;
        
        for (int i = 0; i < followerCount; i++) {
            Locator link = followerItems.nth(i).locator("[data-testid='follower-profile-link']");
            if (!link.isVisible()) return false;
            String href = link.getAttribute("href");
            if (href == null || href.isEmpty()) return false;
        }
        return true;
    }

    public boolean isFollowersListScrollable() {
        Object scrollHeight = followersListContainer.evaluate(
            "el => el.scrollHeight"
        );
        Object clientHeight = followersListContainer.evaluate(
            "el => el.clientHeight"
        );
        
        double scrollHeightValue = ((Number) scrollHeight).doubleValue();
        double clientHeightValue = ((Number) clientHeight).doubleValue();
        
        // Container is scrollable if scrollHeight > clientHeight
        return scrollHeightValue > clientHeightValue;
    }

    public void scrollDownFollowersList() {
        Double scrollAmount = (Double) followersListContainer.evaluate(
            "el => el.clientHeight * 0.8"
        );
        followersListContainer.evaluate(
            "(el, amount) => el.scrollBy(0, amount)", scrollAmount
        );
        page.waitForTimeout(500); // Wait for scroll animation
    }

    public boolean areAdditionalFollowersVisible() {
        Double scrollTop = (Double) followersListContainer.evaluate(
            "el => el.scrollTop"
        );
        return scrollTop > 0;
    }

    public String getFirstVisibleFollowerUsername() {
        return followerItems.first().locator("[data-testid='follower-username']").textContent();
    }

    public void clickOnFollowerProfileLink(int index) {
        Locator link = followerItems.nth(index).locator("[data-testid='follower-profile-link']");
        link.click();
        page.waitForLoadState();
    }

    public boolean isRedirectedToFollowerProfile(String username) {
        String currentUrl = page.url();
        return currentUrl.contains("github.com/" + username) || 
               currentUrl.contains("github.com/users/" + username);
    }

    // Additional utility methods
    public String getReposCount() {
        return reposCounter.textContent();
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

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public String getApiRequestsRemaining() {
        return apiRequestsIndicator.textContent();
    }
}