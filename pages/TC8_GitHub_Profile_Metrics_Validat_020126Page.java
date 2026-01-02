package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class GitHubProfilePage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator userProfile;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private static final String BASE_URL = "https://github.com";
    private static final String GITHUB_API_URL = "https://api.github.com/users/";

    public GitHubProfilePage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas y estructura semántica
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username'], #github-username-search");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search'], button:has-text('Search')");
        this.userProfile = page.locator("[data-testid='user-profile'], .profile-container, .user-profile-section");
        this.reposCounter = page.locator("[data-testid='repos-counter'], .repos-count, [aria-label*='Repos']");
        this.followersCounter = page.locator("[data-testid='followers-counter'], .followers-count, [aria-label*='Followers']");
        this.followingCounter = page.locator("[data-testid='following-counter'], .following-count, [aria-label*='Following']");
        this.gistsCounter = page.locator("[data-testid='gists-counter'], .gists-count, [aria-label*='Gists']");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img[alt*='avatar']");
    }

    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public boolean isUsernameInInputField(String username) {
        String inputValue = searchInput.inputValue();
        return inputValue.equals(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isUserProfileDisplayed() {
        userProfile.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
        return userProfile.isVisible() && userAvatar.isVisible();
    }

    public int getReposCount() {
        String text = reposCounter.textContent();
        return parseCounterValue(text);
    }

    public int getFollowersCount() {
        String text = followersCounter.textContent();
        return parseCounterValue(text);
    }

    public int getFollowingCount() {
        String text = followingCounter.textContent();
        return parseCounterValue(text);
    }

    public int getGistsCount() {
        String text = gistsCounter.textContent();
        return parseCounterValue(text);
    }

    private int parseCounterValue(String text) {
        String numericValue = text.replaceAll("[^0-9]", "");
        return Integer.parseInt(numericValue);
    }

    public Map<String, Integer> fetchGitHubAPIMetrics(String username) {
        Map<String, Integer> metrics = new HashMap<>();
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(GITHUB_API_URL + username))
                    .header("Accept", "application/vnd.github.v3+json")
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            JsonObject jsonObject = JsonParser.parseString(response.body()).getAsJsonObject();

            metrics.put("public_repos", jsonObject.get("public_repos").getAsInt());
            metrics.put("followers", jsonObject.get("followers").getAsInt());
            metrics.put("following", jsonObject.get("following").getAsInt());
            metrics.put("public_gists", jsonObject.get("public_gists").getAsInt());

        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch GitHub API metrics: " + e.getMessage());
        }
        return metrics;
    }
}