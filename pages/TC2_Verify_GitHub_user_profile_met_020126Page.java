package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {

    private Page page;
    
    // Locators inferidos - basados en buenas prácticas de data-testid y selectores semánticos
    private Locator searchInput;
    private Locator searchButton;
    private Locator userProfileContainer;
    private Locator userAvatar;
    private Locator userName;
    private Locator userUsername;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator followButton;
    private Locator followersList;
    private Locator errorMessage;
    private Locator requestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en convenciones de data-testid y selectores semánticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.userProfileContainer = page.locator("[data-testid='user-profile']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        this.reposCounter = page.locator("[data-testid='repos-count']");
        this.followersCounter = page.locator("[data-testid='followers-count']");
        this.followingCounter = page.locator("[data-testid='following-count']");
        this.gistsCounter = page.locator("[data-testid='gists-count']");
        this.followButton = page.locator("[data-testid='follow-button']");
        this.followersList = page.locator("[data-testid='followers-list']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.requestsIndicator = page.locator("[data-testid='requests-indicator']");
    }

    public void navigateTo(String url) {
        page.navigate(url);
        page.waitForLoadState();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForSelector("[data-testid='user-profile']", 
            new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isUserProfileDisplayed() {
        return userProfileContainer.isVisible();
    }

    public int getReposCount() {
        String reposText = reposCounter.textContent().trim();
        return parseMetricValue(reposText);
    }

    public int getFollowersCount() {
        String followersText = followersCounter.textContent().trim();
        return parseMetricValue(followersText);
    }

    public int getFollowingCount() {
        String followingText = followingCounter.textContent().trim();
        return parseMetricValue(followingText);
    }

    public int getGistsCount() {
        String gistsText = gistsCounter.textContent().trim();
        return parseMetricValue(gistsText);
    }

    public String getUserName() {
        return userName.textContent().trim();
    }

    public String getUserUsername() {
        return userUsername.textContent().trim();
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

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }

    public String getRequestsIndicatorText() {
        return requestsIndicator.textContent().trim();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    private int parseMetricValue(String text) {
        // Maneja formatos como "1.2k", "269k", "1.5M" o números simples
        text = text.toLowerCase().replaceAll("[^0-9.km]", "");
        if (text.isEmpty()) {
            return 0;
        }
        if (text.endsWith("k")) {
            return (int) (Double.parseDouble(text.replace("k", "")) * 1000);
        } else if (text.endsWith("m")) {
            return (int) (Double.parseDouble(text.replace("m", "")) * 1000000);
        }
        return Integer.parseInt(text);
    }
}