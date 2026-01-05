package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import org.json.JSONObject;
import org.json.JSONArray;

public class GitHubProfilePage {
    private Page page;
    
    // Locators - inferidos basados en estructura típica de GitHub Profile Finder
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileContainer;
    private Locator usernameDisplay;
    private Locator repositoriesCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator gistsLabel;
    private Locator gistsValue;
    private Locator metricsSection;

    public GitHubProfilePage(Page page) {
        this.page = page;
        
        // Search elements
        this.searchInput = page.locator("input[data-testid='search-input'], input[placeholder*='username'], #search-input");
        this.searchButton = page.locator("button[data-testid='search-button'], button[type='submit'], .search-button");
        
        // Profile elements
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-container, .user-profile");
        this.usernameDisplay = page.locator("[data-testid='username'], .username, h1.user-name");
        
        // Metrics counters (inferidos)
        this.metricsSection = page.locator("[data-testid='metrics-dashboard'], .metrics-section, .user-stats");
        this.repositoriesCounter = page.locator("[data-testid='repos-count'], .repos-count, #repositories-count");
        this.followersCounter = page.locator("[data-testid='followers-count'], .followers-count, a[href*='followers']");
        this.followingCounter = page.locator("[data-testid='following-count'], .following-count, a[href*='following']");
        this.gistsCounter = page.locator("[data-testid='gists-count'], .gists-count, #gists-count");
        this.gistsLabel = page.locator("[data-testid='gists-label'], .gists-label, label[for='gists-count']");
        this.gistsValue = page.locator("[data-testid='gists-value'], .gists-value, span.gists-number");
    }

    public void searchUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForTimeout(2000);
    }

    public boolean isProfileVisible() {
        return profileContainer.isVisible();
    }

    public boolean isUsernameDisplayed() {
        return usernameDisplay.isVisible();
    }

    public boolean isGistsCounterVisible() {
        return gistsCounter.isVisible();
    }

    public boolean isGistsLabelVisible() {
        try {
            return gistsLabel.isVisible() || 
                   gistsCounter.textContent().toLowerCase().contains("gist");
        } catch (Exception e) {
            return false;
        }
    }

    public int getGistsCount() {
        String gistsText = gistsCounter.textContent();
        String numericValue = gistsText.replaceAll("[^0-9]", "");
        return Integer.parseInt(numericValue);
    }

    public String getGistsLabel() {
        try {
            if (gistsLabel.isVisible()) {
                return gistsLabel.textContent();
            }
        } catch (Exception e) {
            // Label might be part of counter element
        }
        return gistsCounter.textContent();
    }

    public boolean isGistsCountNumeric() {
        String gistsText = gistsCounter.textContent();
        return gistsText.matches(".*\\d+.*");
    }

    public int fetchGistsCountFromAPI(String username) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.github.com/users/" + username + "/gists"))
                .header("Accept", "application/vnd.github.v3+json")
                .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            JSONArray gistsArray = new JSONArray(response.body());
            return gistsArray.length();
        } catch (Exception e) {
            System.err.println("Error fetching gists from API: " + e.getMessage());
            return 0;
        }
    }
}