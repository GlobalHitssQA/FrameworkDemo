package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (componente personalizado de búsqueda de perfiles)
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator userAvatar;
    private Locator userName;
    private Locator userFullName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followButton;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator followersList;
    private Locator apiRequestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search interface elements - inferidos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Error message - inferido
        this.errorMessage = page.locator("[data-testid='error-message']");
        
        // User profile elements - inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-username']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Metrics dashboard elements - inferidos
        this.reposMetric = page.locator("[data-testid='metric-repos']");
        this.followersMetric = page.locator("[data-testid='metric-followers']");
        this.followingMetric = page.locator("[data-testid='metric-following']");
        this.gistsMetric = page.locator("[data-testid='metric-gists']");
        
        // Followers list - inferido
        this.followersList = page.locator("[data-testid='followers-list']");
        
        // API requests indicator - inferido
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
    }

    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        if (errorMessage.isVisible()) {
            return errorMessage.textContent();
        }
        return "";
    }

    public boolean isUserAvatarDisplayed() {
        return userAvatar.isVisible();
    }

    public boolean isUserNameDisplayed() {
        return userName.isVisible();
    }

    public boolean isUserBioDisplayed() {
        return userBio.isVisible();
    }

    public boolean isUserLocationDisplayed() {
        return userLocation.isVisible();
    }

    public boolean isUserCompanyDisplayed() {
        return userCompany.isVisible();
    }

    public boolean isReposMetricDisplayed() {
        return reposMetric.isVisible();
    }

    public boolean isFollowersMetricDisplayed() {
        return followersMetric.isVisible();
    }

    public boolean isFollowingMetricDisplayed() {
        return followingMetric.isVisible();
    }

    public boolean isGistsMetricDisplayed() {
        return gistsMetric.isVisible();
    }

    public boolean isFollowersListDisplayed() {
        return followersList.isVisible();
    }

    public String getUserName() {
        if (userName.isVisible()) {
            return userName.textContent();
        }
        return "";
    }

    public String getUserFullName() {
        if (userFullName.isVisible()) {
            return userFullName.textContent();
        }
        return "";
    }

    public String getReposCount() {
        if (reposMetric.isVisible()) {
            return reposMetric.textContent();
        }
        return "";
    }

    public String getFollowersCount() {
        if (followersMetric.isVisible()) {
            return followersMetric.textContent();
        }
        return "";
    }

    public String getFollowingCount() {
        if (followingMetric.isVisible()) {
            return followingMetric.textContent();
        }
        return "";
    }

    public String getGistsCount() {
        if (gistsMetric.isVisible()) {
            return gistsMetric.textContent();
        }
        return "";
    }

    public String getApiRequestsIndicatorText() {
        if (apiRequestsIndicator.isVisible()) {
            return apiRequestsIndicator.textContent();
        }
        return "";
    }

    public void clickFollowButton() {
        if (followButton.isVisible()) {
            followButton.click();
        }
    }

    public void scrollFollowersList() {
        if (followersList.isVisible()) {
            followersList.evaluate("element => element.scrollTop = element.scrollHeight");
        }
    }
}