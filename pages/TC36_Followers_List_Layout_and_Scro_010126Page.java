package pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.BoundingBox;

import java.util.List;

/**
 * Page Object for GitHub Profile Finder Application
 * Locators: INFERIDOS (basados en buenas prácticas de data-testid y selectores semánticos)
 */
public class GitHubProfileFinderPage {

    private final Page page;
    private final String baseUrl = "https://github.com";

    // Locators - INFERIDOS
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator userProfile;
    private final Locator userDetailsSection;
    private final Locator userAvatar;
    private final Locator userFullName;
    private final Locator userUsername;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebLink;
    private final Locator followButton;
    private final Locator metricsContainer;
    private final Locator reposMetric;
    private final Locator followersMetric;
    private final Locator followingMetric;
    private final Locator gistsMetric;
    private final Locator followersListContainer;
    private final Locator followerEntries;
    private final Locator errorMessage;
    private final Locator apiLimitIndicator;

    public GitHubProfileFinderPage(Page page) {
        this.page = page;

        // Search Section - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // User Profile Section - INFERIDOS
        this.userProfile = page.locator("[data-testid='user-profile']");
        this.userDetailsSection = page.locator("[data-testid='user-details-section']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Dashboard - INFERIDOS
        this.metricsContainer = page.locator("[data-testid='metrics-container']");
        this.reposMetric = page.locator("[data-testid='metric-repos']");
        this.followersMetric = page.locator("[data-testid='metric-followers']");
        this.followingMetric = page.locator("[data-testid='metric-following']");
        this.gistsMetric = page.locator("[data-testid='metric-gists']");

        // Followers List Section - INFERIDOS
        this.followersListContainer = page.locator("[data-testid='followers-list-container']");
        this.followerEntries = page.locator("[data-testid='follower-entry']");

        // Error and Status - INFERIDOS
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");
    }

    // Navigation Methods
    public void navigateTo() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    // Search Methods
    public void searchUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForLoadState();
    }

    public void clearSearch() {
        searchInput.clear();
    }

    // Profile Visibility Methods
    public boolean isProfileVisible() {
        return userProfile.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // User Details Methods
    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUserUsername() {
        return userUsername.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public String getUserLocation() {
        return userLocation.textContent();
    }

    public String getUserCompany() {
        return userCompany.textContent();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    // Metrics Methods
    public String getReposCount() {
        return reposMetric.textContent();
    }

    public String getFollowersMetricCount() {
        return followersMetric.textContent();
    }

    public String getFollowingCount() {
        return followingMetric.textContent();
    }

    public String getGistsCount() {
        return gistsMetric.textContent();
    }

    // Followers List Methods
    public int getFollowersCount() {
        return followerEntries.count();
    }

    public boolean isFollowersListOnRightSide() {
        BoundingBox userDetailsBox = userDetailsSection.boundingBox();
        BoundingBox followersBox = followersListContainer.boundingBox();

        if (userDetailsBox != null && followersBox != null) {
            return followersBox.x > userDetailsBox.x;
        }
        return false;
    }

    public boolean isFollowersListAlignedWithUserDetails() {
        BoundingBox userDetailsBox = userDetailsSection.boundingBox();
        BoundingBox followersBox = followersListContainer.boundingBox();

        if (userDetailsBox != null && followersBox != null) {
            double tolerance = 20.0;
            return Math.abs(userDetailsBox.y - followersBox.y) <= tolerance;
        }
        return false;
    }

    public boolean allFollowersHaveAvatar() {
        int count = followerEntries.count();
        for (int i = 0; i < count; i++) {
            Locator avatar = followerEntries.nth(i).locator("[data-testid='follower-avatar']");
            if (!avatar.isVisible()) {
                return false;
            }
        }
        return true;
    }

    public boolean allFollowersHaveUsername() {
        int count = followerEntries.count();
        for (int i = 0; i < count; i++) {
            Locator username = followerEntries.nth(i).locator("[data-testid='follower-username']");
            if (!username.isVisible() || username.textContent().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean allFollowersHaveProfileLink() {
        int count = followerEntries.count();
        for (int i = 0; i < count; i++) {
            Locator profileLink = followerEntries.nth(i).locator("[data-testid='follower-profile-link']");
            if (!profileLink.isVisible()) {
                return false;
            }
        }
        return true;
    }

    public boolean isFollowersListScrollable() {
        String overflowY = followersListContainer.evaluate("el => getComputedStyle(el).overflowY").toString();
        Double scrollHeight = (Double) followersListContainer.evaluate("el => el.scrollHeight");
        Double clientHeight = (Double) followersListContainer.evaluate("el => el.clientHeight");

        boolean hasScrollableOverflow = overflowY.equals("auto") || overflowY.equals("scroll");
        boolean contentExceedsContainer = scrollHeight > clientHeight;

        return hasScrollableOverflow && contentExceedsContainer;
    }

    public void scrollFollowersList() {
        followersListContainer.evaluate("el => el.scrollTop = el.scrollHeight / 2");
    }

    private BoundingBox userDetailsSectionInitialPosition;

    public void captureUserDetailsSectionPosition() {
        userDetailsSectionInitialPosition = userDetailsSection.boundingBox();
    }

    public boolean isUserDetailsSectionPositionUnchanged() {
        if (userDetailsSectionInitialPosition == null) {
            captureUserDetailsSectionPosition();
            scrollFollowersList();
        }
        BoundingBox currentPosition = userDetailsSection.boundingBox();

        if (userDetailsSectionInitialPosition != null && currentPosition != null) {
            return Math.abs(userDetailsSectionInitialPosition.x - currentPosition.x) < 1 &&
                   Math.abs(userDetailsSectionInitialPosition.y - currentPosition.y) < 1;
        }
        return false;
    }

    public boolean isFollowerSpacingConsistent() {
        int count = followerEntries.count();
        if (count < 2) return true;

        Double firstSpacing = null;
        double tolerance = 2.0;

        for (int i = 0; i < count - 1; i++) {
            BoundingBox current = followerEntries.nth(i).boundingBox();
            BoundingBox next = followerEntries.nth(i + 1).boundingBox();

            if (current != null && next != null) {
                double spacing = next.y - (current.y + current.height);
                if (firstSpacing == null) {
                    firstSpacing = spacing;
                } else if (Math.abs(spacing - firstSpacing) > tolerance) {
                    return false;
                }
            }
        }
        return true;
    }

    public boolean isFollowerAlignmentConsistent() {
        int count = followerEntries.count();
        if (count < 2) return true;

        Double firstX = null;
        double tolerance = 2.0;

        for (int i = 0; i < count; i++) {
            BoundingBox box = followerEntries.nth(i).boundingBox();
            if (box != null) {
                if (firstX == null) {
                    firstX = box.x;
                } else if (Math.abs(box.x - firstX) > tolerance) {
                    return false;
                }
            }
        }
        return true;
    }

    // Follow Button Methods
    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    // API Limit Methods
    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public String getApiLimitMessage() {
        return apiLimitIndicator.textContent();
    }
}