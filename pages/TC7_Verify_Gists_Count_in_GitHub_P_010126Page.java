package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import com.microsoft.playwright.APIResponse;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Page Object for GitHub Profile Search Component
 * LOCATORS: INFERIDOS (no se pudo acceder a la aplicación real, URL inferida)
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github-profile-search.example.com";
    private static final String GITHUB_API_URL = "https://api.github.com/users/";
    
    // Locators inferidos basados en buenas prácticas
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator profileContainer;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator username;
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
    private Locator apiLimitIndicator;

    private String currentUsername;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search elements - inferidos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        
        // Profile container - inferido
        this.profileContainer = page.locator("[data-testid='profile-container']");
        
        // User info elements - inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Dashboard metrics - inferidos
        this.reposMetric = page.locator("[data-testid='metric-repos']");
        this.followersMetric = page.locator("[data-testid='metric-followers']");
        this.followingMetric = page.locator("[data-testid='metric-following']");
        this.gistsMetric = page.locator("[data-testid='metric-gists']");
        
        // Followers list - inferido
        this.followersList = page.locator("[data-testid='followers-list']");
        
        // API limit indicator - inferido
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");
    }

    public void navigate() {
        page.navigate(BASE_URL);
    }

    public boolean isSearchComponentVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String usernameText) {
        this.currentUsername = usernameText;
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileDataToLoad() {
        profileContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean isProfileDataVisible() {
        return profileContainer.isVisible();
    }

    public boolean isGistsMetricVisible() {
        return gistsMetric.isVisible();
    }

    public int getGistsCount() {
        String gistsText = gistsMetric.locator("[data-testid='metric-value']").textContent();
        return parseMetricValue(gistsText);
    }

    public int getGistsCountFromAPI() {
        APIResponse response = page.request().get(GITHUB_API_URL + currentUsername);
        String responseBody = response.text();
        JsonObject json = JsonParser.parseString(responseBody).getAsJsonObject();
        return json.get("public_gists").getAsInt();
    }

    public int getReposCount() {
        String reposText = reposMetric.locator("[data-testid='metric-value']").textContent();
        return parseMetricValue(reposText);
    }

    public int getFollowersCount() {
        String followersText = followersMetric.locator("[data-testid='metric-value']").textContent();
        return parseMetricValue(followersText);
    }

    public int getFollowingCount() {
        String followingText = followingMetric.locator("[data-testid='metric-value']").textContent();
        return parseMetricValue(followingText);
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUsername() {
        return username.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    private int parseMetricValue(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }
        String cleanText = text.replaceAll("[^0-9.kKmM]", "").trim();
        if (cleanText.toLowerCase().endsWith("k")) {
            return (int) (Double.parseDouble(cleanText.substring(0, cleanText.length() - 1)) * 1000);
        } else if (cleanText.toLowerCase().endsWith("m")) {
            return (int) (Double.parseDouble(cleanText.substring(0, cleanText.length() - 1)) * 1000000);
        }
        return Integer.parseInt(cleanText);
    }
}