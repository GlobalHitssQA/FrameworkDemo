package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Finder Application
 * Locators are INFERRED based on common UI patterns and best practices
 * as this is a custom application, not the official GitHub website
 */
public class GitHubProfileFinderPage {

    private Page page;
    private static final String BASE_URL = "https://github.com"; // URL base del proyecto

    // ==================== LOCATORS (INFERIDOS) ====================
    // Search Section
    private Locator searchInput;
    private Locator searchButton;

    // User Profile Section
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followButton;

    // Metrics Section
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;

    // Followers List Section (Right Panel)
    private Locator followersListContainer;
    private Locator followerItems;
    private Locator followerAvatars;
    private Locator followerUsernames;
    private Locator followerProfileLinks;

    // Status Indicators
    private Locator apiRequestIndicator;
    private Locator errorMessage;

    public GitHubProfileFinderPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Section - Inferidos basados en patrones comunes
        this.searchInput = page.locator("[data-testid='search-input'], #search-input, input[placeholder*='username'], input[type='search']");
        this.searchButton = page.locator("[data-testid='search-button'], #search-button, button[aria-label*='search'], button:has(svg.search-icon)");

        // User Profile Section - Inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar'], #user-avatar, .profile-avatar img, .user-avatar");
        this.userFullName = page.locator("[data-testid='user-fullname'], #user-fullname, .user-fullname, .vcard-fullname");
        this.userName = page.locator("[data-testid='user-username'], #user-username, .user-username, .vcard-username");
        this.userBio = page.locator("[data-testid='user-bio'], #user-bio, .user-bio, .user-profile-bio");
        this.userLocation = page.locator("[data-testid='user-location'], #user-location, .user-location");
        this.userCompany = page.locator("[data-testid='user-company'], #user-company, .user-company");
        this.userWebsite = page.locator("[data-testid='user-website'], #user-website, .user-website a");
        this.followButton = page.locator("[data-testid='follow-button'], #follow-button, button:has-text('Follow')");

        // Metrics Section - Inferidos
        this.reposCounter = page.locator("[data-testid='repos-counter'], #repos-counter, .repos-count, .counter-repos");
        this.followersCounter = page.locator("[data-testid='followers-counter'], #followers-counter, .followers-count, .counter-followers");
        this.followingCounter = page.locator("[data-testid='following-counter'], #following-counter, .following-count, .counter-following");
        this.gistsCounter = page.locator("[data-testid='gists-counter'], #gists-counter, .gists-count, .counter-gists");

        // Followers List Section - Inferidos para panel derecho con scroll
        this.followersListContainer = page.locator("[data-testid='followers-list-container'], #followers-list, .followers-list-container, .followers-section");
        this.followerItems = page.locator("[data-testid='follower-item'], .follower-item, .followers-list-container .follower");
        this.followerAvatars = page.locator("[data-testid='follower-avatar'], .follower-item img, .follower-avatar");
        this.followerUsernames = page.locator("[data-testid='follower-username'], .follower-item .username, .follower-username");
        this.followerProfileLinks = page.locator("[data-testid='follower-profile-link'], .follower-item a[href*='github.com'], .follower-link");

        // Status Indicators - Inferidos
        this.apiRequestIndicator = page.locator("[data-testid='api-indicator'], #api-indicator, .api-status, .request-indicator");
        this.errorMessage = page.locator("[data-testid='error-message'], #error-message, .error-message, .user-not-found");
    }

    // ==================== NAVIGATION METHODS ====================

    public void navigateToApp() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void navigateBack() {
        page.goBack();
        page.waitForLoadState();
    }

    // ==================== SEARCH METHODS ====================

    public void searchForUser(String username) {
        searchInput.waitFor();
        searchInput.clear();
        searchInput.fill(username);
        searchButton.click();
        page.waitForLoadState();
    }

    public void clearSearch() {
        searchInput.clear();
    }

    // ==================== VISIBILITY METHODS ====================

    public boolean isUserProfileDisplayed() {
        return userAvatar.isVisible() && userName.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersListContainer.isVisible();
    }

    public boolean isApiIndicatorVisible() {
        return apiRequestIndicator.isVisible();
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    // ==================== FOLLOWERS LIST METHODS ====================

    public boolean isFollowersListVerticallyAligned() {
        if (!followersListContainer.isVisible()) {
            return false;
        }
        // Verificar que el contenedor tiene display flex o grid con dirección columna
        String flexDirection = followersListContainer.evaluate("el => window.getComputedStyle(el).flexDirection").toString();
        String display = followersListContainer.evaluate("el => window.getComputedStyle(el).display").toString();
        return "column".equals(flexDirection) || "block".equals(display) || "grid".equals(display);
    }

    public boolean areAllFollowerAvatarsVisible() {
        int followerCount = (int) followerItems.count();
        if (followerCount == 0) return false;
        
        for (int i = 0; i < Math.min(followerCount, 10); i++) {
            Locator avatar = followerItems.nth(i).locator("img");
            if (!avatar.isVisible()) {
                return false;
            }
        }
        return true;
    }

    public boolean areAllFollowerUsernamesVisible() {
        int followerCount = (int) followerItems.count();
        if (followerCount == 0) return false;
        
        for (int i = 0; i < Math.min(followerCount, 10); i++) {
            Locator username = followerUsernames.nth(i);
            if (!username.isVisible() || username.textContent().trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean areAllFollowerProfileLinksPresent() {
        int followerCount = (int) followerItems.count();
        if (followerCount == 0) return false;
        
        for (int i = 0; i < Math.min(followerCount, 10); i++) {
            Locator link = followerProfileLinks.nth(i);
            String href = link.getAttribute("href");
            if (href == null || href.isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public String getFirstFollowerUsername() {
        return followerUsernames.first().textContent().trim();
    }

    public void clickOnFirstFollowerLink() {
        followerProfileLinks.first().click();
        page.waitForLoadState();
    }

    public int getFollowersCount() {
        String countText = followersCounter.textContent().trim();
        // Manejar formatos como "269k", "1.2M", etc.
        countText = countText.replaceAll("[^0-9kKmM.]", "");
        if (countText.toLowerCase().contains("k")) {
            return (int) (Double.parseDouble(countText.toLowerCase().replace("k", "")) * 1000);
        } else if (countText.toLowerCase().contains("m")) {
            return (int) (Double.parseDouble(countText.toLowerCase().replace("m", "")) * 1000000);
        }
        return Integer.parseInt(countText);
    }

    public int getVisibleFollowersInContainer() {
        return (int) followerItems.count();
    }

    public boolean isFollowersListScrollable() {
        // Verificar si el contenedor tiene overflow-y scroll o auto y contenido que excede
        Object scrollHeight = followersListContainer.evaluate("el => el.scrollHeight");
        Object clientHeight = followersListContainer.evaluate("el => el.clientHeight");
        
        int scrollH = ((Number) scrollHeight).intValue();
        int clientH = ((Number) clientHeight).intValue();
        
        return scrollH > clientH;
    }

    public void scrollFollowersListToBottom() {
        followersListContainer.evaluate("el => el.scrollTop = el.scrollHeight");
        page.waitForTimeout(500); // Esperar a que se complete el scroll
    }

    public void scrollFollowersListToTop() {
        followersListContainer.evaluate("el => el.scrollTop = 0");
        page.waitForTimeout(500);
    }

    // ==================== USER INFO GETTERS ====================

    public String getUserFullName() {
        return userFullName.textContent().trim();
    }

    public String getUsername() {
        return userName.textContent().trim();
    }

    public String getUserBio() {
        return userBio.textContent().trim();
    }

    public String getUserLocation() {
        return userLocation.textContent().trim();
    }

    public String getUserCompany() {
        return userCompany.textContent().trim();
    }

    public String getReposCount() {
        return reposCounter.textContent().trim();
    }

    public String getFollowingCount() {
        return followingCounter.textContent().trim();
    }

    public String getGistsCount() {
        return gistsCounter.textContent().trim();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }
}